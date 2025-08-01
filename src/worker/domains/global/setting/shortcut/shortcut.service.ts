import { Injectable, type ModelCreate, type ModelUpdate, type QueryFilterArr } from '@istock-shell/iswork';
import { ShortcutModel } from './shortcut.model';

@Injectable()
export class ShortcutService {
  async createMany(list: Array<ModelCreate<ShortcutModel>>) {
    return await ShortcutModel.createMany(
      list.map((data) => {
        return {
          ...data,
          id: ShortcutModel.generateId.nextId(),
          createDate: new Date(),
          updateDate: new Date(),
          rowStatus: 1,
        };
      })
    );
  }
  async updateMany(list: Array<ModelUpdate<ShortcutModel>>) {
    return await ShortcutModel.updateMany(
      list
        .filter((data) => data.id)
        .map((data) => {
          return {
            ...data,
            updateDate: new Date(),
          };
        })
    );
  }
  async createOrUpdate(data: ModelCreate<ShortcutModel> | ModelUpdate<ShortcutModel>) {
    const [shortcut] = await this.getList([['key', 'eq', data.key]]);
    if (shortcut) {
      const { id, ...updateData } = data;
      const shortcutModel: ModelUpdate<ShortcutModel> = {
        ...updateData,
        updateDate: new Date(),
      } as ModelUpdate<ShortcutModel>;
      return await ShortcutModel.updateById(shortcut.id, shortcutModel);
    } else {
      const shortcutModel: ModelCreate<ShortcutModel> = {
        ...data,
        id: ShortcutModel.generateId.nextId(),
        createDate: new Date(),
        updateDate: new Date(),
        rowStatus: 1,
      } as ModelCreate<ShortcutModel>;
      const id = await ShortcutModel.createOne(shortcutModel);
      if (!id) return false;
      return shortcutModel;
    }
  }

  async deleteById(id: string) {
    return await ShortcutModel.deleteById(id);
  }

  async getList(filter: QueryFilterArr[] = [], limit: number = 1000) {
    const query: { filter: QueryFilterArr[] } = { filter: [...filter, ['rowStatus', 'eq', 1]] };
    return await ShortcutModel.query({
      limit,
      sort: {
        field: 'id',
        order: 'DESC',
      },
      filter: query.filter,
    });
  }

  async getActiveShortcut(key: string) {
    const [shortcut] = await this.getList([['key', 'eq', key]]);
    return shortcut;
  }
}
