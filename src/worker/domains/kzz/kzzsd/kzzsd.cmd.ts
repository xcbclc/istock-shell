const cmdRoute = {
  name: '可转债双低',
  cmd: 'kzzsd',
  usage: 'kzzsd',
  options: {
    sdtj: {
      name: 'sdtj',
      parameter: ['-sdtj', '--双低条件'],
      parameterType: ['number'],
      description: `市场上可转债双低均值进入条件`,
      optional: true,
      default: 150,
    },
    ldzq: {
      name: 'ldzq',
      parameter: ['-ldzq', '--轮动周期'],
      parameterType: ['number'],
      description: `策略轮动周期，单位：天`,
      optional: true,
      default: 7,
    },
  },
  description: '该策略来自集思录-yyb凌波-转债双低轮动+沪深300波动率策略（2024）',
  source: {
    title: '集思录-实时数据-可转债',
    url: 'https://www.jisilu.cn/web/data/cb/list',
  },
  remarks: '需要设置集思录登录cookie',
  example: 'kzzsd -ldzq 7 -sdtj 150',
};
export default {
  [cmdRoute.name]: cmdRoute,
};
