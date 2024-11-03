import { EventEmitter, ScopeError } from '@istock/util';
import { EMessageStatus } from '@istock/iswork';
import { CmdParser } from '@istock/command-parser';
import { getCmdStore, type TCmdStore } from '@/store/cmd/main';
import { getDomainStore, type TCmdAllDomainStore } from '@/store/domains/main';
import { initStore } from '@/store/init';
import { getWorker } from '@/worker';
import { type TWorkerMessage, type TWorkerMessageMeta, WorkerMessage } from './worker-message';

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
  readonly #workerMessage: WorkerMessage;
  readonly #domainStore: TCmdAllDomainStore;
  readonly #cmdStore: TCmdStore;
  #storeDestroy: Function | null = null;
  readonly #handler: (event: MessageEvent) => void;
  readonly #mode: ECmdWindowContextMode;
  readonly #messageBaseInfoCache = new Map<string, TWorkerMessage<any>>();
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

  get workerMessage() {
    return this.#workerMessage;
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

  get isExample() {
    return this.mode === ECmdWindowContextMode.example;
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
    this.#workerMessage = new WorkerMessage(this);
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
    await this.workerMessage.emit('CmdWindowContext.initStoreDone');
  }

  /**
   * 消息监听转发
   * @param event
   * @private
   */
  async #onMessage(event: MessageEvent) {
    const message = event.data;
    if (!message) throw new ScopeError(this.constructor.name, 'worker没有传递数据过来');
    if (event.ports) {
      message.ports = event.ports;
    }
    let { address } = message;
    if (address) {
      if (address.indexOf(this.workerMessage.protocol) === 0) {
        if (message?.meta?.messageId) {
          address += `?messageId=${message.meta.messageId}`;
        }
        await this.workerMessage.emit(address, message);
      } else {
        await this.event.emit(address, message);
      }
    }
  }

  /**
   * 异步通道消息生成器函数
   * @param message
   */
  async *#messageChannelAsyncGenerator<Payload>(
    message: TWorkerMessage<Payload>
  ): AsyncGenerator<TWorkerMessage<Payload>, void, unknown> {
    const { meta, ports } = message;
    const [port2] = ports ?? [];
    if (!meta?.messageId) throw new ScopeError(this.constructor.name, '未获取到消息ID');
    if (!port2) throw new ScopeError(this.constructor.name, '未获取到消息发送端口');
    this.#messageBaseInfoCache.set(meta.messageId, message);
    let loop = true;
    port2.start?.();
    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve, reject) => {
        port2.addEventListener(
          'message',
          (event: MessageEvent<TWorkerMessage<Payload>>) => {
            const newMessage = event.data;
            if (newMessage?.meta?.status === EMessageStatus.COMPLETE) {
              this.#messageBaseInfoCache.delete(`${meta.messageId}`);
              loop = false;
            }
            resolve(newMessage);
          },
          { once: true }
        );
        port2.addEventListener('messageerror', reject, { once: true });
      });
    }
  }

  /**
   * 获取通道消息异步迭代器
   * @param message
   */
  getMessageChannelAsyncIterator<Payload>(
    message: TWorkerMessage<Payload>
  ): AsyncGenerator<TWorkerMessage<Payload>, void, unknown> {
    return this.#messageChannelAsyncGenerator(message);
  }

  /**
   * 监听通道消息
   * @param message
   */
  onMessageChannel(message: TWorkerMessage<any>, onMessageHandler?: (message: TWorkerMessage<any>) => Promise<void>) {
    const { meta, ports } = message;
    const [port2] = ports ?? [];
    if (!meta?.messageId) throw new ScopeError(this.constructor.name, '未获取到消息ID');
    if (!port2) throw new ScopeError(this.constructor.name, '未获取到消息发送端口');
    this.#messageBaseInfoCache.set(meta.messageId, message);
    const eventHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message?.meta?.status === EMessageStatus.COMPLETE) {
        this.#messageBaseInfoCache.delete(`${meta.messageId}`);
        port2.removeEventListener('message', eventHandler);
        port2.removeEventListener('messageerror', errorHandler);
      }
      onMessageHandler?.(message).catch((e) => {
        throw new ScopeError(this.constructor.name, `onMessageChannel回调函数报错: ${e?.message ?? ''}`);
      });
    };
    const errorHandler = (_event: MessageEvent) => {
      throw new ScopeError(this.constructor.name, 'onMessageChannel获取消息失败');
    };
    port2.addEventListener('message', eventHandler);
    port2.addEventListener('messageerror', errorHandler);
    port2.start?.();
  }

  /**
   * 发送通道消息
   * @param messageId
   * @param payload
   * @param newMeta
   */
  sendMessageToChannel(messageId: string, payload: any, newMeta: TWorkerMessageMeta = {}) {
    const messageBaseInfo = this.#messageBaseInfoCache.get(messageId);
    if (!messageBaseInfo) throw new ScopeError(this.constructor.name, '未获取到消息基本描述数据');
    const [port2] = messageBaseInfo.ports ?? [];
    if (port2) {
      const message: TWorkerMessage<any> = {
        address: messageBaseInfo.address,
        meta: { ...(messageBaseInfo.meta ?? {}), ...newMeta },
        payload,
      };
      port2.postMessage(message);
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
