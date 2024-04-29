import { getUnitOption } from '@/worker/common';

export enum EDataType {
  QB = 'qb', // 沪深京A股
  HAG = 'hag', // 沪A股
  SAG = 'sag', // 深A股
  JAG = 'jag', // 京A股
  XG = 'xg', // 新股
  CYB = 'cyb', // 创业板
  KCB = 'kcb', // 科创板
}

export default {
  实时行情数据: {
    name: '实时行情数据',
    cmd: 'sshqsj',
    usage: 'sshqsj <市场>',
    options: {
      单位: getUnitOption(),
    },
    source: {
      title: '实时行情数据-东财',
      url: 'https://quote.eastmoney.com/sz000001.html',
    },
    arguments: [
      {
        name: '市场',
        parameter: [],
        parameterType: ['string'],
        choices: Object.values(EDataType),
        description: '市场编码',
        optional: false,
      },
    ],
    description: `东方财富网-沪深京 A股-实时行情数据`,
    remarks: '限量: 单次返回所有沪深京 A股上市公司的实时行情数据',
    example: 'sshqsj hag',
  },
  实时行情新浪: {
    name: '实时行情新浪',
    cmd: 'sshqxl',
    tag: '不稳定',
    usage: 'sshqxl',
    options: {
      单位: getUnitOption(),
    },
    source: {
      title: '实时行情数据-新浪',
      url: 'https://vip.stock.finance.sina.com.cn/mkt/#hs_a',
    },
    arguments: [],
    description: `新浪财经-沪深京A股数据, 重复运行本函数会被新浪暂时封IP, 建议增加时间间隔`,
    remarks: '限量: 单次返回沪深京A股上市公司的实时行情数据',
    example: 'sshqxl',
  },
};
