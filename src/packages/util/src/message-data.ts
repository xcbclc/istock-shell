import { isFunction, isPlainObject, isArray } from './is';

export enum EMessageDataFieldType {
  Function,
}
/**
 * 通过来自 Worker 的 postMessage() 或使用 IndexedDB 存储对象时在内部使用时，会使用结构化克隆算法
 * Function 对象是不能被结构化克隆算法复制的，需要额外特殊处理支持
 */

export function getMessageDataPK(k: string, type: string | number) {
  return `__${k}_${type}__`;
}

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

export const unWarp = <R = unknown>(value: any): R => {
  if (typeof value !== 'object' || value === null) return value;
  if (isPlainObject(value)) {
    Object.keys(value).forEach((k) => {
      const pkFn = getMessageDataPK(k, EMessageDataFieldType.Function);
      if (value[pkFn] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
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
