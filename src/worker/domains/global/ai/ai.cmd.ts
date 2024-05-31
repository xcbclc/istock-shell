import { type TControllerMethodCmdRoute } from '@istock/iswork';

const cmdRoute: TControllerMethodCmdRoute = {
  name: 'Ai',
  cmd: 'ai',
  usage: 'ai:<消息内容>',
  options: {},
  arguments: [
    {
      name: '消息内容',
      parameter: [],
      parameterType: ['string'],
      description: '发送给Ai的消息内容',
      optional: false,
    },
  ],
  description: '发送ai消息',
  example: 'ai:你好呀?',
};
export default {
  ai: cmdRoute,
};
