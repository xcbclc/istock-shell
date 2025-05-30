import {
  Injectable,
  type ModelCreate,
  type ModelData,
  type ModelUpdate,
  type QueryFilterArr,
} from '@istock-shell/iswork';
import { ThemeModel } from './theme.model';
@Injectable()
export class ThemeService {
  async createOrUpdate(data: Omit<ModelData<ThemeModel>, 'id'> | ModelUpdate<ThemeModel>) {
    if ('id' in data) {
      const themeModel: ModelUpdate<ThemeModel> = {
        ...data,
        updateDate: new Date(),
      };
      return await ThemeModel.updateById(themeModel.id, themeModel);
    } else {
      const themeModel: ModelCreate<ThemeModel> = {
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
    const query: { filter: QueryFilterArr[] } = { filter: [['rowStatus', 'eq', 1]] };
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
