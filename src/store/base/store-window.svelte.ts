import { CmdWindow } from '@/window/cmd-window.svelte';
import { Store, type StoreConfig } from './store.svelte';

export abstract class StoreWindow<T extends Record<string, any>> extends Store<T> {
  protected readonly cmdWindow: CmdWindow;
  constructor(cmdWindow: CmdWindow, config: StoreConfig<T> = ({} = {})) {
    super(config);
    this.cmdWindow = cmdWindow;
  }
  protected async save(data?: T): Promise<void> {
    const saveData = data ?? this.model;
    if (!saveData || !this.config.autoSave?.enabled) return;

    const { domainPath, executePath, transform } = this.config.autoSave;
    if (!domainPath || !executePath) {
      console.warn('[Store] AutoSave config incomplete, skipping save');
      return;
    }

    try {
      const payload = transform ? transform(saveData) : saveData;
      await this.cmdWindow.message.send(domainPath, executePath, payload);

      if (this.config.debug) {
        console.log(`[Store] Data saved successfully:`, payload);
      }
    } catch (error) {
      console.error(`[Store] Save failed:`, error);
    }
  }
}
