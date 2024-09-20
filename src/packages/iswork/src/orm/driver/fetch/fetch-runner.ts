import type { TIdAnyObject, TOrmQuery, TModelType, TAnyObj } from '../../types';
import { AbstractRunner } from '../abstract-runner';
import type { FetchDriver } from './fetch-driver';

type TConnector = FetchDriver['connector'];

export class FetchRunner extends AbstractRunner<TConnector> {
  static createRunner(connector: TConnector) {
    return new FetchRunner(connector);
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(connector: TConnector) {
    super(connector);
  }

  getConnector() {
    return this.connector;
  }

  async run<Result = Response>(
    _model: TModelType,
    input: RequestInfo | URL,
    init: RequestInit & { query?: TAnyObj } = {}
  ): Promise<Result> {
    return (await this.connector.request(input, init)) as Result;
  }

  async query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<Result[]>(
      model,
      {
        method: 'GET',
      },
      `?${qb.query()}`
    );
  }

  async create(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>> {
    return await this.connector.requestModel<Array<number | string>>(model, {
      method: 'POST',
      body: JSON.stringify({
        data: createDatas,
      }),
    });
  }

  async update(model: TModelType, updateData: TAnyObj, query: TOrmQuery): Promise<boolean> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<boolean>(model, {
      method: 'PUT',
      body: JSON.stringify({
        data: updateData,
        filter: qb.getQueryData(),
      }),
    });
  }

  async updateMany(model: TModelType, updateDataList: TAnyObj[]): Promise<boolean> {
    return await this.connector.requestModel<boolean>(model, {
      method: 'PUT',
      body: JSON.stringify({
        list: updateDataList,
      }),
    });
  }

  async delete(model: TModelType, query: TOrmQuery): Promise<boolean> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<boolean>(model, {
      method: 'DELETE',
      body: JSON.stringify({
        filter: qb.getQueryData(),
      }),
    });
  }
}
