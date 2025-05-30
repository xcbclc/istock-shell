/**
 * @fileoverview 内存数据库驱动器
 * @description 提供基于内存的数据源驱动器实现，用于在内存中存储和操作数据
 */

import { ScopeError } from '@istock-shell/util';
import type { DataSourceMemoryDBOptions, ModelType } from '../../types';
import { DriverConnectStatus } from '../../enums';
import { AbstractDriver } from '../abstract-driver';
import { MemoryRunner } from './memory-runner';
import { MemoryDB, MemoryTable } from './memory';

/**
 * 内存数据库驱动器
 * @description 基于内存的数据源驱动器，提供快速的内存数据存储和操作功能
 * @example
 * ```typescript
 * // 创建内存数据库驱动器实例
 * const driver = new MemoryDriver({
 *   name: 'memory-database',
 *   entities: [UserModel, PostModel]
 * });
 *
 * // 连接数据库
 * await driver.connect();
 *
 * // 使用运行器执行查询
 * const users = await driver.runner.query(UserModel, {
 *   filter: [{ field: 'age', operator: '$gte', value: 18 }]
 * });
 * ```
 */
export class MemoryDriver extends AbstractDriver {
  /** 内存数据库连接器实例 */
  #connector!: MemoryDB;
  /** 内存数据库运行器实例 */
  #runner!: MemoryRunner;
  /** 数据源配置选项 */
  readonly #options: DataSourceMemoryDBOptions;
  /** 实体模型数组 */
  readonly #entities: ModelType[] = [];

  /**
   * 获取连接器实例
   * @returns MemoryDB 连接器实例
   */
  get connector() {
    return this.#connector;
  }

  /**
   * 获取运行器实例
   * @returns MemoryRunner 运行器实例
   */
  get runner() {
    return this.#runner;
  }

  /**
   * 获取配置选项
   * @returns 数据源配置选项
   */
  get options() {
    return this.#options;
  }

  /**
   * 获取实体模型数组
   * @returns 实体模型数组
   */
  get entities() {
    return this.#entities;
  }

  /**
   * 构造函数
   * @param options - 内存数据库数据源配置选项
   */
  constructor(options: DataSourceMemoryDBOptions) {
    super(options);
    this.#options = options;
    if (this.#options.entities) this.#entities = this.#options.entities;
  }

  /**
   * 连接前的准备工作
   * @description 设置驱动器状态为就绪状态
   */
  async beforeConnect(): Promise<void> {
    this.status = DriverConnectStatus.ready;
  }

  /**
   * 建立内存数据库连接
   * @description 扫描模型元数据，创建内存数据库实例和数据表，初始化运行器
   */
  async connect(): Promise<void> {
    this.status = DriverConnectStatus.connecting;
    this.#connector = new MemoryDB(this.dbName);
    this.#entities.forEach((model) => {
      this.scanModelMetadata(model);
      const metadata = this.modelMetadataMap.get(model);
      if (!metadata) throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型元数据实例');
      if (!this.#connector.has(model)) {
        this.#connector.set(model, new MemoryTable(metadata.name));
      }
    });
    this.#runner = MemoryRunner.createRunner(this.#connector);
  }

  /**
   * 连接后的处理
   * @description 设置驱动器状态为已连接状态
   */
  async afterConnect(): Promise<void> {
    this.status = DriverConnectStatus.connected;
  }

  /**
   * 断开内存数据库连接
   * @description 设置驱动器状态为已断开状态，释放内存资源
   */
  async disconnect(): Promise<void> {
    this.status = DriverConnectStatus.disconnected;
  }

  /**
   * 重新连接内存数据库
   * @description 在就绪或断开状态下重新建立连接
   * @todo 实现重连逻辑
   */
  async reconnect(): Promise<void> {
    if (DriverConnectStatus.ready === this.status || DriverConnectStatus.disconnected === this.status) {
      // todo 重连
    }
  }
}
