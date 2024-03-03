import { isArray, isString } from './is';

export const warn = (scope: string, message?: string | string[]) => {
  let msgs: string[] = [];
  if (isString(message)) {
    msgs.push(message);
  }
  if (isArray(message)) {
    msgs = message;
  }
  console.warn(...[scope, msgs.join('\n')]);
};
