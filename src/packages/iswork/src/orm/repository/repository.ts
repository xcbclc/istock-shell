import type { TIdAnyObject, TOrmQuery, TModelType, TAnyObj } from '../types';
import type { RepositoryManager } from './repository-manager';

/**
 * 仓库，可扩展基本方法，添加默认查询条件
 */
export class Repository {
  readonly #repositoryManager: RepositoryManager;

  constructor(repositoryManager: RepositoryManager) {
    this.#repositoryManager = repositoryManager;
  }

  async run<Result = unknown>(model: TModelType, ...executeArgs: unknown[]): Promise<Result> {
    return this.#repositoryManager.run(model, ...executeArgs) as Result;
  }

  async query<Result = unknown>(model: TModelType, query: TOrmQuery): Promise<Result[]> {
    return await this.#repositoryManager.query(model, query);
  }

  async createOne(model: TModelType, createData: TIdAnyObject): Promise<number | string | null> {
    const result = await this.#repositoryManager.create(model, [createData]);
    return result.length > 0 ? result[0] : null;
  }

  async createMany(model: TModelType, createDatas: TIdAnyObject[]): Promise<Array<number | string>> {
    return await this.#repositoryManager.create(model, createDatas);
  }

  async updateMany(model: TModelType, updateDataList: TIdAnyObject[]): Promise<boolean> {
    return await this.#repositoryManager.updateMany(model, updateDataList);
  }

  async updateById(model: TModelType, id: string | number, updateData: TAnyObj): Promise<boolean> {
    return await this.#repositoryManager.update(model, updateData, {
      filter: ['id', 'eq', id],
    });
  }

  async deleteMany(model: TModelType, query: TOrmQuery): Promise<boolean> {
    return await this.#repositoryManager.delete(model, query);
  }

  async deleteById(model: TModelType, id: string | number): Promise<boolean> {
    return await this.#repositoryManager.delete(model, {
      filter: ['id', 'eq', id],
    });
  }
}
