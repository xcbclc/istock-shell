import { describe, it, expect } from 'vitest';
import {
  mean,
  median,
  mode,
  variance,
  std,
  coefficientOfVariation,
  percentile,
  quartiles,
  skewness,
  kurtosis,
  covariance,
  correlation,
  linearRegression,
  descriptiveStats,
} from '../../src/statistics';

describe('mean', () => {
  it('should calculate mean correctly', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([10, 20, 30])).toBe(20);
  });

  it('should throw error for empty array', () => {
    expect(() => mean([])).toThrow('Data array cannot be empty');
  });
});

describe('median', () => {
  it('should calculate median for odd number of elements', () => {
    expect(median([1, 3, 2])).toBe(2);
    expect(median([5, 1, 4, 2, 3])).toBe(3);
  });

  it('should calculate median for even number of elements', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([10, 20, 30, 40])).toBe(25);
  });
});

describe('mode', () => {
  it('should find single mode', () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
    expect(mode([5, 5, 5, 1, 2])).toEqual([5]);
  });

  it('should find multiple modes', () => {
    expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
    expect(mode([1, 2, 3])).toEqual([1, 2, 3]); // all appear once
  });
});

describe('variance', () => {
  it('should calculate sample variance', () => {
    expect(variance([1, 2, 3, 4, 5])).toBe(2.5);
    expect(variance([10, 20, 30])).toBe(100);
  });

  it('should calculate population variance', () => {
    expect(variance([1, 2, 3, 4, 5], false)).toBe(2);
    expect(variance([10, 20, 30], false)).toBeCloseTo(66.6667, 4);
  });

  it('should handle single element array for sample variance', () => {
    expect(variance([5])).toBe(0);
  });
});

describe('std', () => {
  it('should calculate standard deviation', () => {
    expect(std([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2.5));
    expect(std([10, 20, 30])).toBe(10);
  });
});

describe('coefficientOfVariation', () => {
  it('should calculate CV correctly', () => {
    expect(coefficientOfVariation([10, 20, 30])).toBeCloseTo(50); // (10/20)*100 = 50%
    expect(coefficientOfVariation([5, 5, 5, 5])).toBe(0); // std = 0
  });

  it('should throw error for zero mean', () => {
    expect(() => coefficientOfVariation([-1, 0, 1])).toThrow('Mean cannot be zero');
  });
});

describe('percentile', () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should calculate percentiles correctly', () => {
    expect(percentile(data, 0)).toBe(1);
    expect(percentile(data, 25)).toBe(3.25);
    expect(percentile(data, 50)).toBe(5.5);
    expect(percentile(data, 75)).toBe(7.75);
    expect(percentile(data, 100)).toBe(10);
  });

  it('should handle exact index', () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });
});

describe('quartiles', () => {
  it('should calculate quartiles correctly', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { q1, q2, q3, iqr } = quartiles(data);
    expect(q1).toBe(3.25);
    expect(q2).toBe(5.5);
    expect(q3).toBe(7.75);
    expect(iqr).toBe(4.5);
  });
});

describe('skewness', () => {
  it('should calculate skewness for symmetric data', () => {
    expect(skewness([1, 2, 3, 4, 5])).toBeCloseTo(0);
    expect(skewness([-2, -1, 0, 1, 2])).toBeCloseTo(0);
  });

  it('should calculate positive skewness', () => {
    // Right-skewed data
    const data = [1, 2, 3, 4, 10];
    expect(skewness(data)).toBeGreaterThan(0);
  });

  it('should calculate negative skewness', () => {
    // Left-skewed data
    const data = [1, 8, 9, 10, 10];
    expect(skewness(data)).toBeLessThan(0);
  });
});

describe('kurtosis', () => {
  it('should calculate kurtosis for normal-like data', () => {
    // Excess kurtosis should be around 0 for normal distribution
    const data = Array.from({ length: 1000 }, () => Math.random());
    const kurt = kurtosis(data);
    expect(Math.abs(kurt)).toBeLessThan(1); // Rough check
  });

  it('should handle constant data', () => {
    expect(kurtosis([5, 5, 5, 5])).toBe(-3);
  });
});

describe('covariance', () => {
  it('should calculate covariance correctly', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    expect(covariance(x, y)).toBe(5); // Perfect positive correlation
    expect(covariance(x, y, false)).toBe(4); // Population covariance
  });

  it('should handle negative covariance', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [5, 4, 3, 2, 1];
    expect(covariance(x, y)).toBe(-2.5);
  });
});

describe('correlation', () => {
  it('should calculate perfect positive correlation', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    expect(correlation(x, y)).toBe(1);
  });

  it('should calculate perfect negative correlation', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [5, 4, 3, 2, 1];
    expect(correlation(x, y)).toBe(-1);
  });

  it('should calculate zero correlation', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [1, 1, 1, 1, 1]; // constant
    expect(correlation(x, y)).toBe(0);
  });
});

describe('linearRegression', () => {
  it('should calculate regression line correctly', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    const { slope, intercept, rSquared } = linearRegression(x, y);
    expect(slope).toBeCloseTo(2);
    expect(intercept).toBeCloseTo(0);
    expect(rSquared).toBe(1);
  });

  it('should handle non-perfect correlation', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [1, 3, 2, 5, 4];
    const { slope, intercept, rSquared } = linearRegression(x, y);
    expect(slope).toBeCloseTo(0.8);
    expect(intercept).toBeCloseTo(0.4);
    expect(rSquared).toBeGreaterThan(0);
    expect(rSquared).toBeLessThan(1);
  });
});

describe('descriptiveStats', () => {
  it('should compute all descriptive statistics', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const stats = descriptiveStats(data);
    expect(stats.count).toBe(10);
    expect(stats.mean).toBe(5.5);
    expect(stats.median).toBe(5.5);
    expect(stats.mode).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(stats.std).toBeCloseTo(3.02765);
    expect(stats.variance).toBeCloseTo(9.16667);
    expect(stats.min).toBe(1);
    expect(stats.max).toBe(10);
    expect(stats.range).toBe(9);
    expect(stats.q1).toBe(3.25);
    expect(stats.q3).toBe(7.75);
    expect(stats.iqr).toBe(4.5);
    expect(stats.skewness).toBeCloseTo(0);
    expect(stats.kurtosis).toBeCloseTo(-1.2, 1);
  });
});
