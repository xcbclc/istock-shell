import DomainCmdWork from './domain?worker';

let cmdWork: Worker;

export const getWorker = () => {
  if (cmdWork) return cmdWork;
  cmdWork = new DomainCmdWork();
  // @ts-expect-error 暂时挂载到window方便调试
  window.$cmdWork = cmdWork;
  cmdWork.onerror = console.error;
  return cmdWork;
};
