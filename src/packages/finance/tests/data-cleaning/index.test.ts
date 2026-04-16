import { describe, it, expect } from 'vitest';
import {
  handleMissingValues,
  detectOutliersIQR,
  detectOutliersZScore,
  handleOutliers,
  standardize,
  normalize,
  formatDateToTimestamp,
  convertOHLCFormat,
  convertTableTypes,
  cleanDataPipeline,
} from '../../src/data-cleaning';

describe('handleMissingValues', () => {
  it('should ignore missing values when strategy is ignore', () => {
    const data = [1, NaN, 3, null as any, undefined as any, 5];
    const result = handleMissingValues(data, { missingValueStrategy: 'ignore' });
    expect(result).toEqual([1, NaN, 3, null, undefined, 5]);
  });

  it('should fill missing values with specified value', () => {
    const data = [1, NaN, 3, null as any, undefined as any, 5];
    const result = handleMissingValues(data, {
      missingValueStrategy: 'fill',
      fillValue: 0,
    });
    expect(result).toEqual([1, 0, 3, 0, 0, 5]);
  });

  it('should remove missing values', () => {
    const data = [1, NaN, 3, null as any, undefined as any, 5];
    const result = handleMissingValues(data, { missingValueStrategy: 'remove' });
    expect(result).toEqual([1, 3, 5]);
  });
});

describe('detectOutliersIQR', () => {
  it('should detect outliers correctly', () => {
    const data = [1, 2, 3, 4, 5, 100]; // 100 is outlier
    const outliers = detectOutliersIQR(data);
    expect(outliers).toEqual([5]); // index of 100
  });

  it('should return empty array for small datasets', () => {
    const data = [1, 2, 3];
    const outliers = detectOutliersIQR(data);
    expect(outliers).toEqual([]);
  });
});

describe('detectOutliersZScore', () => {
  it('should detect outliers using Z-score', () => {
    const data = [1, 2, 3, 4, 5, 20]; // 20 is outlier
    const outliers = detectOutliersZScore(data, 2);
    expect(outliers).toEqual([5]); // index of 20
  });
});

describe('handleOutliers', () => {
  const data = [1, 2, 3, 4, 5, 100];

  it('should ignore outliers when strategy is ignore', () => {
    const result = handleOutliers(data, { outlierStrategy: 'ignore' });
    expect(result).toEqual(data);
  });

  it('should remove outliers', () => {
    const result = handleOutliers(data, { outlierStrategy: 'remove' });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should clip outliers', () => {
    const result = handleOutliers(data, { outlierStrategy: 'clip' });
    // 100 should be clipped to upper bound
    expect(result[5]).toBeLessThan(100);
    expect(result[5]).toBeGreaterThan(5);
  });
});

describe('standardize', () => {
  it('should standardize data to mean 0 and std 1', () => {
    const data = [1, 2, 3, 4, 5];
    const result = standardize(data);
    const mean = result.reduce((a, b) => a + b, 0) / result.length;
    const std = Math.sqrt(result.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / result.length);
    expect(mean).toBeCloseTo(0, 10);
    expect(std).toBeCloseTo(1, 10);
  });

  it('should handle constant data', () => {
    const data = [5, 5, 5, 5];
    const result = standardize(data);
    expect(result).toEqual([0, 0, 0, 0]);
  });
});

describe('normalize', () => {
  it('should normalize data to range [0, 1]', () => {
    const data = [1, 2, 3, 4, 5];
    const result = normalize(data);
    expect(Math.min(...result)).toBe(0);
    expect(Math.max(...result)).toBe(1);
  });

  it('should handle constant data', () => {
    const data = [5, 5, 5, 5];
    const result = normalize(data);
    expect(result).toEqual([0.5, 0.5, 0.5, 0.5]);
  });
});

describe('formatDateToTimestamp', () => {
  it('should convert date string to timestamp', () => {
    const dateStr = '2023-01-01';
    const timestamp = formatDateToTimestamp(dateStr);
    expect(typeof timestamp).toBe('number');
    expect(new Date(timestamp).toISOString().split('T')[0]).toBe('2023-01-01');
  });
});

describe('convertOHLCFormat', () => {
  const ohlcData = [
    { timestamp: '2023-01-01', open: 100, high: 105, low: 95, close: 102 },
    { timestamp: '2023-01-02', open: 102, high: 108, low: 100, close: 106 },
  ];

  it('should convert to timestamp format', () => {
    const result = convertOHLCFormat(ohlcData, 'timestamp');
    expect(typeof result[0].timestamp).toBe('number');
  });

  it('should convert to date format', () => {
    const result = convertOHLCFormat(ohlcData, 'date');
    expect(typeof result[0].timestamp).toBe('string');
    expect(result[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('convertTableTypes', () => {
  it('should convert column types correctly', () => {
    const data = [
      { id: '1', price: '100.5', date: '2023-01-01' },
      { id: '2', price: '200.75', date: '2023-01-02' },
    ];
    const columnTypes = {
      id: 'string',
      price: 'number',
      date: 'date',
    };
    const result = convertTableTypes(data, columnTypes);
    expect(typeof result[0].id).toBe('string');
    expect(typeof result[0].price).toBe('number');
    expect(result[0].price).toBe(100.5);
    expect(result[0].date).toBeInstanceOf(Date);
  });
});

describe('cleanDataPipeline', () => {
  it('should apply cleaning steps in sequence', () => {
    const data = [1, NaN, 2, 100, 3]; // NaN and outlier 100
    const result = cleanDataPipeline(data, {
      missingValueStrategy: 'fill',
      fillValue: 0,
      outlierStrategy: 'remove',
      outlierMethod: 'iqr',
      outlierThreshold: 1.0, // 更敏感的阈值
    });
    // NaN replaced with 0, 100 removed
    expect(result).toEqual([1, 0, 2, 3]);
  });
});
