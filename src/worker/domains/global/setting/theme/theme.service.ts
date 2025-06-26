import { Injectable, type ModelCreate, type ModelUpdate, type QueryFilterArr } from '@istock-shell/iswork';
import { ThemeModel } from './theme.model';

@Injectable()
export class ThemeService {
  async createOrUpdate(data: ModelCreate<ThemeModel> | ModelUpdate<ThemeModel>) {
    const [theme] = await this.getList([['name', 'eq', data.name]]);
    if (theme) {
      const { id, ...updateData } = data;
      const themeModel: ModelUpdate<ThemeModel> = {
        ...updateData,
        updateDate: new Date(),
      } as ModelUpdate<ThemeModel>;
      return await ThemeModel.updateById(theme.id, themeModel);
    } else {
      const themeModel: ModelCreate<ThemeModel> = {
        ...data,
        id: ThemeModel.generateId.nextId(),
        createDate: new Date(),
        updateDate: new Date(),
        rowStatus: 1,
      } as ModelCreate<ThemeModel>;
      const id = await ThemeModel.createOne(themeModel);
      if (!id) return false;
      return themeModel;
    }
  }

  async deleteById(id: string) {
    return await ThemeModel.deleteById(id);
  }

  async getList(filter: QueryFilterArr[] = [], limit: number = 1000) {
    const query: { filter: QueryFilterArr[] } = { filter: [...filter, ['rowStatus', 'eq', 1]] };
    return await ThemeModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }

  async getActiveTheme(name: string) {
    const [theme] = await this.getList([['name', 'eq', name]]);
    return theme;
  }
}
