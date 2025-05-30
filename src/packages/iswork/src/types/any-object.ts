/**
 * @fileoverview 通用对象类型定义
 * @description 定义了一个通用的对象类型，支持字符串和符号键
 */

/**
 * 通用对象类型
 * @description 定义一个可以包含任意键值对的对象类型，键可以是字符串或符号
 * @template T 对象值的类型，默认为 any
 * @example
 * ```typescript
 * // 使用 AnyObject 类型
 * const config: AnyObject<string> = {
 *   host: 'localhost',
 *   port: '3000',
 *   [Symbol.for('secret')]: 'hidden-value'
 * };
 *
 * // 动态属性访问
 * const userPrefs: AnyObject = {
 *   theme: 'dark',
 *   language: 'en',
 *   notifications: true
 * };
 * ```
 */
export type AnyObject<T = any> = Record<string | symbol, T>;
