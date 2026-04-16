import { describe, it, expect } from 'vitest';
import {
  dcf,
  pe,
  pb,
  ps,
  dividendYield,
  roe,
  roa,
  grossMargin,
  netMargin,
  debtToAssetRatio,
  currentRatio,
  quickRatio,
  interestCoverageRatio,
  eps,
  bvps,
  calculateFinancialRatios,
} from '../../src/financial-metrics';

describe('DCF', () => {
  it('should calculate DCF correctly', () => {
    const freeCashFlows = [100, 110, 120, 130, 140];
    const result = dcf(freeCashFlows, 0.1, 0.02);
    expect(result.totalValue).toBeGreaterThan(0);
    expect(result.presentValue).toBeGreaterThan(0);
    expect(result.terminalValue).toBeGreaterThan(0);
    expect(result.totalValue).toBeCloseTo(result.presentValue + result.terminalValue);
  });

  it('should throw error for invalid inputs', () => {
    expect(() => dcf([], 0.1, 0.02)).toThrow('Free cash flows array cannot be empty');
    expect(() => dcf([100], -0.1, 0.02)).toThrow('Discount rate must be positive');
    expect(() => dcf([100], 0.1, 0.2)).toThrow('Perpetual growth rate must be less than discount rate');
  });
});

describe('PE Ratio', () => {
  it('should calculate PE correctly', () => {
    expect(pe(100, 5)).toBe(20); // 100 / 5 = 20
    expect(pe(50, 2)).toBe(25); // 50 / 2 = 25
  });

  it('should throw error for non-positive earnings', () => {
    expect(() => pe(100, 0)).toThrow('Earnings must be positive');
    expect(() => pe(100, -5)).toThrow('Earnings must be positive');
  });
});

describe('PB Ratio', () => {
  it('should calculate PB correctly', () => {
    expect(pb(100, 25)).toBe(4); // 100 / 25 = 4
    expect(pb(50, 10)).toBe(5); // 50 / 10 = 5
  });

  it('should throw error for non-positive book value', () => {
    expect(() => pb(100, 0)).toThrow('Book value must be positive');
  });
});

describe('PS Ratio', () => {
  it('should calculate PS correctly', () => {
    expect(ps(100, 50)).toBe(2); // 100 / 50 = 2
    expect(ps(75, 25)).toBe(3); // 75 / 25 = 3
  });

  it('should throw error for non-positive sales', () => {
    expect(() => ps(100, 0)).toThrow('Sales must be positive');
  });
});

describe('Dividend Yield', () => {
  it('should calculate dividend yield correctly', () => {
    expect(dividendYield(5, 100)).toBe(5); // (5/100)*100 = 5%
    expect(dividendYield(2, 50)).toBe(4); // (2/50)*100 = 4%
  });

  it('should throw error for non-positive price', () => {
    expect(() => dividendYield(5, 0)).toThrow('Price must be positive');
  });
});

describe('ROE', () => {
  it('should calculate ROE correctly', () => {
    expect(roe(10, 100)).toBe(10); // (10/100)*100 = 10%
    expect(roe(25, 50)).toBe(50); // (25/50)*100 = 50%
  });

  it('should throw error for non-positive equity', () => {
    expect(() => roe(10, 0)).toThrow('Shareholders equity must be positive');
  });
});

describe('ROA', () => {
  it('should calculate ROA correctly', () => {
    expect(roa(10, 200)).toBe(5); // (10/200)*100 = 5%
    expect(roa(15, 300)).toBe(5); // (15/300)*100 = 5%
  });

  it('should throw error for non-positive assets', () => {
    expect(() => roa(10, 0)).toThrow('Total assets must be positive');
  });
});

describe('Gross Margin', () => {
  it('should calculate gross margin correctly', () => {
    expect(grossMargin(100, 60)).toBe(40); // ((100-60)/100)*100 = 40%
    expect(grossMargin(200, 120)).toBe(40); // ((200-120)/200)*100 = 40%
  });

  it('should throw error for non-positive revenue', () => {
    expect(() => grossMargin(0, 60)).toThrow('Revenue must be positive');
  });
});

describe('Net Margin', () => {
  it('should calculate net margin correctly', () => {
    expect(netMargin(20, 100)).toBe(20); // (20/100)*100 = 20%
    expect(netMargin(30, 150)).toBe(20); // (30/150)*100 = 20%
  });

  it('should throw error for non-positive revenue', () => {
    expect(() => netMargin(20, 0)).toThrow('Revenue must be positive');
  });
});

describe('Debt to Asset Ratio', () => {
  it('should calculate ratio correctly', () => {
    expect(debtToAssetRatio(60, 100)).toBe(60); // (60/100)*100 = 60%
    expect(debtToAssetRatio(75, 150)).toBe(50); // (75/150)*100 = 50%
  });

  it('should throw error for non-positive assets', () => {
    expect(() => debtToAssetRatio(60, 0)).toThrow('Total assets must be positive');
  });
});

describe('Current Ratio', () => {
  it('should calculate current ratio correctly', () => {
    expect(currentRatio(200, 100)).toBe(2); // 200/100 = 2
    expect(currentRatio(150, 50)).toBe(3); // 150/50 = 3
  });

  it('should throw error for non-positive liabilities', () => {
    expect(() => currentRatio(200, 0)).toThrow('Current liabilities must be positive');
  });
});

describe('Quick Ratio', () => {
  it('should calculate quick ratio correctly', () => {
    expect(quickRatio(200, 50, 100)).toBe(1.5); // (200-50)/100 = 1.5
    expect(quickRatio(300, 100, 100)).toBe(2); // (300-100)/100 = 2
  });

  it('should throw error for non-positive liabilities', () => {
    expect(() => quickRatio(200, 50, 0)).toThrow('Current liabilities must be positive');
  });
});

describe('Interest Coverage Ratio', () => {
  it('should calculate ratio correctly', () => {
    expect(interestCoverageRatio(100, 20)).toBe(5); // 100/20 = 5
    expect(interestCoverageRatio(150, 30)).toBe(5); // 150/30 = 5
  });

  it('should throw error for non-positive interest', () => {
    expect(() => interestCoverageRatio(100, 0)).toThrow('Interest expense must be positive');
  });
});

describe('EPS', () => {
  it('should calculate EPS correctly', () => {
    expect(eps(100, 50)).toBe(2); // 100/50 = 2
    expect(eps(150, 30)).toBe(5); // 150/30 = 5
  });

  it('should throw error for non-positive shares', () => {
    expect(() => eps(100, 0)).toThrow('Weighted average shares must be positive');
  });
});

describe('BVPS', () => {
  it('should calculate BVPS correctly', () => {
    expect(bvps(100, 25)).toBe(4); // 100/25 = 4
    expect(bvps(150, 30)).toBe(5); // 150/30 = 5
  });

  it('should throw error for non-positive shares', () => {
    expect(() => bvps(100, 0)).toThrow('Total shares must be positive');
  });
});

describe('calculateFinancialRatios', () => {
  it('should calculate multiple ratios', () => {
    const financials = {
      price: 100,
      earnings: 5,
      bookValue: 25,
      sales: 50,
      dividend: 3,
      netIncome: 10,
      shareholdersEquity: 100,
      totalAssets: 200,
      revenue: 150,
      costOfGoodsSold: 90,
      totalLiabilities: 80,
      currentAssets: 120,
      currentLiabilities: 60,
      inventory: 30,
      ebit: 25,
      interestExpense: 5,
      weightedAverageShares: 50,
      totalShares: 25,
    };

    const ratios = calculateFinancialRatios(financials);
    expect(ratios.pe).toBe(20); // 100/5
    expect(ratios.pb).toBe(4); // 100/25
    expect(ratios.ps).toBe(2); // 100/50
    expect(ratios.dividendYield).toBe(3); // (3/100)*100
    expect(ratios.roe).toBe(10); // (10/100)*100
    expect(ratios.roa).toBe(5); // (10/200)*100
    expect(ratios.grossMargin).toBeCloseTo(40); // ((150-90)/150)*100
    expect(ratios.netMargin).toBeCloseTo(6.6667, 3); // (10/150)*100
    expect(ratios.debtToAssetRatio).toBe(40); // (80/200)*100
    expect(ratios.currentRatio).toBe(2); // 120/60
    expect(ratios.quickRatio).toBe(1.5); // (120-30)/60
    expect(ratios.interestCoverageRatio).toBe(5); // 25/5
    expect(ratios.eps).toBe(0.2); // 10/50
    expect(ratios.bvps).toBe(4); // 100/25
  });

  it('should handle missing data', () => {
    const financials = {
      price: 100,
      earnings: 5,
      // missing other fields
    };
    const ratios = calculateFinancialRatios(financials);
    expect(ratios.pe).toBe(20);
    expect(ratios.pb).toBeNaN(); // missing bookValue
    expect(ratios.ps).toBeNaN(); // missing sales
  });
});
