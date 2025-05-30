import { AbstractDriver } from '../abstract-driver';
import type { DataSourceFetchOptions, ModelType } from '../../types';
import { DriverConnectStatus } from '../../enums';
import { FetchWrap } from './fetch';
import { FetchRunner } from './fetch-runner';

/**
 * Fetch 数据源驱动器
 * @description 基于 Fetch API 的数据源驱动器，用于通过 HTTP 请求与远程数据源进行交互
 * @example
 * ```typescript
 * // 创建 Fetch 驱动器实例
 * const driver = new FetchDriver({
 *   name: 'api-datasource',
 *   prefixUrl: 'https://api.example.com',
 *   entities: [UserModel, PostModel],
 *   requestOptions: {
 *     headers: {
 *       'Authorization': 'Bearer token'
 *     }
 *   }
 * });
 *
 * // 连接数据源
 * await driver.connect();
 * ```
 */
export class FetchDriver extends AbstractDriver {
  /** Fetch 连接器实例 */
  #connector!: FetchWrap;
  /** Fetch 运行器实例 */
  #runner!: FetchRunner;
  /** 数据源配置选项 */
  readonly #options: DataSourceFetchOptions;
  /** 实体模型数组 */
  readonly #entities: ModelType[] = [];

  /**
   * 获取连接器实例
   * @returns FetchWrap 连接器实例
   */
  get connector() {
    return this.#connector;
  }

  /**
   * 获取运行器实例
   * @returns FetchRunner 运行器实例
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
   * @param options - Fetch 数据源配置选项
   */
  constructor(options: DataSourceFetchOptions) {
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
   * 建立数据源连接
   * @description 扫描模型元数据，创建连接器和运行器实例
   */
  async connect(): Promise<void> {
    this.status = DriverConnectStatus.connecting;
    this.#entities.forEach((model) => {
      this.scanModelMetadata(model);
    });
    this.#connector = new FetchWrap(fetch, this.modelMetadataMap, {
      prefixUrl: this.options.prefixUrl,
      requestOptions: this.options.requestOptions,
    });
    this.#runner = FetchRunner.createRunner(this.#connector);
  }

  /**
   * 连接后的处理
   * @description 设置驱动器状态为已连接状态
   */
  async afterConnect(): Promise<void> {
    this.status = DriverConnectStatus.connected;
  }

  /**
   * 断开数据源连接
   * @description 设置驱动器状态为已断开状态
   */
  async disconnect(): Promise<void> {
    this.status = DriverConnectStatus.disconnected;
  }

  /**
   * 重新连接数据源
   * @description 在就绪或断开状态下重新建立连接
   * @todo 实现重连逻辑
   */
  async reconnect(): Promise<void> {
    if (DriverConnectStatus.ready === this.status || DriverConnectStatus.disconnected === this.status) {
      // todo 重连
    }
  }
}
