import { openDB, type IDBPDatabase } from 'idb';
import { isNil, ScopeError } from '@istock-shell/util';
import type {
  DataSourceIndexedDBOptions,
  DecoratorAllColumnMetadata,
  DecoratorColumnOptions,
  DecoratorIndexOptions,
  ModelType,
} from '../../types';
import { DriverConnectStatus } from '../../enums';
import { ORM_COLUMNS, ORM_COLUMN, ORM_INDEX } from '../../decorators/constants';
import { AbstractDriver } from '../abstract-driver';
import { IndexedDBWrap } from './indexedDB';
import { IndexedDBRunner } from './indexedDB-runner';

/**
 * IndexedDB 数据源驱动器
 * @description 基于浏览器 IndexedDB 的本地数据源驱动器，提供客户端数据持久化功能
 * @example
 * ```typescript
 * // 创建 IndexedDB 驱动器实例
 * const driver = new IndexedDBDriver({
 *   name: 'local-database',
 *   version: 2,
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
export class IndexedDBDriver extends AbstractDriver {
  /** IndexedDB 连接器实例 */
  #connector!: IndexedDBWrap;
  /** IndexedDB 运行器实例 */
  #runner!: IndexedDBRunner;
  /** 数据源配置选项 */
  readonly #options: DataSourceIndexedDBOptions;
  /** 实体模型数组 */
  readonly #entities: ModelType[] = [];
  /** 数据库版本号 */
  readonly #version: number;

  /**
   * 获取连接器实例
   * @returns IndexedDBWrap 连接器实例
   */
  get connector() {
    return this.#connector;
  }

  /**
   * 获取运行器实例
   * @returns IndexedDBRunner 运行器实例
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
   * @param options - IndexedDB 数据源配置选项
   */
  constructor(options: DataSourceIndexedDBOptions) {
    super(options);
    this.#options = options;
    this.#version = options.version || 1;
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
   * 建立数据库连接
   * @description 扫描模型元数据，打开 IndexedDB 数据库，创建对象存储和索引
   */
  async connect(): Promise<void> {
    this.status = DriverConnectStatus.connecting;
    this.#entities.forEach((model) => {
      this.scanModelMetadata(model);
    });
    const connector = await openDB<unknown>(this.dbName, this.#version, {
      upgrade: (db) => {
        this.#createStore(db);
      },
    });
    this.#connector = new IndexedDBWrap(connector, this.modelMetadataMap);
    this.#runner = IndexedDBRunner.createRunner(this.#connector);
  }

  /**
   * 连接后的处理
   * @description 设置驱动器状态为已连接状态
   */
  async afterConnect(): Promise<void> {
    this.status = DriverConnectStatus.connected;
  }

  /**
   * 断开数据库连接
   * @description 关闭 IndexedDB 连接并设置驱动器状态为已断开状态
   */
  async disconnect(): Promise<void> {
    this.status = DriverConnectStatus.disconnected;
    this.connector.idb.close();
  }

  /**
   * 重新连接数据库
   * @description 在就绪或断开状态下重新建立连接
   * @todo 实现重连逻辑
   */
  async reconnect(): Promise<void> {
    if (DriverConnectStatus.ready === this.status || DriverConnectStatus.disconnected === this.status) {
      // todo 重连
    }
  }

  /**
   * 创建对象存储和索引
   * @description 根据实体模型的元数据创建 IndexedDB 对象存储和相关索引
   * @param db - IndexedDB 数据库实例
   * @private
   */
  #createStore(db: IDBPDatabase<unknown>) {
    this.#entities.forEach((model) => {
      const metadata = this.modelMetadataMap.get(model);
      if (!metadata) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型元数据实例');
      }
      if (metadata && !db.objectStoreNames.contains(metadata.name)) {
        const propertyKeys: Array<string | symbol> = Reflect.getMetadata(ORM_COLUMNS, model.prototype) || [];
        // 列的所有信息
        const columnRecord: Record<string | symbol, DecoratorAllColumnMetadata> = {};
        // 获取所有列
        const columns: DecoratorColumnOptions[] = propertyKeys
          .map((key) => {
            const meta = metadata.getAttrMetadataForKey<DecoratorColumnOptions>(key, ORM_COLUMN);
            if (meta) columnRecord[key] = meta;
            return meta;
          })
          .filter((column): column is DecoratorColumnOptions => !isNil(column));
        // 获取主键列
        const primaryColumn = columns.find((column) => column.primary) ?? {};
        // 获取索引列keys
        const indexColumnKeys = propertyKeys.filter((key) => {
          const meta = metadata.getAttrMetadataForKey<DecoratorIndexOptions>(key, ORM_INDEX);
          if (meta) {
            columnRecord[key] = columnRecord[key] ? { ...columnRecord[key], ...meta } : meta;
          }
          return !!meta;
        });
        const store = db.createObjectStore(metadata.name, {
          keyPath: primaryColumn.name,
          autoIncrement: primaryColumn.autoIncrement,
        });
        indexColumnKeys.forEach((columnKey) => {
          const column = columnRecord[columnKey];
          if (column?.name && column?.indexName) {
            store.createIndex(column.indexName, column.name, { unique: column.autoIncrement });
          }
        });
      }
    });
  }
}
