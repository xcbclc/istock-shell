import { type ControllerMethodCmdRoute } from '@istock-shell/iswork';

const cmdRoute: ControllerMethodCmdRoute = {
  name: '用户登录',
  cmd: 'yhdl',
  usage: 'yhdl <登录类型>',
  description: '支持微信扫码登录',
  arguments: [
    {
      name: '登录类型',
      parameter: [],
      parameterType: ['string'],
      description: '用户登录的类型',
      optional: false,
      choices: ['wx'],
    },
  ],
  options: {
    /*账号: {
      name: '账号',
      parameter: ['-zh', '--账号'],
      parameterType: ['string'],
      description: '指定的用户账号',
      optional: true,
      choices: [],
    },
    密码: {
      name: '密码',
      parameter: ['-mm', '--密码'],
      parameterType: ['string'],
      description: '账号密码',
      optional: true,
      choices: [],
    },*/
  },
  example: 'yhdl wx',
};
export default {
  用户登录: cmdRoute,
};
