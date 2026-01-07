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
 * 判断字段名是否已经是消息数据的主键格式。
 * @param k - 字段名
 * @returns 是否为主键
 */
export function isMessageDataPK(k: string) {
  return /^__.*_[0-9]+__$/.test(k);
}

/**
 * 绑定消息上下文到函数对象。
 * 用于 wrap 时自动提取上下文并传递给 Worker 或主线程。
 *
 * @param fn - 需要绑定上下文的函数
 * @param context - 上下文对象
 * @returns 绑定了上下文的函数
 */
export const bindMessageContext = <T extends Function>(fn: T, context: any): T => {
  Object.defineProperty(fn, '__message_context__', {
    value: context,
    enumerable: false,
    writable: true,
    configurable: true,
  });
  return fn;
};

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

  if (isArray(value)) {
    return value.map((v) => wrap(v)) as any;
  }

  if (isPlainObject(value)) {
    const newValue: any = {};
    Object.keys(value).forEach((k) => {
      if (isFunction(value[k])) {
        const pk = getMessageDataPK(k, EMessageDataFieldType.Function);
        const context = (value[k] as any)['__message_context__'];
        newValue[k] = value[k].toString();
        // 优先使用已存在的 pk (手动设置的情况)，其次使用绑定的上下文，最后默认为 null
        if (value[pk] === undefined) {
          newValue[pk] = context !== undefined ? context : null;
        }
      } else {
        newValue[k] = wrap(value[k]);
      }
    });
    return newValue;
  }

  return value;
};

/**
 * 还原包装对象，将字符串还原为函数。
 *
 * @param value - 需要还原的对象
 * @returns 还原后的对象
 * @example
 * unwrap({ fn: '() => 1', __fn_0__: null }); // { fn: [Function] }
 */
export const unwrap = <R = unknown>(value: any): R => {
  if (typeof value !== 'object' || value === null) return value;

  if (isArray(value)) {
    return value.map((v) => unwrap(v)) as any;
  }

  if (isPlainObject(value)) {
    const newValue: any = {};
    Object.keys(value).forEach((k) => {
      const pkFn = getMessageDataPK(k, EMessageDataFieldType.Function);
      if (value[pkFn] !== undefined) {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return ${value[k]}`)().bind(value[pkFn]);
        const fnCode = value[k].toString();
        fn.toString = () => fnCode;
        newValue[k] = fn;
        // 可选：清理 pk 字段？保留以防万一
        // delete value[pkFn];
      } else if (isMessageDataPK(k)) {
        newValue[k] = value[k];
      } else {
        newValue[k] = unwrap(value[k]);
      }
    });
    return newValue;
  }

  return value;
};
