import type { CmdWindowContext } from '@/window';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';

export interface ContextmenuStorePosition {
  window: { width: number; height: number };
  offset: { x: number; y: number };
}

export enum ContextmenuStoreCopy {
  input = 'input',
  output = 'output',
  prompt = 'prompt',
  link = 'link',
  all = 'all',
}

export enum ContextmenuStoreSplit {
  up = 'up',
  right = 'right',
  down = 'down',
  left = 'left',
}

export enum ContextmenuStoreOther {
  addCmdAlias = 'addCmdAlias',
  bookmark = 'bookmark',
}

export type ContextmenuStoreAction = ContextmenuStoreCopy | ContextmenuStoreSplit | ContextmenuStoreOther;

export interface ContextmenuStoreModel {
  text: string;
  action: ContextmenuStoreAction;
  shortcutKey: string;
}

export type ContextmenuStoreModels = ContextmenuStoreModel[];

export interface ContextmenuStoreItem {
  groupName: string;
  menus: ContextmenuStoreModels;
}
export type ContextmenuStoreList = ContextmenuStoreItem[];

export class Contextmenu extends StoreContext<ContextmenuStoreModel> {
  public list: ContextmenuStoreList = $state([]);
  public position: ContextmenuStorePosition = $state({
    window: { width: 0, height: 0 },
    offset: { x: -1, y: -1 },
  });
  constructor(ctx: CmdWindowContext, config: StoreConfig<ContextmenuStoreModel> = {}) {
    super(ctx, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
  }
  getAllMenu() {
    const menus: ContextmenuStoreModels = this.list.map((item) => item.menus).flat(2);
    return menus;
  }
}
