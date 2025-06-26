import type { SvelteComponent } from 'svelte';
import { createStoreEffects, type StoreConfig, StoreWindow } from '@/store';
import type { CmdWindow } from '@/window';

export interface OutputComponentStoreModel extends Map<string, SvelteComponent> {}

export class OutputComponent extends StoreWindow<OutputComponentStoreModel> {
  constructor(cmdWindow: CmdWindow, config: StoreConfig<OutputComponentStoreModel> = {}) {
    super(cmdWindow, config);
    this.model = new Map<string, SvelteComponent>();
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
  }
  registerComponent(name: string, component: SvelteComponent) {
    if (this.model.get(name)) return;
    this.model.set(name, component);
  }
  getComponentByName(name: string) {
    return this.model.get(name);
  }
}
