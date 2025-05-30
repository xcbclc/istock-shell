/**
 * @fileoverview 装饰器接口定义
 * @description 定义了装饰器的标准接口结构
 */

/**
 * 装饰器接口
 * @description 定义装饰器的标准结构，包括处理器、元数据获取和回调函数
 * @example
 * ```typescript
 * // 实现一个简单的装饰器
 * const logDecorator: Decorator = {
 *   handler: (target, propertyKey, descriptor) => {
 *     console.log(`Decorating ${String(propertyKey)}`);
 *     return descriptor;
 *   },
 *   getMetadata: (target, propertyKey) => {
 *     return Reflect.getMetadata('log', target, propertyKey);
 *   },
 *   callback: (result) => {
 *     console.log('Decorator callback executed');
 *     return result;
 *   }
 * };
 * ```
 */
export interface Decorator {
  /** 装饰器处理函数，执行装饰器的主要逻辑 */
  handler: (...args: unknown[]) => unknown;
  /** 获取装饰器元数据的函数 */
  getMetadata: (...args: unknown[]) => unknown;
  /** 执行时的回调函数，可选 */
  callback?: (...args: unknown[]) => unknown;
}
