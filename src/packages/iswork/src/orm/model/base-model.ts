/**
 * @fileoverview ORM 基础模型类
 * @description 提供数据模型的基础功能，包括 CRUD 操作、数据转换等
 */

import { FESnowflake, ScopeError } from '@istock-shell/util';
import type { DataSource } from '../data-source';
import { QueryBuilder } from '../query-builder';
import type {
  ModelCreate,
  DataSourceType,
  ModelUpdate,
  ModelData,
  ModelType,
  OrmQuery,
  ModelPartialData,
} from '../types';

/**
 * 基础模型接口
 * @description 定义模型实例必须实现的基本方法
 */
interface IBaseModel {
  /** 模型 ID */
  id?: unknown;
  /** 保存模型数据 */
  save: () => Promise<unknown>;
  /** 将模型转换为普通对象 */
  toObject: () => unknown;
}

/**
 * ORM 基础模型类
 * @description 提供数据模型的基础功能，包括数据持久化、查询、更新、删除等操作
 * @example
 * ```typescript
 * class User extends BaseModel {
 *   name: string;
 *   email: string;
 * }
 *
 * // 创建用户
 * const user = User.createModel({ id: '1', name: 'John', email: 'john@example.com' });
 * await user.save();
 *
 * // 查询用户
 * const foundUser = await User.findOneById('1');
 * ```
 */
export class BaseModel implements IBaseModel {
  /** 数据源实例，用于数据库操作 */
  protected static dataSource: DataSource<DataSourceType>;
  /** 查询构建器创建函数 */
  static readonly createQueryBuilder = QueryBuilder.create.bind(QueryBuilder);
  /** ID 生成器，使用雪花算法生成唯一 ID */
  static readonly generateId = new FESnowflake(0, 0);

  /**
   * 保存当前模型数据
   * @description 将模型实例保存到数据库，如果存在 ID 则更新，否则创建新记录
   * @template This - 当前模型类型
   * @returns 保存操作的结果
   * @example
   * ```typescript
   * const user = new User();
   * user.name = 'John';
   * user.email = 'john@example.com';
   * const result = await user.save();
   * ```
   */
  async save<This extends BaseModel>(this: This) {
    const model = this.constructor as ModelType;
    const data = this.toObject();
    // if (data.id) {
    // todo 查找id
    // 没有创建 有更新
    // }
    return await model.createOne(data);
  }

  /**
   * 将模型实例转换为普通对象
   * @description 将模型实例的所有属性转换为普通的 JavaScript 对象
   * @template This - 当前模型类型
   * @returns 包含模型数据的普通对象
   * @example
   * ```typescript
   * const user = new User();
   * user.name = 'John';
   * const userData = user.toObject(); // { name: 'John' }
   * ```
   */
  toObject<This extends BaseModel>(this: This) {
    return Object.keys(this).reduce<ModelPartialData<This>>((data, key) => {
      const dataKey = key as keyof ModelData<This>;
      data[dataKey] = this[dataKey];
      return data;
    }, {}) as ModelData<This>;
  }

  /**
   * 设置数据源
   * @description 为模型类设置数据源，用于后续的数据库操作
   * @param dataSource - 数据源实例
   * @example
   * ```typescript
   * const dataSource = new DataSource(config);
   * BaseModel.useDataSource(dataSource);
   * ```
   */
  static useDataSource(dataSource: DataSource<DataSourceType>) {
    this.dataSource = dataSource;
  }

  /**
   * 获取仓储实例
   * @description 获取当前模型对应的仓储实例，用于执行数据库操作
   * @returns 仓储实例
   * @example
   * ```typescript
   * const repository = await User.getRepository();
   * ```
   */
  static async getRepository() {
    return await this.dataSource.getRepository(this);
  }

  /**
   * 创建模型实例
   * @description 根据提供的数据创建模型实例
   * @template Model - 模型类型
   * @param data - 模型数据
   * @returns 模型实例
   * @example
   * ```typescript
   * const user = User.createModel({
   *   id: '1',
   *   name: 'John',
   *   email: 'john@example.com'
   * });
   * ```
   */
  static createModel<Model extends ModelType>(this: Model, data: ModelCreate<InstanceType<Model>>) {
    const model = new this() as InstanceType<Model>;
    Object.keys(model).forEach((key) => {
      const dataKey = key as keyof typeof data;
      (model as InstanceType<any>)[dataKey] = data[dataKey];
    });
    return model;
  }

  /**
   * 执行原始数据库操作
   * @description 直接调用底层仓储的原始执行方法
   * @template Result - 返回结果类型
   * @param executeArgs - 执行参数
   * @returns 执行结果
   * @example
   * ```typescript
   * const result = await User.run('SELECT * FROM users WHERE id = ?', ['1']);
   * ```
   */
  static async run<Result = unknown>(...executeArgs: unknown[]): Promise<Result> {
    const rep = await this.getRepository();
    return await rep.run(this, ...executeArgs);
  }

  /**
   * 执行查询操作
   * @description 根据查询条件查询数据
   * @template Model - 模型类型
   * @param query - 查询条件
   * @returns 查询结果
   * @example
   * ```typescript
   * const users = await User.query({
   *   where: { status: 'active' },
   *   limit: 10
   * });
   * ```
   */
  static async query<Model extends ModelType>(this: Model, query: OrmQuery) {
    const rep = await this.getRepository();
    return await rep.query<ModelData<InstanceType<Model>>>(this, query);
  }

  /**
   * 创建单个记录
   * @description 在数据库中创建一条新记录
   * @template Model - 模型类型
   * @param dataOrModel - 要创建的数据或模型实例
   * @returns 创建操作的结果
   * @throws {ScopeError} 当数据中缺少 id 字段时抛出错误
   * @example
   * ```typescript
   * const result = await User.createOne({
   *   id: '1',
   *   name: 'John',
   *   email: 'john@example.com'
   * });
   * ```
   */
  static async createOne<Model extends ModelType>(
    this: Model,
    dataOrModel: ModelCreate<InstanceType<Model>> | ModelData<InstanceType<Model>> | InstanceType<Model>
  ) {
    const rep = await this.getRepository();
    let createData;
    if (dataOrModel instanceof this) {
      createData = dataOrModel.toObject();
    } else {
      createData = dataOrModel;
    }
    if (!(createData as ModelCreate<InstanceType<Model>>).id) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '模型创建没有找到id值');
    }
    return await rep.createOne(this, createData as ModelCreate<InstanceType<Model>>);
  }

  /**
   * 批量创建记录
   * @description 在数据库中批量创建多条记录
   * @template Model - 模型类型
   * @param dataOrModels - 要创建的数据数组或模型实例数组
   * @returns 批量创建操作的结果
   * @throws {ScopeError} 当任何数据中缺少 id 字段时抛出错误
   * @example
   * ```typescript
   * const result = await User.createMany([
   *   { id: '1', name: 'John', email: 'john@example.com' },
   *   { id: '2', name: 'Jane', email: 'jane@example.com' }
   * ]);
   * ```
   */
  static async createMany<Model extends ModelType>(
    this: Model,
    dataOrModels:
      | Array<ModelCreate<InstanceType<Model>>>
      | Array<ModelData<InstanceType<Model>>>
      | Array<InstanceType<Model>>
  ) {
    const rep = await this.getRepository();
    const list = dataOrModels.map((item) => {
      let createData;
      if (item instanceof this) {
        createData = item.toObject();
      } else {
        createData = item;
      }
      if (!(createData as ModelCreate<InstanceType<Model>>).id) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '模型创建没有找到id值');
      }
      return createData;
    });
    return await rep.createMany(this, list as Array<ModelCreate<InstanceType<Model>>>);
  }

  /**
   * 根据 ID 更新记录
   * @description 根据指定的 ID 更新数据库中的记录
   * @template Model - 模型类型
   * @param id - 要更新的记录 ID
   * @param dataOrModel - 更新数据或模型实例
   * @returns 更新是否成功
   * @example
   * ```typescript
   * const success = await User.updateById('1', {
   *   name: 'John Updated',
   *   email: 'john.updated@example.com'
   * });
   * ```
   */
  static async updateById<Model extends ModelType>(
    this: Model,
    id: string | number,
    dataOrModel: ModelUpdate<InstanceType<Model>> | InstanceType<Model>
  ): Promise<boolean> {
    let updateData;
    const rep = await this.getRepository();
    if (dataOrModel instanceof this) {
      updateData = dataOrModel.toObject();
    } else {
      updateData = dataOrModel;
    }
    return await rep.updateById(this, id, updateData);
  }

  /**
   * 批量更新记录
   * @description 批量更新多条记录
   * @template Model - 模型类型
   * @param updateDataLists - 更新数据列表
   * @returns 批量更新操作的结果
   * @example
   * ```typescript
   * const result = await User.updateMany([
   *   { id: '1', name: 'John Updated' },
   *   { id: '2', name: 'Jane Updated' }
   * ]);
   * ```
   */
  static async updateMany<Model extends ModelType>(
    this: Model,
    updateDataLists: Array<ModelUpdate<InstanceType<Model>>>
  ) {
    const rep = await this.getRepository();
    return await rep.updateMany(this, updateDataLists);
  }

  /**
   * 批量删除记录
   * @description 根据查询条件批量删除记录
   * @template Model - 模型类型
   * @param query - 删除条件
   * @returns 删除操作的结果
   * @example
   * ```typescript
   * const result = await User.deleteMany({
   *   where: { status: 'inactive' }
   * });
   * ```
   */
  static async deleteMany<Model extends ModelType>(this: Model, query: OrmQuery) {
    const rep = await this.getRepository();
    return await rep.deleteMany(this, query);
  }

  /**
   * 根据 ID 删除记录
   * @description 根据指定的 ID 删除数据库中的记录
   * @template Model - 模型类型
   * @param id - 要删除的记录 ID
   * @returns 删除操作的结果
   * @example
   * ```typescript
   * const result = await User.deleteById('1');
   * ```
   */
  static async deleteById<Model extends ModelType>(this: Model, id: string | number) {
    const rep = await this.getRepository();
    return await rep.deleteById(this, id);
  }

  /**
   * 根据 ID 查找单个记录
   * @description 根据指定的 ID 查找数据库中的单条记录
   * @template Model - 模型类型
   * @param id - 要查找的记录 ID
   * @returns 查找到的模型数据
   * @example
   * ```typescript
   * const user = await User.findOneById('1');
   * console.log(user.name); // 'John'
   * ```
   */
  static async findOneById<Model extends ModelType>(
    this: Model,
    id: string | number
  ): Promise<ModelData<InstanceType<Model>>> {
    const rep = await this.getRepository();
    return (await rep.findOneById(this, id)) as ModelData<InstanceType<Model>>;
  }
}
