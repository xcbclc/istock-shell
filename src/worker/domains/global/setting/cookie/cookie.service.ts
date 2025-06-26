import {
  Injectable,
  type ModelCreate,
  type ModelData,
  type ModelUpdate,
  type QueryFilterArr,
} from '@istock-shell/iswork';
import { CookieModel } from './cookie.model';
@Injectable()
export class CookieService {
  async create(data: Omit<ModelData<CookieModel>, 'id'>) {
    const cookieModel: ModelCreate<CookieModel> = {
      ...data,
      id: CookieModel.generateId.nextId(),
      createDate: new Date(),
      updateDate: new Date(),
      rowStatus: 1,
    };
    return await CookieModel.createOne(cookieModel);
  }

  async update(data: ModelUpdate<CookieModel>) {
    const cookieModel: ModelUpdate<CookieModel> = {
      ...data,
      updateDate: new Date(),
    };
    return await CookieModel.updateById(cookieModel.id, cookieModel);
  }

  async deleteById(id: string) {
    return await CookieModel.deleteById(id);
  }

  async getList(origin?: string, limit: number = 1000) {
    const query: { filter: QueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
    if (origin && query.filter) {
      query.filter.push(['origin', 'cont', origin]);
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

  async findOneByOrigin(origin: string) {
    const list = await this.getList(origin, 1);
    return list[0] ?? null;
  }
}
