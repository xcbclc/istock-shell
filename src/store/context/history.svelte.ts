import type { ModelData } from '@istock-shell/iswork';
import { sleep } from '@istock-shell/util';
import type { CmdWindowContext } from '@/window';
import type { HistoryModel } from '@domains/global/history/history.model';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';

export interface HistoryStoreModel extends ModelData<HistoryModel> {}
export interface HistoryStoreData extends HistoryStoreModel {}
export type HistoryStoreList = HistoryStoreData[];
export class History extends StoreContext<HistoryStoreModel> {
  public list: HistoryStoreList = $state([]);
  constructor(ctx: CmdWindowContext, config: StoreConfig<HistoryStoreModel> = {}) {
    super(ctx, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
    if (!this.ctx.cmdWindow.isDemoMode) {
      await this.getList();
    }
    // todo 后续同步数据
    this.ctx.store.output.list = $state.snapshot(this.list);
  }
  async getList() {
    const { payload } = await this.ctx.message.send<HistoryStoreList>('global', 'history.list', {});
    if (payload) {
      this.list = payload;
    }
    return payload;
  }
  async onBatchDeleteHistory(success: boolean) {
    if (success) {
      await sleep();
      await this.getList();
      this.ctx.store.output.list = $state.snapshot(this.list);
    }
  }
}
