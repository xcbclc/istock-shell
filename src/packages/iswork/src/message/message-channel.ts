import { ScopeError } from '@istock/util';
import { type AbstractMessage } from './abstract-message';

export class MessageChannelAdapter implements AbstractMessage<MessageChannel> {
  readonly instance: MessageChannel = new MessageChannel();
  readonly options: StructuredSerializeOptions | undefined;
  #onMessageCallback!: (event: MessageEvent<any>) => void;
  #onErrorCallback!: (event: MessageEvent<any>) => void;

  get hasOnMessageCallback() {
    return Boolean(this.#onMessageCallback);
  }

  constructor(options?: StructuredSerializeOptions) {
    this.options = options;
  }

  async open() {
    await Promise.resolve();
  }

  async close() {
    this.instance.port1.removeEventListener('message', this.#onMessageCallback);
    this.instance.port1.removeEventListener('messageerror', this.#onErrorCallback);
    await Promise.resolve();
  }

  async send(message: any) {
    this.instance.port1.postMessage(message, this.options);
    await Promise.resolve();
  }

  onMessage(callback: (message: any) => Promise<void>) {
    this.#onMessageCallback = (event) => {
      callback(event).catch((err) => {
        throw err;
      });
    };
    this.instance.port1.addEventListener('message', this.#onMessageCallback);
    this.instance.port1.start?.();
  }

  onError(callback: (error: Error, event: MessageEvent<any>) => Promise<void>) {
    this.#onErrorCallback = (event) => {
      callback(new ScopeError(`iswork.${this.constructor.name}`, 'MessageChannel发送消息失败'), event).catch((err) => {
        throw err;
      });
    };
    this.instance.port1.addEventListener('messageerror', this.#onErrorCallback);
  }
}
