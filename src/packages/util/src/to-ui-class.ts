import { isArray, isString } from './is';
/**
 * 将样式名自动加上前缀
 * @param className
 * @param prefix
 */
export const tuc = (className: string | string[], prefix: string = ''): string => {
  let classNames: string[] = [];
  if (isString(className)) {
    classNames = className.split(' ');
  }
  if (isArray(className)) {
    classNames = className;
  } else {
    return className;
  }
  return classNames.map((name) => [prefix, name].join('')).join(' ');
};
