/**
 * @fileoverview ORM 仓库类
 * @description 提供模型数据的 CRUD 操作接口，封装了常用的数据库操作方法
 */

import type { IdAnyObject, OrmQuery, ModelType, AnyObj } from '../types';
import type { RepositoryManager } from './repository-manager';

/**
 * 仓库类
 * @description 提供模型数据的增删改查操作，可扩展基本方法，添加默认查询条件
 * @example
 * ```typescript
 * const userRepository = await dataSource.getRepository(UserModel);
 *
 * // 创建单个记录
 * const userId = await userRepository.createOne(UserModel, { name: 'John', email: 'john@example.com' });
 *
 * // 查询记录
 * const user = await userRepository.findOneById(UserModel, userId);
 *
 * // 更新记录
 * await userRepository.updateById(UserModel, userId, { name: 'John Doe' });
 *
 * // 删除记录
 * await userRepository.deleteById(UserModel, userId);
 * ```
 */
export class Repository {
  /** 仓库管理器实例 */
  readonly #repositoryManager: RepositoryManager;

  /**
   * 仓库构造函数
   * @description 创建仓库实例
   * @param repositoryManager - 仓库管理器实例
   */
  constructor(repositoryManager: RepositoryManager) {
    this.#repositoryManager = repositoryManager;
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
   * const result = await repository.run<number>(UserModel, 'customOperation', params);
   * ```
   */
  async run<Result = unknown>(model: ModelType, ...executeArgs: unknown[]): Promise<Result> {
    return this.#repositoryManager.run(model, ...executeArgs) as Result;
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
   * const users = await repository.query(UserModel, {
   *   filter: ['name', 'cont', 'john'],
   *   sort: ['createdAt', 'DESC'],
   *   limit: 10
   * });
   * ```
   */
  async query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]> {
    return await this.#repositoryManager.query(model, query);
  }

  /**
   * 创建单个记录
   * @description 创建一条新记录
   * @param model - 模型类
   * @param createData - 创建数据
   * @returns 新记录的 ID，如果创建失败则返回 null
   * @example
   * ```typescript
   * const userId = await repository.createOne(UserModel, {
   *   name: 'John Doe',
   *   email: 'john@example.com'
   * });
   * ```
   */
  async createOne(model: ModelType, createData: IdAnyObject): Promise<number | string | null> {
    const result = await this.#repositoryManager.create(model, [createData]);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * 创建多个记录
   * @description 批量创建多条记录
   * @param model - 模型类
   * @param createDatas - 创建数据数组
   * @returns 新记录的 ID 数组
   * @example
   * ```typescript
   * const userIds = await repository.createMany(UserModel, [
   *   { name: 'John', email: 'john@example.com' },
   *   { name: 'Jane', email: 'jane@example.com' }
   * ]);
   * ```
   */
  async createMany(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>> {
    return await this.#repositoryManager.create(model, createDatas);
  }

  /**
   * 批量更新记录
   * @description 批量更新多条记录
   * @param model - 模型类
   * @param updateDataList - 更新数据数组
   * @returns 是否更新成功
   * @example
   * ```typescript
   * const success = await repository.updateMany(UserModel, [
   *   { id: 1, name: 'John Updated' },
   *   { id: 2, name: 'Jane Updated' }
   * ]);
   * ```
   */
  async updateMany(model: ModelType, updateDataList: IdAnyObject[]): Promise<boolean> {
    return await this.#repositoryManager.updateMany(model, updateDataList);
  }

  /**
   * 根据 ID 更新记录
   * @description 根据 ID 更新单条记录
   * @param model - 模型类
   * @param id - 记录 ID
   * @param updateData - 更新数据
   * @returns 是否更新成功
   * @example
   * ```typescript
   * const success = await repository.updateById(UserModel, 1, {
   *   name: 'John Updated',
   *   email: 'john.updated@example.com'
   * });
   * ```
   */
  async updateById(model: ModelType, id: string | number, updateData: AnyObj): Promise<boolean> {
    return await this.#repositoryManager.update(model, updateData, {
      filter: ['id', 'eq', id],
    });
  }

  /**
   * 批量删除记录
   * @description 根据查询条件批量删除记录
   * @param model - 模型类
   * @param query - 查询条件
   * @returns 是否删除成功
   * @example
   * ```typescript
   * const success = await repository.deleteMany(UserModel, {
   *   filter: ['status', 'eq', 'inactive']
   * });
   * ```
   */
  async deleteMany(model: ModelType, query: OrmQuery): Promise<boolean> {
    return await this.#repositoryManager.delete(model, query);
  }

  /**
   * 根据 ID 删除记录
   * @description 根据 ID 删除单条记录
   * @param model - 模型类
   * @param id - 记录 ID
   * @returns 是否删除成功
   * @example
   * ```typescript
   * const success = await repository.deleteById(UserModel, 1);
   * ```
   */
  async deleteById(model: ModelType, id: string | number): Promise<boolean> {
    return await this.#repositoryManager.delete(model, {
      filter: ['id', 'eq', id],
    });
  }

  /**
   * 根据 ID 查找单条记录
   * @description 根据 ID 查找单条记录
   * @param model - 模型类
   * @param id - 记录 ID
   * @returns 查找到的记录，如果不存在则返回 null
   * @example
   * ```typescript
   * const user = await repository.findOneById(UserModel, 1);
   * if (user) {
   *   console.log('找到用户:', user);
   * } else {
   *   console.log('用户不存在');
   * }
   * ```
   */
  async findOneById(model: ModelType, id: string | number): Promise<unknown> {
    const list = await this.#repositoryManager.query(model, {
      filter: ['id', 'eq', id],
    });
    return list?.length ? list[0] : null;
  }
}
