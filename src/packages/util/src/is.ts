// eslint-disable-next-line @typescript-eslint/unbound-method
/**
 * 从 Object.prototype 中解构出 toString 方法，用于类型检测
 * @internal
 */
const { toString } = Object.prototype;

/**
 * 判断一个值是否为数组
 *
 * @param val - 要检测的值
 * @returns 如果值是数组则返回 true，否则返回 false
 * @example
 * ```typescript
 * isArray([1, 2, 3]); // true
 * isArray('hello'); // false
 * isArray(null); // false
 * ```
 */
export function isArray(val: any): val is unknown[] {
  return toString.call(val) === '[object Array]';
}

/**
 * 判断一个值是否为正则表达式
 *
 * @param val - 要检测的值
 * @returns 如果值是正则表达式则返回 true，否则返回 false
 * @example
 * ```typescript
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 * isRegExp('abc'); // false
 * ```
 */
export function isRegExp(val: any): val is RegExp {
  return toString.call(val) === '[object RegExp]';
}

/**
 * 判断一个字符串是否表示正则表达式
 * 通过动态执行字符串来检测其是否为正则表达式字面量
 *
 * @param val - 要检测的值
 * @returns 如果字符串表示正则表达式则返回 true，否则返回 false
 * @example
 * ```typescript
 * isStrRegExp('/abc/g'); // true
 * isStrRegExp('new RegExp("abc")'); // true
 * isStrRegExp('abc'); // false
 * ```
 */
export function isStrRegExp(val: any): val is string {
  if (!isString(val)) return false;
  let isReg: boolean;
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
    const func = new Function(`return ${val};`);
    isReg = func() instanceof RegExp;
  } catch (e) {
    isReg = false;
  }
  return isReg;
}

/**
 * 判断一个值是否为 ArrayBuffer
 *
 * @param val - 要检测的值
 * @returns 如果值是 ArrayBuffer 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isArrayBuffer(new ArrayBuffer(8)); // true
 * isArrayBuffer(new Uint8Array(8)); // false
 * isArrayBuffer([]); // false
 * ```
 */
export function isArrayBuffer(val: any): val is ArrayBuffer {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * 判断一个值是否为 FormData
 *
 * @param val - 要检测的值
 * @returns 如果值是 FormData 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isFormData(new FormData()); // true
 * isFormData({}); // false
 * isFormData(null); // false
 * ```
 */
export function isFormData(val: any): val is FormData {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * 判断一个值是否为字符串
 *
 * @param val - 要检测的值
 * @returns 如果值是字符串则返回 true，否则返回 false
 * @example
 * ```typescript
 * isString('hello'); // true
 * isString(new String('hello')); // false (对象形式的字符串)
 * isString(123); // false
 * ```
 */
export function isString(val: any): val is string {
  return typeof val === 'string';
}

/**
 * 判断一个值是否为数字
 *
 * @param val - 要检测的值
 * @returns 如果值是数字则返回 true，否则返回 false
 * @example
 * ```typescript
 * isNumber(123); // true
 * isNumber(3.14); // true
 * isNumber(NaN); // true
 * isNumber('123'); // false
 * ```
 */
export function isNumber(val: any): val is number {
  return typeof val === 'number';
}

/**
 * 判断一个值是否为布尔值
 *
 * @param val - 要检测的值
 * @returns 如果值是布尔值则返回 true，否则返回 false
 * @example
 * ```typescript
 * isBoolean(true); // true
 * isBoolean(false); // true
 * isBoolean(1); // false
 * isBoolean('true'); // false
 * ```
 */
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

/**
 * 判断一个值是否为 undefined
 *
 * @param val - 要检测的值
 * @returns 如果值是 undefined 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * isUndefined(''); // false
 * ```
 */
export function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined';
}

/**
 * 判断一个值是否为对象（排除 null）
 *
 * @param val - 要检测的值
 * @returns 如果值是对象且不为 null 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject('hello'); // false
 * ```
 */
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object';
}

/**
 * 判断一个值是否为纯对象（Plain Object）
 * 纯对象是指通过对象字面量 {} 或 new Object() 创建的对象
 *
 * @param val - 要检测的值
 * @returns 如果值是纯对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * isPlainObject({}); // true
 * isPlainObject({ a: 1 }); // true
 * isPlainObject([]); // false
 * isPlainObject(new Date()); // false
 * ```
 */
export function isPlainObject(val: any): val is Record<string | symbol, any> {
  return toString.call(val) === '[object Object]';
}

/**
 * 判断一个值是否为 Date 对象
 *
 * @param val - 要检测的值
 * @returns 如果值是 Date 对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * isDate(new Date()); // true
 * isDate('2023-01-01'); // false
 * isDate(1640995200000); // false
 * ```
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

/**
 * 判断一个值是否为 File 对象
 *
 * @param val - 要检测的值
 * @returns 如果值是 File 对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * const file = new File(['content'], 'test.txt');
 * isFile(file); // true
 * isFile(new Blob(['content'])); // false
 * ```
 */
export function isFile(val: any): val is File {
  return toString.call(val) === '[object File]';
}

/**
 * 判断一个值是否为 Blob 对象
 *
 * @param val - 要检测的值
 * @returns 如果值是 Blob 对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * isBlob(new Blob(['content'])); // true
 * isBlob(new File(['content'], 'test.txt')); // true (File 继承自 Blob)
 * isBlob('content'); // false
 * ```
 */
export function isBlob(val: any): val is Blob {
  return toString.call(val) === '[object Blob]';
}

/**
 * 判断一个值是否为函数（包括异步函数）
 *
 * @param val - 要检测的值
 * @returns 如果值是函数则返回 true，否则返回 false
 * @example
 * ```typescript
 * isFunction(() => {}); // true
 * isFunction(async () => {}); // true
 * isFunction(function() {}); // true
 * isFunction('function'); // false
 * ```
 */
export function isFunction(val: any): val is Function {
  const str = toString.call(val);
  return str === '[object Function]' || str === '[object AsyncFunction]';
}

/**
 * 判断一个值是否为流对象（Stream）
 * 通过检查对象是否具有 pipe 方法来判断
 *
 * @param val - 要检测的值
 * @returns 如果值是流对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * const stream = { pipe: () => {} };
 * isStream(stream); // true
 * isStream({}); // false
 * ```
 */
export function isStream(val: any): boolean {
  return isObject(val) && isFunction((val as any)?.pipe);
}

/**
 * 判断一个值是否为 URLSearchParams 对象
 *
 * @param val - 要检测的值
 * @returns 如果值是 URLSearchParams 对象则返回 true，否则返回 false
 * @example
 * ```typescript
 * isURLSearchParams(new URLSearchParams('a=1&b=2')); // true
 * isURLSearchParams('a=1&b=2'); // false
 * isURLSearchParams({}); // false
 * ```
 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * 判断当前是否运行在标准浏览器环境中
 *
 * 这允许代码在 Web Worker 和 React Native 环境中运行。
 * 这些环境都支持 XMLHttpRequest，但不完全支持标准的全局对象。
 *
 * Web Workers 环境:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * React Native 环境:
 *  navigator.product -> 'ReactNative'
 * NativeScript 环境:
 *  navigator.product -> 'NativeScript' 或 'NS'
 *
 * @returns 如果在标准浏览器环境中则返回 true，否则返回 false
 * @example
 * ```typescript
 * if (isStandardBrowserEnv()) {
 *   // 可以安全使用 window 和 document
 *   console.log(window.location.href);
 * }
 * ```
 */
export function isStandardBrowserEnv(): boolean {
  if (
    typeof navigator !== 'undefined' &&
    (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
  ) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * 判断一个值是否为 ArrayBuffer 的视图
 * ArrayBuffer 视图包括 TypedArray（如 Uint8Array、Int32Array 等）和 DataView
 *
 * @param val - 要检测的值
 * @returns 如果值是 ArrayBuffer 视图则返回 true，否则返回 false
 * @example
 * ```typescript
 * isArrayBufferView(new Uint8Array(8)); // true
 * isArrayBufferView(new DataView(new ArrayBuffer(8))); // true
 * isArrayBufferView(new ArrayBuffer(8)); // false
 * isArrayBufferView([]); // false
 * ```
 */
export function isArrayBufferView(val: any): val is ArrayBuffer {
  let result: boolean;
  if (ArrayBuffer?.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val?.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * 判断一个值是否为字符串 'constructor'
 * 用于防止原型污染攻击，检查属性名是否为危险的 'constructor' 字符串
 *
 * @param val - 要检测的值
 * @returns 如果值严格等于字符串 'constructor' 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isConstructorStr('constructor'); // true
 * isConstructorStr('Constructor'); // false
 * isConstructorStr('prototype'); // false
 * ```
 */
export const isConstructorStr = (val: any): val is 'constructor' => val === 'constructor';

/**
 * 判断一个值是否为 null 或 undefined
 * 这是一个便捷函数，用于检查值是否为空值
 *
 * @param val - 要检测的值
 * @returns 如果值是 null 或 undefined 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isNil(null); // true
 * isNil(undefined); // true
 * isNil(0); // false
 * isNil(''); // false
 * isNil(false); // false
 * ```
 */
export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;

/**
 * 判断一个值是否为有效的普通值
 * 普通值包括：非空字符串、数字、布尔值或 Date 对象
 *
 * @param val - 要检测的值
 * @returns 如果值是有效的普通值则返回 true，否则返回 false
 * @example
 * ```typescript
 * isValue('hello'); // true
 * isValue(123); // true
 * isValue(true); // true
 * isValue(new Date()); // true
 * isValue(''); // false (空字符串)
 * isValue(null); // false
 * isValue({}); // false
 * ```
 */
export const isValue = (val: any): boolean => isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);

/**
 * 判断一个值是否具有 length 属性且长度大于 0
 * 适用于数组、字符串、类数组对象等具有 length 属性的对象
 *
 * @param val - 要检测的值
 * @returns 如果值具有 length 属性且大于 0 则返回 true，否则返回 false
 * @example
 * ```typescript
 * hasLength([1, 2, 3]); // true
 * hasLength('hello'); // true
 * hasLength([]); // false
 * hasLength(''); // false
 * hasLength({ length: 5 }); // true
 * ```
 */
export const hasLength = (val: any): boolean => val.length > 0;

/**
 * 判断一个值是否为非空字符串
 * 结合了字符串类型检查和长度检查
 *
 * @param val - 要检测的值
 * @returns 如果值是字符串且长度大于 0 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isStringFull('hello'); // true
 * isStringFull(''); // false
 * isStringFull(' '); // true (空格也算有值)
 * isStringFull(123); // false
 * isStringFull(null); // false
 * ```
 */
export const isStringFull = (val: any): val is string => isString(val) && hasLength(val);

/**
 * 判断一个值是否为非空数组
 * 结合了数组类型检查和长度检查
 *
 * @param val - 要检测的值
 * @returns 如果值是数组且长度大于 0 则返回 true，否则返回 false
 * @example
 * ```typescript
 * isArrayFull([1, 2, 3]); // true
 * isArrayFull([]); // false
 * isArrayFull('hello'); // false
 * isArrayFull(null); // false
 * ```
 */
export const isArrayFull = (val: any): val is unknown[] => Array.isArray(val) && hasLength(val);

/**
 * 判断一个值是否具有有效值
 * 如果是数组，检查数组中的每个元素是否都是有效的普通值
 * 如果不是数组，直接检查是否为有效的普通值
 *
 * @param val - 要检测的值
 * @returns 如果值具有有效值则返回 true，否则返回 false
 * @example
 * ```typescript
 * hasValue('hello'); // true
 * hasValue(123); // true
 * hasValue(['a', 'b']); // true
 * hasValue([1, 2, 3]); // true
 * hasValue(['', 'hello']); // false (包含空字符串)
 * hasValue([]); // false
 * hasValue(''); // false
 * ```
 */
export const hasValue = (val: any): boolean => (isArrayFull(val) ? val.every((o) => isValue(o)) : isValue(val));

/**
 * 判断一个值是否为字符串数组
 * 检查值是否为数组，且数组中的每个元素都是非空字符串
 *
 * @param val - 要检测的值
 * @returns 如果值是字符串数组则返回 true，否则返回 false
 * @example
 * ```typescript
 * isArrayStrings(['hello', 'world']); // true
 * isArrayStrings(['hello', '']); // false (包含空字符串)
 * isArrayStrings(['hello', 123]); // false (包含非字符串)
 * isArrayStrings([]); // false (空数组)
 * isArrayStrings('hello'); // false (不是数组)
 * ```
 */
export const isArrayStrings = (val: any): val is string[] => isArrayFull(val) && val.every((v) => isStringFull(v));

/**
 * 判断一个字符串是否为有效的 ISO 8601 日期时间格式
 * 支持日期格式：YYYY-MM-DD
 * 支持日期时间格式：YYYY-MM-DDTHH:mm:ss.sssZ 或带时区偏移
 *
 * @param val - 要检测的值
 * @returns 如果字符串符合 ISO 8601 日期时间格式则返回 true，否则返回 false
 * @example
 * ```typescript
 * isDateString('2023-01-01'); // true
 * isDateString('2023-01-01T12:00:00Z'); // true
 * isDateString('2023-01-01T12:00:00.123+08:00'); // true
 * isDateString('01/01/2023'); // false
 * isDateString('hello'); // false
 * ```
 */
export const isDateString = (val: any): val is string =>
  isStringFull(val) &&
  /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(val);

/**
 * 判断一个值是否为异步可迭代迭代器
 * 通过检查对象是否具有 Symbol.asyncIterator 方法来判断
 *
 * @param val - 要检测的值
 * @returns 如果值是异步可迭代迭代器则返回 true，否则返回 false
 * @example
 * ```typescript
 * async function* asyncGenerator() {
 *   yield 1;
 *   yield 2;
 * }
 * 
 * const asyncIter = asyncGenerator();
 * isAsyncIterableIterator(asyncIter); // true
 * isAsyncIterableIterator({}); // false
 * isAsyncIterableIterator([1, 2, 3]); // false
 * ```
 */
export const isAsyncIterableIterator = <T = unknown>(val: any): val is AsyncIterableIterator<T> => {
  return val != null && typeof val[Symbol.asyncIterator] === 'function';
};
