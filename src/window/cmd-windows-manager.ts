import { EventEmitter, ScopeError } from '@istock/util';
import { CmdWindowContext, ECmdWindowContextMode } from './cmd-window-context';

export type TCmdWindowsManagerOptions = {
  mode?: ECmdWindowContextMode;
};

export class CmdWindowsManager {
  static cmdWindowsManager: CmdWindowsManager;
  readonly #ctxMap = new Map<number, CmdWindowContext>();
  readonly #globalEvent: EventEmitter = new EventEmitter();
  readonly #mode: ECmdWindowContextMode = ECmdWindowContextMode.normal;

  /**
   * 获取实例
   * @param options
   */
  static getInstance(options?: TCmdWindowsManagerOptions) {
    if (!CmdWindowsManager.cmdWindowsManager && options) {
      CmdWindowsManager.cmdWindowsManager = new CmdWindowsManager(options);
    }
    return CmdWindowsManager.cmdWindowsManager;
  }

  constructor(options: TCmdWindowsManagerOptions) {
    if (options.mode) this.#mode = options.mode;
  }

  /**
   * 获取当前windowId对应的上下文
   * @param windowId
   */
  getCmdContext(windowId: number): CmdWindowContext {
    const ctx = this.#ctxMap.get(windowId);
    if (ctx) return ctx;
    const newCtx: CmdWindowContext = new CmdWindowContext({
      windowId,
      globalEvent: this.#globalEvent,
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
