/**
 * @fileoverview Server-Sent Events 消息适配器
 * @description 基于 SSE 技术的消息通信适配器，支持服务器向客户端推送实时消息
 */

import { ScopeError } from '@istock-shell/util';
import type { AbstractMessage } from './abstract-message';

/**
 * SSE 消息迭代器数据类型
 * @description SSE 消息迭代器传递的数据结构
 * @example
 * ```typescript
 * const data: MessageSSEIteratorData = {
 *   type: 'notification',
 *   content: 'New message received',
 *   timestamp: Date.now()
 * };
 * ```
 */
export type MessageSSEIteratorData = Record<string, any>;

/**
 * SSE 消息配置选项
 * @description 配置 SSE 连接的选项参数
 * @example
 * ```typescript
 * const options: MessageSSEOptions = {
 *   sendUrl: '/api/events',
 *   prefixUrl: 'https://api.example.com',
 *   sendHandler: async (message) => {
 *     await fetch('/api/send', {
 *       method: 'POST',
 *       body: JSON.stringify(message)
 *     });
 *   }
 * };
 * ```
 */
export type MessageSSEOptions = {
  /** SSE 连接的 URL 路径 */
  sendUrl: string;
  /** 可选的 URL 前缀，默认使用环境变量 VITE_ISTOCK_API */
  prefixUrl?: string;
  /** 可选的消息发送处理函数 */
  sendHandler?: (message: any) => Promise<void>;
};

/**
 * Server-Sent Events 消息适配器
 * @description 基于 SSE 技术实现的消息通信适配器，支持服务器向客户端推送实时消息和异步消息迭代
 * @implements {AbstractMessage<EventSource>}
 * @example
 * ```typescript
 * // 创建 SSE 适配器
 * const sse = new MessageSSE({
 *   sendUrl: '/api/stream',
 *   sendHandler: async (message) => {
 *     await fetch('/api/send', {
 *       method: 'POST',
 *       body: JSON.stringify(message)
 *     });
 *   }
 * });
 *
 * // 打开连接
 * await sse.open();
 *
 * // 监听消息
 * sse.onMessage(async (event) => {
 *   console.log('收到 SSE 消息:', event.data);
 * });
 *
 * // 发送消息
 * await sse.send({ type: 'ping', data: 'hello' });
 * ```
 */
export class MessageSSE implements AbstractMessage<EventSource> {
  /** EventSource 实例 */
  instance!: EventSource;
  /** SSE 配置选项 */
  readonly #options: MessageSSEOptions;
  /** 消息回调函数 */
  #onMessageCallback!: (event: MessageEvent<any>) => void;
  /** 错误回调函数 */
  #onErrorCallback!: (event: MessageEvent<any>) => void;

  /**
   * SSE 消息适配器构造函数
   * @description 初始化 SSE 消息适配器，设置连接配置
   * @param options - SSE 配置选项
   * @example
   * ```typescript
   * const sse = new MessageSSE({
   *   sendUrl: '/api/events',
   *   prefixUrl: 'https://api.example.com',
   *   sendHandler: async (msg) => {
   *     console.log('发送消息:', msg);
   *   }
   * });
   * ```
   */
  constructor(options: MessageSSEOptions) {
    options.prefixUrl = options.prefixUrl ?? import.meta.env.VITE_ISTOCK_API;
    this.#options = options;
  }

  /**
   * 打开 SSE 连接
   * @description 建立与服务器的 SSE 连接
   * @returns Promise<void> 连接建立完成的 Promise
   * @example
   * ```typescript
   * await sse.open();
   * console.log('SSE 连接已建立');
   * ```
   */
  async open() {
    this.instance = new EventSource(this.#options.prefixUrl + this.#options.sendUrl);
    await new Promise((resolve, _reject) => {
      this.instance.addEventListener('open', resolve, { once: true });
    });
  }

  /**
   * 关闭 SSE 连接
   * @description 关闭与服务器的 SSE 连接，移除事件监听器
   * @returns Promise<void> 连接关闭完成的 Promise
   * @example
   * ```typescript
   * await sse.close();
   * console.log('SSE 连接已关闭');
   * ```
   */
  async close() {
    this.instance.removeEventListener('message', this.#onMessageCallback);
    this.instance.removeEventListener('error', this.#onErrorCallback);
  }

  /**
   * 发送消息
   * @description 通过配置的发送处理函数发送消息
   * @param message - 要发送的消息内容
   * @returns Promise<void> 消息发送完成的 Promise
   * @throws {ScopeError} 当未配置发送处理函数时抛出错误
   * @example
   * ```typescript
   * await sse.send({
   *   type: 'chat',
   *   content: 'Hello World',
   *   timestamp: Date.now()
   * });
   * ```
   */
  async send(message: any) {
    if (!this.#options.sendHandler) {
      throw new ScopeError(`iswork.${this.constructor.name}`, 'MessageSSE未配置发送消息处理方法');
    }
    await this.#options.sendHandler(message);
  }

  /**
   * 设置消息监听回调
   * @description 注册消息接收回调函数，当收到 SSE 消息时触发
   * @param callback - 消息处理回调函数
   * @example
   * ```typescript
   * sse.onMessage(async (event) => {
   *   const data = JSON.parse(event.data);
   *   console.log('收到 SSE 消息:', data);
   * });
   * ```
   */
  async onMessage(callback: (message: any) => Promise<void>) {
    this.#onMessageCallback = (event) => {
      callback(event).catch((err) => {
        throw err;
      });
    };
    this.instance.addEventListener('message', this.#onMessageCallback);
  }

  /**
   * 设置错误监听回调
   * @description 注册错误处理回调函数，当 SSE 连接出现错误时触发
   * @param callback - 错误处理回调函数
   * @example
   * ```typescript
   * sse.onError(async (error, event) => {
   *   console.error('SSE 连接错误:', error.message);
   *   console.error('错误事件:', event);
   * });
   * ```
   */
  async onError(callback: (error: Error, event: MessageEvent<any>) => Promise<void>) {
    this.#onErrorCallback = (event) => {
      callback(new ScopeError(`iswork.${this.constructor.name}`, 'MessageSSE发送消息失败'), event).catch((err) => {
        throw err;
      });
    };
    this.instance.addEventListener('error', this.#onErrorCallback);
  }

  /**
   * 设置连接关闭监听
   * @description 监听 SSE 连接关闭事件，自动清理资源
   * @example
   * ```typescript
   * sse.onClose();
   * ```
   */
  async onClose() {
    this.instance.addEventListener('close', () => {
      void this.close();
    });
  }

  /**
   * 异步消息生成器函数
   * @description 内部使用的异步生成器，用于创建可迭代的 SSE 消息流
   * @returns AsyncGenerator<MessageSSEIteratorData, void, unknown> 异步 SSE 消息生成器
   * @private
   */
  async *#messageAsyncGenerator(): AsyncGenerator<MessageSSEIteratorData, void, unknown> {
    let loop = true;
    this.instance.addEventListener(
      'close',
      () => {
        loop = false;
        this.instance.close();
      },
      { once: true }
    );

    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve) => {
        this.instance.addEventListener(
          'message',
          (payload: MessageSSEIteratorData) => {
            resolve(payload);
          },
          { once: true }
        );
      });
    }
  }

  /**
   * 创建 SSE 消息迭代器
   * @description 静态工厂方法，创建一个新的 SSE 消息迭代器实例
   * @param options - SSE 消息配置选项
   * @returns Promise<AsyncIterator<MessageSSEIteratorData, void, unknown>> SSE 异步消息迭代器
   * @example
   * ```typescript
   * const iterator = await MessageSSE.create({
   *   sendUrl: '/api/stream',
   *   prefixUrl: 'https://api.example.com'
   * });
   *
   * // 遍历 SSE 消息
   * for await (const message of iterator) {
   *   console.log('收到 SSE 消息:', message);
   * }
   * ```
   */
  static async create(options: MessageSSEOptions): Promise<AsyncIterator<MessageSSEIteratorData, void, unknown>> {
    const messageSSE = new MessageSSE(options);
    await messageSSE.open();
    return messageSSE.#messageAsyncGenerator();
  }
}
