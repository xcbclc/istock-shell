// eslint-disable-next-line @typescript-eslint/unbound-method
const { toString } = Object.prototype;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val: any): val is unknown[] {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an RegExp
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an RegExp, otherwise false
 */
export function isRegExp(val: any): val is RegExp {
  return toString.call(val) === '[object RegExp]';
}

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
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
export function isArrayBuffer(val: any): val is ArrayBuffer {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
export function isFormData(val: any): val is FormData {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString(val: any): val is string {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber(val: any): val is number {
  return typeof val === 'number';
}

/**
 * Determine if a value is a Boolean
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is an Plain Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isPlainObject(val: any): val is Record<string | symbol, any> {
  return toString.call(val) === '[object Object]';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
export function isFile(val: any): val is File {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
export function isBlob(val: any): val is Blob {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function isFunction(val: any): val is Function {
  const str = toString.call(val);
  return str === '[object Function]' || str === '[object AsyncFunction]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
export function isStream(val: any): boolean {
  return isObject(val) && isFunction((val as any)?.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
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
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
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
 * 判断是否是constructor字符串
 * @param val
 */
export const isConstructorStr = (val: any): val is 'constructor' => val === 'constructor';

/**
 * 判断是否为null或undefined
 * @param val
 */
export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;

/**
 * 普通值判断
 * @param val
 */
export const isValue = (val: any): boolean => isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);

/**
 * 判断是否带length属性并大于0
 * @param val
 */
export const hasLength = (val: any): boolean => val.length > 0;

/**
 * 判断字符串是否有值
 * @param val
 */
export const isStringFull = (val: any): val is string => isString(val) && hasLength(val);

/**
 * 判断数组是否有值
 * @param val
 */
export const isArrayFull = (val: any): val is unknown[] => Array.isArray(val) && hasLength(val);

/**
 * 判断数组是否有值或普通值是否有值
 * @param val
 */
export const hasValue = (val: any): boolean => (isArrayFull(val) ? val.every((o) => isValue(o)) : isValue(val));

/**
 * 判断是否是字符串数组
 * @param val
 */
export const isArrayStrings = (val: any): val is string[] => isArrayFull(val) && val.every((v) => isStringFull(v));

/**
 * 判断字符串是否是一个时间字符串
 * @param val
 */
export const isDateString = (val: any): val is string =>
  isStringFull(val) &&
  /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(val);

/**
 * 简单判断是否是异步迭代器
 * @param val
 */
export const isAsyncIterableIterator = <T = unknown>(val: any): val is AsyncIterableIterator<T> => {
  return val != null && typeof val[Symbol.asyncIterator] === 'function';
};
