/**
 * @fileoverview 通用对象类型定义
 * @description 定义各种通用的对象类型
 */

/**
 * 任意元数据对象类型
 * @template T - 值类型，默认为 unknown
 * @description 用于表示任意键值对的元数据对象
 * @example
 * ```typescript
 * const metadata: AnyMetadata<string> = {
 *   tableName: 'users',
 *   primaryKey: 'id'
 * };
 * ```
 */
export type AnyMetadata<T = unknown> = Record<string | symbol, T>;

/**
 * 任意对象类型
 * @template T - 值类型，默认为 unknown
 * @description 用于表示任意键值对的对象
 * @example
 * ```typescript
 * const data: AnyObj<any> = {
 *   name: 'John',
 *   age: 30,
 *   active: true
 * };
 * ```
 */
export type AnyObj<T = unknown> = Record<string | symbol, T>;

/**
 * 带 ID 的任意对象类型
 * @template T - 值类型，默认为 unknown
 * @description 用于表示包含 id 字段的任意对象
 * @example
 * ```typescript
 * const user: IdAnyObject<string> = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com'
 * };
 * ```
 */
export type IdAnyObject<T = unknown> = {
  /** 唯一标识符 */
  id: string | number;
} & Record<string | symbol, T>;
