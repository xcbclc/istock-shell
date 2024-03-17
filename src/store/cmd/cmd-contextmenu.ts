import { writable, type Writable, get } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TContextmenuPosition = {
  window: { width: number; height: number };
  offset: { x: number; y: number };
};

export enum COPY {
  input = 'input',
  output = 'output',
  prompt = 'prompt',
  link = 'link',
  all = 'all',
}

export enum SPLIT {
  up = 'up',
  right = 'right',
  down = 'down',
  left = 'left',
}

export enum OTHER {
  addCmdAlias = 'addCmdAlias',
  bookmark = 'bookmark',
}

export type TAction = COPY | SPLIT | OTHER;

export type TContextmenuItem = {
  text: string;
  action: TAction;
  shortcutKey: string;
};

export type TContextmenuItems = TContextmenuItem[];

export type TContextmenu = Array<{
  groupName: string;
  menus: TContextmenuItems;
}>;

export interface IContextmenuWritable extends Writable<TContextmenu> {
  // 获取ui展示菜单数据
  getAllMenuItem: () => TContextmenuItems;
}

/**
 * 命令行右键菜单store
 */
export const getCmdContextmenu = (_ctx: CmdWindowContext) => {
  const cmdContextmenu: IContextmenuWritable = Object.create(
    writable<TContextmenu>([
      {
        groupName: '拷贝',
        menus: [
          { text: '拷贝输入', action: COPY.input, shortcutKey: 'ctrl+i' },
          { text: '拷贝输出', action: COPY.output, shortcutKey: 'ctrl+o' },
          { text: '拷贝提示符', action: COPY.prompt, shortcutKey: 'ctrl+p' },
          // { text: '拷贝成链接', action: COPY.link, shortcutKey: 'ctrl+alt+l' },
          { text: '拷贝全部', action: COPY.all, shortcutKey: 'ctrl+a' },
        ],
      },
      /* {
        groupName: '拆分',
        menus: [
          { text: '向上拆分', action: SPLIT.up, shortcutKey: 'ctrl+u' },
          { text: '向右拆分', action: SPLIT.right, shortcutKey: 'ctrl+r' },
          { text: '向下拆分', action: SPLIT.down, shortcutKey: 'ctrl+d' },
          { text: '向左拆分', action: SPLIT.left, shortcutKey: 'ctrl+l' },
        ],
      }, */
      {
        groupName: '其它',
        menus: [{ text: '添加别名', action: OTHER.addCmdAlias, shortcutKey: 'ctrl+alt+a' }],
      },
    ])
  );
  cmdContextmenu.getAllMenuItem = () => {
    const contextmenu = get(cmdContextmenu);
    const menus: TContextmenuItems = contextmenu.map((item) => item.menus).flat(2);
    return menus;
  };
  return cmdContextmenu;
};
