import dayjs from 'dayjs';
import { type ModelData, type ModelPartialData } from '@istock-shell/iswork';
import type { CookieModel } from '@domains/global/setting/cookie/cookie.model';
import type { CmdWindow } from '@/window';
import { createStoreEffects, type StoreConfig, StoreWindow } from '@/store';

export interface CookieStoreModel extends ModelData<CookieModel> {}
export interface CookieStoreData extends ModelPartialData<CookieModel> {
  id: string;
  origin: string;
  cookie: string;
}
export interface CookieStoreDisplayData extends Omit<CookieStoreData, 'updateDate'> {
  origin: string;
  cookie: string;
  updateDate: string;
}

export const getUpdateDateDisplay = (updateDate?: string | Date) => {
  if (!updateDate) return '';
  return dayjs(updateDate).format('YYYY-MM-DD HH:mm:ss');
};

export class CookieManage extends StoreWindow<CookieStoreModel> {
  public list: Array<CookieStoreData | CookieStoreModel> = $state([]);
  public editRecord: Record<string, boolean> = $state({});
  protected newTempId: string = $state('');
  public readonly hasAdd: boolean = $derived.by(() => Boolean(this.newTempId));
  public readonly displayList: CookieStoreDisplayData[] = $derived.by(() => {
    return this.list.map((item) => {
      return { ...item, updateDate: getUpdateDateDisplay(item.updateDate) };
    });
  });
  constructor(cmdWindow: CmdWindow, config: StoreConfig<CookieStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init(): Promise<void> {
    this.storeEffect = createStoreEffects({});
    await this.getList();
  }
  async getList(query: { origin?: string } = {}) {
    const { payload: list } = await this.cmdWindow.message.send<CookieStoreModel[]>('setting', 'cookie.list', query);
    if (list) this.list = list;
  }
  async create(data: CookieStoreData) {
    if (!data.origin || !data.cookie) {
      return;
    }
    await this.cmdWindow.message.send('setting', 'cookie.create', data);
    this.newTempId = '';
  }
  async update(model: CookieStoreModel) {
    if (!model.id || !model.origin || !model.cookie) {
      return;
    }
    await this.cmdWindow.message.send('setting', 'cookie.update', model);
  }
  async delete(id: string) {
    if (id === this.newTempId) {
      this.list = this.list.filter((item) => item.id === id);
      return;
    }
    const { payload } = await this.cmdWindow.message.send<boolean>('setting', 'cookie.delete', id);
    return payload ?? false;
  }
  onAddCookie() {
    if (this.hasAdd) return;
    const tempId = this.cmdWindow.getNextId();
    this.newTempId = tempId;
    this.editRecord[this.newTempId] = true;
    this.list.push({
      id: tempId,
      origin: '',
      cookie: '',
    });
  }
  isCreateData(data: CookieStoreData | CookieStoreModel): data is CookieStoreData {
    return data.id === this.newTempId;
  }
}
