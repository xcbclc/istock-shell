import { Injectable, type ModelCreate, type ModelUpdate, type QueryParamsOptions } from '@istock-shell/iswork';
import { HistoryModel } from './history.model';

@Injectable()
export class HistoryService {
  async create(data: ModelCreate<HistoryModel>) {
    if (data.createDate) data.createDate = new Date();
    if (data.updateDate) data.updateDate = new Date();
    if (data.rowStatus) data.rowStatus = 1;
    if (!data.id) data.id = HistoryModel.generateId.nextId();
    return await HistoryModel.createOne(data);
  }

  async update(data: ModelUpdate<HistoryModel>) {
    return await HistoryModel.updateById(data.id, data);
  }

  async query(query: QueryParamsOptions) {
    return await HistoryModel.query(query);
  }

  async find(query: QueryParamsOptions) {
    return await HistoryModel.query(query);
  }

  async findOne(id: string) {
    return await HistoryModel.findOneById(id);
  }

  async batchDeleteCmd(mode: number, query: QueryParamsOptions) {
    let historys = await HistoryModel.query({
      sort: {
        field: 'createDate',
        order: 'DESC',
      },
      filter: ['rowStatus', 'eq', 1],
      ...query,
    });
    if (mode === 0) {
      historys = historys.map((history) => {
        history.rowStatus = 0;
        return history;
      });
      await HistoryModel.updateMany(historys);
    } else {
      await HistoryModel.deleteMany({
        filter: ['id', 'in', historys.map((history) => history.id)],
      });
    }
    return true;
  }
}
