import { getUnitOption, getYYYYMMDD, getStockCode, EAdjust, getFQ, getStockName } from '@/worker/common';

export enum EPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum EMinutePeriod {
  Y = 1,
  W = 5,
  SW = 15,
  SS = 30,
  LS = 60,
}

export const periodRecord: Record<string, EPeriod> = {
  日: EPeriod.DAILY,
  周: EPeriod.WEEKLY,
  月: EPeriod.MONTHLY,
};
export const adjustRecord: Record<string, EAdjust> = {
  前复权: EAdjust.QFQ,
  后复权: EAdjust.HFQ,
};

export default {
  历史行情数据: {
    name: '历史行情数据',
    cmd: 'lshqsj',
    usage:
      'lshqsj [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-sjzq <时间周期>] [-fq <复权类型>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
      开始日期: getYYYYMMDD(
        {
          name: '开始日期',
          parameter: ['-ksrq', '--开始日期'],
        },
        1
      ),
      结束日期: getYYYYMMDD(
        {
          name: '结束日期',
          parameter: ['-jsrq', '--结束日期'],
        },
        2
      ),
      复权: getFQ(),
      时间周期: {
        name: '时间周期',
        parameter: ['-sjzq', '--时间周期'],
        parameterType: ['string'],
        description: '时间周期，支持日(daily)、周(weekly)、月(monthly)',
        default: EPeriod.DAILY,
        optional: true,
        choices: Object.values(EPeriod),
      },
    },
    source: {
      title: '历史行情数据-东财',
      url: 'https://quote.eastmoney.com/concept/sh603777.html?from=classic(示例)',
    },
    arguments: [],
    description: `东方财富-沪深京A股日频率数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取`,
    remarks: '限量: 单次返回指定沪深京A股上市公司、指定周期和指定日期间的历史行情日频率数据',
  },
  历史行情新浪: {
    name: '历史行情新浪',
    cmd: 'lshqxl',
    usage: 'lshqxl [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-fq <复权类型>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
      开始日期: getYYYYMMDD(
        {
          name: '开始日期',
          parameter: ['-ksrq', '--开始日期'],
        },
        1
      ),
      结束日期: getYYYYMMDD(
        {
          name: '结束日期',
          parameter: ['-jsrq', '--结束日期'],
        },
        2
      ),
      复权: getFQ(),
    },
    source: {
      title: '历史行情数据-新浪',
      url: 'https://finance.sina.com.cn/realstock/company/sh600006/nc.shtml(示例)',
    },
    arguments: [],
    description: `新浪财经-沪深京A股的数据, 历史数据按日频率更新;`,
    remarks: '限量: 单次返回指定沪深京A股上市公司指定日期间的历史行情日频率数据, 多次获取容易封禁 IP',
  },
  历史行情腾讯: {
    name: '历史行情腾讯',
    cmd: 'lshqtx',
    usage: 'lshqtx [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-fq <复权类型>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
      开始日期: getYYYYMMDD(
        {
          name: '开始日期',
          parameter: ['-ksrq', '--开始日期'],
        },
        1
      ),
      结束日期: getYYYYMMDD(
        {
          name: '结束日期',
          parameter: ['-jsrq', '--结束日期'],
        },
        2
      ),
      复权: getFQ(),
    },
    source: {
      title: '历史行情数据-腾讯',
      url: 'https://gu.qq.com/sh000919/zs',
    },
    arguments: [],
    description: `腾讯证券-日频-股票历史数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取`,
    remarks: '限量: 单次返回指定沪深京 A 股上市公司、指定周期和指定日期间的历史行情日频率数据',
  },
  分时数据新浪: {
    name: '分时数据新浪',
    cmd: 'fssjxl',
    usage: 'fssjxl [-gpdm <股票代码>] [-gpmc <股票名称>] [-rp <日频>] [-fq <复权类型>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
      日频: {
        name: '日频',
        parameter: ['-rp', '--日频'],
        parameterType: ['string'],
        description: '获取1,5,15,30,60分钟的数据频率',
        default: EMinutePeriod.Y,
        optional: true,
        choices: Object.values(EMinutePeriod),
      },
      复权: getFQ(),
    },
    source: {
      title: '分时数据-新浪',
      url: 'http://finance.sina.com.cn/realstock/company/sh600519/nc.shtml',
    },
    arguments: [],
    description: `新浪财经-沪深京A股股票或者指数的分时数据，目前可以获取 1, 5, 15, 30, 60 分钟的数据频率, 可以指定是否复权`,
    remarks: '限量: 单次返回指定股票或指数的指定频率的最近交易日的历史分时行情数据; 注意调用频率',
  },
  分时数据东财: {
    name: '分时数据东财',
    cmd: 'fssjdc',
    usage:
      'fssjdc [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-rp <日频>] [-fq <复权类型>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
      开始日期: getYYYYMMDD(
        {
          name: '开始日期',
          parameter: ['-ksrq', '--开始日期'],
        },
        1
      ),
      结束日期: getYYYYMMDD(
        {
          name: '结束日期',
          parameter: ['-jsrq', '--结束日期'],
        },
        2
      ),
      日频: {
        name: '日频',
        parameter: ['-rp', '--日频'],
        parameterType: ['string'],
        description: '获取1,5,15,30,60分钟的数据频率',
        default: EMinutePeriod.Y,
        optional: true,
        choices: Object.values(EMinutePeriod),
      },
      复权: getFQ(),
    },
    source: {
      title: '分时数据-东财',
      url: 'http://quote.eastmoney.com/concept/sh603777.html?from=classic',
    },
    arguments: [],
    description: `东方财富网-行情首页-沪深京 A 股-每日分时行情; 该接口只能获取近期的分时数据，注意时间周期的设置`,
    remarks:
      '限量: 单次返回指定股票、频率、复权调整和时间区间的分时数据, 其中 1 分钟数据只返回近 5 个交易日数据且不复权',
  },
  日内分时数据东财: {
    name: '日内分时数据东财',
    cmd: 'rnfssjdc',
    usage: 'rnfssjdc [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '日内分时数据-东财',
      url: 'https://quote.eastmoney.com/f1.html?newcode=0.000001',
    },
    arguments: [],
    description: `东财财富-分时数据`,
    remarks: '限量: 单次返回指定股票最近一个交易日的分时数据, 包含盘前数据',
  },
  盘前数据: {
    name: '盘前数据',
    cmd: 'pqsj',
    usage: 'pqsj [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption(),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '盘前数据',
      url: 'https://quote.eastmoney.com/concept/sh603777.html',
    },
    arguments: [],
    description: `东方财富-股票行情-盘前数据`,
    remarks: '限量: 单次返回指定 symbol 的最近一个交易日的股票分钟数据, 包含盘前分钟数据',
  },
};
