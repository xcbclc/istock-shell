import dayjs from 'dayjs';
import type { ModelData, ModelPartialData } from '@istock-shell/iswork';
import type { ProxyModel } from '@domains/global/setting/proxy/proxy.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';

export interface ProxyStoreData extends ModelPartialData<ProxyModel> {
  id: string;
  name: string;
  url: string;
}
export interface ProxyStoreModel extends ModelData<ProxyModel> {}

export class Proxy extends StoreWindow<ProxyStoreModel> {
  public list: Array<ProxyStoreData | ProxyStoreModel> = $state([]);
  public editRecord: Record<string, boolean> = $state({});
  protected newTempId: string = $state('');
  public readonly hasAdd: boolean = $derived.by(() => Boolean(this.newTempId));
  public readonly displayList: ProxyStoreData[] = $derived.by(() => {
    return this.list.map((item) => {
      return { ...item, updateDate: dayjs(item.updateDate).format('YYYY-MM-DD HH:mm:ss') };
    });
  });
  constructor(cmdWindow: CmdWindow, config: StoreConfig<ProxyStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init(): Promise<void> {
    this.storeEffect = createStoreEffects({});
    await this.getList();
  }
  async getList() {
    const { payload: list } = await this.cmdWindow.message.send<ProxyStoreModel[]>('setting', 'proxy.list', []);
    if (list) this.list = list;
  }
  async create(data: ProxyStoreData) {
    if (!data.name || !data.url) {
      return;
    }
    await this.cmdWindow.message.send('setting', 'proxy.create', data);
    this.newTempId = '';
  }
  async update(model: ProxyStoreData) {
    if (!model.id || !model.name || !model.url) {
      return;
    }
    await this.cmdWindow.message.send('setting', 'proxy.update', model);
  }
  async delete(id: string) {
    if (id === this.newTempId) {
      this.list = this.list.filter((item) => item.id === id);
      return;
    }
    const { payload } = await this.cmdWindow.message.send<boolean>('setting', 'proxy.delete', id);
    return payload ?? false;
  }
  onAddProxy() {
    if (this.hasAdd) return;
    const tempId = this.cmdWindow.getNextId();
    this.newTempId = tempId;
    this.editRecord[this.newTempId] = true;
    this.list.push({
      id: tempId,
      name: '',
      url: '',
      pathRewrite: [],
      headers: {},
    });
  }
  isCreateData(data: ProxyStoreData | ProxyStoreModel): data is ProxyStoreData {
    return data.id === this.newTempId;
  }
}
