import { isPlainObject } from './is';

/**
 * 深度合并对象属性
 * @param target
 * @param source
 */
export function mergeObjectDeep<T>(target: Record<string, any>, source: Record<string, any>) {
  const result: any = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      if (isPlainObject(value)) {
        result[key] = mergeObjectDeep(isPlainObject(target[key]) ? target[key] : {}, value);
      } else {
        // 直接赋值（包括source[key]是数组的情况）
        result[key] = value;
      }
    }
  }

  return result as T;
}
