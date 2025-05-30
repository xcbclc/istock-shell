/**
 * @fileoverview 领域模块核心类
 * @description 提供领域模块的管理和配置功能，包括控制器、提供者、中间件等的管理
 */

import { isObject, ScopeError } from '@istock-shell/util';
import type { DomainClassBase } from '../interfaces/domain';
import type {
  DomainMetadata,
  ControllerBase,
  Provider,
  Middleware,
  DomainOptions,
  DomainControllerMetadataMap,
  DomainControllerMetadata,
  ScanClassMetadata,
  ProviderMeta,
} from '../types';
import { DOMAIN_METADATA, GLOBAL_DOMAIN_METADATA } from '../constants';

/**
 * 领域模块描述类
 * @description 管理领域模块的配置、控制器、提供者、中间件等组件
 * @template DomainClass - 领域类类型，必须继承自 DomainClassBase
 * @example
 * ```typescript
 * // 创建领域实例
 * const domain = Domain.create(MyDomainClass, metadata);
 *
 * // 添加控制器
 * domain.addController(MyController);
 *
 * // 添加中间件
 * domain.addMiddleware(myMiddleware);
 * ```
 */
export class Domain<DomainClass extends DomainClassBase = DomainClassBase> {
  /** 领域名称 */
  readonly #name: string;
  /** 中间件列表 */
  readonly #middleware: Middleware[] = [];
  /** 是否为全局领域 */
  readonly #isGlobal: boolean = false;
  /** 是否为根领域 */
  #isRootDomain: boolean = false;
  /** 父级领域 */
  #parentDomain: Domain | null = null;
  /** 领域类 */
  readonly #domainClass: DomainClass;
  /** 领域元数据 */
  readonly #domainMetadata: Required<DomainMetadata>;
  /** 控制器元数据映射缓存 */
  readonly #controllerMetadataCache: DomainControllerMetadataMap = new Map();
  /** 领域类实例 */
  #domainClassInstance: DomainClass | null = null;

  /**
   * 获取领域名称
   * @returns 领域名称
   */
  get name() {
    return this.#name;
  }

  /**
   * 获取中间件列表
   * @returns 中间件数组
   */
  get middleware() {
    return this.#middleware;
  }

  /**
   * 获取是否为全局领域
   * @returns 是否为全局领域
   */
  get isGlobal() {
    return this.#isGlobal;
  }

  /**
   * 获取是否为根领域
   * @returns 是否为根领域
   */
  get isRootDomain() {
    return this.#isRootDomain;
  }

  /**
   * 设置是否为根领域
   * @param isRootDomain - 是否为根领域
   */
  set isRootDomain(isRootDomain: boolean) {
    this.#isRootDomain = isRootDomain;
  }

  /**
   * 获取父级领域
   * @returns 父级领域实例或 null
   */
  get parentDomain() {
    return this.#parentDomain;
  }

  /**
   * 设置父级领域
   * @param domain - 父级领域实例或 null
   */
  set parentDomain(domain: Domain | null) {
    this.#parentDomain = domain;
  }

  /**
   * 获取领域类
   * @returns 领域类构造函数
   */
  get domainClass() {
    return this.#domainClass;
  }

  /**
   * 获取领域元数据
   * @returns 完整的领域元数据
   */
  get domainMetadata() {
    return this.#domainMetadata;
  }

  /**
   * 获取导入的模块列表
   * @returns 导入模块数组
   */
  get imports() {
    return this.#domainMetadata.imports;
  }

  /**
   * 获取控制器列表
   * @returns 控制器数组
   */
  get controllers() {
    return this.#domainMetadata.controllers;
  }

  /**
   * 获取提供者列表
   * @returns 转换后的提供者数组
   */
  get providers() {
    return this.#domainMetadata.providers.map((provider) => this.#transformProvider(provider));
  }

  /**
   * 获取导出的模块列表
   * @returns 导出模块数组
   */
  get exports() {
    return this.#domainMetadata.exports;
  }

  /**
   * 获取中间件列表
   * @returns 中间件数组
   */
  get middlewares() {
    return this.#domainMetadata.middlewares;
  }

  /**
   * 获取领域类实例
   * @returns 领域类实例或 null
   */
  get domainClassInstance(): DomainClass | null {
    return this.#domainClassInstance;
  }

  /**
   * 获取控制器元数据缓存
   * @returns 控制器元数据映射
   */
  get controllerMetadataCache() {
    return this.#controllerMetadataCache;
  }

  /**
   * 根据领域类和对应的元数据创建 Domain 描述类实例
   * @description 静态工厂方法，用于创建领域实例
   * @template T - 领域类类型，必须继承自 DomainClassBase
   * @param domainClass - 领域类构造函数
   * @param classMetadata - 领域类的扫描元数据
   * @param options - 领域配置选项
   * @returns 创建的领域实例
   * @throws {ScopeError} 当未获取到领域元数据时抛出错误
   * @example
   * ```typescript
   * const domain = Domain.create(MyDomainClass, metadata, {
   *   isRootDomain: true
   * });
   * ```
   */
  static create<T extends DomainClassBase>(
    domainClass: T,
    classMetadata: ScanClassMetadata,
    options: DomainOptions = {}
  ) {
    // 获取是否是全局 domain
    const isGlobal = (classMetadata.get(GLOBAL_DOMAIN_METADATA) as boolean) ?? false;
    const domainMetadata: DomainMetadata = classMetadata.get(DOMAIN_METADATA) as DomainMetadata;
    if (!domainMetadata) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到 domain 元数据');
    }
    return new this<T>(domainClass, domainMetadata, { ...options, isGlobal });
  }

  /**
   * 领域类构造函数
   * @description 初始化领域实例，设置基本属性和元数据
   * @param domainClass - 领域类构造函数
   * @param domainMetadata - 领域元数据配置
   * @param options - 领域配置选项
   * @example
   * ```typescript
   * const domain = new Domain(MyDomainClass, {
   *   name: 'MyDomain',
   *   controllers: [MyController],
   *   providers: [MyService]
   * }, {
   *   isGlobal: false,
   *   isRootDomain: true
   * });
   * ```
   */
  constructor(domainClass: DomainClass, domainMetadata: DomainMetadata, options: DomainOptions = {}) {
    this.#name = domainMetadata.name;
    this.#isGlobal = options.isGlobal ?? false;
    this.#isRootDomain = options.isRootDomain ?? false;
    if (options.parentDomain) this.#parentDomain = options.parentDomain;
    this.#domainClass = domainClass;
    this.#domainMetadata = {
      imports: [],
      providers: [],
      controllers: [],
      exports: [],
      middlewares: [],
      ...domainMetadata,
    };
  }

  /**
   * 添加控制器到领域
   * @description 将控制器添加到当前领域的控制器列表中
   * @param controller - 要添加的控制器类
   * @example
   * ```typescript
   * domain.addController(MyController);
   * ```
   */
  addController(controller: ControllerBase) {
    this.controllers.push(controller);
  }

  /**
   * 添加控制器元数据到缓存
   * @description 将控制器的元数据信息缓存起来，便于后续快速访问
   * @param controller - 控制器类
   * @param metadata - 控制器的元数据信息
   * @example
   * ```typescript
   * domain.addControllerMetadata(MyController, {
   *   routes: [...],
   *   middlewares: [...]
   * });
   * ```
   */
  addControllerMetadata(controller: ControllerBase, metadata: DomainControllerMetadata) {
    this.#controllerMetadataCache.set(controller, metadata);
  }

  /**
   * 从缓存获取控制器元数据
   * @description 根据控制器类获取其缓存的元数据信息
   * @param controller - 控制器类
   * @returns 控制器元数据或 undefined
   * @example
   * ```typescript
   * const metadata = domain.getControllerMetadata(MyController);
   * if (metadata) {
   *   console.log('控制器路由:', metadata.routes);
   * }
   * ```
   */
  getControllerMetadata(controller: ControllerBase) {
    return this.#controllerMetadataCache.get(controller);
  }

  /**
   * 添加提供者到领域
   * @description 将提供者添加到当前领域的提供者列表中
   * @param provider - 要添加的提供者元数据
   * @example
   * ```typescript
   * // 添加类提供者
   * domain.addProvider(MyService);
   *
   * // 添加值提供者
   * domain.addProvider({
   *   provide: 'CONFIG',
   *   useValue: { apiUrl: 'https://api.example.com' }
   * });
   * ```
   */
  addProvider(provider: ProviderMeta) {
    this.#domainMetadata.providers.push(provider);
  }

  /**
   * 添加中间件到领域
   * @description 将中间件添加到当前领域的中间件列表中
   * @param middleware - 要添加的中间件函数
   * @example
   * ```typescript
   * domain.addMiddleware(async (ctx, next) => {
   *   console.log('请求开始');
   *   await next();
   *   console.log('请求结束');
   * });
   * ```
   */
  addMiddleware(middleware: Middleware) {
    this.#middleware.push(middleware);
  }

  /**
   * 转换提供者为标准格式
   * @description 将提供者元数据转换为标准的提供者格式
   * @param provider - 提供者元数据
   * @returns 标准格式的提供者对象
   * @private
   */
  #transformProvider(provider: ProviderMeta): Provider {
    if (isObject(provider)) {
      return provider as Provider;
    } else {
      return { provide: provider, useClass: provider };
    }
  }

  /**
   * 设置领域类实例
   * @description 设置对应领域类的实例，用于依赖注入和生命周期管理
   * @param instance - 领域类的实例
   * @example
   * ```typescript
   * const domainInstance = new MyDomainClass();
   * domain.setDomainClassInstance(domainInstance);
   * ```
   */
  setDomainClassInstance(instance: DomainClass) {
    this.#domainClassInstance = instance;
  }
}
