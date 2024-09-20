import { openDB, type IDBPDatabase } from 'idb';
import { isNil, ScopeError } from '@istock/util';
import type {
  TDataSourceIndexedDBOptions,
  TDecoratorAllColumnMetadata,
  TDecoratorColumnOptions,
  TDecoratorIndexOptions,
  TModelType,
} from '../../types';
import { EDriverConnectStatus } from '../../enums';
import { ORM_COLUMNS, ORM_COLUMN, ORM_INDEX } from '../../decorators/constants';
import { AbstractDriver } from '../abstract-driver';
import { IndexedDBWrap } from './indexedDB';
import { IndexedDBRunner } from './indexedDB-runner';

export class IndexedDBDriver extends AbstractDriver {
  #connector!: IndexedDBWrap;
  #runner!: IndexedDBRunner;
  readonly #options: TDataSourceIndexedDBOptions;
  readonly #entities: TModelType[] = [];
  readonly #version: number;

  get connector() {
    return this.#connector;
  }

  get runner() {
    return this.#runner;
  }

  get options() {
    return this.#options;
  }

  get entities() {
    return this.#entities;
  }

  constructor(options: TDataSourceIndexedDBOptions) {
    super(options);
    this.#options = options;
    this.#version = options.version || 1;
    if (this.#options.entities) this.#entities = this.#options.entities;
  }

  async beforeConnect(): Promise<void> {
    this.status = EDriverConnectStatus.ready;
  }

  async connect(): Promise<void> {
    this.status = EDriverConnectStatus.connecting;
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

  async afterConnect(): Promise<void> {
    this.status = EDriverConnectStatus.connected;
  }

  async disconnect(): Promise<void> {
    this.status = EDriverConnectStatus.disconnected;
    this.connector.idb.close();
  }

  async reconnect(): Promise<void> {
    if (EDriverConnectStatus.ready === this.status || EDriverConnectStatus.disconnected === this.status) {
      // todo 重连
    }
  }

  /**
   * 创建表信息
   * @param db
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
        const columnRecord: Record<string | symbol, TDecoratorAllColumnMetadata> = {};
        // 获取所有列
        const columns: TDecoratorColumnOptions[] = propertyKeys
          .map((key) => {
            const meta = metadata.getAttrMetadataForKey<TDecoratorColumnOptions>(key, ORM_COLUMN);
            if (meta) columnRecord[key] = meta;
            return meta;
          })
          .filter((column): column is TDecoratorColumnOptions => !isNil(column));
        // 获取主键列
        const primaryColumn = columns.find((column) => column.primary) ?? {};
        // 获取索引列keys
        const indexColumnKeys = propertyKeys.filter((key) => {
          const meta = metadata.getAttrMetadataForKey<TDecoratorIndexOptions>(key, ORM_INDEX);
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
