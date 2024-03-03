import { isString, isObject, ScopeError } from '@istock/util';
import { QueryBuilder } from '../query-builder';
import type { TIdAnyObject, TOrmQuery, TModelType, TAnyObj } from '../types';

/**
 * 执行抽象
 */
export abstract class AbstractRunner<Connector = unknown> {
  // 连接器
  readonly #connector: Connector;
  get connector() {
    return this.#connector;
  }

  constructor(connector: Connector) {
    this.#connector = connector;
  }
  /**
   * 创建Runner实例，需要子类实现
   */
  // static createRunner() {}

  /**
   * 获取连接器
   */
  abstract getConnector(): unknown;

  /**
   * 原始执行拿到结果
   * @param model 模型
   * @param executeArgs  执行相关参数
   */
  abstract run<Result = unknown>(model: TModelType, ...executeArgs: unknown[]): Promise<Result>;

  /**
   * 查询抽象方法
   * @param model 模型
   * @param query TOrmQuery查询条件类型
   */
  abstract query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]>;

  /**
   * 创建抽象方法
   * @param model 模型
   * @param createDatas 创建数据
   */
  abstract create(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>>;

  /**
   * 更新抽象方法
   * @param model 模型
   * @param updateData 更新数据
   * @param query TOrmQuery查询条件类型
   */
  abstract update(model: TModelType, updateData: TAnyObj, query: TOrmQuery): Promise<boolean>;

  /**
   * 通过id批量更新抽象方法
   * @param model 模型
   * @param updateDataList 更新数据
   */
  abstract updateMany(model: TModelType, updateDataList: TAnyObj[]): Promise<boolean>;

  /**
   * 删除抽象方法
   * @param model 模型
   * @param query TOrmQuery查询条件类型
   */
  abstract delete(model: TModelType, query: TOrmQuery): Promise<boolean>;

  /**
   * 解析查询参数
   * @param query 查询参数解析
   */
  protected parseArgs(query: TOrmQuery): QueryBuilder {
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
