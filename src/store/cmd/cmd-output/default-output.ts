import {} from '@istock/util';
import type { TPromptText } from '../cmd-prompt';
import type { ICmdOutput, ICmdOutputData } from './store';

/**
 * 返回loading需要的组件数据
 * @param id
 * @param input
 * @param promptTexts
 */
export const getCmdOutputLoading = (id: string, input: string, promptTexts: TPromptText[]): ICmdOutput => {
  return {
    id,
    input,
    output: [
      {
        component: 'ShLoading',
        props: {
          type: 'Loading',
        },
      },
    ],
    promptTexts,
    source: 'self',
  };
};

/**
 * 获取错误输出结构数据
 * @param e
 */
export const getOutputErrorData = (e: Error): ICmdOutputData => {
  return {
    component: 'ShError',
    props: {
      texts: (e.stack ?? '').split('\n'),
    },
  };
};
