import type { CmdWindow } from '@/window/cmd-window.svelte';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store/base';
import { settingStoreMenus } from './data/setting-data';

export interface SettingStoreMenuItem {
  key?: string; // 菜单项唯一标识，用于激活状态管理
  text?: string; // 菜单项显示文本
  description?: string; // 菜单项描述
  isTitle?: boolean; // 是否为标题项（通常用于分组标题）
  active?: boolean; // 是否处于激活状态
  disabled?: boolean; // 是否禁用状态
  iconName?: string; // 图标名称（使用ShIcon组件）
  subItem?: {
    items?: SettingStoreMenuItem[];
  }; // 子菜单配置
}
export type SettingStoreMenus = SettingStoreMenuItem[];

export interface SettingStoreModel {}

export class Setting extends StoreWindow<SettingStoreModel> {
  public show: boolean = $state(false);
  public menus: SettingStoreMenus = $state(settingStoreMenus);
  public selectedMenuKey: string = $state('CmdThemeConfig');
  public readonly selectedMenuItem: SettingStoreMenuItem | undefined = $derived.by(() => {
    let selectedMenuItem: SettingStoreMenuItem | undefined;
    this.menus.some((menu) => {
      if (menu.key === this.selectedMenuKey) {
        selectedMenuItem = menu;
        return true;
      }
      if (menu.subItem?.items) {
        menu.subItem?.items.some((subMenu) => {
          if (subMenu.key === this.selectedMenuKey) {
            selectedMenuItem = subMenu;
            return true;
          }
          return false;
        });
      }
      return false;
    });
    return selectedMenuItem;
  });
  constructor(cmdWindow: CmdWindow, config: StoreConfig<SettingStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
  }

  registerMenu(newMenu: SettingStoreMenuItem) {
    let menuIndex = this.menus.findIndex((menu) => menu.key === newMenu.key);
    if (menuIndex === -1) {
      this.menus.push(newMenu);
    } else {
      this.menus.splice(menuIndex, 1, newMenu);
    }
  }
  registerSubMenu(rootKey: string, newMenu: SettingStoreMenuItem) {
    const menu = this.menus.find((menu) => menu.key === rootKey);
    if (!menu || !menu?.subItem?.items) return;
    const index = menu.subItem.items.findIndex((item) => item.key === newMenu.key);
    if (index === -1) {
      menu.subItem.items.push(newMenu);
    } else {
      menu.subItem.items.splice(index, 1, newMenu);
    }
  }
}
