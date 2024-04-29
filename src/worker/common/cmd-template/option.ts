import { type TControllerMethodCmdRouteOptions } from '@istock/iswork';

export enum EAdjust {
  QFQ = 'qfq', // 前复权
  HFQ = 'hfq', // 后复权
}

/**
 * 获取单位选项模版数据
 * @param unitOption
 */
export const getUnitOption = (unitOption: Partial<TControllerMethodCmdRouteOptions> = {}) => {
  return {
    name: '单位',
    parameter: ['-dw', '--单位'],
    parameterType: ['array'],
    description: `设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。
      格式如：列名称:行名称·单位 或 *:行名称·单位 或 列名称:*·单位 或 列名称1:*·单位，列名称2:*·单位`,
    default: '',
    optional: true,
    choices: [],
    ...unitOption,
  };
};

/**
 * 获取日期选项模版数据
 * @param option
 */
export const getYYYYMMDD = (option: Partial<TControllerMethodCmdRouteOptions> = {}, type?: number) => {
  const recordTypeText: Record<string, string> = {
    1: '开始',
    2: '结束',
  };
  return {
    name: '日期',
    parameter: ['-rq', '--日期'],
    parameterType: ['string'],
    description: `需要查询的${type ? recordTypeText[type] : ''}日期，格式：20230901`,
    default: '$formatDate{YYYYMMDD}',
    optional: true,
    choices: [],
    ...option,
  };
};

/**
 * 获取年月选项模版数据
 * @param option
 */
export const getYYYYMM = (option: Partial<TControllerMethodCmdRouteOptions> = {}) => {
  return {
    name: '年月',
    parameter: ['-ny', '--年月'],
    parameterType: ['string'],
    description: '需要查询的年月，格式：202310',
    default: '$formatDate{YYYYMM}',
    optional: true,
    choices: [],
    ...option,
  };
};

/**
 * 获取股票代码配置
 * @param option
 */
export const getStockCode = (option: Partial<TControllerMethodCmdRouteOptions> = {}) => {
  return {
    name: '股票代码',
    parameter: ['-gpdm', '--股票代码'],
    parameterType: ['string'],
    description: '需要查询的股票代码，如：600519',
    default: '',
    optional: true,
    choices: [],
    ...option,
  };
};

/**
 * 获取股票名称配置
 * @param option
 */
export const getStockName = (option: Partial<TControllerMethodCmdRouteOptions> = {}) => {
  return {
    name: '股票名称',
    parameter: ['-gpmc', '--股票名称'],
    parameterType: ['string'],
    description: '需要查询的股票名称，如：贵州茅台',
    default: '',
    optional: true,
    choices: [],
    ...option,
  };
};

/**
 * 获取复权选项配置
 */
export const getFQ = (option: Partial<TControllerMethodCmdRouteOptions> = {}) => {
  return {
    name: '复权',
    parameter: ['-fq', '--复权'],
    parameterType: ['string'],
    description: '复权类型：前复权(qfq)、后复权(hfq)',
    default: '',
    optional: true,
    choices: Object.values(EAdjust),
    ...option,
  };
};
