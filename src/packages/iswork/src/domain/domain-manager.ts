import { isBoolean, isFunction, ScopeError } from '@istock/util';
import { decoratorRegister } from '../decorators';
import type { IDomainClass } from '../interfaces';
import type { TController, TDecoratorCallbackCacheValue, TProvider } from '../types';
import { MetadataScanner } from '../scanner';
import { EDecoratorType } from '../enums';
import { DomainCache } from './domain-cache';
import { Domain } from './domain';

export class DomainManager {
  static readonly #scanner: typeof MetadataScanner = MetadataScanner;
  static readonly #domainCache: DomainCache = DomainCache.create();
  static readonly #decoratorRegister = decoratorRegister;
  static create() {
    return new this();
  }

  get domains() {
    return Array.from(DomainManager.#domainCache.values());
  }

  get decoratorRegister() {
    return DomainManager.#decoratorRegister;
  }

  get decoratorCallbacks() {
    const classs: TDecoratorCallbackCacheValue[] = [];
    const propertys: TDecoratorCallbackCacheValue[] = [];
    const methods: TDecoratorCallbackCacheValue[] = [];
    const parameters: TDecoratorCallbackCacheValue[] = [];
    for (const cacheValue of this.decoratorRegister.decoratorCallbacks) {
      switch (cacheValue.decoratorType) {
        case EDecoratorType.Class:
          classs.push(cacheValue);
          break;
        case EDecoratorType.Property:
          propertys.push(cacheValue);
          break;
        case EDecoratorType.Method:
          methods.push(cacheValue);
          break;
        case EDecoratorType.Parameter:
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
  scanDomain(domainClass: IDomainClass, previousDomain?: Domain): void;
  scanDomain(domainClass: IDomainClass, isRootDomain?: boolean): void;
  scanDomain(domainClass: IDomainClass, rootOrPrevious?: Domain | boolean): void {
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
          if (parentDomain.controllers.includes(domainExport as TController)) {
            parentDomain.addController(domainExport as TController);
          }
          if (parentDomain.providers.includes(domainExport as TProvider)) {
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
  scanControllerMeta(Controller: TController) {
    return DomainManager.#scanner.scanClassMetadata(Controller);
  }

  /**
   * 获取Controller所有方法所有元数据
   * @param Controller
   */
  scanControllerMethodMeta(Controller: TController) {
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
  getDomain<T extends IDomainClass>(name: string) {
    return this.domains.find<Domain<T>>((domain): domain is Domain<T> => {
      return domain.name === name;
    });
  }
}
