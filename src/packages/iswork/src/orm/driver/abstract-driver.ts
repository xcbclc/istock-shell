/**
 * @fileoverview ORM 抽象驱动器
 * @description 定义数据库驱动器的抽象基类，提供通用的连接管理和元数据处理功能
 */

import type { DataSourceCommonOptions, ModelType } from '../types';
import { DriverConnectStatus } from '../enums';
import { ModelMetadataMap } from '../metadata/metadata';
import type { AbstractRunner } from './abstract-runner';

/**
 * 抽象驱动器类
 * @description 定义数据库驱动器的抽象基类，所有具体的数据库驱动器都应继承此类
 * @abstract
 * @example
 * ```typescript
 * class MySQLDriver extends AbstractDriver {
 *   connector: MySQLConnection;
 *   runner: MySQLRunner;
 *
 *   async connect() {
 *     // 实现 MySQL 连接逻辑
 *   }
 *
 *   async disconnect() {
 *     // 实现 MySQL 断开连接逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractDriver {
  /** 数据源配置选项 */
  abstract options: DataSourceCommonOptions;
  /** 实体模型列表 */
  abstract entities: ModelType[];

  /**
   * 数据库名称
   * @description 从配置选项中获取的数据库名称
   */
  readonly dbName: string;

  /**
   * 数据库版本
   * @description 数据库的版本号，可以是字符串或数字
   */
  readonly version?: string | number;

  /**
   * 模型元数据映射
   * @description 存储模型装饰器元数据的实例，用于管理模型的结构信息
   */
  readonly modelMetadataMap: ModelMetadataMap = new ModelMetadataMap();

  /**
   * 连接状态
   * @description 当前驱动器的连接状态
   * @protected
   */
  protected status: DriverConnectStatus = DriverConnectStatus.ready;

  /**
   * 抽象驱动器构造函数
   * @description 初始化驱动器基本配置
   * @param options - 数据源配置选项
   */
  constructor(options: DataSourceCommonOptions) {
    this.dbName = options.dbName ?? options.name;
    this.version = options.version;
  }

  /**
   * 扫描模型元数据
   * @description 获取并缓存模型的所有装饰器元数据信息
   * @param model - 要扫描的模型类
   * @example
   * ```typescript
   * driver.scanModelMetadata(UserModel);
   * ```
   */
  scanModelMetadata(model: ModelType) {
    this.modelMetadataMap.scanMeta(model);
  }

  /**
   * 检查是否正在连接
   * @description 判断驱动器是否处于连接中状态
   * @returns 是否正在连接
   * @example
   * ```typescript
   * if (driver.isConnecting()) {
   *   console.log('正在连接数据库...');
   * }
   * ```
   */
  isConnecting() {
    return this.status === DriverConnectStatus.connecting;
  }

  /**
   * 检查是否已连接
   * @description 判断驱动器是否已成功连接到数据库
   * @returns 是否已连接
   * @example
   * ```typescript
   * if (driver.isConnected()) {
   *   console.log('数据库已连接');
   * }
   * ```
   */
  isConnected() {
    return this.status === DriverConnectStatus.connected;
  }

  /**
   * 数据库连接器
   * @description 具体的数据库连接实例，由子类实现
   * @abstract
   */
  abstract connector: unknown;

  /**
   * 数据操作运行器
   * @description 执行具体数据库操作的运行器实例，由子类实现
   * @abstract
   */
  abstract runner: AbstractRunner;

  /**
   * 连接前钩子方法
   * @description 在建立数据库连接之前执行的方法，由子类实现
   * @abstract
   * @returns Promise 对象
   */
  abstract beforeConnect(): Promise<void>;

  /**
   * 建立连接方法
   * @description 建立与数据库的连接，由子类实现具体的连接逻辑
   * @abstract
   * @returns Promise 对象
   */
  abstract connect(): Promise<void>;

  /**
   * 连接后钩子方法
   * @description 在建立数据库连接之后执行的方法，由子类实现
   * @abstract
   * @returns Promise 对象
   */
  abstract afterConnect(): Promise<void>;

  /**
   * 断开连接方法
   * @description 断开与数据库的连接，由子类实现具体的断开逻辑
   * @abstract
   * @returns Promise 对象
   */
  abstract disconnect(): Promise<void>;

  /**
   * 重新连接方法
   * @description 重新建立与数据库的连接，由子类实现具体的重连逻辑
   * @abstract
   * @returns Promise 对象
   */
  abstract reconnect(): Promise<void>;
}
