import { writable, type Writable, get } from 'svelte/store';
import { type CmdWindowContext } from '@/window/cmd-window-context';

export type TCmdWindow = {
  id: number;
  styleRecord: Record<string, string>;
};

export interface ICmdWindow extends Writable<TCmdWindow[]> {
  /**
   * 根据现有窗口id获取新的窗口id
   */
  getNewWindowId: () => number | null;

  /**
   * 根据窗口个数响应宽高
   */
  onCmdWindowChangeUpdate: () => void;

  /**
   * 窗口按键动作处理
   */
  onCmdWindowKeyAction: (event: KeyboardEvent, window: TCmdWindow, ctx: CmdWindowContext) => void;
}

let cmdWindow: ICmdWindow;

export function getCmdWindow() {
  if (cmdWindow) return cmdWindow;
  cmdWindow = Object.create(writable([{ id: 1, styleRecord: {} }]));
  cmdWindow.getNewWindowId = (maxLen = 12) => {
    const ids = get(cmdWindow)
      .map((win) => win.id)
      .sort((a, b) => a - b);

    for (let i = 0; i < maxLen - 1; i++) {
      if (ids[i + 1] - ids[i] > 1 || ids[i + 1] === undefined) {
        return ids[i] + 1;
      }
    }
    return null;
  };

  cmdWindow.onCmdWindowChangeUpdate = () => {
    cmdWindow.update((windows) => {
      windows = windows.map((window) => {
        const len = windows.length;
        const row = Math.ceil(Math.sqrt(len));
        const column = Math.ceil(len / row);
        window.styleRecord[`${window.id}`] = [
          `width: ${(100 / row).toFixed(4)}%`,
          `height: ${(100 / column).toFixed(4)}%`,
        ].join(';');
        return window;
      });
      return windows;
    });
  };

  cmdWindow.onCmdWindowKeyAction = (event: KeyboardEvent, _window: TCmdWindow, ctx: CmdWindowContext) => {
    const { key } = event;
    if (event.ctrlKey) {
      const shortcutKeys = ['ctrl'];
      if (event.shiftKey) shortcutKeys.push('shift');
      if (event.altKey) shortcutKeys.push('alt');
      shortcutKeys.push(key.toLowerCase());
      const shortcutKey = shortcutKeys.join('+');
      if (shortcutKey === ['ctrl', 'shift', 's'].join('+')) {
        // 搜索面板
        const { search } = ctx.domainStore;
        search.open();
      }
    }
  };

  return cmdWindow;
}
