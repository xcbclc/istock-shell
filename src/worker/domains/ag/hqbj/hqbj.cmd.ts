import { getUnitOption, getStockCode, getStockName } from '@/worker/common';

export default {
  行情报价: {
    name: '行情报价',
    cmd: 'hqbj',
    usage: 'hqbj [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption({}),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '行情报价',
      url: 'https://quote.eastmoney.com/sz000001.html',
    },
    description: '东方财富-行情报价',
    remarks: '限量: 单次返回指定股票的行情报价数据',
    example: 'hqbj -gpmc 贵州茅台',
  },
};
