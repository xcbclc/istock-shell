import { type CmdWindow, CmdWindowsManager } from '@/window';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';

export interface WindowViewModel {}
export interface WindowViewDataItem {
  id: number;
}
export type WindowViewList = WindowViewDataItem[];

export const LOCAL_STORE_WINDOW_VIEW_TOKEN = 'istock_local_store_window_view_token';

export class WindowView extends StoreWindow<WindowViewModel> {
  readonly #windowViewToken: string = LOCAL_STORE_WINDOW_VIEW_TOKEN;
  #maxCount = 9;
  public list: WindowViewList = $state([{ id: 1 }]);
  public currentFocusWindowId: number = $state(1);
  public readonly windowCount = $derived(() => this.list.length);
  public readonly styleRecord: Record<string, string> = $derived.by(() => this.updateWindowStyleRecord());
  get windowViewToken() {
    return this.#windowViewToken;
  }
  constructor(cmdWindow: CmdWindow, config: StoreConfig<WindowViewModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
  }
  protected getNewWindowId() {
    const ids = this.list.map((win) => win.id).sort((a, b) => a - b);

    for (let i = 0; i < this.#maxCount - 1; i++) {
      if (ids[i + 1] - ids[i] > 1 || ids[i + 1] === undefined) {
        return ids[i] + 1;
      }
    }
    return null;
  }
  public onWindowViewKeyAction(event: KeyboardEvent) {
    const { shortcut } = this.cmdWindow.store;

    // 检查搜索快捷键
    if (shortcut.matchShortcut(event, 'search')) {
      const { search } = this.cmdWindow.store;
      search.show = true;
      event.preventDefault();
      return;
    }

    // 检查设置快捷键
    if (shortcut.matchShortcut(event, 'settings')) {
      const { setting } = this.cmdWindow.store;
      setting.show = true;
      event.preventDefault();
      return;
    }

    // 检查新建窗口快捷键
    if (shortcut.matchShortcut(event, 'newWindow')) {
      const newId = this.getNewWindowId();
      if (newId) {
        this.list.push({
          id: newId,
        });
      }
      event.preventDefault();
      return;
    }
    if (shortcut.matchShortcut(event, 'clearScreen')) {
      if (this.currentFocusWindowId) {
        const ctx = CmdWindowsManager.getInstance().getCmdContext(this.currentFocusWindowId);
        const { input } = ctx.store;
        input.sendCmd('lssc');
      }
      event.preventDefault();
      return;
    }
  }
  protected updateWindowStyleRecord() {
    const styleRecord = this.list.reduce<Record<string, string>>((record, window) => {
      const len = this.list.length;
      const row = Math.ceil(Math.sqrt(len));
      const column = Math.ceil(len / row);
      record[`${window.id}`] = [`width: ${(100 / row).toFixed(4)}%`, `height: ${(100 / column).toFixed(4)}%`].join(';');
      return record;
    }, {});
    return styleRecord;
  }
}
