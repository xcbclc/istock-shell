import {
  Injectable,
  type TModelCreate,
  type TModelData,
  type TModelUpdate,
  type TQueryFilterArr,
} from '@istock/iswork';
import { CookieModel } from './cookie.model';
@Injectable()
export class CookieService {
  async create(data: Omit<TModelData<CookieModel>, 'id'>) {
    const cookieModel: TModelCreate<CookieModel> = {
      createDate: new Date(),
      updateDate: new Date(),
      rowStatus: 1,
      ...data,
      id: CookieModel.generateId.nextId(),
    };
    return await CookieModel.createOne(cookieModel);
  }

  async update(data: TModelUpdate<CookieModel>) {
    const cookieModel: TModelUpdate<CookieModel> = {
      ...data,
      updateDate: new Date(),
    };
    return await CookieModel.updateById(cookieModel.id, cookieModel);
  }

  async deleteById(id: string) {
    return await CookieModel.deleteById(id);
  }

  async getList(host?: string, limit: number = 1000) {
    const query: { filter: TQueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
    if (host && query.filter) {
      query.filter.push(['host', 'cont', host]);
    }
    return await CookieModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }

  async findOneByHost(host: string) {
    const list = await this.getList(host, 1);
    return list[0] ?? null;
  }
}
