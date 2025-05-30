import { isArray, isString, wrap, unWarp, isNumber } from '@istock-shell/util';
import type { IdAnyObject, OrmQuery, ModelType, AnyObj, QueryFilter, QuerySortOperator } from '../../types';
import type { ParsedRequestParams } from '../../interfaces';
import { AbstractRunner } from '../abstract-runner';
import type { IndexedDBDriver } from './indexedDB-driver';

/**
 * IndexedDB 驱动器连接器类型
 * @description IndexedDB 驱动器的连接器类型别名
 */
type Connector = IndexedDBDriver['connector'];

/**
 * IndexedDB 运行器类
 * @description 基于 IndexedDB 的数据库运行器，负责执行具体的数据库操作
 * @extends AbstractRunner<Connector>
 * @example
 * ```typescript
 * // 创建 IndexedDB 运行器实例
 * const runner = IndexedDBRunner.createRunner(connector);
 *
 * // 执行查询操作
 * const users = await runner.query(UserModel, {
 *   filter: [{ field: 'age', operator: '$gte', value: 18 }],
 *   sort: [{ field: 'name', order: 'ASC' }],
 *   limit: 10
 * });
 *
 * // 创建新记录
 * const ids = await runner.create(UserModel, [{ name: 'John', age: 25 }]);
 * ```
 */
export class IndexedDBRunner extends AbstractRunner<Connector> {
  /**
   * 创建 IndexedDB 运行器实例的静态工厂方法
   * @param connector - IndexedDB 连接器实例
   * @returns IndexedDBRunner 实例
   */
  static createRunner(connector: Connector) {
    return new IndexedDBRunner(connector);
  }

  /**
   * 构造函数
   * @param connector - IndexedDB 连接器实例
   */
  constructor(connector: Connector) {
    super(connector);
  }

  /**
   * 获取连接器实例
   * @returns IndexedDB 连接器实例
   */
  getConnector() {
    return this.connector;
  }

  /**
   * 执行自定义数据库操作
   * @template Result - 返回结果的类型，默认为 unknown
   * @param _model - 模型类型（此参数未使用）
   * @param callback - 要执行的回调函数，接收 IndexedDB 实例作为参数
   * @returns Promise<Result> 回调函数的执行结果
   */
  async run<Result = unknown>(_model: ModelType, callback: Function): Promise<Result> {
    const idb = this.connector.idb;

    return callback.call(null, idb);
  }

  /**
   * 执行查询操作
   * @template Result - 查询结果的类型，默认为 unknown
   * @param model - 要查询的模型类型
   * @param query - ORM 查询条件，包含过滤、排序、分页等参数
   * @returns Promise<Result[]> 查询结果数组
   * @description 支持复杂查询条件，包括过滤器、排序和分页功能
   */
  async query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const tx = db.transaction(modelName, 'readonly');
    const store = tx.objectStore(modelName);

    // 解析查询参数
    const qb = this.parseArgs(query);
    const queryData = qb.getQueryData();

    let sort: { field: string; order: QuerySortOperator } | null = null;
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

  /**
   * 创建新记录
   * @param model - 要操作的模型类型
   * @param createDatas - 要创建的数据数组
   * @returns Promise<Array<number | string>> 创建的记录 ID 数组
   * @description 批量创建记录，返回所有新创建记录的 ID
   */
  async create(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>> {
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

  /**
   * 更新记录
   * @param model - 要操作的模型类型
   * @param updateData - 要更新的数据
   * @param query - 更新条件查询
   * @returns Promise<boolean> 更新操作是否成功
   * @description 根据查询条件更新匹配的记录，不允许修改记录 ID
   */
  async update(model: ModelType, updateData: AnyObj, query: OrmQuery): Promise<boolean> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const results: IdAnyObject[] = await this.query(model, query);
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

  /**
   * 批量更新多条记录
   * @param model - 要操作的模型类型
   * @param updateDataList - 要更新的数据列表，每个对象应包含 id 字段
   * @returns Promise<boolean> 批量更新操作是否成功
   * @description 根据每个数据对象的 ID 进行批量更新操作
   */
  async updateMany(model: ModelType, updateDataList: AnyObj[]): Promise<boolean> {
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

  /**
   * 删除记录
   * @param model - 要操作的模型类型
   * @param query - 删除条件查询
   * @returns Promise<boolean> 删除操作是否成功
   * @description 根据查询条件删除匹配的记录
   */
  async delete(model: ModelType, query: OrmQuery): Promise<boolean> {
    const db = this.connector.idb;
    const modelName = this.connector.getModeName(model);
    const results: IdAnyObject[] = await this.query(model, query);
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
   * 检查记录是否匹配查询条件
   * @private
   * @param data - 要检查的记录对象
   * @param query - 查询数据，包含 where 条件
   * @returns boolean 记录是否匹配所有查询条件
   * @description 遍历所有 where 条件，检查记录是否满足每个字段的条件
   */
  #matchConditions(data: IdAnyObject, query: Partial<ParsedRequestParams>): boolean {
    const filters: QueryFilter[] = query.filter ?? [];
    return filters.every((filter) => this.#assertFieldOperator(data, filter));
  }

  /**
   * 检查单个字段值是否匹配条件
   * @private
   * @param data - 数据对象
   * @param queryFilter - 条件对象
   * @returns boolean 字段值是否匹配条件
   * @description 支持多种操作符：$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $like, $regex
   */
  #assertFieldOperator(data: IdAnyObject<any>, queryFilter: QueryFilter): boolean {
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
