import { isArray, isNumber, isString, ScopeError } from '@istock/util';
import type { TOrmQuery, TIdAnyObject, TModelType, TAnyObj, TQueryFilter } from '../../types';
import type { IParsedRequestParams } from '../../interfaces';
import { AbstractRunner } from '../abstract-runner';
import type { MemoryDriver } from './memory-driver';

type TConnector = MemoryDriver['connector'];

export class MemoryRunner extends AbstractRunner<TConnector> {
  static createRunner(connector: TConnector) {
    return new MemoryRunner(connector);
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(connector: TConnector) {
    super(connector);
  }

  getConnector() {
    return this.connector;
  }

  async run<Result = unknown>(model: TModelType, callback: Function): Promise<Result> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    return table.execute(callback);
  }

  async query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const qb = this.parseArgs(query);
    const queryData = qb.getQueryData();
    return table.queryByFilter((data) => {
      return this.#matchConditions(data, queryData);
    }) as Result[];
  }

  async create(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const ids = createDatas.map((data) => {
      table.insertData(data);
      return data.id;
    });
    return ids;
  }

  async update(model: TModelType, updateData: TAnyObj, query: TOrmQuery): Promise<boolean> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const results: TIdAnyObject[] = await this.query(model, query);
    results.forEach((data) => {
      table.updateById(data.id, updateData);
    });
    return true;
  }

  async updateMany(model: TModelType, updateDataList: TAnyObj[]): Promise<boolean> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    updateDataList.forEach((data) => {
      if (isString(data.id) || isNumber(data.id)) {
        table.updateById(data.id, data);
      }
    });
    return true;
  }

  async delete(model: TModelType, query: TOrmQuery): Promise<boolean> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const results: TIdAnyObject[] = await this.query(model, query);
    results.forEach((data) => {
      table.deleteById(data.id);
    });
    return true;
  }

  /**
   * 根据QueryBuilder数据写条件
   * @param data
   * @param query
   * @private
   */
  #matchConditions(data: TIdAnyObject, query: Partial<IParsedRequestParams>): boolean {
    const filters: TQueryFilter[] = query.filter ?? [];
    return filters.every((filter) => this.#assertFieldOperator(data, filter));
  }

  /**
   * 根据操作符执行对应判断逻辑
   * @param data
   * @param queryFilter
   * @private
   */
  #assertFieldOperator(data: TIdAnyObject<any>, queryFilter: TQueryFilter): boolean {
    const { field, operator, value } = queryFilter;
    switch (operator.replace('$', '')) {
      case 'eq':
        return data[field] === value;
      case 'ne':
        return data[field] !== value;
      case 'gt':
        return data[field] > value;
      case 'lt':
        return data[field] < value;
      case 'gte':
        return data[field] >= value;
      case 'lte':
        return data[field] <= value;
      case 'in':
        if (isArray(value)) return value.includes(data[field]);
        return false;
      case 'cont':
        if (isString(value) && isString(data[field])) return data[field].includes(value);
        return false;
      default:
        return false;
    }
  }

  #getScopeError(modelName: string) {
    return new ScopeError(`iswork.${this.constructor.name}`, `未获取到${modelName} Model`);
  }
}
