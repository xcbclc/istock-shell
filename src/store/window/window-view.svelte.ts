import type { CmdWindow } from '@/window/cmd-window.svelte';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store/base';

export interface WindowViewModel {}
export interface WindowViewDataItem {
  id: number;
}
export type WindowViewData = WindowViewDataItem[];

export const LOCAL_STORE_WINDOW_VIEW_TOKEN = 'istock_local_store_window_view_token';

export class WindowView extends StoreWindow<WindowViewModel> {
  readonly #windowViewToken: string = LOCAL_STORE_WINDOW_VIEW_TOKEN;
  #maxCount = 9;
  public data: WindowViewData = $state([{ id: 1 }]);
  public currentFocusWindowId: number = $state(1);
  public readonly windowCount = $derived(() => this.data.length);
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
    const ids = this.data.map((win) => win.id).sort((a, b) => a - b);

    for (let i = 0; i < this.#maxCount - 1; i++) {
      if (ids[i + 1] - ids[i] > 1 || ids[i + 1] === undefined) {
        return ids[i] + 1;
      }
    }
    return null;
  }
  public onWindowViewKeyAction(event: KeyboardEvent) {
    const { key } = event;
    if (event.ctrlKey) {
      const shortcutKeys = ['ctrl'];
      if (event.shiftKey) shortcutKeys.push('shift');
      if (event.altKey) shortcutKeys.push('alt');
      shortcutKeys.push(key.toLowerCase());
      const shortcutKey = shortcutKeys.join('+');
      if (shortcutKey === ['ctrl', 'shift', 's'].join('+')) {
        // 打开搜索
        const { search } = this.cmdWindow.store;
        search.show = true;
        event.preventDefault();
      }
      if (shortcutKey === ['ctrl', 'alt', 's'].join('+')) {
        const { setting } = this.cmdWindow.store;
        setting.show = true;
        event.preventDefault();
      }
      if (shortcutKey === ['ctrl', 'shift', 'x'].join('+')) {
        // 新建窗口
        const newId = this.getNewWindowId();
        if (newId) {
          this.data.push({
            id: newId,
          });
        }
        event.preventDefault();
      }
    }
  }
  protected updateWindowStyleRecord() {
    const styleRecord = this.data.reduce<Record<string, string>>((record, window) => {
      const len = this.data.length;
      const row = Math.ceil(Math.sqrt(len));
      const column = Math.ceil(len / row);
      record[`${window.id}`] = [`width: ${(100 / row).toFixed(4)}%`, `height: ${(100 / column).toFixed(4)}%`].join(';');
      return record;
    }, {});
    return styleRecord;
  }
}
