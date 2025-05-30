/**
 * @fileoverview IoC 依赖注入容器
 * @description 提供依赖注入容器的核心实现，支持类、值、工厂等多种提供者类型
 */

import { ScopeError } from '@istock-shell/util';
import {
  isClassProvider,
  isValueProvider,
  isFactoryProvider,
  isProvider,
  ProviderCache,
  InstanceCache,
  ProviderScopeCache,
} from './provider';
import type { ValueProvider, ClassProvider, FactoryProvider, AnyClass, DomainClassBase } from '../interfaces';
import type { InjectionToken, Provider } from '../types';
import { DESIGN_PARAMTYPES, GLOBAL_SCOPE } from '../constants';
import { getInjectMetadata } from './decorators';

/**
 * IoC 依赖注入容器
 * @description 管理依赖注入的核心容器，支持提供者注册、实例创建和作用域管理
 * @example
 * ```typescript
 * // 创建容器
 * const container = IocContainer.create();
 *
 * // 添加提供者
 * container.addProvider({
 *   provide: MyService,
 *   useClass: MyService
 * });
 *
 * // 注入实例
 * const service = container.inject(MyService);
 * ```
 */
export class IocContainer {
  /** 提供者缓存 */
  readonly #providers = new ProviderCache();
  /** 实例缓存 */
  readonly #instances = new InstanceCache();
  /** 作用域缓存 */
  readonly #scopes = new ProviderScopeCache();

  /**
   * 创建 IoC 容器实例
   * @description 静态工厂方法，用于创建新的容器实例
   * @returns 新的 IoC 容器实例
   * @example
   * ```typescript
   * const container = IocContainer.create();
   * ```
   */
  static create() {
    return new this();
  }

  /**
   * IoC 容器构造函数
   * @description 初始化容器，设置全局作用域
   */
  constructor() {
    this.#scopes.set(GLOBAL_SCOPE, []);
  }

  /**
   * 添加作用域
   * @description 为指定令牌添加领域类到作用域中
   * @template Class - 类类型，默认为 DomainClassBase
   * @param token - 注入令牌
   * @param domainClass - 领域类
   * @example
   * ```typescript
   * container.addScope(MyService, MyDomain);
   * ```
   */
  addScope<Class = DomainClassBase>(token: InjectionToken<Class>, domainClass: DomainClassBase) {
    const domainClassArr = this.#scopes.get(token) ?? [];
    if (!domainClassArr.includes(domainClass)) {
      domainClassArr.push(domainClass);
      this.#scopes.set(token, domainClassArr);
    }
  }

  /**
   * 获取提供者
   * @description 根据注入令牌获取对应的提供者
   * @template Class - 类类型，必须继承自 AnyClass
   * @param token - 注入令牌
   * @returns 提供者实例或 undefined
   * @example
   * ```typescript
   * const provider = container.getProvider(MyService);
   * ```
   */
  getProvider<Class extends AnyClass>(token: InjectionToken<Class>): Provider | undefined {
    return this.#providers.get(token);
  }

  /**
   * 添加提供者
   * @description 将提供者添加到容器中，如果已存在则跳过
   * @template Class - 类类型，必须继承自 AnyClass
   * @param provider - 要添加的提供者
   * @throws {ScopeError} 当参数不是有效提供者时抛出错误
   * @example
   * ```typescript
   * // 添加类提供者
   * container.addProvider({
   *   provide: MyService,
   *   useClass: MyService
   * });
   *
   * // 添加值提供者
   * container.addProvider({
   *   provide: 'CONFIG',
   *   useValue: { apiUrl: 'https://api.example.com' }
   * });
   * ```
   */
  addProvider<Class extends AnyClass>(provider: Provider<Class>) {
    if (!isProvider(provider)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `添加的参数不是一个提供者：${JSON.stringify(provider)}`);
    }
    if (this.getProvider(provider.provide)) {
      return;
    }
    this.#providers.set(provider.provide, provider);
  }

  /**
   * 依赖注入操作
   * @description 支持通过令牌或提供者进行依赖注入，返回对应的实例
   * @template Class - 类类型，必须继承自 AnyClass
   * @param provider - 提供者对象
   * @returns 注入的实例
   * @overload
   */
  inject<Class extends AnyClass>(provider: Provider<Class>): Class;
  /**
   * 依赖注入操作
   * @description 支持通过令牌或提供者进行依赖注入，返回对应的实例
   * @template Class - 类类型，必须继承自 AnyClass
   * @param token - 注入令牌
   * @returns 注入的实例
   * @overload
   */
  inject<Class extends AnyClass>(token: InjectionToken<Class>): Class;
  /**
   * 依赖注入操作实现
   * @description 支持通过令牌或提供者进行依赖注入，返回对应的实例
   * @template Class - 类类型，必须继承自 AnyClass
   * @param tokenAsProvider - 注入令牌或提供者对象
   * @returns 注入的实例
   * @throws {ScopeError} 当提供者不存在时抛出错误
   * @example
   * ```typescript
   * // 通过令牌注入
   * const service = container.inject(MyService);
   *
   * // 通过提供者注入
   * const service = container.inject({
   *   provide: MyService,
   *   useClass: MyService
   * });
   * ```
   */
  inject<Class extends AnyClass>(tokenAsProvider: Provider<Class> | InjectionToken<Class>): Class {
    let provider: Provider<Class>;
    if (isProvider(tokenAsProvider)) {
      provider = tokenAsProvider as Provider<Class>;
    } else {
      provider = this.#providers.get(tokenAsProvider as InjectionToken<Class>) as Provider<Class>;
      if (!provider) {
        throw new ScopeError(`iswork.${this.constructor.name}`, `缓存中未获取到该提供者：${JSON.stringify(provider)}`);
      }
    }
    return this.#injectWithProvider<Class>(provider);
  }

  /**
   * 通过提供者进行注入操作
   * @description 根据提供者类型执行相应的注入逻辑，支持单例模式
   * @template Class - 类类型，必须继承自 AnyClass
   * @param provider - 提供者对象
   * @returns 注入的实例
   * @throws {ScopeError} 当提供者无效或类型不支持时抛出错误
   * @private
   */
  #injectWithProvider<Class extends AnyClass>(provider: Provider<Class>): Class {
    if (provider === undefined) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `未获取到提供者：${JSON.stringify(provider)}`);
    }
    let instance: AnyClass | undefined = this.#instances.get(provider.provide);
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
   * @description 通过类提供者创建实例，自动解析构造函数依赖
   * @template Class - 类类型，必须继承自 AnyClass
   * @param classProvider - 类提供者对象
   * @returns 创建的类实例
   * @private
   */
  #injectClass<Class extends AnyClass>(classProvider: ClassProvider<Class>): Class {
    const target = classProvider.useClass;
    const params = this.#getInjectedParams(target);
    return Reflect.construct(target, params);
  }

  /**
   * 值类型提供者注入
   * @description 直接返回值提供者中的值
   * @template Class - 类类型，必须继承自 AnyClass
   * @param valueProvider - 值提供者对象
   * @returns 提供者中的值
   * @private
   */
  #injectValue<Class extends AnyClass>(valueProvider: ValueProvider<Class>): Class {
    return valueProvider.useValue;
  }

  /**
   * 工厂类型提供者注入
   * @description 调用工厂函数创建实例
   * @template Class - 类类型，必须继承自 AnyClass
   * @param factoryProvider - 工厂提供者对象
   * @returns 工厂函数创建的实例
   * @private
   */
  #injectFactory<Class extends AnyClass>(factoryProvider: FactoryProvider<Class>): Class {
    return factoryProvider.useFactory();
  }

  /**
   * 获取构造函数注入参数
   * @description 解析类的构造函数参数，自动注入依赖项
   * @template Class - 类类型，必须继承自 AnyClass
   * @param target - 需要注入参数的目标类
   * @returns 注入参数数组
   * @throws {ScopeError} 当存在循环依赖时抛出错误
   * @private
   */
  #getInjectedParams<Class extends AnyClass>(target: Class) {
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
      if (provider) return this.#injectWithProvider<Class>(provider as Provider<Class>);
      return argType;
    });
  }
}
