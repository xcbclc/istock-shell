import type { TDataSourceCommonOptions, TModelType } from '../types';
import { EDriverConnectStatus } from '../enums';
import { ModelMetadataMap } from '../metadata/metadata';
import type { AbstractRunner } from './abstract-runner';

/**
 * 抽象驱动程序
 */
export abstract class AbstractDriver {
  abstract options: TDataSourceCommonOptions;
  abstract entities: TModelType[];
  // 数据库名
  readonly #dbName: string;
  // 版本
  readonly #version?: string | number;

  readonly #modelMetadataMap: ModelMetadataMap = new ModelMetadataMap();

  // 连接状态
  protected status: EDriverConnectStatus = EDriverConnectStatus.ready;

  get dbName() {
    return this.#dbName;
  }

  get version() {
    return this.#version;
  }

  get modelMetadataMap() {
    return this.#modelMetadataMap;
  }

  constructor(options: TDataSourceCommonOptions) {
    this.#dbName = options.dbName ?? options.name;
    this.#version = options.version;
  }

  /**
   * 获取模型所有装饰器metadata
   * @param model
   */
  scanModelMetadata(model: TModelType) {
    this.#modelMetadataMap.scanMeta(model);
  }

  /**
   * 判断驱动是否连接中
   */
  isConnecting() {
    return this.status === EDriverConnectStatus.connecting;
  }

  /**
   * 判断驱动是否已被
   */
  isConnected() {
    return this.status === EDriverConnectStatus.connected;
  }

  // 数据连接器
  abstract connector: unknown;
  // 数据操作
  abstract runner: AbstractRunner;
  // 连接前
  abstract beforeConnect(): Promise<void>;
  // 连接操作
  abstract connect(): Promise<void>;
  // 连接后
  abstract afterConnect(): Promise<void>;
  // 断开连接
  abstract disconnect(): Promise<void>;
  // 重新连接
  abstract reconnect(): Promise<void>;
}
