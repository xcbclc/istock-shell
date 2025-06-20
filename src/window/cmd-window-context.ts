import { getCmdStore, type TCmdStore } from '@/store/cmd/main';
import { getDomainStore, type TCmdAllDomainStore } from '@/store/domains/main';
import { initStore } from '@/store/init';
import { CmdWorkerMessage } from './cmd-worker-message';
import type { CmdWindow } from '@/window/cmd-window.svelte';

export enum CmdWindowMode {
  normal = '1',
  example = '2',
}

export class CmdWindowContext {
  readonly cmdWindow: CmdWindow;
  readonly #windowId: number;
  readonly #message: CmdWorkerMessage;
  readonly #domainStore: TCmdAllDomainStore;
  readonly #cmdStore: TCmdStore;
  #storeDestroy: Function | null = null;
  readonly #mode: CmdWindowMode;

  #initStoreDone: boolean = false;

  get windowId() {
    return this.#windowId;
  }

  get message() {
    return this.#message;
  }

  get mode() {
    return this.#mode;
  }

  get isExample() {
    return this.mode === CmdWindowMode.example;
  }
  get domainStore() {
    return this.#domainStore;
  }

  get cmdStore() {
    return this.#cmdStore;
  }
  get initStoreDone() {
    return this.#initStoreDone;
  }

  constructor(cmdWindow: CmdWindow, options: { windowId: number; mode: CmdWindowMode }) {
    this.cmdWindow = cmdWindow;
    this.#windowId = options.windowId;
    this.#mode = options.mode;
    this.#message = new CmdWorkerMessage(this.cmdWindow, this.#windowId, {});
    this.#domainStore = getDomainStore(this);
    this.#cmdStore = getCmdStore(this);
  }

  /**
   * 初始化store
   */
  async initStore() {
    this.#storeDestroy = await initStore(this);
    this.#initStoreDone = true;
    await this.message.emit('CmdWindowContext.initStoreDone');
  }

  /**
   * 销毁时移除事件等
   */
  destroy() {
    if (this.#storeDestroy) this.#storeDestroy();
  }
}
