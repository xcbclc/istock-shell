import { getUnitOption, getStockCode, getStockName } from '@/worker/common';

export default {
  个股信息查询: {
    name: '个股信息查询',
    cmd: 'ggxxcx',
    usage: 'ggxxcx [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption({
        default: '*:总市值·亿，*:流通市值·亿，*:总股本·亿，*:流通股·亿',
      }),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '个股信息查询',
      url: 'http://quote.eastmoney.com/concept/sh603777.html?from=classic',
    },
    description: '东方财富-个股-股票信息',
    remarks: '限量: 单次返回指定 symbol 的个股信息',
    example: 'ggxxcx -gpmc 贵州茅台 -dw',
  },
};
