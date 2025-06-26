import type { CmdWindow } from '@/window';
import { CmdAlias } from './cmd-alias.svelte';
import { OutputComponent } from './output-component.svelte';
import { CookieManage } from './cookie-manage.svelte';
import { Search } from './search.svelte';
import { Setting } from './setting.svelte';
import { ShellInfo } from './shell-info.svelte';
import { Theme } from './theme.svelte';
import { User } from './user.svelte';
import { WindowView } from './window-view.svelte';

const windowStoreClassRecord = {
  cmdAlias: CmdAlias,
  outputComponent: OutputComponent,
  cookieManage: CookieManage,
  search: Search,
  setting: Setting,
  shellInfo: ShellInfo,
  theme: Theme,
  user: User,
  windowView: WindowView,
} as const;

// 窗口存储类型定义
export type WindowStore = {
  cmdAlias: CmdAlias;
  outputComponent: OutputComponent;
  cookieManage: CookieManage;
  search: Search;
  setting: Setting;
  shellInfo: ShellInfo;
  theme: Theme;
  user: User;
  windowView: WindowView;
};

export type WindowStoreKey = keyof WindowStore;

// 窗口存储工厂函数
export const createWindowStore = (cmdWindow: CmdWindow): WindowStore => {
  const windowStore = (
    Object.entries(windowStoreClassRecord) as Array<[WindowStoreKey, new (cmdWindow: CmdWindow) => any]>
  ).reduce(
    (store, [key, StoreClass]) => {
      store[key] = new StoreClass(cmdWindow);
      return store;
    },
    {} as Record<WindowStoreKey, any>
  ) as WindowStore;
  return windowStore;
};

export const startWindowStore = async (cmdWindow: CmdWindow) => {
  const windowStore = cmdWindow.store;
  await windowStore.user.start();
  await Promise.all([
    windowStore.windowView.start(),
    windowStore.theme.start(),
    windowStore.shellInfo.start(),
    windowStore.outputComponent.start(),
    windowStore.search.start(),
    windowStore.setting.start(),
    windowStore.cookieManage.start(),
    windowStore.cmdAlias.start(),
  ]);
};

export const onWindowStoreHandle = (_cmdWindow: CmdWindow) => {
  return () => {};
};
