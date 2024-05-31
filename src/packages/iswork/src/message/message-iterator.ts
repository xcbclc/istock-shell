import { EventEmitter } from '@istock/util';
import { EMessageStatus } from '../enums/index';

export type TMessageIteratorData = Record<string, any> & { meta?: { status?: EMessageStatus } };

/**
 * 异步消息函数遍历处理机制
 */
export class MessageIterator {
  readonly #event: EventEmitter = new EventEmitter();

  /**
   * 异步消息生成器函数
   */
  async *#messageAsyncGenerator(): AsyncGenerator<TMessageIteratorData, void, unknown> {
    let loop = true;
    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve) => {
        this.#event.once('message', (payload: TMessageIteratorData) => {
          if (!payload || payload?.meta?.status === EMessageStatus.COMPLETE) {
            loop = false;
          }
          resolve(payload);
        });
      });
    }
  }

  /**
   * 消息传递完成调用方法
   * @param message
   */
  async complete(message: TMessageIteratorData = {}) {
    message.meta = message.meta ?? {};
    message.meta.status = EMessageStatus.COMPLETE;
    await this.#event.emit('message', message);
  }

  /**
   * 发送消息
   * @param message
   */
  async send(message: TMessageIteratorData = {}) {
    await this.#event.emit('message', message);
  }

  /**
   * 创建一个Generator异步消息函数
   * @param callback
   */
  static create(
    callback: (messageIterator: MessageIterator) => void
  ): AsyncIterator<TMessageIteratorData, void, unknown> {
    const messageIterator = new MessageIterator();
    callback(messageIterator);
    return messageIterator.#messageAsyncGenerator();
  }
}
