import type { ContextmenuStoreList } from '../contextmenu.svelte';

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

export const contextmenuStoreList: ContextmenuStoreList = [
  {
    groupName: '拷贝',
    menus: [
      { text: '拷贝输入', action: ContextmenuStoreCopy.input, shortcutKey: 'ctrl+i' },
      { text: '拷贝输出', action: ContextmenuStoreCopy.output, shortcutKey: 'ctrl+o' },
      { text: '拷贝提示符', action: ContextmenuStoreCopy.prompt, shortcutKey: 'ctrl+p' },
      // { text: '拷贝成链接', action: ContextmenuStoreCopy.link, shortcutKey: 'ctrl+alt+l' },
      { text: '拷贝全部', action: ContextmenuStoreCopy.all, shortcutKey: 'ctrl+a' },
    ],
  },
  /* {
    groupName: '拆分',
    menus: [
      { text: '向上拆分', action: ContextmenuStoreSplit.up, shortcutKey: 'ctrl+u' },
      { text: '向右拆分', action: ContextmenuStoreSplit.right, shortcutKey: 'ctrl+r' },
      { text: '向下拆分', action: ContextmenuStoreSplit.down, shortcutKey: 'ctrl+d' },
      { text: '向左拆分', action: ContextmenuStoreSplit.left, shortcutKey: 'ctrl+l' },
    ],
  }, */
  {
    groupName: '其它',
    menus: [{ text: '添加别名', action: ContextmenuStoreOther.addCmdAlias, shortcutKey: 'ctrl+alt+a' }],
  },
];
