/**
 * @fileoverview 内存数据库运行器
 * @description 提供内存数据库的具体操作实现，包括查询、创建、更新、删除等功能
 */

import { isArray, isNumber, isString, ScopeError } from '@istock-shell/util';
import type { OrmQuery, IdAnyObject, ModelType, AnyObj, QueryFilter } from '../../types';
import type { ParsedRequestParams } from '../../interfaces';
import { AbstractRunner } from '../abstract-runner';
import type { MemoryDriver } from './memory-driver';

/**
 * 内存驱动器连接器类型
 * @description 内存驱动器的连接器类型别名
 */
type TConnector = MemoryDriver['connector'];

/**
 * 内存数据库运行器类
 * @description 基于内存的数据库运行器，负责执行具体的内存数据库操作
 * @extends AbstractRunner<TConnector>
 * @example
 * ```typescript
 * // 创建内存运行器实例
 * const runner = MemoryRunner.createRunner(connector);
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
export class MemoryRunner extends AbstractRunner<TConnector> {
  /**
   * 创建内存运行器实例的静态工厂方法
   * @param connector - 内存连接器实例
   * @returns MemoryRunner 实例
   */
  static createRunner(connector: TConnector) {
    return new MemoryRunner(connector);
  }

  /**
   * 构造函数
   * @param connector - 内存连接器实例
   */
  constructor(connector: TConnector) {
    super(connector);
  }

  /**
   * 获取连接器实例
   * @returns 内存连接器实例
   */
  getConnector() {
    return this.connector;
  }

  /**
   * 执行自定义内存表操作
   * @template Result - 返回结果的类型，默认为 unknown
   * @param model - 模型类型
   * @param callback - 要执行的回调函数，接收内存表实例和数据列表作为参数
   * @returns Promise<Result> 回调函数的执行结果
   */
  async run<Result = unknown>(model: ModelType, callback: Function): Promise<Result> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    return table.execute(callback);
  }

  /**
   * 执行查询操作
   * @template Result - 查询结果的类型，默认为 unknown
   * @param model - 要查询的模型类型
   * @param query - ORM 查询条件，包含过滤、排序、分页等参数
   * @returns Promise<Result[]> 查询结果数组
   * @description 支持复杂查询条件，包括过滤器功能
   */
  async query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const qb = this.parseArgs(query);
    const queryData = qb.getQueryData();
    return table.queryByFilter((data) => {
      return this.#matchConditions(data, queryData);
    }) as Result[];
  }

  /**
   * 创建新记录
   * @param model - 要操作的模型类型
   * @param createDatas - 要创建的数据数组
   * @returns Promise<Array<number | string>> 创建的记录 ID 数组
   * @description 批量创建记录，返回所有新创建记录的 ID
   */
  async create(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const ids = createDatas.map((data) => {
      table.insertData(data);
      return data.id;
    });
    return ids;
  }

  /**
   * 更新记录
   * @param model - 要操作的模型类型
   * @param updateData - 要更新的数据
   * @param query - 更新条件查询
   * @returns Promise<boolean> 更新操作是否成功
   * @description 根据查询条件更新匹配的记录
   */
  async update(model: ModelType, updateData: AnyObj, query: OrmQuery): Promise<boolean> {
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const results: IdAnyObject[] = await this.query(model, query);
    results.forEach((data) => {
      table.updateById(data.id, updateData);
    });
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
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    updateDataList.forEach((data) => {
      if (isString(data.id) || isNumber(data.id)) {
        table.updateById(data.id, data);
      }
    });
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
    const table = this.connector.get(model);
    if (!table) throw this.#getScopeError(model.name);
    const results: IdAnyObject[] = await this.query(model, query);
    results.forEach((data) => {
      table.deleteById(data.id);
    });
    return true;
  }

  /**
   * 检查记录是否匹配查询条件
   * @private
   * @param data - 要检查的记录对象
   * @param query - 查询数据，包含 filter 条件
   * @returns boolean 记录是否匹配所有查询条件
   * @description 遍历所有 filter 条件，检查记录是否满足每个字段的条件
   */
  #matchConditions(data: IdAnyObject, query: Partial<ParsedRequestParams>): boolean {
    const filters: QueryFilter[] = query.filter ?? [];
    return filters.every((filter) => this.#assertFieldOperator(data, filter));
  }

  /**
   * 根据操作符执行对应的字段比较逻辑
   * @private
   * @param data - 要检查的记录对象
   * @param queryFilter - 查询过滤器，包含字段名、操作符和值
   * @returns boolean 字段值是否满足操作符条件
   * @description 支持多种操作符：eq(等于)、ne(不等于)、gt(大于)、lt(小于)、gte(大于等于)、lte(小于等于)、in(包含)、cont(字符串包含)
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
        if (isArray(value)) return value.includes(data[field]);
        return false;
      case 'cont':
        if (isString(value) && isString(data[field])) return data[field].includes(value);
        return false;
      default:
        return false;
    }
  }

  /**
   * 生成作用域错误
   * @private
   * @param modelName - 模型名称
   * @returns ScopeError 作用域错误实例
   * @description 当无法找到指定模型的内存表时，生成相应的错误信息
   */
  #getScopeError(modelName: string) {
    return new ScopeError(`iswork.${this.constructor.name}`, `未获取到${modelName} Model`);
  }
}
