import { AbstractDriver } from '../abstract-driver';
import type { TDataSourceFetchOptions, TModelType } from '../../types';
import { EDriverConnectStatus } from '../../enums';
import { FetchWrap } from './fetch';
import { FetchRunner } from './fetch-runner';

export class FetchDriver extends AbstractDriver {
  #connector!: FetchWrap;
  #runner!: FetchRunner;
  readonly #options: TDataSourceFetchOptions;
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

  constructor(options: TDataSourceFetchOptions) {
    super(options);
    this.#options = options;
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
    this.#connector = new FetchWrap(fetch, this.modelMetadataMap);
    this.#connector.setPrefixUrl(this.options.prefixUrl);
    this.#runner = FetchRunner.createRunner(this.#connector);
  }

  async afterConnect(): Promise<void> {
    this.status = EDriverConnectStatus.connected;
  }

  async disconnect(): Promise<void> {
    this.status = EDriverConnectStatus.disconnected;
  }

  async reconnect(): Promise<void> {
    if ([EDriverConnectStatus.ready, EDriverConnectStatus.disconnected].includes(this.status)) {
      // todo 重连
    }
  }
}
