import type { CmdWindowContext } from '@/window';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';
import {
  contextmenuStoreList,
  ContextmenuStoreCopy,
  ContextmenuStoreSplit,
  ContextmenuStoreOther,
} from './data/contextmenu-data';

export { ContextmenuStoreCopy, ContextmenuStoreSplit, ContextmenuStoreOther } from './data/contextmenu-data';

export interface ContextmenuStorePosition {
  window: { width: number; height: number };
  offset: { x: number; y: number };
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

export const getInitPosition = () => {
  return {
    window: { width: 0, height: 0 },
    offset: { x: -1, y: -1 },
  };
};

export class Contextmenu extends StoreContext<ContextmenuStoreModel> {
  public list: ContextmenuStoreList = $state(contextmenuStoreList);
  public position: ContextmenuStorePosition = $state(getInitPosition());
  public hoverBlockIndex: number = $state(-1);
  public show: boolean = $state(false);
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
