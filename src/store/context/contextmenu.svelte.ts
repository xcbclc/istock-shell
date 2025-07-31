import type { CmdWindowContext } from '@/window';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';
import { ContextmenuStoreCopy, ContextmenuStoreSplit, ContextmenuStoreOther } from './data/contextmenu-data';

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
  public position: ContextmenuStorePosition = $state(getInitPosition());
  public hoverBlockIndex: number = $state(-1);
  public show: boolean = $state(false);

  constructor(ctx: CmdWindowContext, config: StoreConfig<ContextmenuStoreModel> = {}) {
    super(ctx, config);
  }

  protected async init() {
    this.storeEffect = createStoreEffects({});
  }

  // 动态生成菜单列表，从shortcut store获取快捷键
  get list(): ContextmenuStoreList {
    const { shortcut } = this.ctx.cmdWindow.store;
    return [
      {
        groupName: '拷贝',
        menus: [
          { text: '拷贝输入', action: ContextmenuStoreCopy.input, shortcutKey: shortcut.getShortcut('copyInput') },
          { text: '拷贝输出', action: ContextmenuStoreCopy.output, shortcutKey: shortcut.getShortcut('copyOutput') },
          { text: '拷贝提示符', action: ContextmenuStoreCopy.prompt, shortcutKey: shortcut.getShortcut('copyPrompt') },
          { text: '拷贝全部', action: ContextmenuStoreCopy.all, shortcutKey: shortcut.getShortcut('copyAll') },
        ],
      },
      {
        groupName: '其它',
        menus: [
          {
            text: '添加别名',
            action: ContextmenuStoreOther.addCmdAlias,
            shortcutKey: shortcut.getShortcut('addCmdAlias'),
          },
        ],
      },
    ];
  }

  getAllMenu() {
    const menus: ContextmenuStoreModels = this.list.map((item) => item.menus).flat(2);
    return menus;
  }
}
