import { isFunction, isPlainObject, isArray } from './is';

/**
 * 消息数据字段类型枚举。
 * @enum
 */
export enum EMessageDataFieldType {
  Function,
}
/**
 * 通过来自 Worker 的 postMessage() 或使用 IndexedDB 存储对象时在内部使用时，会使用结构化克隆算法。
 * Function 对象是不能被结构化克隆算法复制的，需要额外特殊处理支持。
 */

/**
 * 生成消息数据的主键。
 *
 * @param k - 字段名
 * @param type - 字段类型
 * @returns 主键字符串
 * @example
 * getMessageDataPK('handler', EMessageDataFieldType.Function); // '__handler_0__'
 */
export function getMessageDataPK(k: string, type: string | number) {
  return `__${k}_${type}__`;
}

/**
 * 包装对象，将其中的函数转为字符串，便于结构化克隆。
 *
 * @param value - 需要包装的对象
 * @returns 包装后的对象
 * @example
 * wrap({ fn: () => 1 }); // { fn: '() => 1', __fn_0__: null }
 */
export const wrap = <R = unknown>(value: any): R => {
  if (typeof value !== 'object' || value === null) return value;
  if (isPlainObject(value)) {
    Object.keys(value).forEach((k) => {
      if (isFunction(value[k])) {
        const pk = getMessageDataPK(k, EMessageDataFieldType.Function);
        value[k] = value[k].toString();
        if (!value[pk]) value[pk] = null;
      } else {
        value[k] = wrap(value[k]);
      }
    });
  }
  if (isArray(value)) {
    value = value.map((v) => wrap(v));
  }
  return value;
};

/**
 * 还原包装对象，将字符串还原为函数。
 *
 * @param value - 需要还原的对象
 * @returns 还原后的对象
 * @example
 * unWarp({ fn: '() => 1', __fn_0__: null }); // { fn: [Function] }
 */
export const unWarp = <R = unknown>(value: any): R => {
  if (typeof value !== 'object' || value === null) return value;
  if (isPlainObject(value)) {
    Object.keys(value).forEach((k) => {
      const pkFn = getMessageDataPK(k, EMessageDataFieldType.Function);
      if (value[pkFn] !== undefined) {
        const fn = new Function(`return ${value[k]}`)().bind(value[pkFn]);
        const fnCode = value[k].toString();
        fn.toString = () => fnCode;
        value[k] = fn;
      } else {
        value[k] = unWarp(value[k]);
      }
    });
  }
  if (isArray(value)) {
    value = value.map((v) => unWarp(v));
  }
  return value;
};
