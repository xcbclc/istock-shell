import { isObject, ScopeError } from '@istock/util';
import type { IDomainClass } from '../interfaces/domain';
import type {
  TDomainMetadata,
  TController,
  TProvider,
  TMiddleware,
  TDomainOptions,
  TDomainControllerMetadataMap,
  TDomainControllerMetadata,
  TScanClassMetadata,
  TProviderMeta,
} from '../types';
import { DOMAIN_METADATA, GLOBAL_DOMAIN_METADATA } from '../constants';

/**
 * Domain 描述类
 */
export class Domain<DomainClass extends IDomainClass = IDomainClass> {
  /** Domain名称 */
  readonly #name: string;
  /** 中间件列表 */
  readonly #middleware: TMiddleware[] = [];
  readonly #isGlobal: boolean = false;
  #isRootDomain: boolean = false;
  #parentDomain: Domain | null = null;
  readonly #domainClass: DomainClass;
  /** Domain 元数据 */
  readonly #domainMetadata: Required<TDomainMetadata>;
  /** 控制器元数据映射 */
  readonly #controllerMetadataCache: TDomainControllerMetadataMap = new Map();

  #domainClassInstance: DomainClass | null = null;

  get name() {
    return this.#name;
  }

  get middleware() {
    return this.#middleware;
  }

  get isGlobal() {
    return this.#isGlobal;
  }

  get isRootDomain() {
    return this.#isRootDomain;
  }

  set isRootDomain(isRootDomain: boolean) {
    this.#isRootDomain = isRootDomain;
  }

  get parentDomain() {
    return this.#parentDomain;
  }

  set parentDomain(domain: Domain | null) {
    this.#parentDomain = domain;
  }

  get domainClass() {
    return this.#domainClass;
  }

  get domainMetadata() {
    return this.#domainMetadata;
  }

  get imports() {
    return this.#domainMetadata.imports;
  }

  get controllers() {
    return this.#domainMetadata.controllers;
  }

  get providers() {
    return this.#domainMetadata.providers.map((provider) => this.#transformProvider(provider));
  }

  get exports() {
    return this.#domainMetadata.exports;
  }

  get middlewares() {
    return this.#domainMetadata.middlewares;
  }

  get domainClassInstance(): DomainClass | null {
    return this.#domainClassInstance;
  }

  get controllerMetadataCache() {
    return this.#controllerMetadataCache;
  }

  /**
   * 根据 domain 类和对应的元数据创建 Domain 描述类实例
   * @param domainClass Domain 类
   * @param classMetadata Domain 类的元数据
   * @returns Domain 实例
   */
  static create<T extends IDomainClass>(
    domainClass: T,
    classMetadata: TScanClassMetadata,
    options: TDomainOptions = {}
  ) {
    // 获取是否是全局 domain
    const isGlobal = (classMetadata.get(GLOBAL_DOMAIN_METADATA) as boolean) ?? false;
    const domainMetadata: TDomainMetadata = classMetadata.get(DOMAIN_METADATA) as TDomainMetadata;
    if (!domainMetadata) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到 domain 元数据');
    }
    return new this<T>(domainClass, domainMetadata, { ...options, isGlobal });
  }

  /**
   * 构造函数
   * @param domainClass Domain 类
   * @param domainMetadata Domain 元数据
   * @param options Domain 配置选项
   */
  constructor(domainClass: DomainClass, domainMetadata: TDomainMetadata, options: TDomainOptions = {}) {
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
   * 添加控制器
   * @param controller 控制器
   */
  addController(controller: TController) {
    this.controllers.push(controller);
  }

  /**
   * 添加控制器元数据到缓存
   * @param controller 控制器
   * @param metadata 控制器元数据
   */
  addControllerMetadata(controller: TController, metadata: TDomainControllerMetadata) {
    this.#controllerMetadataCache.set(controller, metadata);
  }

  /**
   * 从缓存获取控制器元数据
   * @param controller 控制器
   */
  getControllerMetadata(controller: TController) {
    return this.#controllerMetadataCache.get(controller);
  }

  /**
   * 添加提供者
   * @param provider 提供者
   */
  addProvider(provider: TProviderMeta) {
    this.#domainMetadata.providers.push(provider);
  }

  /**
   * 添加中间件
   * @param middleware 中间件
   */
  addMiddleware(middleware: TMiddleware) {
    this.#middleware.push(middleware);
  }

  /**
   * 转换成提供者标准类型
   * @param provider
   */
  #transformProvider(provider: TProviderMeta): TProvider {
    if (isObject(provider)) {
      return provider as TProvider;
    } else {
      return { provide: provider, useClass: provider };
    }
  }

  /**
   * 对应应用域类的实例
   * @param instance
   */
  setDomainClassInstance(instance: DomainClass) {
    this.#domainClassInstance = instance;
  }
}
