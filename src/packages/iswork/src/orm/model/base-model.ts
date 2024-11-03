import { FESnowflake, ScopeError } from '@istock/util';
import type { DataSource } from '../data-source';
import { QueryBuilder } from '../query-builder';
import type {
  TModelCreate,
  TDataSourceType,
  TModelUpdate,
  TModelData,
  TModelType,
  TOrmQuery,
  TModelPartialData,
} from '../types';

interface IBaseModel {
  id?: unknown;
  save: () => Promise<unknown>;
  toObject: () => unknown;
}

/**
 * 基础模型
 */
export class BaseModel implements IBaseModel {
  protected static dataSource: DataSource<TDataSourceType>;
  static readonly createQueryBuilder = QueryBuilder.create.bind(QueryBuilder);
  static readonly generateId = new FESnowflake(0, 0);

  /**
   * 保存当前模型数据
   */
  async save<This extends BaseModel>(this: This) {
    const model = this.constructor as TModelType;
    const data = this.toObject();
    // if (data.id) {
    // todo 查找id
    // 没有创建 有更新
    // }
    return await model.createOne(data);
  }

  /**
   * 模型实例转换成数据
   */
  toObject<This extends BaseModel>(this: This) {
    return Object.keys(this).reduce<TModelPartialData<This>>((data, key) => {
      const dataKey = key as keyof TModelData<This>;
      data[dataKey] = this[dataKey];
      return data;
    }, {}) as TModelData<This>;
  }

  static useDataSource(dataSource: DataSource<TDataSourceType>) {
    this.dataSource = dataSource;
  }

  static async getRepository() {
    return await this.dataSource.getRepository(this);
  }

  static createModel<Model extends TModelType>(this: Model, data: TModelCreate<InstanceType<Model>>) {
    const model = new this() as InstanceType<Model>;
    Object.keys(model).forEach((key) => {
      const dataKey = key as keyof typeof data;
      (model as InstanceType<any>)[dataKey] = data[dataKey];
    });
    return model;
  }

  /**
   * 连接器原始执行操作
   * @param executeArgs
   */
  static async run<Result = unknown>(...executeArgs: unknown[]): Promise<Result> {
    const rep = await this.getRepository();
    return await rep.run(this, ...executeArgs);
  }

  static async query<Model extends TModelType>(this: Model, query: TOrmQuery) {
    const rep = await this.getRepository();
    return await rep.query<TModelData<InstanceType<Model>>>(this, query);
  }

  static async createOne<Model extends TModelType>(
    this: Model,
    dataOrModel: TModelCreate<InstanceType<Model>> | TModelData<InstanceType<Model>> | InstanceType<Model>
  ) {
    const rep = await this.getRepository();
    let createData;
    if (dataOrModel instanceof this) {
      createData = dataOrModel.toObject();
    } else {
      createData = dataOrModel;
    }
    if (!(createData as TModelCreate<InstanceType<Model>>).id) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '模型创建没有找到id值');
    }
    return await rep.createOne(this, createData as TModelCreate<InstanceType<Model>>);
  }

  static async createMany<Model extends TModelType>(
    this: Model,
    dataOrModels:
      | Array<TModelCreate<InstanceType<Model>>>
      | Array<TModelData<InstanceType<Model>>>
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
      if (!(createData as TModelCreate<InstanceType<Model>>).id) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '模型创建没有找到id值');
      }
      return createData;
    });
    return await rep.createMany(this, list as Array<TModelCreate<InstanceType<Model>>>);
  }

  static async updateById<Model extends TModelType>(
    this: Model,
    id: string | number,
    dataOrModel: TModelUpdate<InstanceType<Model>> | InstanceType<Model>
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

  static async updateMany<Model extends TModelType>(
    this: Model,
    updateDataLists: Array<TModelUpdate<InstanceType<Model>>>
  ) {
    const rep = await this.getRepository();
    return await rep.updateMany(this, updateDataLists);
  }

  static async deleteMany<Model extends TModelType>(this: Model, query: TOrmQuery) {
    const rep = await this.getRepository();
    return await rep.deleteMany(this, query);
  }

  static async deleteById<Model extends TModelType>(this: Model, id: string | number) {
    const rep = await this.getRepository();
    return await rep.deleteById(this, id);
  }

  static async findOneById<Model extends TModelType>(
    this: Model,
    id: string | number
  ): Promise<TModelData<InstanceType<Model>>> {
    const rep = await this.getRepository();
    return (await rep.findOneById(this, id)) as TModelData<InstanceType<Model>>;
  }
}
