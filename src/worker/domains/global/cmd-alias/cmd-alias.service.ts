import { Injectable, type QueryFilterArr, type ModelCreate, type ModelUpdate } from '@istock-shell/iswork';
import { CmdAliasModel } from './cmd-alias.model';

@Injectable()
export class CmdAliasService {
  async create(data: ModelCreate<CmdAliasModel>) {
    const { id: _id, ...newData } = data;
    const cmdAlias: ModelCreate<CmdAliasModel> = Object.assign(
      {
        id: CmdAliasModel.generateId.nextId(),
        createDate: new Date(),
        updateDate: new Date(),
        rowStatus: 1,
        description: '',
      },
      newData
    );
    return await CmdAliasModel.createOne(cmdAlias);
  }

  async update(data: ModelUpdate<CmdAliasModel>) {
    const cmdAliasModel: ModelUpdate<CmdAliasModel> = {
      ...data,
      updateDate: new Date(),
    };
    return await CmdAliasModel.updateById(cmdAliasModel.id, cmdAliasModel);
  }

  async deleteById(id: string) {
    return await CmdAliasModel.deleteById(id);
  }
  async getList(filter: QueryFilterArr[] = [], limit: number = 1000) {
    const query: { filter: QueryFilterArr[] } = { filter: [...filter, ['rowStatus', 'eq', 1]] };
    return await CmdAliasModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }
  async findRecommend(alias: string) {
    const query: { filter: QueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
    if (alias && query.filter) {
      query.filter.push(['alias', 'cont', alias]);
    }
    return await CmdAliasModel.query({
      limit: 10,
      sort: {
        field: 'createDate',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }
}
