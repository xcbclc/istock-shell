import { ScopeError } from '@istock/util';
import {
  isClassProvider,
  isValueProvider,
  isFactoryProvider,
  isProvider,
  ProviderCache,
  InstanceCache,
  ProviderScopeCache,
} from './provider';
import type { IValueProvider, IClassProvider, IFactoryProvider, IAnyClass, IDomainClass } from '../interfaces';
import type { TInjectionToken, TProvider } from '../types';
import { DESIGN_PARAMTYPES, GLOBAL_SCOPE } from '../constants';
import { getInjectMetadata } from './decorators';

/**
 * 注入容器简单实现
 */
export class IocContainer {
  readonly #providers = new ProviderCache();

  readonly #instances = new InstanceCache();

  readonly #scopes = new ProviderScopeCache();

  static create() {
    return new this();
  }

  constructor() {
    this.#scopes.set(GLOBAL_SCOPE, []);
  }

  addScope<Class = IDomainClass>(token: TInjectionToken<Class>, domainClass: IDomainClass) {
    const domainClassArr = this.#scopes.get(token) ?? [];
    if (!domainClassArr.includes(domainClass)) {
      domainClassArr.push(domainClass);
      this.#scopes.set(token, domainClassArr);
    }
  }

  getProvider<Class extends IAnyClass>(token: TInjectionToken<Class>): TProvider | undefined {
    return this.#providers.get(token);
  }

  addProvider<Class extends IAnyClass>(provider: TProvider<Class>) {
    if (!isProvider(provider)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `添加的参数不是一个提供者：${JSON.stringify(provider)}`);
    }
    if (this.getProvider(provider.provide)) {
      return;
    }
    this.#providers.set(provider.provide, provider);
  }

  /**
   * 注入操作，支持token和provider两种方式
   * @param provider
   */
  inject<Class extends IAnyClass>(provider: TProvider<Class>): Class;
  inject<Class extends IAnyClass>(token: TInjectionToken<Class>): Class;
  inject<Class extends IAnyClass>(tokenAsProvider: TProvider<Class> | TInjectionToken<Class>): Class {
    let provider: TProvider<Class>;
    if (isProvider(tokenAsProvider)) {
      provider = tokenAsProvider as TProvider<Class>;
    } else {
      provider = this.#providers.get(tokenAsProvider as TInjectionToken<Class>) as TProvider<Class>;
      if (!provider) {
        throw new ScopeError(`iswork.${this.constructor.name}`, `缓存中未获取到该提供者：${JSON.stringify(provider)}`);
      }
    }
    return this.#injectWithProvider<Class>(provider);
  }

  /**
   * 提供者注入操作
   * @param provider
   * @private
   */
  #injectWithProvider<Class extends IAnyClass>(provider: TProvider<Class>): Class {
    if (provider === undefined) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `未获取到提供者：${JSON.stringify(provider)}`);
    }
    let instance: IAnyClass | undefined = this.#instances.get(provider.provide);
    if (instance) return instance as Class;
    if (isClassProvider(provider)) {
      instance = this.#injectClass<Class>(provider);
    }
    if (isValueProvider(provider)) {
      instance = this.#injectValue<Class>(provider);
    }
    if (isFactoryProvider(provider)) {
      instance = this.#injectFactory<Class>(provider);
    }
    if (!instance) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `不存在该类型提供者${JSON.stringify(provider)}`);
    }
    this.#instances.set(provider.provide, instance);
    return instance as Class;
  }

  /**
   * 类类型提供者注入
   * @param classProvider
   * @private
   */
  #injectClass<Class extends IAnyClass>(classProvider: IClassProvider<Class>): Class {
    const target = classProvider.useClass;
    const params = this.#getInjectedParams(target);
    return Reflect.construct(target, params);
  }

  /**
   * 值类型提供者注入
   * @param valueProvider
   * @private
   */
  #injectValue<Class extends IAnyClass>(valueProvider: IValueProvider<Class>): Class {
    return valueProvider.useValue;
  }

  /**
   * 工厂类型提供者注入
   * @param factoryProvider
   * @private
   */
  #injectFactory<Class extends IAnyClass>(factoryProvider: IFactoryProvider<Class>): Class {
    return factoryProvider.useFactory();
  }

  /**
   * 获取注入参数
   * @param target 需要注入参数的类
   */
  #getInjectedParams<Class extends IAnyClass>(target: Class) {
    const paramTypes = Reflect.getMetadata(DESIGN_PARAMTYPES, target) as unknown[] | undefined;
    if (!paramTypes) return [];
    const tokens = getInjectMetadata(target, 'constructor') ?? [];
    return paramTypes.map((argType, index) => {
      // 在遇到循环依赖时，reflect-metadata API会失效，返回undefined
      if (argType === undefined) {
        throw new ScopeError(
          `iswork.${this.constructor.name}`,
          `存在循环依赖，注入失败。${JSON.stringify(target)}, ${argType}`
        );
      }
      const token = tokens[index];
      const actualToken: any = token ?? argType;
      const provider = this.#providers.get(actualToken);
      if (provider) return this.#injectWithProvider<Class>(provider as TProvider<Class>);
      return argType;
    });
  }
}
