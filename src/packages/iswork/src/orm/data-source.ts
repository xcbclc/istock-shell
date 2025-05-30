/**
 * @fileoverview ORM 数据源管理
 * @description 提供数据源的创建、连接、断开连接和仓库管理功能
 */

import type { DataSourceAllOptions, DataSourceType, ModelType } from './types';
import { DriverFactory } from './driver/driver-factory';
import { RepositoryManager, type Repository } from './repository';
import type { AbstractDriver } from './driver/abstract-driver';

/**
 * 数据源类
 * @description 管理数据库连接和仓库，提供统一的数据访问接口
 * @template Type - 数据源类型
 * @example
 * ```typescript
 * const dataSource = new DataSource({
 *   type: 'memory',
 *   name: 'default',
 *   entities: [UserModel, PostModel]
 * });
 *
 * await dataSource.initialize();
 * const userRepository = await dataSource.getRepository(UserModel);
 * ```
 */
export class DataSource<Type extends DataSourceType> {
  /** 数据源名称 */
  readonly #name: string;
  /** 初始化状态 */
  #isInitialized: boolean = false;
  /** 数据源配置选项 */
  readonly #options: DataSourceAllOptions[Type];
  /** 数据库驱动 */
  #driver!: AbstractDriver;
  /** 仓库管理器 */
  #repositoryManager!: RepositoryManager;

  /**
   * 获取数据源名称
   * @returns 数据源名称
   */
  get name() {
    return this.#name;
  }

  /**
   * 获取数据源配置选项
   * @returns 数据源配置选项
   */
  get options() {
    return this.#options;
  }

  /**
   * 获取数据库驱动
   * @returns 数据库驱动实例
   */
  get driver() {
    return this.#driver;
  }

  /**
   * 数据源构造函数
   * @description 创建数据源实例，设置名称和配置选项
   * @param options - 数据源配置选项
   * @example
   * ```typescript
   * const dataSource = new DataSource({
   *   type: 'indexedDB',
   *   name: 'myApp',
   *   database: 'myDatabase',
   *   entities: [UserModel]
   * });
   * ```
   */
  constructor(options: DataSourceAllOptions[Type]) {
    this.#name = options.name ?? 'default';
    this.#options = options;
    // log
  }

  /**
   * 获取模型仓库
   * @description 获取指定模型的仓库实例，自动处理连接状态和重连逻辑
   * @param model - 模型类
   * @returns 模型仓库实例
   * @example
   * ```typescript
   * const userRepository = await dataSource.getRepository(UserModel);
   * const users = await userRepository.find();
   * ```
   */
  async getRepository(model: ModelType): Promise<Repository> {
    if (this.#driver.isConnecting()) {
      // 连接中
      await new Promise((resolve) => setTimeout(resolve, 3000)); // todo 暂时等待3s
    }
    if (!this.#driver.isConnected()) {
      // 不是连接状态
      if (this.#repositoryManager) {
        await this.reconnect();
      } else {
        await this.disconnect();
        await this.initialize();
      }
    }
    return this.#repositoryManager.getRepository(model);
  }

  /**
   * 初始化数据源
   * @description 初始化数据源，创建驱动、建立连接、初始化仓库管理器
   * @returns 数据源实例
   * @example
   * ```typescript
   * const dataSource = new DataSource(options);
   * await dataSource.initialize();
   * ```
   */
  async initialize(): Promise<this> {
    if (this.#isInitialized) return this;
    try {
      this.#driver = DriverFactory.create<Type>(this);
      await this.#driver.beforeConnect();
      await this.connect();
      this.#repositoryManager = new RepositoryManager(this);
      (this.#options.entities || []).forEach((model) => {
        model.useDataSource(this);
      });
      await this.#driver.afterConnect();
    } finally {
      this.#isInitialized = true;
    }
    return this;
  }

  /**
   * 连接数据库
   * @description 建立与数据库的连接
   * @returns 数据源实例
   * @example
   * ```typescript
   * await dataSource.connect();
   * ```
   */
  async connect(): Promise<this> {
    await this.#driver.connect();
    return this;
  }

  /**
   * 重新连接数据库
   * @description 重新建立与数据库的连接
   * @returns 数据源实例
   * @example
   * ```typescript
   * await dataSource.reconnect();
   * ```
   */
  async reconnect(): Promise<this> {
    if (this.#isInitialized) {
      await this.#driver.reconnect();
    }
    return this;
  }

  /**
   * 断开数据库连接
   * @description 断开与数据库的连接，释放资源
   * @example
   * ```typescript
   * await dataSource.disconnect();
   * ```
   */
  async disconnect(): Promise<void> {
    await this.#driver.disconnect();
  }
}
