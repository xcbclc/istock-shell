import { ScopeError } from '@istock-shell/util';
import { CmdWindow, CmdWindowMode } from './cmd-window.svelte';
import { CmdWindowContext } from './cmd-window-context.svelte';

export type CmdWindowsManagerOptions = {
  mode?: CmdWindowMode;
};

export class CmdWindowsManager {
  static cmdWindowsManager: CmdWindowsManager;
  readonly #ctxMap = new Map<number, CmdWindowContext>();
  readonly #cmdWindow: CmdWindow;

  constructor(options: CmdWindowsManagerOptions) {
    this.#cmdWindow = new CmdWindow(this, {
      mode: options.mode,
    });
  }

  /**
   * 获取自身实例
   * @param options
   */
  static getInstance(options?: CmdWindowsManagerOptions) {
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
   * 获取当前windowId对应的上下文，没有则创建
   * @param windowId
   */
  getCmdContext(windowId: number): CmdWindowContext {
    const ctx = this.#ctxMap.get(windowId);
    if (ctx) return ctx;
    const newCtx: CmdWindowContext = new CmdWindowContext(this.getCmdWindow(), {
      windowId,
    });
    this.#ctxMap.set(windowId, newCtx);
    return newCtx;
  }

  /**
   * 仅获取当前windowId对应的上下文
   * @param windowId
   */
  getCmdContextCache(windowId: number): CmdWindowContext | undefined {
    const ctx = this.#ctxMap.get(windowId);
    return ctx;
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
