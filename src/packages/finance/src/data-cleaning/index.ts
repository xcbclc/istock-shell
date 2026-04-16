/**
 * 数据清洗与预处理模块
 * 提供缺失值处理、异常值检测、数据格式化、类型转换等功能
 */

import { Series, TimeSeries, OHLC, TableData, DataCleaningOptions } from '../types';

/**
 * 处理缺失值
 * @param data 数值序列
 * @param options 处理选项
 * @returns 处理后的序列
 */
export function handleMissingValues(data: Series, options: DataCleaningOptions = {}): Series {
  const { missingValueStrategy = 'ignore', fillValue = 0 } = options;

  if (missingValueStrategy === 'ignore') {
    return data;
  }

  return data
    .map((value) => {
      if (value === null || value === undefined || Number.isNaN(value)) {
        if (missingValueStrategy === 'fill') {
          return fillValue;
        } else if (missingValueStrategy === 'remove') {
          return undefined;
        }
      }
      return value;
    })
    .filter((value) => value !== undefined) as Series;
}

/**
 * 检测异常值（使用IQR方法）
 * @param data 数值序列
 * @param threshold IQR倍数阈值（默认1.5）
 * @returns 异常值索引数组
 */
export function detectOutliersIQR(data: Series, threshold = 1.5): number[] {
  if (data.length < 4) return [];

  const sorted = [...data].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - threshold * iqr;
  const upperBound = q3 + threshold * iqr;

  const outliers: number[] = [];
  data.forEach((value, index) => {
    if (value < lowerBound || value > upperBound) {
      outliers.push(index);
    }
  });
  return outliers;
}

/**
 * 检测异常值（使用Z分数方法）
 * @param data 数值序列
 * @param threshold Z分数阈值（默认3）
 * @returns 异常值索引数组
 */
export function detectOutliersZScore(data: Series, threshold = 3): number[] {
  if (data.length < 2) return [];

  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const std = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length);

  if (std === 0) return [];

  const outliers: number[] = [];
  data.forEach((value, index) => {
    const zScore = Math.abs((value - mean) / std);
    if (zScore > threshold) {
      outliers.push(index);
    }
  });
  return outliers;
}

/**
 * 处理异常值
 * @param data 数值序列
 * @param options 处理选项
 * @returns 处理后的序列
 */
export function handleOutliers(data: Series, options: DataCleaningOptions = {}): Series {
  const {
    outlierStrategy = 'ignore',
    outlierMethod = 'iqr',
    outlierThreshold = outlierMethod === 'iqr' ? 1.5 : 3,
  } = options;

  if (outlierStrategy === 'ignore') {
    return data;
  }

  const outliers =
    outlierMethod === 'iqr' ? detectOutliersIQR(data, outlierThreshold) : detectOutliersZScore(data, outlierThreshold);

  if (outlierStrategy === 'remove') {
    return data.filter((_, index) => !outliers.includes(index));
  } else if (outlierStrategy === 'clip') {
    // 计算边界并裁剪
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - outlierThreshold * iqr;
    const upperBound = q3 + outlierThreshold * iqr;

    return data.map((value, index) => {
      if (outliers.includes(index)) {
        if (value < lowerBound) return lowerBound;
        if (value > upperBound) return upperBound;
      }
      return value;
    });
  }

  return data;
}

/**
 * 标准化数据（Z分数标准化）
 * @param data 数值序列
 * @returns 标准化后的序列
 */
export function standardize(data: Series): Series {
  if (data.length === 0) return [];
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const std = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length);
  if (std === 0) return data.map(() => 0);
  return data.map((value) => (value - mean) / std);
}

/**
 * 归一化数据（最小-最大归一化到[0,1]）
 * @param data 数值序列
 * @returns 归一化后的序列
 */
export function normalize(data: Series): Series {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  if (min === max) return data.map(() => 0.5);
  return data.map((value) => (value - min) / (max - min));
}

/**
 * 格式化日期字符串为时间戳
 * @param dateStr 日期字符串
 * @returns 时间戳（毫秒）
 */
export function formatDateToTimestamp(dateStr: string): number {
  return new Date(dateStr).getTime();
}

/**
 * 转换OHLC数据格式
 * @param data OHLC数据数组
 * @param targetFormat 目标格式：'timestamp' | 'date' | 'object'
 * @returns 转换后的数据
 */
export function convertOHLCFormat(data: OHLC[], targetFormat: 'timestamp' | 'date' | 'object' = 'timestamp'): any[] {
  return data.map((item) => {
    if (targetFormat === 'timestamp') {
      return {
        ...item,
        timestamp: typeof item.timestamp === 'string' ? formatDateToTimestamp(item.timestamp) : item.timestamp,
      };
    } else if (targetFormat === 'date') {
      return {
        ...item,
        timestamp:
          typeof item.timestamp === 'number' ? new Date(item.timestamp).toISOString().split('T')[0] : item.timestamp,
      };
    }
    return item;
  });
}

/**
 * 转换表格数据类型
 * @param data 表格数据
 * @param columnTypes 列类型映射 { column: 'number' | 'string' | 'date' }
 * @returns 转换后的表格数据
 */
export function convertTableTypes(
  data: TableData,
  columnTypes: Record<string, 'number' | 'string' | 'date'>
): TableData {
  return data.map((row) => {
    const newRow = { ...row };
    Object.entries(columnTypes).forEach(([column, type]) => {
      if (newRow[column] !== undefined) {
        if (type === 'number') {
          newRow[column] = Number(newRow[column]);
        } else if (type === 'date') {
          newRow[column] = new Date(newRow[column]);
        } else if (type === 'string') {
          newRow[column] = String(newRow[column]);
        }
      }
    });
    return newRow;
  });
}

/**
 * 数据清洗管道：组合多个清洗步骤
 * @param data 数值序列
 * @param options 清洗选项
 * @returns 清洗后的序列
 */
export function cleanDataPipeline(data: Series, options: DataCleaningOptions = {}): Series {
  let result = [...data];
  result = handleMissingValues(result, options);
  result = handleOutliers(result, options);
  return result;
}
