import { type TControllerMethodCmdRoute } from '@istock/iswork';

const cmdRoute: TControllerMethodCmdRoute = {
  name: '财经导航',
  cmd: 'cjdh',
  usage: 'cjdh [标签]',
  options: {},
  description: '',
  remarks: '',
  arguments: [
    {
      name: '标签',
      parameter: [],
      parameterType: ['string'],
      description: '财经导航标签',
      optional: true,
      choices: [
        '门户',
        '报纸',
        '杂志',
        '新媒体',
        '官方',
        '债券',
        '理财',
        '期货',
        '黄金',
        '工具',
        '宏观数据',
        '市场数据',
        '研报',
        '选股器',
      ],
    },
  ],
};
export default {
  cmdRoute,
};
