import { describe, it, expect } from 'vitest';
import { sma, ema, ma, wma, macd, rsi, kdj, bollingerBands, roc, atr } from '../../src/technical-indicators';

describe('SMA', () => {
  it('should calculate simple moving average correctly', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = sma(data, 3);
    expect(result.slice(0, 2)).toEqual([NaN, NaN]); // first 2 are NaN
    expect(result[2]).toBeCloseTo((1 + 2 + 3) / 3); // (1+2+3)/3 = 2
    expect(result[3]).toBeCloseTo((2 + 3 + 4) / 3); // (2+3+4)/3 = 3
    expect(result[9]).toBeCloseTo((8 + 9 + 10) / 3); // (8+9+10)/3 = 9
  });

  it('should throw error for invalid period', () => {
    expect(() => sma([1, 2], 5)).toThrow('Invalid period');
  });
});

describe('EMA', () => {
  it('should calculate exponential moving average correctly', () => {
    const data = [1, 2, 3, 4, 5];
    const result = ema(data, 3);
    expect(result[0]).toBeNaN();
    expect(result[1]).toBeNaN();
    expect(result[2]).toBeCloseTo((1 + 2 + 3) / 3); // SMA of first 3
    // EMA formula: EMA = (price - prevEMA) * multiplier + prevEMA
    const multiplier = 2 / (3 + 1);
    const expectedEMA4 = (4 - result[2]) * multiplier + result[2];
    expect(result[3]).toBeCloseTo(expectedEMA4);
  });
});

describe('MA (generic)', () => {
  it('should support different MA types', () => {
    const data = [1, 2, 3, 4, 5];
    const smaResult = ma(data, 3, 'sma');
    const emaResult = ma(data, 3, 'ema');
    const wmaResult = ma(data, 3, 'wma');
    expect(smaResult).toEqual(sma(data, 3));
    expect(emaResult).toEqual(ema(data, 3));
    expect(wmaResult).toEqual(wma(data, 3));
  });
});

describe('MACD', () => {
  it('should calculate MACD correctly', () => {
    const data = Array.from({ length: 50 }, (_, i) => 100 + Math.sin(i * 0.1) * 10);
    const { macd: macdLine, signal, histogram } = macd(data, 12, 26, 9);
    expect(macdLine.length).toBe(data.length);
    expect(signal.length).toBe(data.length);
    expect(histogram.length).toBe(data.length);
    // Check that histogram = MACD - signal
    for (let i = 0; i < macdLine.length; i++) {
      if (!isNaN(macdLine[i]) && !isNaN(signal[i])) {
        expect(histogram[i]).toBeCloseTo(macdLine[i] - signal[i]);
      }
    }
  });
});

describe('RSI', () => {
  it('should calculate RSI correctly for simple data', () => {
    // 14-period RSI test with known values
    const data = [
      44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28, 46.0,
      46.03, 46.41, 46.22, 45.64, 46.21, 46.25, 45.71, 46.45, 45.78, 45.35, 44.03, 44.18, 44.22, 44.57, 43.42, 42.66,
      43.13,
    ];
    const result = rsi(data, 14);
    // RSI values should be between 0 and 100
    result.forEach((value) => {
      if (!isNaN(value)) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    });
  });

  it('should handle all gains or all losses', () => {
    const allGains = [100, 101, 102, 103, 104, 105]; // constantly rising
    const result1 = rsi(allGains, 3);
    expect(result1[result1.length - 1]).toBe(100); // RSI should be 100

    const allLosses = [100, 99, 98, 97, 96, 95]; // constantly falling
    const result2 = rsi(allLosses, 3);
    expect(result2[result2.length - 1]).toBe(0); // RSI should be 0
  });
});

describe('KDJ', () => {
  const ohlcData = Array.from({ length: 20 }, (_, i) => ({
    timestamp: i,
    open: 100 + Math.random() * 10,
    high: 105 + Math.random() * 10,
    low: 95 + Math.random() * 10,
    close: 100 + Math.random() * 10,
  }));

  it('should calculate KDJ values', () => {
    const { k, d, j } = kdj(ohlcData, 9, 3, 3);
    expect(k.length).toBe(ohlcData.length);
    expect(d.length).toBe(ohlcData.length);
    expect(j.length).toBe(ohlcData.length);
    // J = 3*K - 2*D
    for (let i = 0; i < k.length; i++) {
      if (!isNaN(k[i]) && !isNaN(d[i]) && !isNaN(j[i])) {
        expect(j[i]).toBeCloseTo(3 * k[i] - 2 * d[i]);
      }
    }
  });
});

describe('Bollinger Bands', () => {
  it('should calculate bands correctly', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { upper, middle, lower } = bollingerBands(data, 3, 2);
    expect(upper.length).toBe(data.length);
    expect(middle.length).toBe(data.length);
    expect(lower.length).toBe(data.length);
    // Upper > Middle > Lower
    for (let i = 2; i < data.length; i++) {
      expect(upper[i]).toBeGreaterThan(middle[i]);
      expect(middle[i]).toBeGreaterThan(lower[i]);
    }
  });
});

describe('ROC', () => {
  it('should calculate rate of change correctly', () => {
    const data = [100, 105, 110, 115, 120];
    const result = roc(data, 1); // 1-period ROC
    expect(result[0]).toBeNaN();
    expect(result[1]).toBeCloseTo(((105 - 100) / 100) * 100); // 5%
    expect(result[4]).toBeCloseTo(((120 - 115) / 115) * 100); // ~4.35%
  });
});

describe('ATR', () => {
  const ohlcData = [
    { timestamp: 1, open: 100, high: 105, low: 95, close: 102 },
    { timestamp: 2, open: 102, high: 108, low: 100, close: 106 },
    { timestamp: 3, open: 106, high: 110, low: 104, close: 108 },
    { timestamp: 4, open: 108, high: 112, low: 106, close: 110 },
    { timestamp: 5, open: 110, high: 115, low: 108, close: 113 },
  ];

  it('should calculate ATR', () => {
    const result = atr(ohlcData, 2);
    expect(result.length).toBe(ohlcData.length);
    // First period-1 values should be NaN
    expect(result[0]).toBeNaN();
    // Remaining values should be numbers
    for (let i = 1; i < result.length; i++) {
      expect(typeof result[i]).toBe('number');
    }
  });
});
