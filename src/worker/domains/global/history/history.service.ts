import { Injectable, type TModelCreate, type TModelUpdate, type IQueryParamsOptions } from '@istock/iswork';
import { HistoryModel } from './history.model';

@Injectable()
export class HistoryService {
  async create(data: TModelCreate<HistoryModel>) {
    if (data.createDate) data.createDate = new Date();
    if (data.updateDate) data.updateDate = new Date();
    if (data.rowStatus) data.rowStatus = 1;
    data.id = HistoryModel.generateId.nextId();
    return await HistoryModel.createOne(data);
  }

  async update(data: TModelUpdate<HistoryModel>) {
    return await HistoryModel.updateById(data.id, data);
  }

  async query(query: IQueryParamsOptions) {
    return await HistoryModel.query(query);
  }

  async find(query: IQueryParamsOptions) {
    return await HistoryModel.query(query);
  }

  async batchDeleteCmd(mode: number, query: IQueryParamsOptions) {
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
