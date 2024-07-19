import { ScopeError } from '@istock/util';
import type { AbstractMessage } from './abstract-message';

export type TMessageSSEIteratorData = Record<string, any>;
export type TMessageSSEOptions = {
  sendUrl: string;
  prefixUrl?: string;
  sendHandler?: (message: any) => Promise<void>;
};

/**
 * 异步消息函数遍历处理机制
 */
export class MessageSSE implements AbstractMessage<EventSource> {
  instance!: EventSource;
  readonly #options: TMessageSSEOptions;
  #onMessageCallback!: (event: MessageEvent<any>) => void;
  #onErrorCallback!: (event: MessageEvent<any>) => void;
  constructor(options: TMessageSSEOptions) {
    options.prefixUrl = options.prefixUrl ?? import.meta.env.VITE_ISTOCK_API;
    this.#options = options;
  }

  async open() {
    this.instance = new EventSource(this.#options.prefixUrl + this.#options.sendUrl);
    await new Promise((resolve, _reject) => {
      this.instance.addEventListener('open', resolve, { once: true });
    });
  }

  async close() {
    this.instance.removeEventListener('message', this.#onMessageCallback);
    this.instance.removeEventListener('error', this.#onErrorCallback);
  }

  async send(message: any) {
    if (!this.#options.sendHandler) {
      throw new ScopeError(`iswork.${this.constructor.name}`, 'MessageSSE未配置发送消息处理方法');
    }
    await this.#options.sendHandler(message);
  }

  async onMessage(callback: (message: any) => Promise<void>) {
    this.#onMessageCallback = (event) => {
      callback(event).catch((err) => {
        throw err;
      });
    };
    this.instance.addEventListener('message', this.#onMessageCallback);
  }

  async onError(callback: (error: Error, event: MessageEvent<any>) => Promise<void>) {
    this.#onErrorCallback = (event) => {
      callback(new ScopeError(`iswork.${this.constructor.name}`, 'MessageSSE发送消息失败'), event).catch((err) => {
        throw err;
      });
    };
    this.instance.addEventListener('error', this.#onErrorCallback);
  }

  async onClose() {
    this.instance.addEventListener('close', () => {
      void this.close();
    });
  }

  /**
   * 异步消息生成器函数
   */
  async *#messageAsyncGenerator(): AsyncGenerator<TMessageSSEIteratorData, void, unknown> {
    let loop = true;
    this.instance.addEventListener(
      'close',
      () => {
        loop = false;
        this.instance.close();
      },
      { once: true }
    );
    // eslint-disable-next-line no-unmodified-loop-condition
    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve) => {
        this.instance.addEventListener(
          'message',
          (payload: TMessageSSEIteratorData) => {
            resolve(payload);
          },
          { once: true }
        );
      });
    }
  }

  /**
   * 创建一个Generator异步消息函数
   * @param options sse消息参数选项
   */
  static async create(optoins: TMessageSSEOptions): Promise<AsyncIterator<TMessageSSEIteratorData, void, unknown>> {
    const messageSSE = new MessageSSE(optoins);
    await messageSSE.open();
    return messageSSE.#messageAsyncGenerator();
  }
}
