import { ScopeError } from '@istock-shell/util';
import { CmdWindow } from './cmd-window.svelte';
import { CmdWindowContext, CmdWindowMode } from './cmd-window-context';

export type TCmdWindowsManagerOptions = {
  mode?: CmdWindowMode;
};

export class CmdWindowsManager {
  static cmdWindowsManager: CmdWindowsManager;
  readonly #ctxMap = new Map<number, CmdWindowContext>();
  readonly #mode: CmdWindowMode = CmdWindowMode.normal;
  readonly #cmdWindow: CmdWindow;

  constructor(options: TCmdWindowsManagerOptions) {
    this.#cmdWindow = new CmdWindow(this, {
      mode: options.mode,
    });
  }

  /**
   * 获取自身实例
   * @param options
   */
  static getInstance(options?: TCmdWindowsManagerOptions) {
    if (!CmdWindowsManager.cmdWindowsManager && options) {
      CmdWindowsManager.cmdWindowsManager = new CmdWindowsManager(options);
    }
    return CmdWindowsManager.cmdWindowsManager;
  }

  /**
   * 获取当前页面CmdWindow对象实例
   */
  getCmdWindow(): CmdWindow {
    return this.#cmdWindow;
  }

  /**
   * 获取当前windowId对应的上下文
   * @param windowId
   */
  getCmdContext(windowId: number): CmdWindowContext {
    const ctx = this.#ctxMap.get(windowId);
    if (ctx) return ctx;
    const newCtx: CmdWindowContext = new CmdWindowContext(this.getCmdWindow(), {
      windowId,
      mode: this.#mode,
    });
    this.#ctxMap.set(windowId, newCtx);
    return newCtx;
  }

  /**
   * 获取windowId对应的Dom元素
   * @param windowId
   */
  getWindowEl(windowId: number): HTMLElement {
    const windowEl = document.querySelector(`[data-window-id="${windowId}"]`);
    if (!windowEl) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '没找到window元素');
    }
    return windowEl as HTMLElement;
  }
}
