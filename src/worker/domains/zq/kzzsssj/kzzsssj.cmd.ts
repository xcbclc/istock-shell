export default {
  可转债实时数据: {
    name: '可转债实时数据',
    cmd: 'kzzsssj',
    usage: 'kzzsssj [-c <集思录cookie>]',
    options: {
      cookie: {
        name: 'cookie',
        parameter: ['-c', '--cookie'],
        parameterType: ['string'],
        description: '输入您的集思录 cookie 就可以获取完整数据，否则只能返回前 30 条',
        default: '',
        optional: true,
        choices: [],
      },
    },
    source: {
      title: '可转债实时数据-集思录',
      url: 'https://app.jisilu.cn/data/cbnew/#cb', // 对应AKShare目标地址
    },
    description:
      '集思录可转债实时数据，包含行情数据（涨跌幅，成交量和换手率等）及可转债基本信息（转股价，溢价率和到期收益率等）', // 对应AKShare描述
    remarks: '限量: 单次返回当前交易时刻的所有数据', // 对应AKShare提示
  },
};
