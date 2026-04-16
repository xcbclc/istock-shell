/**
 * @istock-shell/finance
 * 金融数据分析工具包
 *
 * 一个成熟的金融数据分析工具包，提供数据清洗、技术指标、财务指标、
 * 统计计算和表格处理等功能，支持函数管道和链式调用。
 */

// 导出类型定义
export * from './types';

// 导出管道工具
export * from './pipe';

// 导出数据清洗与预处理模块
export * from './data-cleaning';

// 导出技术指标计算模块
export * from './technical-indicators';

// 导出财务指标计算模块
export * from './financial-metrics';

// 导出常规统计计算模块
export * from './statistics';

// 导出表格数据处理模块
export * from './table-operations';
