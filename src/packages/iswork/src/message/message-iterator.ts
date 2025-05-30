/**
 * @fileoverview 消息迭代器
 * @description 提供异步消息迭代处理机制，支持消息的发送、完成和异步遍历
 */

import { EventEmitter } from '@istock-shell/util';
import { MessageStatus } from '../enums/index';

/**
 * 消息迭代器数据类型
 * @description 消息迭代器传递的数据结构，包含任意属性和可选的元数据
 * @example
 * ```typescript
 * const data: MessageIteratorData = {
 *   content: 'Hello World',
 *   timestamp: Date.now(),
 *   meta: {
 *     status: MessageStatus.COMPLETE
 *   }
 * };
 * ```
 */
export type MessageIteratorData = Record<string, any> & { meta?: { status?: MessageStatus } };

/**
 * 消息迭代器类
 * @description 实现异步消息迭代处理机制，基于事件驱动模式，支持消息的发送、完成状态管理和异步遍历
 * @example
 * ```typescript
 * // 创建消息迭代器
 * const iterator = MessageIterator.create((messageIterator) => {
 *   // 发送消息
 *   messageIterator.send({ data: 'message 1' });
 *   messageIterator.send({ data: 'message 2' });
 *   // 标记完成
 *   messageIterator.complete();
 * });
 *
 * // 遍历消息
 * for await (const message of iterator) {
 *   console.log('收到消息:', message);
 * }
 * ```
 */
export class MessageIterator {
  /** 事件发射器实例，用于内部消息传递 */
  readonly #event: EventEmitter = new EventEmitter();

  /**
   * 异步消息生成器函数
   * @description 内部使用的异步生成器，用于创建可迭代的消息流
   * @returns AsyncGenerator<MessageIteratorData, void, unknown> 异步消息生成器
   * @private
   */
  async *#messageAsyncGenerator(): AsyncGenerator<MessageIteratorData, void, unknown> {
    let loop = true;
    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve) => {
        this.#event.once('message', (payload: MessageIteratorData) => {
          if (!payload || payload?.meta?.status === MessageStatus.COMPLETE) {
            loop = false;
          }
          resolve(payload);
        });
      });
    }
  }

  /**
   * 标记消息传递完成
   * @description 发送完成状态的消息，结束消息迭代循环
   * @param message - 可选的完成消息数据，默认为空对象
   * @returns Promise<void> 完成操作的 Promise
   * @example
   * ```typescript
   * // 标记完成，不带额外数据
   * await messageIterator.complete();
   *
   * // 标记完成，带额外数据
   * await messageIterator.complete({
   *   result: 'success',
   *   totalCount: 100
   * });
   * ```
   */
  async complete(message: MessageIteratorData = {}) {
    message.meta = message.meta ?? {};
    message.meta.status = MessageStatus.COMPLETE;
    await this.#event.emit('message', message);
  }

  /**
   * 发送消息
   * @description 向消息流中发送一条消息
   * @param message - 要发送的消息数据，默认为空对象
   * @returns Promise<void> 发送操作的 Promise
   * @example
   * ```typescript
   * // 发送简单消息
   * await messageIterator.send({ content: 'Hello' });
   *
   * // 发送复杂消息
   * await messageIterator.send({
   *   type: 'data',
   *   payload: { id: 1, name: 'test' },
   *   timestamp: Date.now()
   * });
   * ```
   */
  async send(message: MessageIteratorData = {}) {
    await this.#event.emit('message', message);
  }

  /**
   * 创建消息迭代器
   * @description 静态工厂方法，创建一个新的消息迭代器实例
   * @param callback - 回调函数，接收消息迭代器实例作为参数，用于发送消息
   * @returns AsyncIterator<MessageIteratorData, void, unknown> 异步消息迭代器
   * @example
   * ```typescript
   * const iterator = MessageIterator.create((messageIterator) => {
   *   setTimeout(() => {
   *     messageIterator.send({ step: 1, data: 'first' });
   *     messageIterator.send({ step: 2, data: 'second' });
   *     messageIterator.complete({ summary: 'done' });
   *   }, 1000);
   * });
   *
   * for await (const message of iterator) {
   *   console.log('处理消息:', message);
   * }
   * ```
   */
  static create(
    callback: (messageIterator: MessageIterator) => void
  ): AsyncIterator<MessageIteratorData, void, unknown> {
    const messageIterator = new MessageIterator();
    callback(messageIterator);
    return messageIterator.#messageAsyncGenerator();
  }
}
