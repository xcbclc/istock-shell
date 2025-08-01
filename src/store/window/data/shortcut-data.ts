export type ShortcutItem = {
  key: string;
  shortcut: string;
  label: string;
  description: string;
};

// 检测操作系统类型
export function isMacOS(): boolean {
  return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

// 快捷键配置项
export const shortcutStoreDefaultList: ShortcutItem[] = [
  {
    key: 'clearScreen',
    shortcut: isMacOS() ? 'Cmd+Alt+L' : 'Ctrl+Alt+L',
    label: '清屏',
    description: '清除终端屏幕内容',
  },
  {
    key: 'settings',
    shortcut: isMacOS() ? 'Cmd+Alt+S' : 'Ctrl+Alt+S',
    label: '打开设置',
    description: '打开应用程序设置界面',
  },
  { key: 'search', shortcut: isMacOS() ? 'Cmd+Shift+S' : 'Ctrl+Shift+S', label: '搜索', description: '打开搜索功能' },
  // 右键菜单快捷键
  { key: 'copyInput', shortcut: isMacOS() ? 'Cmd+I' : 'Ctrl+I', label: '拷贝输入', description: '拷贝命令输入内容' },
  { key: 'copyOutput', shortcut: isMacOS() ? 'Cmd+O' : 'Ctrl+O', label: '拷贝输出', description: '拷贝命令输出内容' },
  { key: 'copyPrompt', shortcut: isMacOS() ? 'Cmd+P' : 'Ctrl+P', label: '拷贝提示符', description: '拷贝命令提示符' },
  {
    key: 'copyAll',
    shortcut: isMacOS() ? 'Cmd+Shift+A' : 'Ctrl+Shift+A',
    label: '拷贝全部',
    description: '拷贝完整的命令行内容',
  },
  {
    key: 'addCmdAlias',
    shortcut: isMacOS() ? 'Cmd+Alt+A' : 'Ctrl+Alt+A',
    label: '添加别名',
    description: '为当前命令添加别名',
  },
];
