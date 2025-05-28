import { isPlainObject } from './is';

/**
 * 深度合并两个对象的属性，返回合并后的新对象。
 *
 * @param target - 目标对象
 * @param source - 源对象
 * @returns 合并后的新对象
 * @example
 * mergeObjectDeep({a: 1, b: {c: 2}}, {b: {d: 3}}) // {a: 1, b: {c: 2, d: 3}}
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
