import type { DataSource } from '../data-source';
import type { TDataSourceType, TIdAnyObject, TOrmQuery, TModelType, TAnyObj } from '../types';
import { Repository } from './repository';

/**
 * 仓库管理
 */
export class RepositoryManager {
  readonly #repositoryMap = new Map<TModelType, Repository>();
  readonly #dataSource: DataSource<TDataSourceType>;
  get connector() {
    return this.runner.connector;
  }

  get runner() {
    const { driver } = this.#dataSource;
    return driver.runner;
  }

  constructor(dataSource: DataSource<TDataSourceType>) {
    this.#dataSource = dataSource;
  }

  /**
   * 根据模型获取仓库，给数据源使用，仓管管理和数据源一对一绑定
   * @param target
   */
  getRepository(target: TModelType): Repository {
    const repository = this.#repositoryMap.get(target);
    if (repository) return repository;

    const newRepository = new Repository(this);
    this.#repositoryMap.set(target, newRepository);
    return newRepository;
  }

  async run<Result = unknown>(model: TModelType, ...executeArgs: unknown[]): Promise<Result> {
    return this.runner.run(model, ...executeArgs) as Result;
  }

  async query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]> {
    return await this.runner.query(model, query);
  }

  async create(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>> {
    return await this.runner.create(model, createDatas);
  }

  async update(model: TModelType, updateData: TAnyObj, query: TOrmQuery): Promise<boolean> {
    return await this.runner.update(model, updateData, query);
  }

  async updateMany(model: TModelType, updateDataList: TAnyObj[]): Promise<boolean> {
    return await this.runner.updateMany(model, updateDataList);
  }

  async delete(model: TModelType, query: TOrmQuery): Promise<boolean> {
    return await this.runner.delete(model, query);
  }
}
