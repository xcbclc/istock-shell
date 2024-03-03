import type { TDataSourceAllOptions, TDataSourceType, TModelType } from './types';
import { DriverFactory } from './driver/driver-factory';
import { RepositoryManager, type Repository } from './repository';
import type { AbstractDriver } from './driver/abstract-driver';

export class DataSource<Type extends TDataSourceType> {
  readonly #name: string;
  #isInitialized: boolean = false;
  readonly #options: TDataSourceAllOptions[Type];
  #driver!: AbstractDriver;
  #repositoryManager!: RepositoryManager;
  get name() {
    return this.#name;
  }

  get options() {
    return this.#options;
  }

  get driver() {
    return this.#driver;
  }

  constructor(options: TDataSourceAllOptions[Type]) {
    this.#name = options.name ?? 'default';
    this.#options = options;
    // log
  }

  /**
   * 暴露给基础模型使用的方法
   * @param model
   */
  async getRepository(model: TModelType): Promise<Repository> {
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

  async connect(): Promise<this> {
    await this.#driver.connect();
    return this;
  }

  async reconnect(): Promise<this> {
    if (this.#isInitialized) {
      await this.#driver.reconnect();
    }
    return this;
  }

  async disconnect(): Promise<void> {
    await this.#driver.disconnect();
  }
}
