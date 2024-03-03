import { writable, type Writable, get, type Unsubscriber } from 'svelte/store';

export type TCmdWindow = {
  id: number;
};

export interface ICmdWindows extends Writable<TCmdWindow[]> {
  /**
   * 根据现有窗口id获取新的窗口id
   */
  getNewWindowId: () => number | null;
}

export interface ICmdWindowStyles extends Writable<string[]> {
  /**
   * 根据窗口个数响应宽高
   */
  onCmdWindowChangeUpdate: () => Unsubscriber;
}

let cmdWindows: ICmdWindows;

export function getCmdWindows() {
  if (cmdWindows) return cmdWindows;
  cmdWindows = Object.create(writable([{ id: 1 }]));
  cmdWindows.getNewWindowId = (maxLen = 12) => {
    const ids = get(cmdWindows)
      .map((win) => win.id)
      .sort((a, b) => a - b);

    for (let i = 0; i < maxLen - 1; i++) {
      if (ids[i + 1] - ids[i] > 1 || ids[i + 1] === undefined) {
        return ids[i] + 1;
      }
    }
    return null;
  };

  return cmdWindows;
}

let cmdWindowStyles: ICmdWindowStyles;

export function getCmdWindowStyles() {
  if (cmdWindowStyles) return cmdWindowStyles;
  cmdWindowStyles = Object.create(writable([]));
  cmdWindowStyles.onCmdWindowChangeUpdate = () => {
    return cmdWindows.subscribe((windows) => {
      const windowStyles = windows.map((_window) => {
        const len = windows.length;
        const row = Math.ceil(Math.sqrt(len));
        const column = Math.ceil(len / row);
        return [`width: ${(100 / row).toFixed(4)}%`, `height: ${(100 / column).toFixed(4)}%`].join(';');
      });
      cmdWindowStyles.set(windowStyles);
    });
  };

  return cmdWindowStyles;
}
