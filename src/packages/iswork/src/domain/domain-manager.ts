/**
 * @fileoverview 领域管理器
 * @description 提供领域模块的管理功能，包括领域注册、扫描、缓存等
 */
import { isBoolean, isFunction, ScopeError } from '@istock-shell/util';
import { decoratorRegister } from '../decorators';
import type { DomainClassBase } from '../interfaces';
import type { ControllerBase, DecoratorCallbackCacheValue, Provider } from '../types';
import { MetadataScanner } from '../scanner';
import { DecoratorType } from '../enums';
import { DomainCache } from './domain-cache';
import { Domain } from './domain';

/**
 * 领域管理器类
 * @description 负责管理所有领域模块，提供领域注册、扫描、缓存和装饰器回调管理功能
 * @example
 * ```typescript
 * const manager = DomainManager.create();
 *
 * // 注册领域
 * manager.register(MyDomainClass);
 *
 * // 获取所有领域
 * const domains = manager.domains;
 *
 * // 获取装饰器回调
 * const callbacks = manager.decoratorCallbacks;
 * ```
 */
export class DomainManager {
  /** 元数据扫描器 */
  static readonly #scanner: typeof MetadataScanner = MetadataScanner;
  /** 领域缓存实例 */
  static readonly #domainCache: DomainCache = DomainCache.create();
  /** 装饰器注册器实例 */
  static readonly #decoratorRegister = decoratorRegister;

  /**
   * 创建领域管理器实例
   * @description 创建并返回新的领域管理器实例
   * @returns 领域管理器实例
   * @static
   */
  static create() {
    return new this();
  }

  /**
   * 获取所有领域实例
   * @description 返回当前缓存中的所有领域实例数组
   * @returns 领域实例数组
   */
  get domains() {
    return Array.from(DomainManager.#domainCache.values());
  }

  /**
   * 获取装饰器注册器
   * @description 返回装饰器注册器实例
   * @returns 装饰器注册器实例
   */
  get decoratorRegister() {
    return DomainManager.#decoratorRegister;
  }

  /**
   * 获取分类的装饰器回调
   * @description 将装饰器回调按类型分类返回
   * @returns 包含不同类型装饰器回调的对象
   * @throws {ScopeError} 当遇到未知装饰器类型时抛出错误
   * @example
   * ```typescript
   * const callbacks = manager.decoratorCallbacks;
   * console.log('类装饰器:', callbacks.classs);
   * console.log('方法装饰器:', callbacks.methods);
   * ```
   */
  get decoratorCallbacks() {
    const classs: DecoratorCallbackCacheValue[] = [];
    const propertys: DecoratorCallbackCacheValue[] = [];
    const methods: DecoratorCallbackCacheValue[] = [];
    const parameters: DecoratorCallbackCacheValue[] = [];
    for (const cacheValue of this.decoratorRegister.decoratorCallbacks) {
      switch (cacheValue.decoratorType) {
        case DecoratorType.Class:
          classs.push(cacheValue);
          break;
        case DecoratorType.Property:
          propertys.push(cacheValue);
          break;
        case DecoratorType.Method:
          methods.push(cacheValue);
          break;
        case DecoratorType.Parameter:
          parameters.push(cacheValue);
          break;
        default:
          throw new ScopeError(`iswork.${this.constructor.name}`, '获取装饰器回调时，遇到未知装饰器类型');
      }
    }
    return { classs, propertys, methods, parameters };
  }

  /**
   * 扫描domain包含的所有信息并存入缓存
   * @param domainClass
   */
  scanDomain(domainClass: DomainClassBase, previousDomain?: Domain): void;
  scanDomain(domainClass: DomainClassBase, isRootDomain?: boolean): void;
  scanDomain(domainClass: DomainClassBase, rootOrPrevious?: Domain | boolean): void {
    if (DomainManager.#domainCache.has(domainClass)) {
      // 已被扫描
      return;
    }
    // 获取domain类所有元数据
    const metadatas = DomainManager.#scanner.scanClassMetadata(domainClass);
    // 创建domain描述类实例
    const domain = Domain.create(domainClass, metadatas);
    // 扫描controller类元数据和方法元数据，并缓存到domain描述类实例中统一管理
    domain.controllers.forEach((Controller) => {
      const controllerMetadata = this.scanControllerMeta(Controller);
      const controllerMethodData = this.scanControllerMethodMeta(Controller);
      domain.addControllerMetadata(Controller, {
        class: controllerMetadata,
        method: controllerMethodData,
      });
    });
    if (isBoolean(rootOrPrevious)) {
      domain.isRootDomain = rootOrPrevious;
    }
    if (isFunction(rootOrPrevious)) {
      const parentDomain = rootOrPrevious as Domain;
      if (parentDomain.exports) {
        // 导出可以是控制器和提供者，遍历导出列表添加控制器和提供者
        parentDomain.exports.forEach((domainExport) => {
          if (parentDomain.controllers.includes(domainExport as ControllerBase)) {
            parentDomain.addController(domainExport as ControllerBase);
          }
          if (parentDomain.providers.includes(domainExport as Provider)) {
            parentDomain.addProvider(domainExport);
          }
        });
      }
      domain.parentDomain = parentDomain;
    }
    // 递归调用导入的domain
    domain.imports.forEach((domainImport) => {
      this.scanDomain(domainImport, domain);
    });

    DomainManager.#domainCache.set(domainClass, domain);
  }

  /**
   * 获取Controller所有元数据
   * @param Controller
   */
  scanControllerMeta(Controller: ControllerBase) {
    return DomainManager.#scanner.scanClassMetadata(Controller);
  }

  /**
   * 获取Controller所有方法所有元数据
   * @param Controller
   */
  scanControllerMethodMeta(Controller: ControllerBase) {
    return DomainManager.#scanner.scanMethodMetadata(Controller);
  }

  /**
   * 通过key获取装饰器处理方法
   * @param metaKey
   */
  getDecoratorCallback(metaKey: symbol | string) {
    return DomainManager.#decoratorRegister.getDecoratorCallback(metaKey);
  }

  /**
   * 根据名称获取domain
   */
  getDomain<T extends DomainClassBase>(name: string) {
    return this.domains.find<Domain<T>>((domain): domain is Domain<T> => {
      return domain.name === name;
    });
  }
}
