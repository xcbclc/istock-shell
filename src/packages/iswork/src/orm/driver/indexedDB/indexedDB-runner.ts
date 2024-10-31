import { isArray, isString, wrap, unWarp, isNumber } from '@istock/util';
import type { TIdAnyObject, TOrmQuery, TModelType, TAnyObj, TQueryFilter, TQuerySortOperator } from '../../types';
import type { IParsedRequestParams } from '../../interfaces';
import { AbstractRunner } from '../abstract-runner';
import type { IndexedDBDriver } from './indexedDB-driver';

type TConnector = IndexedDBDriver['connector'];

export class IndexedDBRunner extends AbstractRunner<TConnector> {
  static createRunner(connector: TConnector) {
    return new IndexedDBRunner(connector);
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(connector: TConnector) {
    super(connector);
  }

  getConnector() {
    return this.connector;
  }

  async run<Result = unknown>(_model: TModelType, callback: Function): Promise<Result> {
    const idb = this.connector.idb;
    // eslint-disable-next-line no-useless-call
    return callback.call(null, idb);
  }

  async query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const tx = db.transaction(modelName, 'readonly');
    const store = tx.objectStore(modelName);

    // 解析查询参数
    const qb = this.parseArgs(query);
    const queryData = qb.getQueryData();

    let sort: { field: string; order: TQuerySortOperator } | null = null;
    if (Array.isArray(queryData.sort) && queryData.sort.length) {
      sort = queryData.sort[0];
    }
    // 保存查询结果
    const results: Result[] = [];
    const startOffset: number = queryData.offset ?? 0;
    let currentOffset: number = startOffset;
    const limit: number | null = queryData.limit ?? null;

    // 获取查询游标
    const idbpIndex = sort?.field ? store.index(sort.field) : null;
    let cursor = await (idbpIndex ?? store).openCursor(null, sort?.order === 'DESC' ? 'prev' : 'next');
    // todo 查询条件需要整理
    while (cursor) {
      if (startOffset && startOffset === currentOffset) {
        await cursor.advance(startOffset);
      }
      if (this.#matchConditions(cursor.value, queryData)) {
        results.push(cursor.value);
      }
      currentOffset++;
      if (limit === null || currentOffset < startOffset + limit) {
        cursor = await cursor.continue();
      } else {
        break;
      }
    }
    await tx.done;
    return unWarp<typeof results>(results);
  }

  async create(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const tx = db.transaction(modelName, 'readwrite');
    const store = tx.objectStore(modelName);
    const ids = [];
    for (let index = 0; index < createDatas.length; index++) {
      const data = createDatas[index];
      // const _result = await store.add(data);
      await store.add(wrap(data));
      ids.push(data.id);
    }
    await tx.done;
    return ids;
  }

  async update(model: TModelType, updateData: TAnyObj, query: TOrmQuery): Promise<boolean> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const results: TIdAnyObject[] = await this.query(model, query);
    const tx = db.transaction(modelName, 'readwrite');
    const store = tx.objectStore(modelName);
    let index = results.length;
    while (index--) {
      delete updateData.id; // todo 先禁用修改id
      const updated = { ...results[index], ...updateData };
      await store.put(wrap(updated));
    }
    await tx.done;
    return true;
  }

  async updateMany(model: TModelType, updateDataList: TAnyObj[]): Promise<boolean> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const tx = db.transaction(modelName, 'readwrite');
    const store = tx.objectStore(modelName);
    for (const updateData of updateDataList) {
      if (isString(updateData.id) || isNumber(updateData.id)) {
        const data = await store.get(updateData.id);
        const updated = { ...data, ...updateData };
        await store.put(wrap(updated));
      }
    }
    return true;
  }

  async delete(model: TModelType, query: TOrmQuery): Promise<boolean> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const results: TIdAnyObject[] = await this.query(model, query);
    const tx = db.transaction(modelName, 'readwrite');
    const store = tx.objectStore(modelName);
    let index = results.length;
    while (index--) {
      await store.delete(results[index].id);
    }
    await tx.done;
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
        return isArray(value) && value.includes(data[field]);
      case 'cont':
        if (isString(value) && isString(data[field])) return data[field].includes(value);
        return false;
      default:
        return false;
    }
  }
}
