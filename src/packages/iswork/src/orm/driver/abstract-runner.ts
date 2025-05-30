/**
 * @fileoverview ORM 抽象运行器
 * @description 定义数据库操作运行器的抽象基类，提供通用的数据库操作接口
 */

import { isObject, isString, ScopeError } from '@istock-shell/util';
import { QueryBuilder } from '../query-builder';
import type { IdAnyObject, OrmQuery, ModelType, AnyObj } from '../types';

/**
 * 抽象运行器类
 * @description 定义数据库操作运行器的抽象基类，所有具体的数据库运行器都应继承此类
 * @template Connector - 连接器类型
 * @abstract
 * @example
 * ```typescript
 * class MySQLRunner extends AbstractRunner<MySQLConnection> {
 *   async query(model: ModelType, query: OrmQuery) {
 *     // 实现 MySQL 查询逻辑
 *   }
 *
 *   async create(model: ModelType, createDatas: IdAnyObject[]) {
 *     // 实现 MySQL 创建逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractRunner<Connector = unknown> {
  /**
   * 数据库连接器实例
   * @description 用于执行具体数据库操作的连接器
   */
  readonly connector: Connector;

  /**
   * 抽象运行器构造函数
   * @description 初始化运行器实例
   * @param connector - 数据库连接器实例
   */
  constructor(connector: Connector) {
    this.connector = connector;
  }

  /**
   * 获取连接器实例
   * @description 获取当前运行器使用的数据库连接器
   * @abstract
   * @returns 连接器实例
   */
  abstract getConnector(): unknown;

  /**
   * 执行原始数据库操作
   * @description 执行原始的数据库操作并返回结果
   * @template Result - 返回结果类型
   * @param model - 模型类
   * @param executeArgs - 执行参数
   * @returns 执行结果
   * @abstract
   * @example
   * ```typescript
   * const result = await runner.run(UserModel, 'SELECT * FROM users WHERE id = ?', [1]);
   * ```
   */
  abstract run<Result = unknown>(model: ModelType, ...executeArgs: unknown[]): Promise<Result>;

  /**
   * 查询数据
   * @description 根据查询条件查询数据
   * @template Result - 返回结果类型
   * @param model - 模型类
   * @param query - 查询条件
   * @returns 查询结果数组
   * @abstract
   * @example
   * ```typescript
   * const users = await runner.query(UserModel, {
   *   filter: ['name', 'cont', 'john'],
   *   limit: 10
   * });
   * ```
   */
  abstract query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]>;

  /**
   * 创建记录
   * @description 批量创建记录
   * @param model - 模型类
   * @param createDatas - 创建数据数组
   * @returns 新记录的 ID 数组
   * @abstract
   * @example
   * ```typescript
   * const userIds = await runner.create(UserModel, [
   *   { name: 'John', email: 'john@example.com' },
   *   { name: 'Jane', email: 'jane@example.com' }
   * ]);
   * ```
   */
  abstract create(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>>;

  /**
   * 更新记录
   * @description 根据查询条件更新记录
   * @param model - 模型类
   * @param updateData - 更新数据
   * @param query - 查询条件
   * @returns 是否更新成功
   * @abstract
   * @example
   * ```typescript
   * const success = await runner.update(UserModel,
   *   { name: 'John Updated' },
   *   { filter: ['id', 'eq', 1] }
   * );
   * ```
   */
  abstract update(model: ModelType, updateData: AnyObj, query: OrmQuery): Promise<boolean>;

  /**
   * 批量更新记录
   * @description 通过 ID 批量更新多条记录
   * @param model - 模型类
   * @param updateDataList - 更新数据数组
   * @returns 是否更新成功
   * @abstract
   * @example
   * ```typescript
   * const success = await runner.updateMany(UserModel, [
   *   { id: 1, name: 'John Updated' },
   *   { id: 2, name: 'Jane Updated' }
   * ]);
   * ```
   */
  abstract updateMany(model: ModelType, updateDataList: AnyObj[]): Promise<boolean>;

  /**
   * 删除记录
   * @description 根据查询条件删除记录
   * @param model - 模型类
   * @param query - 查询条件
   * @returns 是否删除成功
   * @abstract
   * @example
   * ```typescript
   * const success = await runner.delete(UserModel, {
   *   filter: ['status', 'eq', 'inactive']
   * });
   * ```
   */
  abstract delete(model: ModelType, query: OrmQuery): Promise<boolean>;

  /**
   * 解析查询参数
   * @description 将不同类型的查询参数统一解析为 QueryBuilder 实例
   * @param query - 查询参数
   * @returns QueryBuilder 实例
   * @throws {ScopeError} 当查询参数格式不正确时抛出错误
   * @protected
   * @example
   * ```typescript
   * const queryBuilder = this.parseArgs({ filter: ['name', 'eq', 'John'] });
   * const queryBuilder2 = this.parseArgs('name=John');
   * ```
   */
  protected parseArgs(query: OrmQuery): QueryBuilder {
    if (query instanceof QueryBuilder) return query;
    if (isString(query)) {
      return QueryBuilder.create(query);
    }
    if (isObject(query)) {
      return QueryBuilder.create(query);
    }
    throw new ScopeError(`iswork.${this.constructor.name}`, '解析查询参数错误');
  }
}
