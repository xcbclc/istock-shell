/**
 * @fileoverview ORM 仓库管理器
 * @description 管理模型仓库实例，提供数据库操作的统一接口
 */

import type { DataSource } from '../data-source';
import type { DataSourceType, IdAnyObject, OrmQuery, ModelType, AnyObj } from '../types';
import { Repository } from './repository';

/**
 * 仓库管理器类
 * @description 管理模型仓库实例，提供数据库操作的统一接口，与数据源一对一绑定
 * @example
 * ```typescript
 * const repositoryManager = new RepositoryManager(dataSource);
 * const userRepository = repositoryManager.getRepository(UserModel);
 *
 * // 创建记录
 * const userIds = await repositoryManager.create(UserModel, [{ name: 'John' }]);
 *
 * // 查询记录
 * const users = await repositoryManager.query(UserModel, { filter: ['name', 'eq', 'John'] });
 *
 * // 更新记录
 * await repositoryManager.update(UserModel, { name: 'John Doe' }, { filter: ['id', 'eq', 1] });
 *
 * // 删除记录
 * await repositoryManager.delete(UserModel, { filter: ['id', 'eq', 1] });
 * ```
 */
export class RepositoryManager {
  /** 仓库实例映射表 */
  readonly #repositoryMap = new Map<ModelType, Repository>();
  /** 数据源实例 */
  readonly #dataSource: DataSource<DataSourceType>;

  /**
   * 获取连接器
   * @description 获取数据库连接器实例
   * @returns 数据库连接器
   */
  get connector() {
    return this.runner.connector;
  }

  /**
   * 获取运行器
   * @description 获取数据库运行器实例
   * @returns 数据库运行器
   */
  get runner() {
    const { driver } = this.#dataSource;
    return driver.runner;
  }

  /**
   * 仓库管理器构造函数
   * @description 创建仓库管理器实例
   * @param dataSource - 数据源实例
   */
  constructor(dataSource: DataSource<DataSourceType>) {
    this.#dataSource = dataSource;
  }

  /**
   * 获取模型仓库
   * @description 根据模型获取对应的仓库实例，如果不存在则创建新的仓库实例
   * @param target - 模型类
   * @returns 仓库实例
   * @example
   * ```typescript
   * const userRepository = repositoryManager.getRepository(UserModel);
   * const postRepository = repositoryManager.getRepository(PostModel);
   * ```
   */
  getRepository(target: ModelType): Repository {
    const repository = this.#repositoryMap.get(target);
    if (repository) return repository;

    const newRepository = new Repository(this);
    this.#repositoryMap.set(target, newRepository);
    return newRepository;
  }

  /**
   * 执行自定义操作
   * @description 执行自定义的数据库操作
   * @template Result - 返回结果类型
   * @param model - 模型类
   * @param executeArgs - 执行参数
   * @returns 执行结果
   * @example
   * ```typescript
   * const result = await repositoryManager.run<number>(UserModel, 'customOperation', params);
   * ```
   */
  async run<Result = unknown>(model: ModelType, ...executeArgs: unknown[]): Promise<Result> {
    return this.runner.run(model, ...executeArgs) as Result;
  }

  /**
   * 查询数据
   * @description 根据查询条件查询数据
   * @template Result - 返回结果类型
   * @param model - 模型类
   * @param query - 查询条件
   * @returns 查询结果数组
   * @example
   * ```typescript
   * const users = await repositoryManager.query(UserModel, {
   *   filter: ['name', 'cont', 'john'],
   *   sort: ['createdAt', 'DESC'],
   *   limit: 10
   * });
   * ```
   */
  async query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]> {
    return await this.runner.query(model, query);
  }

  /**
   * 创建记录
   * @description 批量创建记录
   * @param model - 模型类
   * @param createDatas - 创建数据数组
   * @returns 新记录的 ID 数组
   * @example
   * ```typescript
   * const userIds = await repositoryManager.create(UserModel, [
   *   { name: 'John', email: 'john@example.com' },
   *   { name: 'Jane', email: 'jane@example.com' }
   * ]);
   * ```
   */
  async create(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>> {
    return await this.runner.create(model, createDatas);
  }

  /**
   * 更新记录
   * @description 根据查询条件更新记录
   * @param model - 模型类
   * @param updateData - 更新数据
   * @param query - 查询条件
   * @returns 是否更新成功
   * @example
   * ```typescript
   * const success = await repositoryManager.update(UserModel,
   *   { name: 'John Updated' },
   *   { filter: ['id', 'eq', 1] }
   * );
   * ```
   */
  async update(model: ModelType, updateData: AnyObj, query: OrmQuery): Promise<boolean> {
    return await this.runner.update(model, updateData, query);
  }

  /**
   * 批量更新记录
   * @description 批量更新多条记录
   * @param model - 模型类
   * @param updateDataList - 更新数据数组
   * @returns 是否更新成功
   * @example
   * ```typescript
   * const success = await repositoryManager.updateMany(UserModel, [
   *   { id: 1, name: 'John Updated' },
   *   { id: 2, name: 'Jane Updated' }
   * ]);
   * ```
   */
  async updateMany(model: ModelType, updateDataList: AnyObj[]): Promise<boolean> {
    return await this.runner.updateMany(model, updateDataList);
  }

  /**
   * 删除记录
   * @description 根据查询条件删除记录
   * @param model - 模型类
   * @param query - 查询条件
   * @returns 是否删除成功
   * @example
   * ```typescript
   * const success = await repositoryManager.delete(UserModel, {
   *   filter: ['status', 'eq', 'inactive']
   * });
   * ```
   */
  async delete(model: ModelType, query: OrmQuery): Promise<boolean> {
    return await this.runner.delete(model, query);
  }
}
