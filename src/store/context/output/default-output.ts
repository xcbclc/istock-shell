import type { PromptStoreDataText, OutputStoreDataItem, OutputStoreComponentInfo } from '@/store';

/**
 * 判断是否是loading组件数据
 * @param data
 */
export const isCmdOutputLoadingData = (data: OutputStoreComponentInfo): boolean => {
  return data.component === 'ShLoading';
};

/**
 * 获取loading需要的组件数据
 */
export const getCmdOutputLoadingData = (): OutputStoreComponentInfo => {
  return {
    component: 'ShLoading',
    props: {
      type: 'Loading',
    },
    messageId: '',
  };
};

/**
 * 获取命令执行的初始化数据
 * @param id
 * @param input
 * @param promptTexts
 */
export const getCmdOutputInit = (
  id: string,
  input: string,
  promptTexts: PromptStoreDataText[]
): OutputStoreDataItem => {
  return {
    id,
    input,
    output: [],
    promptTexts,
    source: 'self',
  };
};

/**
 * 获取错误输出结构数据
 * @param e
 */
export const getOutputErrorData = (e: Error): OutputStoreComponentInfo => {
  return {
    component: 'ShErrorInfo',
    props: {
      title: e.message,
      stack: (e.stack ?? '').split('\n'),
    },
    messageId: '',
  };
};
