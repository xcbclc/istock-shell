/**
 * @fileoverview 装饰器注册类型定义
 * @description 定义装饰器回调缓存相关的类型
 */

import type { DecoratorType, DecoratorCallbackType } from '../enums';

/**
 * 装饰器回调缓存值类型
 * @description 用于缓存装饰器回调信息的数据结构
 * @example
 * ```typescript
 * const cacheValue: DecoratorCallbackCacheValue = {
 *   key: 'myMethod',
 *   decoratorType: DecoratorType.Method,
 *   fn: myCallbackFunction,
 *   type: DecoratorCallbackType.MethodRequest
 * };
 * ```
 */
export type DecoratorCallbackCacheValue = {
  /** 缓存键，可以是字符串或符号 */
  key: string | symbol;
  /** 装饰器类型 */
  decoratorType: DecoratorType;
  /** 回调函数 */
  fn: Function;
  /** 回调类型 */
  type: DecoratorCallbackType;
};
