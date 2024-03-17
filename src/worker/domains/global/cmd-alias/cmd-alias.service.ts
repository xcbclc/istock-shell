import { Injectable, type TQueryFilterArr, type TModelCreate } from '@istock/iswork';
import { CmdAliasModel } from './cmd-alias.model';

export type TCmdAliasData = {
  historyId: string;
  cmd: string;
  alias: string;
  domainName: string;
  description?: string;
};

@Injectable()
export class CmdAliasService {
  async createData(data: Omit<TCmdAliasData, 'historyId'>) {
    const cmdAlias: TModelCreate<CmdAliasModel> = {
      id: CmdAliasModel.generateId.nextId(),
      createDate: new Date(),
      updateDate: new Date(),
      rowStatus: 1,
      description: '',
      ...data,
    };
    return await CmdAliasModel.createOne(cmdAlias);
  }

  async findRecommend(alias: string) {
    const query: { filter: TQueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
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
