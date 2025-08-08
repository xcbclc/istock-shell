/**
 * @fileoverview 领域处理器
 * @description 提供领域相关的处理功能，包括控制器解析、方法调用、参数注入等
 */

import { isArray, isNil, isString, isUndefined, ScopeError } from '@istock-shell/util';
import {
  CONTROLLER_METHOD_METADATA,
  DESIGN_PARAMTYPES,
  GLOBAL_SCOPE,
  CONTROLLER_METADATA,
  CONTROLLER_METHOD_COMPONENT_METADATA,
} from '../constants';
import Decorator from '../decorators';
import { IocContainer } from '../ioc';
import type { ApplicationContext } from '../application/context';
import type { DomainClassBase } from '../interfaces';
import type {
  CmdpInfo,
  CmdpResolveInfo,
  ControllerBase,
  ControllerMethodMetadata,
  ControllerMetadata,
  ControllerMethodComponentMetadata,
  ControllerMethodParamMetadata,
} from '../types';
import { DecoratorCallbackType } from '../enums/index';
import { DomainManager } from './domain-manager';

const { ControllerDecorator } = Decorator;

/**
 * 领域处理器类
 * @description 负责处理领域相关的业务逻辑，包括控制器解析、方法调用、参数注入、IoC 容器管理等
 * @example
 * ```typescript
 * const handler = DomainHandler.create();
 *
 * // 添加全局提供者
 * handler.addGlobalProvider();
 *
 * // 获取消息处理器信息
 * const handlerInfo = handler.getMessageHandlerInfo(cmdpResolveInfo);
 * ```
 */
export class DomainHandler {
  /** 领域管理器实例 */
  readonly #domainManager: DomainManager;
  /** IoC 容器实例 */
  readonly #iocContainer: IocContainer;

  /**
   * 创建领域处理器实例
   * @description 创建并返回新的领域处理器实例
   * @returns 领域处理器实例
   * @static
   */
  static create() {
    return new this();
  }

  /**
   * 获取领域管理器
   * @description 返回领域管理器实例
   * @returns 领域管理器实例
   */
  get domainManager() {
    return this.#domainManager;
  }

  /**
   * 领域处理器构造函数
   * @description 初始化领域处理器，创建领域管理器和 IoC 容器实例
   */
  constructor() {
    this.#domainManager = DomainManager.create();
    this.#iocContainer = IocContainer.create();
  }

  /**
   * 向 IoC 容器添加全局提供者
   * @description 将所有领域中的全局提供者添加到 IoC 容器的全局作用域中
   * @example
   * ```typescript
   * handler.addGlobalProvider();
   * // 所有标记为全局的提供者将被添加到容器中
   * ```
   */
  addGlobalProvider() {
    this.#domainManager.domains
      .filter((domain) => domain.isGlobal)
      .forEach((domain) => {
        domain.providers.forEach((provider) => {
          this.#iocContainer.addProvider<any>(provider);
          this.#iocContainer.addScope(GLOBAL_SCOPE, domain.domainClass);
        });

        // 主动实例化全局Domain类，确保constructor执行
        const DomainClass: DomainClassBase<any> = domain.domainClass;
        const domainInstance = this.#iocContainer.inject<typeof DomainClass>({
          provide: DomainClass,
          useClass: DomainClass,
        });
        domain.setDomainClassInstance(domainInstance);
      });
  }

  /**
   * 根据 CMDP 信息解析实例
   * @description 根据 CMDP 解析信息获取对应的 Controller、Controller 实例、Domain、Domain 实例
   * @param cmdpResolveInfo CMDP 解析信息，包含子域名、控制器名等
   * @returns 包含控制器实例、领域实例、控制器类、领域类和领域对象的解析结果
   * @throws {ScopeError} 当找不到对应的领域或控制器时抛出错误
   * @private
   * @example
   * ```typescript
   * const resolveInfo = { subDomain: 'user', controller: 'UserController' };
   * const result = handler.#resolveInstanceByCmdpInfo(resolveInfo);
   * // result: { controller, domainClass, Controller, DomainClass, domain }
   * ```
   */
  #resolveInstanceByCmdpInfo(cmdpResolveInfo: CmdpResolveInfo) {
    // 根据cmdp地址解析出的subDomain查找domain
    const domain = this.#domainManager.domains.find((domain) => {
      return domain.name === cmdpResolveInfo.subDomain;
    });
    if (!domain) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `未找到${cmdpResolveInfo.subDomain}对应的domain`);
    }
    const isGlobal = domain.isGlobal;
    // 提供者添加到ioc容器
    domain.providers.forEach((provider) => {
      this.#iocContainer.addProvider<any>(provider);
      this.#iocContainer.addScope(isGlobal ? GLOBAL_SCOPE : provider.provide, domain.domainClass);
    });
    const DomainClass: DomainClassBase<any> = domain.domainClass;
    // 从ioc容器获取Domain实例
    const domainClass = this.#iocContainer.inject<typeof DomainClass>({
      provide: DomainClass,
      useClass: DomainClass,
    });
    domain.setDomainClassInstance(domainClass);
    // controller元数据与cmdp解析出的相关信息匹配获取到具体处理的Controller类
    const Controller: ControllerBase<any> | undefined = domain.controllers.find((controller) => {
      const controllerDecorator = this.#domainManager.decoratorRegister.get(ControllerDecorator);
      if (!controllerDecorator) return false;
      const controllerMeta = controllerDecorator.getMetadata(controller);
      if (!controllerMeta) return false;
      if (isArray(controllerMeta.alias)) {
        return controllerMeta.alias.includes(cmdpResolveInfo.controller);
      }
      return controllerMeta.alias === cmdpResolveInfo.controller;
    });
    if (!Controller) {
      return { DomainClass, domain, domainClass };
    }
    // 从ioc容器获取Controller实例
    const controller = this.#iocContainer.inject<ControllerBase>({
      provide: Controller,
      useClass: Controller,
    });
    return { DomainClass, domain, domainClass, Controller, controller };
  }

  /**
   * 获取消息处理器信息
   * @description 根据 Controller 类方法的所有元数据和 CMDP 方法名，解析出真实方法和参数
   * @param cmdpResolveInfo CMDP 解析信息，包含子域名、控制器名、方法名等
   * @returns 消息处理器信息，包含控制器实例、方法名、参数列表、回调函数等
   * @throws {ScopeError} 当未获取到控制器元数据或方法元数据时抛出错误
   * @example
   * ```typescript
   * const resolveInfo = {
   *   subDomain: 'user',
   *   controller: 'UserController',
   *   method: 'getUserInfo'
   * };
   * const handlerInfo = handler.getMessageHandlerInfo(resolveInfo);
   * // handlerInfo 包含处理消息所需的所有信息
   * ```
   */
  getMessageHandlerInfo(cmdpResolveInfo: CmdpResolveInfo) {
    const { domain, Controller, controller } = this.#resolveInstanceByCmdpInfo(cmdpResolveInfo);
    if (!Controller || !controller) {
      return {
        domain,
        middlewares: [...domain.middlewares],
      };
    }
    const cmdpMethod = cmdpResolveInfo.method;
    const controllerMeta = domain.getControllerMetadata(Controller);
    if (!controllerMeta) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到控制器元数据');
    }
    const methodMetas = Array.from(controllerMeta.method.entries());
    // 根据cmdp信息方法名获取方法装饰器的元数据
    const methodMeta = methodMetas.find(([propertyKey, methodMeta]) => {
      const { info } = methodMeta;
      const meta = info[CONTROLLER_METHOD_METADATA] as ControllerMethodMetadata | undefined;
      const alias = meta?.alias;
      // 如果没有设置别名，直接对比方法名
      if (isUndefined(alias)) {
        return propertyKey === cmdpMethod;
      }
      // 别名对比cmdp方法
      return (isString(alias) && alias === cmdpMethod) || (isArray(alias) && alias.includes(cmdpMethod));
    });
    if (!methodMeta || methodMeta.length < 2) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到控制方法元数据');
    }
    const [propertyKey, methodMetaMapValue] = methodMeta;
    const decoratorCallbacks = this.#domainManager.decoratorCallbacks;

    let controllerMetadata: ControllerMetadata | undefined; // 部分参数需要给方法装饰器使用
    // 组装控制器装饰器回调函数
    const controllerCallback = (ctx: ApplicationContext, cmdpInfo: CmdpInfo) => {
      for (const [metaKey, meta] of controllerMeta.class) {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (metaKey === CONTROLLER_METADATA) {
          controllerMetadata = meta as ControllerMetadata | undefined;
        }
        if (callback?.fn) {
          const fn = callback.fn?.call(this, meta);
          fn?.(ctx, cmdpInfo);
        }
      }
    };

    const methodMetaList = [...methodMetaMapValue.list].reverse();
    // 组装控制器方法装饰器回调函数
    const methodCallback = (ctx: ApplicationContext, cmdpInfo: CmdpInfo) => {
      methodMetaList.forEach(([metaKey, meta]) => {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (callback?.fn && callback?.type === DecoratorCallbackType.MethodRequest) {
          const fn = callback.fn?.call(this, meta);
          fn?.(ctx, cmdpInfo);
        }
      });
    };

    // 组装控制器方法返回装饰器回调函数
    const methodReturnCallback = (ctx: ApplicationContext, cmdpInfo: CmdpInfo, response: unknown) => {
      methodMetaList.forEach(([metaKey, meta]) => {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (callback?.fn && callback?.type === DecoratorCallbackType.MethodResponse) {
          const fn = callback.fn?.call(this, meta);
          if (fn) {
            response = fn(ctx, cmdpInfo, response);
          }
        }
      });
      // 没有组件装饰器并控制器上有该装饰器配置，需要让控制器上的配置生效
      let componentMeta = methodMetaMapValue.info[CONTROLLER_METHOD_COMPONENT_METADATA] as
        | ControllerMethodComponentMetadata
        | undefined;
      if (!componentMeta && controllerMetadata?.component) {
        componentMeta = controllerMetadata.component;
        const componentCallback = this.domainManager.getDecoratorCallback(CONTROLLER_METHOD_COMPONENT_METADATA);
        if (componentCallback?.fn && componentMeta) {
          const fn = componentCallback.fn?.call(this, [componentMeta]);
          if (fn) {
            response = fn(ctx, cmdpInfo, response);
          }
        }
      }
      return response;
    };

    // 解析参数上的装饰器
    const designParamtypes = methodMetaMapValue.info[DESIGN_PARAMTYPES] as number[] | undefined;
    const methodParams: Function[] = new Array(designParamtypes?.length ?? 0)
      .fill(undefined)

      .map((_value, index) => {
        const { info } = methodMetaMapValue;
        // 参数装饰器回调信息查找
        const callback = decoratorCallbacks.parameters.find((callback) => {
          const callbackMeta = info?.[callback.key] as ControllerMethodParamMetadata | undefined;
          return !isNil(callbackMeta?.[index]);
        });
        if (callback?.fn) {
          const { key, fn } = callback;
          const callbackMeta = info?.[key] as ControllerMethodParamMetadata;
          return fn(callbackMeta[index]);
        }
        if (index === 0) return (ctx: ApplicationContext) => ctx;
        if (index === 1) return (_ctx: ApplicationContext, cmdpInfo: CmdpInfo) => cmdpInfo;
      });

    return {
      domain,
      controller,
      controllerCallback,
      methodProperty: propertyKey,
      methodCallback,
      methodReturnCallback,
      methodParams,
      middlewares: [...domain.middlewares],
    };
  }
}
