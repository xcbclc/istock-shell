import {
  Injectable,
  type TModelCreate,
  type TModelData,
  type TModelUpdate,
  type TQueryFilterArr,
} from '@istock-shell/iswork';
import { ThemeModel } from './theme.model';
@Injectable()
export class ThemeService {
  async createOrUpdate(data: Omit<TModelData<ThemeModel>, 'id'> | TModelUpdate<ThemeModel>) {
    if ('id' in data) {
      const themeModel: TModelUpdate<ThemeModel> = {
        ...data,
        updateDate: new Date(),
      };
      return await ThemeModel.updateById(themeModel.id, themeModel);
    } else {
      const themeModel: TModelCreate<ThemeModel> = {
        ...data,
        id: ThemeModel.generateId.nextId(),
        createDate: new Date(),
        updateDate: new Date(),
        rowStatus: 1,
      };
      return await ThemeModel.createOne(themeModel);
    }
  }

  async deleteById(id: string) {
    return await ThemeModel.deleteById(id);
  }

  async getList(limit: number = 1000) {
    const query: { filter: TQueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
    return await ThemeModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }
}
