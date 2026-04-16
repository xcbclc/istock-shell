/**
 * 金融数据类型定义
 */

/**
 * OHLC（开盘、最高、最低、收盘）数据点
 */
export interface OHLC {
  /** 时间戳（毫秒）或日期字符串 */
  timestamp: number | string;
  /** 开盘价 */
  open: number;
  /** 最高价 */
  high: number;
  /** 最低价 */
  low: number;
  /** 收盘价 */
  close: number;
  /** 成交量（可选） */
  volume?: number;
}

/**
 * 简单数值序列
 */
export type Series = number[];

/**
 * 带时间戳的数值序列
 */
export interface TimeSeries {
  timestamp: number | string;
  value: number;
}

/**
 * 表格数据行（对象字典）
 */
export type TableRow = Record<string, any>;

/**
 * 表格数据（对象数组）
 */
export type TableData = TableRow[];

/**
 * 二维数组表格数据
 */
export type MatrixData = any[][];

/**
 * 金融数据源类型
 */
export type FinancialDataSource = OHLC[] | Series | TimeSeries[] | TableData | MatrixData;

/**
 * 数据清洗选项
 */
export interface DataCleaningOptions {
  /** 缺失值处理策略：'ignore'忽略, 'fill'填充, 'remove'移除 */
  missingValueStrategy?: 'ignore' | 'fill' | 'remove';
  /** 填充值（当策略为'fill'时使用） */
  fillValue?: number;
  /** 异常值处理策略：'ignore'忽略, 'clip'裁剪, 'remove'移除 */
  outlierStrategy?: 'ignore' | 'clip' | 'remove';
  /** 异常值检测方法：'iqr'四分位距, 'zscore'Z分数, 'percentile'百分位 */
  outlierMethod?: 'iqr' | 'zscore' | 'percentile';
  /** 异常值阈值（默认1.5倍IQR或3倍Z分数） */
  outlierThreshold?: number;
}

/**
 * 技术指标参数
 */
export interface TechnicalIndicatorParams {
  /** 移动平均周期 */
  period?: number;
  /** 快线周期（用于MACD等） */
  fastPeriod?: number;
  /** 慢线周期（用于MACD等） */
  slowPeriod?: number;
  /** 信号周期（用于MACD等） */
  signalPeriod?: number;
  /** 平滑类型：'sma'简单移动平均, 'ema'指数移动平均, 'wma'加权移动平均 */
  smoothing?: 'sma' | 'ema' | 'wma';
}

/**
 * 财务指标参数
 */
export interface FinancialMetricParams {
  /** 折现率（用于DCF） */
  discountRate?: number;
  /** 永续增长率（用于DCF） */
  perpetualGrowthRate?: number;
  /** 预测期数（用于DCF） */
  forecastPeriods?: number;
}

/**
 * 表格操作选项
 */
export interface TableOperationOptions {
  /** 排序字段 */
  sortBy?: string | string[];
  /** 排序方向：'asc'升序, 'desc'降序 */
  sortDirection?: 'asc' | 'desc';
  /** 分组字段 */
  groupBy?: string | string[];
  /** 聚合函数 */
  aggregate?: 'sum' | 'mean' | 'median' | 'min' | 'max' | 'count';
  /** 过滤条件 */
  filter?: (row: TableRow) => boolean;
  /** 选择字段 */
  select?: string[];
}

/**
 * 函数管道类型
 */
export type PipeFunction<T = any, R = any> = (input: T) => R;
