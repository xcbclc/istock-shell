import { isArray, isNil, isString, isUndefined, ScopeError } from '@istock/util';
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
import type { IDomainClass } from '../interfaces';
import type {
  TCmdpInfo,
  TCmdpResolveInfo,
  TController,
  TControllerMethodMetadata,
  TControllerMetadata,
  TControllerMethodComponentMetadata,
  TControllerMethodParamMetadata,
} from '../types';
import { EDecoratorCallbackType } from '../enums/index';
import { DomainManager } from './domain-manager';

const { ControllerDecorator } = Decorator;

/**
 * domain相关处理
 */
export class DomainHandler {
  readonly #domainManager: DomainManager;
  readonly #iocContainer: IocContainer;

  static create() {
    return new this();
  }

  get domainManager() {
    return this.#domainManager;
  }

  constructor() {
    this.#domainManager = DomainManager.create();
    this.#iocContainer = IocContainer.create();
  }

  /**
   * 向ioc容器添加全局提供者
   */
  addGlobalProvider() {
    this.#domainManager.domains
      .filter((domain) => domain.isGlobal)
      .forEach((domain) => {
        domain.providers.forEach((provider) => {
          this.#iocContainer.addProvider<any>(provider);
          this.#iocContainer.addScope(GLOBAL_SCOPE, domain.domainClass);
        });
      });
  }

  /**
   * 根据cmdp信息获取到处理该消息对应的Controller、Controller实例、Domain、Domain实例
   * @param cmdpResolveInfo
   */
  #resolveInstanceByCmdpInfo(cmdpResolveInfo: TCmdpResolveInfo) {
    // 根据cmdp地址解析出的subDomain查找domain
    const domain = this.#domainManager.domains.find((domain) => {
      return domain.name === cmdpResolveInfo.subDomain;
    });
    if (!domain) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `未找到${cmdpResolveInfo.subDomain}对应的domain`);
    }
    // controller元数据与cmdp解析出的相关信息匹配获取到具体处理的Controller类
    const Controller: TController<any> | undefined = domain.controllers.find((controller) => {
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
      throw new ScopeError(`iswork.${this.constructor.name}`, `未找到${cmdpResolveInfo.controller}对应的Controller`);
    }
    const isGlobal = domain.isGlobal;
    // 提供者添加到ioc容器
    domain.providers.forEach((provider) => {
      this.#iocContainer.addProvider<any>(provider);
      this.#iocContainer.addScope(isGlobal ? GLOBAL_SCOPE : provider.provide, domain.domainClass);
    });
    // 从ioc容器获取Controller实例
    const controller = this.#iocContainer.inject<TController>({
      provide: Controller,
      useClass: Controller,
    });
    const DomainClass: IDomainClass<any> = domain.domainClass;
    // 从ioc容器获取Domain实例
    const domainClass = this.#iocContainer.inject<typeof DomainClass>({
      provide: DomainClass,
      useClass: DomainClass,
    });
    domain.setDomainClassInstance(domainClass);
    return { controller, domainClass, Controller, DomainClass, domain };
  }

  /**
   * 根据Controller类方法所有的元数据和cmdp方法名，解析出真实方法和参数
   * @param cmdpResolveInfo 解析的必要参数
   */
  getMessageHandlerInfo(cmdpResolveInfo: TCmdpResolveInfo) {
    const { Controller, domain, controller } = this.#resolveInstanceByCmdpInfo(cmdpResolveInfo);
    const cmdpMethod = cmdpResolveInfo.method;
    const controllerMeta = domain.getControllerMetadata(Controller);
    if (!controllerMeta) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到控制器元数据');
    }
    const methodMetas = Array.from(controllerMeta.method.entries());
    // 根据cmdp信息方法名获取方法装饰器的元数据
    const methodMeta = methodMetas.find(([propertyKey, methodMeta]) => {
      const { info } = methodMeta;
      const meta = info[CONTROLLER_METHOD_METADATA] as TControllerMethodMetadata | undefined;
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

    let controllerMetadata: TControllerMetadata | undefined; // 部分参数需要给方法装饰器使用
    // 组装控制器装饰器回调函数
    const controllerCallback = (ctx: ApplicationContext, cmdpInfo: TCmdpInfo) => {
      for (const [metaKey, meta] of controllerMeta.class) {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (metaKey === CONTROLLER_METADATA) {
          controllerMetadata = meta as TControllerMetadata | undefined;
        }
        if (callback?.fn) {
          const fn = callback.fn?.call(this, meta);
          fn?.(ctx, cmdpInfo);
        }
      }
    };

    const methodMetaList = [...methodMetaMapValue.list].reverse();
    // 组装控制器方法装饰器回调函数
    const methodCallback = (ctx: ApplicationContext, cmdpInfo: TCmdpInfo) => {
      methodMetaList.forEach(([metaKey, meta]) => {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (callback?.fn && callback?.type === EDecoratorCallbackType.MethodRequest) {
          const fn = callback.fn?.call(this, meta);
          fn?.(ctx, cmdpInfo);
        }
      });
    };

    // 组装控制器方法返回装饰器回调函数
    const methodReturnCallback = (ctx: ApplicationContext, cmdpInfo: TCmdpInfo, response: unknown) => {
      methodMetaList.forEach(([metaKey, meta]) => {
        const callback = this.domainManager.getDecoratorCallback(metaKey);
        if (callback?.fn && callback?.type === EDecoratorCallbackType.MethodResponse) {
          const fn = callback.fn?.call(this, meta);
          if (fn) {
            response = fn(ctx, cmdpInfo, response);
          }
        }
      });
      // 没有组件装饰器并控制器上有该装饰器配置，需要让控制器上的配置生效
      let componentMeta = methodMetaMapValue.info[CONTROLLER_METHOD_COMPONENT_METADATA] as
        | TControllerMethodComponentMetadata
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
      // eslint-disable-next-line array-callback-return
      .map((_value, index) => {
        const { info } = methodMetaMapValue;
        // 参数装饰器回调信息查找
        const callback = decoratorCallbacks.parameters.find((callback) => {
          const callbackMeta = info?.[callback.key] as TControllerMethodParamMetadata | undefined;
          return !isNil(callbackMeta?.[index]);
        });
        if (callback?.fn) {
          const { key, fn } = callback;
          const callbackMeta = info?.[key] as TControllerMethodParamMetadata;
          return fn(callbackMeta[index]);
        }
        if (index === 0) return (ctx: ApplicationContext) => ctx;
        if (index === 1) return (_ctx: ApplicationContext, cmdpInfo: TCmdpInfo) => cmdpInfo;
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
