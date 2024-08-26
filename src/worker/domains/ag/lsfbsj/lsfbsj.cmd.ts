import { getUnitOption, getStockCode, getStockName } from '@/worker/common';

export default {
  历史分笔数据: {
    name: '历史分笔数据',
    cmd: 'lsfbsj',
    usage: 'lsfbsj [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption({}),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '历史分笔数据-腾讯财经',
      url: 'http://gu.qq.com/sz300494/gp/detail', // 对应AKShare目标地址
    },
    description:
      '每个交易日 16:00 提供当日数据; 如遇到数据缺失, 请使用 ak.stock_zh_a_tick_163() 接口(注意数据会有一定差异)', // 对应AKShare描述
    remarks: '限量: 单次返回最近交易日的历史分笔行情数据', // 对应AKShare提示
    example: 'lsfbsj -gpmc 贵州茅台',
  },
};
