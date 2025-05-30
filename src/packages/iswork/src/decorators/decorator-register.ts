/**
 * @fileoverview 装饰器注册管理器
 * @description 提供装饰器的注册、管理和回调缓存功能，采用单例模式确保全局唯一性
 */

import type { AbstractDecorator } from './abstract-decorator';
import type { DecoratorCallbackCacheValue } from '../types';

/**
 * 装饰器注册管理器
 * @description 单例模式的装饰器注册器，负责管理所有装饰器实例和回调函数的缓存
 * @example
 * ```typescript
 * // 获取注册器实例
 * const register = DecoratorRegister.create();
 *
 * // 注册装饰器
 * const myDecorator = register.add(MyDecoratorClass);
 *
 * // 获取装饰器实例
 * const decorator = register.get(MyDecoratorClass);
 *
 * // 获取装饰器回调
 * const callback = register.getDecoratorCallback('my-key');
 * ```
 */
export class DecoratorRegister {
  /**
   * 单例实例
   * @description 装饰器注册器的唯一实例
   * @static
   */
  static instance: DecoratorRegister;

  /**
   * 创建或获取装饰器注册器实例
   * @description 单例模式的工厂方法，确保全局只有一个注册器实例
   * @returns 装饰器注册器实例
   * @static
   * @example
   * ```typescript
   * const register = DecoratorRegister.create();
   * const sameRegister = DecoratorRegister.create();
   * console.log(register === sameRegister); // true
   * ```
   */
  static create() {
    if (DecoratorRegister.instance) return DecoratorRegister.instance;
    DecoratorRegister.instance = new this();
    return DecoratorRegister.instance;
  }

  /**
   * 装饰器实例缓存
   * @description 存储装饰器类与其实例的映射关系
   * @private
   * @readonly
   */
  readonly #decoratorCache = new Map<new (key?: string | symbol) => AbstractDecorator, AbstractDecorator>();

  /**
   * 装饰器回调缓存
   * @description 存储装饰器元数据键与回调函数的映射关系
   * @private
   * @readonly
   */
  readonly #decoratorCallbackCache = new Map<symbol | string, DecoratorCallbackCacheValue>();

  /**
   * 获取所有装饰器实例
   * @description 返回已注册的所有装饰器实例的迭代器
   * @returns 装饰器实例迭代器
   */
  get decorators() {
    return this.#decoratorCache.values();
  }

  /**
   * 获取所有装饰器回调
   * @description 返回已缓存的所有装饰器回调函数的迭代器
   * @returns 装饰器回调迭代器
   */
  get decoratorCallbacks() {
    return this.#decoratorCallbackCache.values();
  }

  /**
   * 注册装饰器实例
   * @description 根据装饰器类创建并注册装饰器实例，如果实例已存在则直接返回
   * @template Decorator 装饰器类型，必须继承自 AbstractDecorator
   * @param DecoratorClass 装饰器类构造函数
   * @returns 装饰器实例
   * @example
   * ```typescript
   * class MyDecorator extends AbstractDecorator {
   *   // 装饰器实现
   * }
   *
   * const register = DecoratorRegister.create();
   * const decorator = register.add(MyDecorator);
   * console.log(decorator instanceof MyDecorator); // true
   * ```
   */
  add<Decorator extends AbstractDecorator>(DecoratorClass: new (key?: string | symbol) => Decorator): Decorator {
    let instance = this.get<Decorator>(DecoratorClass);
    if (instance) return instance;
    instance = new DecoratorClass();
    this.#decoratorCache.set(DecoratorClass, instance);
    if (instance.metaKey && instance.callback) {
      const callbackCacheValue: DecoratorCallbackCacheValue = {
        key: instance.metaKey,
        decoratorType: instance.decoratorType,

        fn: instance.callback,
        type: instance?.callbackType,
      };
      this.#decoratorCallbackCache.set(instance.metaKey, callbackCacheValue);
    }
    return instance;
  }

  /**
   * 根据装饰器类获取装饰器实例
   * @description 从缓存中获取指定装饰器类的实例，如果不存在则返回 undefined
   * @template Decorator 装饰器类型，必须继承自 AbstractDecorator
   * @param decorator 装饰器类构造函数
   * @returns 装饰器实例或 undefined
   * @example
   * ```typescript
   * const register = DecoratorRegister.create();
   * const decorator = register.get(MyDecorator);
   * if (decorator) {
   *   // 使用装饰器实例
   *   console.log(decorator.key);
   * }
   * ```
   */
  get<Decorator extends AbstractDecorator>(decorator: new (key?: string | symbol) => Decorator): Decorator | undefined {
    return this.#decoratorCache.get(decorator) as Decorator | undefined;
  }

  /**
   * 根据装饰器类删除装饰器实例
   * @description 从缓存中删除指定装饰器类的实例及其相关回调
   * @template Decorator 装饰器类型，必须继承自 AbstractDecorator
   * @param decorator 装饰器类构造函数
   * @example
   * ```typescript
   * const register = DecoratorRegister.create();
   * register.delete(MyDecorator);
   * console.log(register.get(MyDecorator)); // undefined
   * ```
   */
  delete<Decorator extends AbstractDecorator>(decorator: new (key?: string | symbol) => Decorator) {
    const instance = this.#decoratorCache.get(decorator);
    if (instance?.metaKey) {
      this.#decoratorCallbackCache.delete(instance.metaKey);
    }
    this.#decoratorCache.delete(decorator);
  }

  /**
   * 通过key获取装饰器处理方法
   * @description 根据元数据键获取对应的装饰器回调函数信息
   * @param key 元数据定义的键，可以是字符串或 Symbol
   * @returns 装饰器回调缓存值或 undefined
   * @example
   * ```typescript
   * const register = DecoratorRegister.create();
   * const callback = register.getDecoratorCallback('my-decorator-key');
   * if (callback) {
   *   console.log(callback.decoratorType); // 装饰器类型
   *   console.log(callback.fn); // 回调函数
   * }
   * ```
   */
  getDecoratorCallback(key: string | symbol) {
    return this.#decoratorCallbackCache.get(key);
  }
}
