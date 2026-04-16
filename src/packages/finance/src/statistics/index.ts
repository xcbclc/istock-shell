/**
 * 常规统计计算模块
 * 提供均值、中位数、标准差、方差、相关系数、协方差等统计函数
 */

import { Series } from '../types';

/**
 * 计算平均值
 * @param data 数值序列
 * @returns 平均值
 */
export function mean(data: Series): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }
  return data.reduce((sum, val) => sum + val, 0) / data.length;
}

/**
 * 计算中位数
 * @param data 数值序列
 * @returns 中位数
 */
export function median(data: Series): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const sorted = [...data].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}

/**
 * 计算众数
 * @param data 数值序列
 * @returns 众数数组（可能多个）
 */
export function mode(data: Series): number[] {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const frequency: Record<number, number> = {};
  let maxFrequency = 0;

  data.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFrequency) {
      maxFrequency = frequency[value];
    }
  });

  const modes: number[] = [];
  Object.entries(frequency).forEach(([value, freq]) => {
    if (freq === maxFrequency) {
      modes.push(Number(value));
    }
  });

  return modes;
}

/**
 * 计算方差
 * @param data 数值序列
 * @param isSample 是否为样本方差（默认true）
 * @returns 方差
 */
export function variance(data: Series, isSample = true): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  if (data.length === 1 && isSample) {
    return 0;
  }

  const dataMean = mean(data);
  const sumOfSquares = data.reduce((sum, val) => sum + Math.pow(val - dataMean, 2), 0);
  return sumOfSquares / (data.length - (isSample ? 1 : 0));
}

/**
 * 计算标准差
 * @param data 数值序列
 * @param isSample 是否为样本标准差（默认true）
 * @returns 标准差
 */
export function std(data: Series, isSample = true): number {
  return Math.sqrt(variance(data, isSample));
}

/**
 * 计算变异系数（CV）
 * @param data 数值序列
 * @returns 变异系数（百分比）
 */
export function coefficientOfVariation(data: Series): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const dataMean = mean(data);
  if (dataMean === 0) {
    throw new Error('Mean cannot be zero for coefficient of variation calculation');
  }

  return (std(data) / dataMean) * 100;
}

/**
 * 计算百分位数
 * @param data 数值序列
 * @param percentile 百分位（0-100）
 * @returns 百分位数
 */
export function percentile(data: Series, percentile: number): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  if (percentile < 0 || percentile > 100) {
    throw new Error('Percentile must be between 0 and 100');
  }

  const sorted = [...data].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);

  if (lowerIndex === upperIndex) {
    return sorted[lowerIndex];
  }

  const weight = index - lowerIndex;
  return sorted[lowerIndex] * (1 - weight) + sorted[upperIndex] * weight;
}

/**
 * 计算四分位数
 * @param data 数值序列
 * @returns { q1: number, q2: number, q3: number, iqr: number }
 */
export function quartiles(data: Series): { q1: number; q2: number; q3: number; iqr: number } {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const q1 = percentile(data, 25);
  const q2 = percentile(data, 50);
  const q3 = percentile(data, 75);
  const iqr = q3 - q1;

  return { q1, q2, q3, iqr };
}

/**
 * 计算偏度（Skewness）
 * @param data 数值序列
 * @returns 偏度
 */
export function skewness(data: Series): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const dataMean = mean(data);
  const dataStd = std(data, false); // 使用总体标准差
  if (dataStd === 0) return 0;

  const n = data.length;
  const sum = data.reduce((sum, val) => sum + Math.pow((val - dataMean) / dataStd, 3), 0);
  return (n / ((n - 1) * (n - 2))) * sum;
}

/**
 * 计算峰度（Kurtosis）
 * @param data 数值序列
 * @returns 峰度
 */
export function kurtosis(data: Series): number {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const dataMean = mean(data);
  const dataStd = std(data, false); // 使用总体标准差
  if (dataStd === 0) return -3; // 所有值相同，峰度为-3

  const n = data.length;
  const sum = data.reduce((sum, val) => sum + Math.pow((val - dataMean) / dataStd, 4), 0);

  // 计算超额峰度（excess kurtosis），正态分布为0
  return (n * (n + 1) * sum) / ((n - 1) * (n - 2) * (n - 3)) - (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
}

/**
 * 计算协方差
 * @param dataX 第一个变量序列
 * @param dataY 第二个变量序列
 * @param isSample 是否为样本协方差（默认true）
 * @returns 协方差
 */
export function covariance(dataX: Series, dataY: Series, isSample = true): number {
  if (dataX.length !== dataY.length) {
    throw new Error('Data arrays must have the same length');
  }

  if (dataX.length === 0) {
    throw new Error('Data arrays cannot be empty');
  }

  const meanX = mean(dataX);
  const meanY = mean(dataY);

  let sum = 0;
  for (let i = 0; i < dataX.length; i++) {
    sum += (dataX[i] - meanX) * (dataY[i] - meanY);
  }

  return sum / (dataX.length - (isSample ? 1 : 0));
}

/**
 * 计算相关系数（Pearson）
 * @param dataX 第一个变量序列
 * @param dataY 第二个变量序列
 * @returns 相关系数
 */
export function correlation(dataX: Series, dataY: Series): number {
  if (dataX.length !== dataY.length) {
    throw new Error('Data arrays must have the same length');
  }

  if (dataX.length === 0) {
    throw new Error('Data arrays cannot be empty');
  }

  const cov = covariance(dataX, dataY);
  const stdX = std(dataX);
  const stdY = std(dataY);

  if (stdX === 0 || stdY === 0) {
    return 0;
  }

  return cov / (stdX * stdY);
}

/**
 * 计算简单线性回归
 * @param dataX 自变量序列
 * @param dataY 因变量序列
 * @returns { slope: number, intercept: number, rSquared: number }
 */
export function linearRegression(
  dataX: Series,
  dataY: Series
): {
  slope: number;
  intercept: number;
  rSquared: number;
} {
  if (dataX.length !== dataY.length) {
    throw new Error('Data arrays must have the same length');
  }

  if (dataX.length < 2) {
    throw new Error('At least 2 data points are required for linear regression');
  }

  const n = dataX.length;
  const meanX = mean(dataX);
  const meanY = mean(dataY);

  let numerator = 0;
  let denominator = 0;
  let totalSumOfSquares = 0;

  for (let i = 0; i < n; i++) {
    numerator += (dataX[i] - meanX) * (dataY[i] - meanY);
    denominator += Math.pow(dataX[i] - meanX, 2);
    totalSumOfSquares += Math.pow(dataY[i] - meanY, 2);
  }

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  // 计算R平方
  let explainedSumOfSquares = 0;
  for (let i = 0; i < n; i++) {
    const predictedY = slope * dataX[i] + intercept;
    explainedSumOfSquares += Math.pow(predictedY - meanY, 2);
  }

  const rSquared = totalSumOfSquares === 0 ? 1 : explainedSumOfSquares / totalSumOfSquares;

  return { slope, intercept, rSquared };
}

/**
 * 计算描述性统计汇总
 * @param data 数值序列
 * @returns 描述性统计对象
 */
export function descriptiveStats(data: Series): {
  count: number;
  mean: number;
  median: number;
  mode: number[];
  std: number;
  variance: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
} {
  if (data.length === 0) {
    throw new Error('Data array cannot be empty');
  }

  const sorted = [...data].sort((a, b) => a - b);
  const stats = {
    count: data.length,
    mean: mean(data),
    median: median(data),
    mode: mode(data),
    std: std(data),
    variance: variance(data),
    min: sorted[0],
    max: sorted[sorted.length - 1],
    range: sorted[sorted.length - 1] - sorted[0],
  };

  const { q1, q3, iqr } = quartiles(data);
  const skew = skewness(data);
  const kurt = kurtosis(data);

  return {
    ...stats,
    q1,
    q3,
    iqr,
    skewness: skew,
    kurtosis: kurt,
  };
}
