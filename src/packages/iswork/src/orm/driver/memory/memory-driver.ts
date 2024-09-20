import { ScopeError } from '@istock/util';
import type { TDataSourceMemoryDBOptions, TModelType } from '../../types';
import { EDriverConnectStatus } from '../../enums';
import { AbstractDriver } from '../abstract-driver';
import { MemoryRunner } from './memory-runner';
import { MemoryDB, MemoryTable } from './memory';

export class MemoryDriver extends AbstractDriver {
  #connector!: MemoryDB;
  #runner!: MemoryRunner;
  readonly #options: TDataSourceMemoryDBOptions;
  readonly #entities: TModelType[] = [];

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

  constructor(options: TDataSourceMemoryDBOptions) {
    super(options);
    this.#options = options;
    if (this.#options.entities) this.#entities = this.#options.entities;
  }

  async beforeConnect(): Promise<void> {
    this.status = EDriverConnectStatus.ready;
  }

  async connect(): Promise<void> {
    this.status = EDriverConnectStatus.connecting;
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

  async afterConnect(): Promise<void> {
    this.status = EDriverConnectStatus.connected;
  }

  async disconnect(): Promise<void> {
    this.status = EDriverConnectStatus.disconnected;
  }

  async reconnect(): Promise<void> {
    if (EDriverConnectStatus.ready === this.status || EDriverConnectStatus.disconnected === this.status) {
      // todo 重连
    }
  }
}
