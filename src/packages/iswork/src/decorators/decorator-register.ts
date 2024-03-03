import type { AbstractDecorator } from './abstract-decorator';
import type { TDecoratorCallbackCacheValue } from '../types';
/**
 * 用来注册装饰器
 */
export class DecoratorRegister {
  static instance: DecoratorRegister;
  static create() {
    if (DecoratorRegister.instance) return DecoratorRegister.instance;
    DecoratorRegister.instance = new this();
    return DecoratorRegister.instance;
  }

  readonly #decoratorCache = new Map<new (key?: string | symbol) => AbstractDecorator, AbstractDecorator>();

  readonly #decoratorCallbackCache = new Map<symbol | string, TDecoratorCallbackCacheValue>();
  get decorators() {
    return this.#decoratorCache.values();
  }

  get decoratorCallbacks() {
    return this.#decoratorCallbackCache.values();
  }

  /**
   * 注册装饰器实例
   * @param decorator
   */
  add<Decorator extends AbstractDecorator>(DecoratorClass: new (key?: string | symbol) => Decorator): Decorator {
    let instance = this.get<Decorator>(DecoratorClass);
    if (instance) return instance;
    instance = new DecoratorClass();
    this.#decoratorCache.set(DecoratorClass, instance);
    if (instance.metaKey && instance.callback) {
      const callbackCacheValue: TDecoratorCallbackCacheValue = {
        key: instance.metaKey,
        decoratorType: instance.decoratorType,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        fn: instance.callback,
        type: instance?.callbackType,
      };
      this.#decoratorCallbackCache.set(instance.metaKey, callbackCacheValue);
    }
    return instance;
  }

  /**
   * 根据装饰器类获取装饰器实例
   * @param decorator
   */
  get<Decorator extends AbstractDecorator>(decorator: new (key?: string | symbol) => Decorator): Decorator | undefined {
    return this.#decoratorCache.get(decorator) as Decorator | undefined;
  }

  /**
   * 根据装饰器类删除装饰器实例
   * @param decorator 装饰器类
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
   * @param key metadata定义的key
   */
  getDecoratorCallback(key: string | symbol) {
    return this.#decoratorCallbackCache.get(key);
  }
}
