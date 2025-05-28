import { isFunction } from './is';

/**
 * 将对象序列化为 JSON 字符串，支持函数类型转字符串。
 *
 * @param v - 需要序列化的对象
 * @returns JSON 字符串
 * @example
 * stringify({ fn: () => 1 }) // '{"fn":"() => 1"}'
 */
export const stringify = (v: unknown) =>
  JSON.stringify(v, (_k, v) => {
    if (isFunction(v)) return v.toString();
    return v;
  });

/**
 * 解析 JSON 字符串为对象。
 * 
 * @param v - JSON 字符串
 * @returns 解析后的对象
 * @example
 * parse('{"name":"test"}'); // { name: 'test' }
 */
export const parse = (v: string) => JSON.parse(v);

/**
 * 深拷贝对象，基于 JSON 序列化。
 * 
 * @param v - 需要拷贝的对象
 * @returns 拷贝后的新对象
 * @example
 * clone({ a: 1, b: { c: 2 } }); // { a: 1, b: { c: 2 } }
 */
export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
