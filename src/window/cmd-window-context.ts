import { EventEmitter, ScopeError } from '@istock/util';
import { CmdParser } from '@istock/command-parser';
import { getCmdStore, type TCmdStore } from '@/store/cmd/main';
import { getDomainStore, type TCmdAllDomainStore } from '@/store/domains/main';
import { initStore } from '@/store/init';
import { getWorker } from '@/worker';
import { WorkerMessage } from './worker-message';

export enum ECmdWindowContextMode {
  normal = '1',
  example = '2',
}

export class CmdWindowContext {
  readonly #globalEvent: EventEmitter;
  readonly #windowId: number;
  readonly #event: EventEmitter;
  readonly #worker: Worker;
  readonly #cmdParser: CmdParser;
  readonly #message: WorkerMessage;
  readonly #domainStore: TCmdAllDomainStore;
  readonly #cmdStore: TCmdStore;
  #storeDestroy: Function | null = null;
  readonly #handler: (event: MessageEvent) => void;
  readonly #mode: ECmdWindowContextMode;
  #initStoreDone: boolean = false;

  get globalEvent() {
    return this.#globalEvent;
  }

  get windowId() {
    return this.#windowId;
  }

  get event() {
    return this.#event;
  }

  get worker() {
    return this.#worker;
  }

  get cmdParser() {
    return this.#cmdParser;
  }

  get message() {
    return this.#message;
  }

  get domainStore() {
    return this.#domainStore;
  }

  get cmdStore() {
    return this.#cmdStore;
  }

  get mode() {
    return this.#mode;
  }

  get initStoreDone() {
    return this.#initStoreDone;
  }

  constructor(options: { windowId: number; globalEvent: EventEmitter; mode: ECmdWindowContextMode }) {
    this.#windowId = options.windowId;
    this.#globalEvent = options.globalEvent;
    this.#mode = options.mode;
    this.#event = new EventEmitter();
    this.#worker = getWorker();
    this.#cmdParser = new CmdParser();
    this.#message = new WorkerMessage(this);
    this.#domainStore = getDomainStore(this);
    this.#cmdStore = getCmdStore(this);
    this.#handler = (event: MessageEvent) => {
      this.#onMessage(event).catch((e) => {
        if (e instanceof Error) throw e;
        throw new ScopeError(this.constructor.name, 'onMessage方法处理失败');
      });
    };
    this.worker.addEventListener('message', this.#handler);
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
   * 消息监听转发
   * @param event
   * @private
   */
  async #onMessage(event: MessageEvent) {
    const message = event.data;
    if (!message) throw new ScopeError(this.constructor.name, 'worker没有传递数据过来');
    let { address } = message;
    if (address) {
      if (address.indexOf(this.message.protocol) === 0) {
        if (message?.meta?.messageId) {
          address += `?messageId=${message.meta.messageId}`;
        }
        await this.message.emit(address, message);
      } else {
        await this.event.emit(address, message);
      }
    }
  }

  /**
   * 销毁时移除事件等
   */
  destroy() {
    if (this.#storeDestroy) this.#storeDestroy();
    this.worker.removeEventListener('message', this.#handler);
    this.worker.terminate();
  }
}
