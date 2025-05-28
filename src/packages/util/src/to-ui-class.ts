import { isArray, isString } from './is';
/**
 * 将样式名自动加上前缀，支持字符串或字符串数组。
 *
 * @param className - 样式名字符串或字符串数组
 * @param prefix - 前缀字符串，默认空
 * @returns 拼接后的样式名字符串
 * @example
 * tuc('btn primary', 'fe-'); // 'fe-btn fe-primary'
 * tuc(['btn', 'primary'], 'fe-'); // 'fe-btn fe-primary'
 */
export const tuc = (className: string | string[], prefix: string = ''): string => {
  let classNames: string[] = [];
  if (isString(className)) {
    classNames = className.split(' ');
  }
  if (isArray(className)) {
    classNames = className;
  } else {
    return className as string;
  }
  return classNames.map((name) => [prefix, name].join('')).join(' ');
};
