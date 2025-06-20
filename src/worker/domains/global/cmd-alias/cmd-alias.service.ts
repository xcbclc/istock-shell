import { Injectable, type QueryFilterArr, type ModelCreate } from '@istock-shell/iswork';
import { CmdAliasModel } from './cmd-alias.model';

@Injectable()
export class CmdAliasService {
  async createData(data: ModelCreate<CmdAliasModel>) {
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
