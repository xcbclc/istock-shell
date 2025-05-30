import type { IdAnyObject, OrmQuery, ModelType, AnyObj } from '../../types';
import { AbstractRunner } from '../abstract-runner';
import type { FetchDriver } from './fetch-driver';

/**
 * Fetch 驱动器连接器类型
 * @description Fetch 驱动器的连接器类型别名
 */
type Connector = FetchDriver['connector'];

/**
 * Fetch 运行器类
 * @description 基于 Fetch API 的数据库运行器，负责执行具体的 HTTP 请求操作
 * @extends AbstractRunner<Connector>
 * @example
 * ```typescript
 * // 创建 Fetch 运行器实例
 * const runner = FetchRunner.createRunner(connector);
 *
 * // 执行查询操作
 * const users = await runner.query(UserModel, {
 *   filter: [{ field: 'status', operator: '$eq', value: 'active' }]
 * });
 *
 * // 创建新记录
 * const ids = await runner.create(UserModel, [{ name: 'John', email: 'john@example.com' }]);
 * ```
 */
export class FetchRunner extends AbstractRunner<Connector> {
  /**
   * 创建 Fetch 运行器实例的静态工厂方法
   * @param connector - Fetch 连接器实例
   * @returns FetchRunner 实例
   */
  static createRunner(connector: Connector) {
    return new FetchRunner(connector);
  }

  /**
   * 构造函数
   * @param connector - Fetch 连接器实例
   */
  constructor(connector: Connector) {
    super(connector);
  }

  /**
   * 获取连接器实例
   * @returns Fetch 连接器实例
   */
  getConnector() {
    return this.connector;
  }

  /**
   * 执行自定义 HTTP 请求
   * @template Result - 返回结果的类型，默认为 Response
   * @param _model - 模型类型（此参数未使用）
   * @param input - 请求的 URL 或 Request 对象
   * @param init - 请求初始化选项，可包含查询参数
   * @returns Promise<Result> 请求响应结果
   */
  async run<Result = Response>(
    _model: ModelType,
    input: RequestInfo | URL,
    init: RequestInit & { query?: AnyObj } = {}
  ): Promise<Result> {
    return (await this.connector.request(input, init)) as Result;
  }

  /**
   * 执行查询操作
   * @template Result - 查询结果的类型，默认为 unknown
   * @param model - 要查询的模型类型
   * @param query - ORM 查询条件
   * @returns Promise<Result[]> 查询结果数组
   */
  async query<Result = unknown>(model: ModelType, query: OrmQuery): Promise<Result[]> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<Result[]>(
      model,
      {
        method: 'GET',
      },
      `?${qb.query()}`
    );
  }

  /**
   * 创建新记录
   * @param model - 要操作的模型类型
   * @param createDatas - 要创建的数据数组
   * @returns Promise<Array<number | string>> 创建的记录 ID 数组
   */
  async create(model: ModelType, createDatas: IdAnyObject[]): Promise<Array<number | string>> {
    return await this.connector.requestModel<Array<number | string>>(model, {
      method: 'POST',
      body: JSON.stringify({
        data: createDatas,
      }),
    });
  }

  /**
   * 更新记录
   * @param model - 要操作的模型类型
   * @param updateData - 要更新的数据
   * @param query - 更新条件查询
   * @returns Promise<boolean> 更新操作是否成功
   */
  async update(model: ModelType, updateData: AnyObj, query: OrmQuery): Promise<boolean> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<boolean>(model, {
      method: 'PUT',
      body: JSON.stringify({
        data: updateData,
        filter: qb.getQueryData(),
      }),
    });
  }

  /**
   * 批量更新多条记录
   * @param model - 要操作的模型类型
   * @param updateDataList - 要更新的数据列表，每个对象应包含 id 字段
   * @returns Promise<boolean> 批量更新操作是否成功
   */
  async updateMany(model: ModelType, updateDataList: AnyObj[]): Promise<boolean> {
    return await this.connector.requestModel<boolean>(model, {
      method: 'PUT',
      body: JSON.stringify({
        list: updateDataList,
      }),
    });
  }

  /**
   * 删除记录
   * @param model - 要操作的模型类型
   * @param query - 删除条件查询
   * @returns Promise<boolean> 删除操作是否成功
   */
  async delete(model: ModelType, query: OrmQuery): Promise<boolean> {
    const qb = this.parseArgs(query);
    return await this.connector.requestModel<boolean>(model, {
      method: 'DELETE',
      body: JSON.stringify({
        filter: qb.getQueryData(),
      }),
    });
  }
}
