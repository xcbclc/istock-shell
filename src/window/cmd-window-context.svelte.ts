import { CmdWorkerMessage } from './cmd-worker-message';
import type { CmdWindow } from '@/window/cmd-window.svelte';
import { createContextStore, startContextStore, onContextStoreHandle, type ContextStore } from '@/store';

export class CmdWindowContext {
  readonly cmdWindow: CmdWindow;
  readonly #windowId: number;
  readonly #message: CmdWorkerMessage;
  readonly #store: ContextStore;
  public isInitialized: Boolean = $state(false);
  protected contextStoreHandleDestroy!: () => void;

  get windowId() {
    return this.#windowId;
  }

  get message() {
    return this.#message;
  }

  get store() {
    return this.#store;
  }

  get port() {
    return `${this.cmdWindow.workId}${this.#windowId}`;
  }
  constructor(cmdWindow: CmdWindow, options: { windowId: number }) {
    this.cmdWindow = cmdWindow;
    this.#windowId = options.windowId;
    this.#message = new CmdWorkerMessage(this.cmdWindow, this.#windowId, {});
    this.#store = createContextStore(this);
  }

  /**
   * 初始化store
   */
  public async start() {
    await startContextStore(this);
    this.onContextStoreHandle();
    this.isInitialized = true;
  }

  onContextStoreHandle() {
    this.contextStoreHandleDestroy = onContextStoreHandle(this);
  }

  /**
   * 销毁时移除事件等
   */
  destroy() {
    this.contextStoreHandleDestroy?.();
  }
}
