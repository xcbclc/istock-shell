/**
 * 财务指标计算模块
 * 提供DCF估值、PE、PB、PS、ROE、ROA等财务比率和估值指标计算
 */

import { FinancialMetricParams } from '../types';

/**
 * 现金流量折现（DCF）估值
 * @param freeCashFlows 预测自由现金流数组
 * @param discountRate 折现率（默认0.1，即10%）
 * @param perpetualGrowthRate 永续增长率（默认0.02，即2%）
 * @param terminalMultiplier 终值乘数（默认10）
 * @returns { presentValue: number, terminalValue: number, totalValue: number }
 */
export function dcf(
  freeCashFlows: number[],
  discountRate = 0.1,
  perpetualGrowthRate = 0.02,
  terminalMultiplier = 10
): { presentValue: number; terminalValue: number; totalValue: number } {
  if (freeCashFlows.length === 0) {
    throw new Error('Free cash flows array cannot be empty');
  }

  if (discountRate <= 0) {
    throw new Error('Discount rate must be positive');
  }

  if (perpetualGrowthRate >= discountRate) {
    throw new Error('Perpetual growth rate must be less than discount rate');
  }

  // 计算预测期现值
  let presentValue = 0;
  for (let i = 0; i < freeCashFlows.length; i++) {
    presentValue += freeCashFlows[i] / Math.pow(1 + discountRate, i + 1);
  }

  // 计算终值（永续增长模型）
  const lastFCF = freeCashFlows[freeCashFlows.length - 1];
  const terminalValue = (lastFCF * (1 + perpetualGrowthRate)) / (discountRate - perpetualGrowthRate);

  // 计算终值现值
  const terminalValuePresent = terminalValue / Math.pow(1 + discountRate, freeCashFlows.length);

  // 总价值
  const totalValue = presentValue + terminalValuePresent;

  return {
    presentValue,
    terminalValue: terminalValuePresent,
    totalValue,
  };
}

/**
 * 市盈率（PE）
 * @param price 股价
 * @param earnings 每股收益（EPS）
 * @returns PE比率
 */
export function pe(price: number, earnings: number): number {
  if (earnings <= 0) {
    throw new Error('Earnings must be positive for PE calculation');
  }
  return price / earnings;
}

/**
 * 市净率（PB）
 * @param price 股价
 * @param bookValue 每股净资产
 * @returns PB比率
 */
export function pb(price: number, bookValue: number): number {
  if (bookValue <= 0) {
    throw new Error('Book value must be positive for PB calculation');
  }
  return price / bookValue;
}

/**
 * 市销率（PS）
 * @param price 股价
 * @param sales 每股销售额
 * @returns PS比率
 */
export function ps(price: number, sales: number): number {
  if (sales <= 0) {
    throw new Error('Sales must be positive for PS calculation');
  }
  return price / sales;
}

/**
 * 股息率（Dividend Yield）
 * @param dividend 每股股息
 * @param price 股价
 * @returns 股息率（百分比）
 */
export function dividendYield(dividend: number, price: number): number {
  if (price <= 0) {
    throw new Error('Price must be positive for dividend yield calculation');
  }
  return (dividend / price) * 100;
}

/**
 * 净资产收益率（ROE）
 * @param netIncome 净利润
 * @param shareholdersEquity 股东权益
 * @returns ROE（百分比）
 */
export function roe(netIncome: number, shareholdersEquity: number): number {
  if (shareholdersEquity <= 0) {
    throw new Error('Shareholders equity must be positive for ROE calculation');
  }
  return (netIncome / shareholdersEquity) * 100;
}

/**
 * 总资产收益率（ROA）
 * @param netIncome 净利润
 * @param totalAssets 总资产
 * @returns ROA（百分比）
 */
export function roa(netIncome: number, totalAssets: number): number {
  if (totalAssets <= 0) {
    throw new Error('Total assets must be positive for ROA calculation');
  }
  return (netIncome / totalAssets) * 100;
}

/**
 * 毛利率（Gross Margin）
 * @param revenue 营业收入
 * @param costOfGoodsSold 营业成本
 * @returns 毛利率（百分比）
 */
export function grossMargin(revenue: number, costOfGoodsSold: number): number {
  if (revenue <= 0) {
    throw new Error('Revenue must be positive for gross margin calculation');
  }
  return ((revenue - costOfGoodsSold) / revenue) * 100;
}

/**
 * 净利率（Net Margin）
 * @param netIncome 净利润
 * @param revenue 营业收入
 * @returns 净利率（百分比）
 */
export function netMargin(netIncome: number, revenue: number): number {
  if (revenue <= 0) {
    throw new Error('Revenue must be positive for net margin calculation');
  }
  return (netIncome / revenue) * 100;
}

/**
 * 资产负债率（Debt to Asset Ratio）
 * @param totalLiabilities 总负债
 * @param totalAssets 总资产
 * @returns 资产负债率（百分比）
 */
export function debtToAssetRatio(totalLiabilities: number, totalAssets: number): number {
  if (totalAssets <= 0) {
    throw new Error('Total assets must be positive for debt to asset ratio calculation');
  }
  return (totalLiabilities / totalAssets) * 100;
}

/**
 * 流动比率（Current Ratio）
 * @param currentAssets 流动资产
 * @param currentLiabilities 流动负债
 * @returns 流动比率
 */
export function currentRatio(currentAssets: number, currentLiabilities: number): number {
  if (currentLiabilities <= 0) {
    throw new Error('Current liabilities must be positive for current ratio calculation');
  }
  return currentAssets / currentLiabilities;
}

/**
 * 速动比率（Quick Ratio）
 * @param currentAssets 流动资产
 * @param inventory 存货
 * @param currentLiabilities 流动负债
 * @returns 速动比率
 */
export function quickRatio(currentAssets: number, inventory: number, currentLiabilities: number): number {
  if (currentLiabilities <= 0) {
    throw new Error('Current liabilities must be positive for quick ratio calculation');
  }
  return (currentAssets - inventory) / currentLiabilities;
}

/**
 * 利息保障倍数（Interest Coverage Ratio）
 * @param ebit 息税前利润（EBIT）
 * @param interestExpense 利息费用
 * @returns 利息保障倍数
 */
export function interestCoverageRatio(ebit: number, interestExpense: number): number {
  if (interestExpense <= 0) {
    throw new Error('Interest expense must be positive for interest coverage ratio calculation');
  }
  return ebit / interestExpense;
}

/**
 * 每股收益（EPS）
 * @param netIncome 净利润
 * @param weightedAverageShares 加权平均股数
 * @returns 每股收益
 */
export function eps(netIncome: number, weightedAverageShares: number): number {
  if (weightedAverageShares <= 0) {
    throw new Error('Weighted average shares must be positive for EPS calculation');
  }
  return netIncome / weightedAverageShares;
}

/**
 * 每股净资产（BVPS）
 * @param shareholdersEquity 股东权益
 * @param totalShares 总股数
 * @returns 每股净资产
 */
export function bvps(shareholdersEquity: number, totalShares: number): number {
  if (totalShares <= 0) {
    throw new Error('Total shares must be positive for BVPS calculation');
  }
  return shareholdersEquity / totalShares;
}

/**
 * 计算多个财务比率（批量计算）
 * @param financials 财务数据对象
 * @returns 财务比率对象
 */
export function calculateFinancialRatios(financials: {
  price?: number;
  earnings?: number;
  bookValue?: number;
  sales?: number;
  dividend?: number;
  netIncome?: number;
  shareholdersEquity?: number;
  totalAssets?: number;
  revenue?: number;
  costOfGoodsSold?: number;
  totalLiabilities?: number;
  currentAssets?: number;
  currentLiabilities?: number;
  inventory?: number;
  ebit?: number;
  interestExpense?: number;
  weightedAverageShares?: number;
  totalShares?: number;
}): Record<string, number> {
  const ratios: Record<string, number> = {};

  try {
    if (financials.price !== undefined && financials.earnings !== undefined) {
      ratios.pe = pe(financials.price, financials.earnings);
    }
  } catch (e) {
    ratios.pe = NaN;
  }

  try {
    if (financials.price !== undefined && financials.bookValue !== undefined) {
      ratios.pb = pb(financials.price, financials.bookValue);
    }
  } catch (e) {
    ratios.pb = NaN;
  }

  try {
    if (financials.price !== undefined && financials.sales !== undefined) {
      ratios.ps = ps(financials.price, financials.sales);
    }
  } catch (e) {
    ratios.ps = NaN;
  }

  try {
    if (financials.dividend !== undefined && financials.price !== undefined) {
      ratios.dividendYield = dividendYield(financials.dividend, financials.price);
    }
  } catch (e) {
    ratios.dividendYield = NaN;
  }

  try {
    if (financials.netIncome !== undefined && financials.shareholdersEquity !== undefined) {
      ratios.roe = roe(financials.netIncome, financials.shareholdersEquity);
    }
  } catch (e) {
    ratios.roe = NaN;
  }

  try {
    if (financials.netIncome !== undefined && financials.totalAssets !== undefined) {
      ratios.roa = roa(financials.netIncome, financials.totalAssets);
    }
  } catch (e) {
    ratios.roa = NaN;
  }

  try {
    if (financials.revenue !== undefined && financials.costOfGoodsSold !== undefined) {
      ratios.grossMargin = grossMargin(financials.revenue, financials.costOfGoodsSold);
    }
  } catch (e) {
    ratios.grossMargin = NaN;
  }

  try {
    if (financials.netIncome !== undefined && financials.revenue !== undefined) {
      ratios.netMargin = netMargin(financials.netIncome, financials.revenue);
    }
  } catch (e) {
    ratios.netMargin = NaN;
  }

  try {
    if (financials.totalLiabilities !== undefined && financials.totalAssets !== undefined) {
      ratios.debtToAssetRatio = debtToAssetRatio(financials.totalLiabilities, financials.totalAssets);
    }
  } catch (e) {
    ratios.debtToAssetRatio = NaN;
  }

  try {
    if (financials.currentAssets !== undefined && financials.currentLiabilities !== undefined) {
      ratios.currentRatio = currentRatio(financials.currentAssets, financials.currentLiabilities);
    }
  } catch (e) {
    ratios.currentRatio = NaN;
  }

  try {
    if (
      financials.currentAssets !== undefined &&
      financials.inventory !== undefined &&
      financials.currentLiabilities !== undefined
    ) {
      ratios.quickRatio = quickRatio(financials.currentAssets, financials.inventory, financials.currentLiabilities);
    }
  } catch (e) {
    ratios.quickRatio = NaN;
  }

  try {
    if (financials.ebit !== undefined && financials.interestExpense !== undefined) {
      ratios.interestCoverageRatio = interestCoverageRatio(financials.ebit, financials.interestExpense);
    }
  } catch (e) {
    ratios.interestCoverageRatio = NaN;
  }

  try {
    if (financials.netIncome !== undefined && financials.weightedAverageShares !== undefined) {
      ratios.eps = eps(financials.netIncome, financials.weightedAverageShares);
    }
  } catch (e) {
    ratios.eps = NaN;
  }

  try {
    if (financials.shareholdersEquity !== undefined && financials.totalShares !== undefined) {
      ratios.bvps = bvps(financials.shareholdersEquity, financials.totalShares);
    }
  } catch (e) {
    ratios.bvps = NaN;
  }

  return ratios;
}
