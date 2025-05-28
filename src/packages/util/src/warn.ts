import { isArray, isString } from './is';

/**
 * 控制台警告输出，支持作用域和多行消息。
 *
 * @param scope - 警告所属作用域
 * @param message - 警告内容，支持字符串或字符串数组
 * @example
 * warn('network', '请求超时');
 * warn('db', ['连接失败', '重试中']);
 */
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
