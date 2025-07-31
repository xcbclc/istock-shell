import {
  Injectable,
  type ModelCreate,
  type ModelData,
  type ModelUpdate,
  type QueryFilterArr,
} from '@istock-shell/iswork';
import { ProxyModel } from './proxy.model';

@Injectable()
export class ProxyService {
  async create(data: Omit<ModelData<ProxyModel>, 'id'>) {
    const proxyModel: ModelCreate<ProxyModel> = {
      ...data,
      id: ProxyModel.generateId.nextId(),
      createDate: new Date(),
      updateDate: new Date(),
      rowStatus: 1,
    };
    return await ProxyModel.createOne(proxyModel);
  }

  async update(data: ModelUpdate<ProxyModel>) {
    const proxyModel: ModelUpdate<ProxyModel> = {
      ...data,
      updateDate: new Date(),
    };
    return await ProxyModel.updateById(proxyModel.id, proxyModel);
  }

  async deleteById(id: string) {
    return await ProxyModel.deleteById(id);
  }

  async getList(filter: QueryFilterArr[] = [], limit: number = 1000) {
    const query: { filter: QueryFilterArr[] } = { filter: [...filter, ['rowStatus', 'eq', 1]] };

    return await ProxyModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }
}
