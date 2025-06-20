import { CmdWindowContext } from '@/window/cmd-window-context';
import { Store, type StoreConfig } from './store.svelte';

export abstract class StoreContext<T extends Record<string, any>> extends Store<T> {
  protected readonly ctx: CmdWindowContext;
  constructor(ctx: CmdWindowContext, config: StoreConfig<T> = {}) {
    super(config);
    this.ctx = ctx;
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
      await this.ctx.message.send(domainPath, executePath, payload);

      if (this.config.debug) {
        console.log(`[Store] Data saved successfully:`, payload);
      }
    } catch (error) {
      console.error(`[Store] Save failed:`, error);
    }
  }
}
