/**
 * @fileoverview 通用类接口定义
 * @description 定义了一个通用的类构造器接口，用于表示任意类型的类
 */

/**
 * 通用类接口
 * @description 定义一个可以实例化任意类型对象的类构造器接口
 * @template T 类实例的类型，默认为空对象类型
 * @example
 * ```typescript
 * // 使用 AnyClass 接口
 * function createInstance<T>(ClassConstructor: AnyClass<T>, ...args: any[]): T {
 *   return new ClassConstructor(...args);
 * }
 *
 * class MyClass {
 *   constructor(public name: string) {}
 * }
 *
 * const instance = createInstance(MyClass, 'test');
 * ```
 */
export interface AnyClass<T = {}> {
  /** 类构造器，接受任意参数并返回类型 T 的实例 */
  new (...args: any[]): T;
  [k: string | symbol]: any;
}
