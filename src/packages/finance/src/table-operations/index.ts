/**
 * 表格数据处理模块
 * 提供行列转置、旋转、排序、过滤、合并、分组、求和等表格操作
 */

import { TableData, TableRow, MatrixData, TableOperationOptions } from '../types';

/**
 * 转置表格（行变列，列变行）
 * @param data 表格数据（二维数组）
 * @returns 转置后的二维数组
 */
export function transposeMatrix(data: MatrixData): MatrixData {
  if (data.length === 0) return [];

  const rows = data.length;
  const cols = data[0].length;

  // 验证所有行长度相同
  for (let i = 1; i < rows; i++) {
    if (data[i].length !== cols) {
      throw new Error('All rows must have the same length for transpose');
    }
  }

  const result: MatrixData = [];
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = data[i][j];
    }
  }
  return result;
}

/**
 * 转置对象数组表格
 * @param data 对象数组表格数据
 * @returns 转置后的对象数组
 */
export function transposeTable(data: TableData): TableData {
  if (data.length === 0) return [];

  const keys = Object.keys(data[0]);
  const result: TableData = [];

  for (let i = 0; i < keys.length; i++) {
    const row: TableRow = {};
    for (let j = 0; j < data.length; j++) {
      row[`row_${j}`] = data[j][keys[i]];
    }
    result.push(row);
  }

  return result;
}

/**
 * 旋转表格（顺时针旋转90度）
 * @param data 表格数据（二维数组）
 * @returns 旋转后的二维数组
 */
export function rotateMatrix(data: MatrixData): MatrixData {
  if (data.length === 0) return [];

  const rows = data.length;
  const cols = data[0].length;

  const result: MatrixData = [];
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = rows - 1; i >= 0; i--) {
      result[j][rows - 1 - i] = data[i][j];
    }
  }
  return result;
}

/**
 * 排序表格数据
 * @param data 表格数据
 * @param sortBy 排序字段（字符串或字符串数组）
 * @param direction 排序方向：'asc'升序，'desc'降序
 * @returns 排序后的表格数据
 */
export function sortTable(data: TableData, sortBy: string | string[], direction: 'asc' | 'desc' = 'asc'): TableData {
  if (data.length === 0) return [];

  const sortKeys = Array.isArray(sortBy) ? sortBy : [sortBy];
  const sortOrder = direction === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    for (const key of sortKeys) {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return -1 * sortOrder;
      if (valA > valB) return 1 * sortOrder;
    }
    return 0;
  });
}

/**
 * 过滤表格数据
 * @param data 表格数据
 * @param predicate 过滤条件函数
 * @returns 过滤后的表格数据
 */
export function filterTable(data: TableData, predicate: (row: TableRow) => boolean): TableData {
  return data.filter(predicate);
}

/**
 * 选择表格列（投影）
 * @param data 表格数据
 * @param columns 要选择的列名数组
 * @returns 只包含指定列的新表格数据
 */
export function selectColumns(data: TableData, columns: string[]): TableData {
  return data.map((row) => {
    const newRow: TableRow = {};
    columns.forEach((col) => {
      if (col in row) {
        newRow[col] = row[col];
      }
    });
    return newRow;
  });
}

/**
 * 重命名表格列
 * @param data 表格数据
 * @param columnMap 列名映射 { 旧列名: 新列名 }
 * @returns 重命名列后的表格数据
 */
export function renameColumns(data: TableData, columnMap: Record<string, string>): TableData {
  return data.map((row) => {
    const newRow: TableRow = {};
    Object.entries(row).forEach(([key, value]) => {
      const newKey = columnMap[key] || key;
      newRow[newKey] = value;
    });
    return newRow;
  });
}

/**
 * 合并多个表格（纵向合并）
 * @param tables 表格数组
 * @returns 合并后的表格数据
 */
export function concatTables(tables: TableData[]): TableData {
  if (tables.length === 0) return [];
  return tables.reduce((acc, table) => acc.concat(table), []);
}

/**
 * 左连接两个表格
 * @param left 左表
 * @param right 右表
 * @param leftKey 左表连接键
 * @param rightKey 右表连接键
 * @returns 连接后的表格数据
 */
export function leftJoin(left: TableData, right: TableData, leftKey: string, rightKey: string): TableData {
  const rightMap = new Map();
  right.forEach((row) => {
    const key = row[rightKey];
    if (!rightMap.has(key)) {
      rightMap.set(key, row);
    }
  });

  return left.map((leftRow) => {
    const key = leftRow[leftKey];
    const rightRow = rightMap.get(key) || {};
    return { ...leftRow, ...rightRow };
  });
}

/**
 * 内连接两个表格
 * @param left 左表
 * @param right 右表
 * @param leftKey 左表连接键
 * @param rightKey 右表连接键
 * @returns 连接后的表格数据
 */
export function innerJoin(left: TableData, right: TableData, leftKey: string, rightKey: string): TableData {
  const rightMap = new Map();
  right.forEach((row) => {
    const key = row[rightKey];
    if (!rightMap.has(key)) {
      rightMap.set(key, row);
    }
  });

  return left
    .map((leftRow) => {
      const key = leftRow[leftKey];
      const rightRow = rightMap.get(key);
      if (rightRow) {
        return { ...leftRow, ...rightRow };
      }
      return null;
    })
    .filter((row) => row !== null) as TableData;
}

/**
 * 分组表格数据
 * @param data 表格数据
 * @param groupBy 分组字段（字符串或字符串数组）
 * @returns 分组后的对象，键为分组值，值为分组数据
 */
export function groupBy(data: TableData, groupBy: string | string[]): Record<string, TableData> {
  const groups: Record<string, TableData> = {};
  const groupKeys = Array.isArray(groupBy) ? groupBy : [groupBy];

  data.forEach((row) => {
    const groupKey = groupKeys.map((key) => row[key]).join('|');
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(row);
  });

  return groups;
}

/**
 * 分组聚合
 * @param data 表格数据
 * @param groupBy 分组字段
 * @param aggregates 聚合配置 { 列名: 聚合函数 }
 * @returns 聚合后的表格数据
 */
export function aggregate(
  data: TableData,
  groupByField: string | string[],
  aggregates: Record<string, 'sum' | 'mean' | 'median' | 'min' | 'max' | 'count'>
): TableData {
  const groups = groupBy(data, groupByField);
  const groupKeys = Array.isArray(groupByField) ? groupByField : [groupByField];
  const result: TableData = [];

  Object.entries(groups).forEach(([groupKey, groupData]) => {
    const groupValues = groupKey.split('|');
    const row: TableRow = {};

    // 添加分组字段
    groupKeys.forEach((key, index) => {
      row[key] = groupValues[index];
    });

    // 计算聚合值
    Object.entries(aggregates).forEach(([column, aggFunc]) => {
      const values = (groupData as TableData).map((r) => r[column]).filter((v) => typeof v === 'number');

      switch (aggFunc) {
        case 'sum':
          row[column] = values.reduce((a: number, b: number) => a + b, 0);
          break;
        case 'mean':
          row[column] = values.length > 0 ? values.reduce((a: number, b: number) => a + b, 0) / values.length : null;
          break;
        case 'median':
          if (values.length === 0) {
            row[column] = null;
          } else {
            const sorted = [...values].sort((a: number, b: number) => a - b);
            const mid = Math.floor(sorted.length / 2);
            row[column] = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
          }
          break;
        case 'min':
          row[column] = values.length > 0 ? Math.min(...values) : null;
          break;
        case 'max':
          row[column] = values.length > 0 ? Math.max(...values) : null;
          break;
        case 'count':
          row[column] = groupData.length;
          break;
      }
    });

    result.push(row);
  });

  return result;
}

/**
 * 透视表（Pivot Table）
 * @param data 表格数据
 * @param rows 行分组字段
 * @param columns 列分组字段
 * @param values 值字段
 * @param aggFunc 聚合函数（默认'sum'）
 * @returns 透视表数据
 */
export function pivotTable(
  data: TableData,
  rows: string | string[],
  columns: string | string[],
  values: string,
  aggFunc: 'sum' | 'mean' | 'median' | 'min' | 'max' | 'count' = 'sum'
): TableData {
  const rowKeys = Array.isArray(rows) ? rows : [rows];
  const colKeys = Array.isArray(columns) ? columns : [columns];

  // 创建行和列的映射
  const rowMap = new Map<string, string[]>();
  const colMap = new Map<string, string[]>();
  const valueMap = new Map<string, number[]>();

  data.forEach((row) => {
    const rowKey = rowKeys.map((key) => row[key]).join('|');
    const colKey = colKeys.map((key) => row[key]).join('|');
    const value = row[values];

    if (!rowMap.has(rowKey)) {
      rowMap.set(rowKey, rowKey.split('|'));
    }
    if (!colMap.has(colKey)) {
      colMap.set(colKey, colKey.split('|'));
    }

    const mapKey = `${rowKey}|${colKey}`;
    if (!valueMap.has(mapKey)) {
      valueMap.set(mapKey, []);
    }
    if (typeof value === 'number') {
      const valuesArray = valueMap.get(mapKey);
      if (valuesArray) {
        valuesArray.push(value);
      }
    }
  });

  // 生成结果表格
  const result: TableData = [];
  const colValues = Array.from(colMap.keys());

  rowMap.forEach((rowParts, rowKey) => {
    const resultRow: TableRow = {};

    // 添加行分组字段
    rowKeys.forEach((key, index) => {
      resultRow[key] = rowParts[index];
    });

    // 添加列值
    colValues.forEach((colKey) => {
      const mapKey = `${rowKey}|${colKey}`;
      const values = valueMap.get(mapKey) || [];

      let aggValue: number | null = null;
      if (values.length > 0) {
        switch (aggFunc) {
          case 'sum':
            aggValue = values.reduce((a: number, b: number) => a + b, 0);
            break;
          case 'mean':
            aggValue = values.reduce((a: number, b: number) => a + b, 0) / values.length;
            break;
          case 'median':
            const sorted = [...values].sort((a: number, b: number) => a - b);
            const mid = Math.floor(sorted.length / 2);
            aggValue = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
            break;
          case 'min':
            aggValue = Math.min(...values);
            break;
          case 'max':
            aggValue = Math.max(...values);
            break;
          case 'count':
            aggValue = values.length;
            break;
        }
      }

      resultRow[colKey] = aggValue;
    });

    result.push(resultRow);
  });

  return result;
}

/**
 * 计算表格描述性统计
 * @param data 表格数据
 * @returns 每列的统计信息
 */
export function tableDescriptiveStats(data: TableData): Record<
  string,
  {
    count: number;
    mean: number | null;
    std: number | null;
    min: number | null;
    max: number | null;
    median: number | null;
  }
> {
  if (data.length === 0) return {};

  const columns = Object.keys(data[0]);
  const result: Record<string, any> = {};

  columns.forEach((col) => {
    const values = data.map((row) => row[col]).filter((v) => typeof v === 'number');
    const numericValues = values.filter((v) => !isNaN(v));

    if (numericValues.length === 0) {
      result[col] = {
        count: values.length,
        mean: null,
        std: null,
        min: null,
        max: null,
        median: null,
      };
    } else {
      const sorted = [...numericValues].sort((a: number, b: number) => a - b);
      const mean = numericValues.reduce((a: number, b: number) => a + b, 0) / numericValues.length;
      const variance =
        numericValues.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) / numericValues.length;

      result[col] = {
        count: values.length,
        mean,
        std: Math.sqrt(variance),
        min: sorted[0],
        max: sorted[sorted.length - 1],
        median:
          sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)],
      };
    }
  });

  return result;
}
