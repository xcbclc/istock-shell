/**
 * 技术指标计算模块
 * 提供MA、EMA、MACD、RSI、KDJ、布林带等常用技术指标计算
 */

import { Series, OHLC, TechnicalIndicatorParams } from '../types';

/**
 * 简单移动平均线（SMA）
 * @param data 价格序列
 * @param period 周期
 * @returns SMA序列（长度与输入相同，前面period-1个为NaN）
 */
export function sma(data: Series, period: number): Series {
  if (period <= 0 || period > data.length) {
    throw new Error(`Invalid period: ${period}`);
  }

  const result: Series = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  return result;
}

/**
 * 指数移动平均线（EMA）
 * @param data 价格序列
 * @param period 周期
 * @returns EMA序列
 */
export function ema(data: Series, period: number): Series {
  if (period <= 0 || period > data.length) {
    throw new Error(`Invalid period: ${period}`);
  }

  const result: Series = [];
  const multiplier = 2 / (period + 1);

  // 第一个EMA使用SMA
  let emaValue = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else if (i === period - 1) {
      result.push(emaValue);
    } else {
      emaValue = (data[i] - emaValue) * multiplier + emaValue;
      result.push(emaValue);
    }
  }
  return result;
}

/**
 * 移动平均线（支持SMA、EMA、WMA）
 * @param data 价格序列
 * @param period 周期
 * @param type 平均类型：'sma' | 'ema' | 'wma'
 * @returns MA序列
 */
export function ma(data: Series, period: number, type: 'sma' | 'ema' | 'wma' = 'sma'): Series {
  switch (type) {
    case 'sma':
      return sma(data, period);
    case 'ema':
      return ema(data, period);
    case 'wma':
      return wma(data, period);
    default:
      throw new Error(`Unsupported MA type: ${type}`);
  }
}

/**
 * 加权移动平均线（WMA）
 * @param data 价格序列
 * @param period 周期
 * @returns WMA序列
 */
export function wma(data: Series, period: number): Series {
  if (period <= 0 || period > data.length) {
    throw new Error(`Invalid period: ${period}`);
  }

  const result: Series = [];
  const weights = Array.from({ length: period }, (_, i) => i + 1);
  const weightSum = weights.reduce((a, b) => a + b, 0);

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      let weightedSum = 0;
      for (let j = 0; j < period; j++) {
        weightedSum += data[i - j] * weights[j];
      }
      result.push(weightedSum / weightSum);
    }
  }
  return result;
}

/**
 * 移动平均收敛发散指标（MACD）
 * @param data 价格序列
 * @param fastPeriod 快线周期（默认12）
 * @param slowPeriod 慢线周期（默认26）
 * @param signalPeriod 信号线周期（默认9）
 * @returns { macd: Series, signal: Series, histogram: Series }
 */
export function macd(
  data: Series,
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9
): { macd: Series; signal: Series; histogram: Series } {
  const fastEMA = ema(data, fastPeriod);
  const slowEMA = ema(data, slowPeriod);

  const macdLine: Series = [];
  for (let i = 0; i < data.length; i++) {
    if (isNaN(fastEMA[i]) || isNaN(slowEMA[i])) {
      macdLine.push(NaN);
    } else {
      macdLine.push(fastEMA[i] - slowEMA[i]);
    }
  }

  const signalLine = ema(
    macdLine.filter((v) => !isNaN(v)),
    signalPeriod
  );
  // 对齐长度，前面补NaN
  const alignedSignalLine: Series = [];
  let signalIndex = 0;
  for (let i = 0; i < macdLine.length; i++) {
    if (isNaN(macdLine[i])) {
      alignedSignalLine.push(NaN);
    } else {
      alignedSignalLine.push(signalLine[signalIndex] || NaN);
      signalIndex++;
    }
  }

  const histogram: Series = [];
  for (let i = 0; i < macdLine.length; i++) {
    if (isNaN(macdLine[i]) || isNaN(alignedSignalLine[i])) {
      histogram.push(NaN);
    } else {
      histogram.push(macdLine[i] - alignedSignalLine[i]);
    }
  }

  return {
    macd: macdLine,
    signal: alignedSignalLine,
    histogram,
  };
}

/**
 * 相对强弱指数（RSI）
 * @param data 价格序列
 * @param period 周期（默认14）
 * @returns RSI序列
 */
export function rsi(data: Series, period = 14): Series {
  if (data.length < period + 1) {
    throw new Error(`Data length must be at least ${period + 1}`);
  }

  const result: Series = Array(period).fill(NaN);
  const gains: number[] = [];
  const losses: number[] = [];

  // 计算初始平均增益和平均损失
  for (let i = 1; i <= period; i++) {
    const change = data[i] - data[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
  }

  let avgGain = gains.reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.reduce((a, b) => a + b, 0) / period;

  // 第一个RSI值
  if (avgLoss === 0) {
    result.push(100);
  } else {
    const rs = avgGain / avgLoss;
    result.push(100 - 100 / (1 + rs));
  }

  // 计算后续RSI值
  for (let i = period + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? -change : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    if (avgLoss === 0) {
      result.push(100);
    } else {
      const rs = avgGain / avgLoss;
      result.push(100 - 100 / (1 + rs));
    }
  }

  return result;
}

/**
 * 随机指标（KDJ）
 * @param data OHLC数据
 * @param period K周期（默认9）
 * @param smoothK D周期（默认3）
 * @param smoothD J周期（默认3）
 * @returns { k: Series, d: Series, j: Series }
 */
export function kdj(data: OHLC[], period = 9, smoothK = 3, smoothD = 3): { k: Series; d: Series; j: Series } {
  if (data.length < period) {
    throw new Error(`Data length must be at least ${period}`);
  }

  const kValues: Series = [];
  const dValues: Series = [];
  const jValues: Series = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      kValues.push(NaN);
      dValues.push(NaN);
      jValues.push(NaN);
      continue;
    }

    const slice = data.slice(i - period + 1, i + 1);
    const highestHigh = Math.max(...slice.map((d) => d.high));
    const lowestLow = Math.min(...slice.map((d) => d.low));
    const currentClose = data[i].close;

    let rsv = 0;
    if (highestHigh !== lowestLow) {
      rsv = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
    }

    // K值 = 前一日K值 * 2/3 + 当日RSV * 1/3
    // D值 = 前一日D值 * 2/3 + 当日K值 * 1/3
    // J值 = 3 * K值 - 2 * D值
    if (i === period - 1) {
      kValues.push(rsv);
      dValues.push(rsv);
    } else {
      const prevK = kValues[kValues.length - 1];
      const prevD = dValues[dValues.length - 1];
      const k = (prevK * 2) / 3 + rsv / 3;
      const d = (prevD * 2) / 3 + k / 3;
      const j = 3 * k - 2 * d;

      kValues.push(k);
      dValues.push(d);
      jValues.push(j);
    }
  }

  // 平滑处理
  const smoothKValues = sma(
    kValues.filter((v) => !isNaN(v)),
    smoothK
  );
  const smoothDValues = sma(
    dValues.filter((v) => !isNaN(v)),
    smoothD
  );

  // 对齐长度
  const alignedK: Series = [];
  const alignedD: Series = [];
  const alignedJ: Series = [];

  let smoothKIndex = 0;
  let smoothDIndex = 0;
  for (let i = 0; i < kValues.length; i++) {
    if (isNaN(kValues[i])) {
      alignedK.push(NaN);
      alignedD.push(NaN);
      alignedJ.push(NaN);
    } else {
      alignedK.push(smoothKValues[smoothKIndex] || NaN);
      alignedD.push(smoothDValues[smoothDIndex] || NaN);
      const k = smoothKValues[smoothKIndex] || 0;
      const d = smoothDValues[smoothDIndex] || 0;
      alignedJ.push(3 * k - 2 * d);
      smoothKIndex++;
      smoothDIndex++;
    }
  }

  return { k: alignedK, d: alignedD, j: alignedJ };
}

/**
 * 布林带（Bollinger Bands）
 * @param data 价格序列
 * @param period 周期（默认20）
 * @param stdDev 标准差倍数（默认2）
 * @returns { upper: Series, middle: Series, lower: Series }
 */
export function bollingerBands(
  data: Series,
  period = 20,
  stdDev = 2
): { upper: Series; middle: Series; lower: Series } {
  const middle = sma(data, period);
  const upper: Series = [];
  const lower: Series = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push(NaN);
      lower.push(NaN);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      const mean = middle[i];
      const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period;
      const standardDeviation = Math.sqrt(variance);

      upper.push(mean + stdDev * standardDeviation);
      lower.push(mean - stdDev * standardDeviation);
    }
  }

  return { upper, middle, lower };
}

/**
 * 计算价格变动率（ROC）
 * @param data 价格序列
 * @param period 周期
 * @returns ROC序列
 */
export function roc(data: Series, period: number): Series {
  const result: Series = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      result.push(NaN);
    } else {
      const rocValue = ((data[i] - data[i - period]) / data[i - period]) * 100;
      result.push(rocValue);
    }
  }
  return result;
}

/**
 * 计算平均真实范围（ATR）
 * @param data OHLC数据
 * @param period 周期（默认14）
 * @returns ATR序列
 */
export function atr(data: OHLC[], period = 14): Series {
  if (data.length < 2) {
    throw new Error('Data length must be at least 2');
  }

  const trueRanges: Series = [];
  for (let i = 1; i < data.length; i++) {
    const high = data[i].high;
    const low = data[i].low;
    const prevClose = data[i - 1].close;

    const tr1 = high - low;
    const tr2 = Math.abs(high - prevClose);
    const tr3 = Math.abs(low - prevClose);
    trueRanges.push(Math.max(tr1, tr2, tr3));
  }

  // 计算ATR（第一个ATR为前period个TR的平均值，后续使用EMA平滑）
  const atrValues: Series = Array(period - 1).fill(NaN);
  const initialAtr = trueRanges.slice(0, period).reduce((a, b) => a + b, 0) / period;
  atrValues.push(initialAtr);

  const multiplier = 1 / period;
  for (let i = period; i < trueRanges.length; i++) {
    const atr = (trueRanges[i] - atrValues[atrValues.length - 1]) * multiplier + atrValues[atrValues.length - 1];
    atrValues.push(atr);
  }

  // 对齐长度（前面补NaN）
  return Array(data.length - atrValues.length)
    .fill(NaN)
    .concat(atrValues);
}
