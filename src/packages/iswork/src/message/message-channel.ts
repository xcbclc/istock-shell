/**
 * @fileoverview 消息通道适配器
 * @description 提供基于 MessageChannel API 的消息通信适配器实现
 */

import { ScopeError } from '@istock-shell/util';
import { type AbstractMessage } from './abstract-message';

/**
 * 消息通道适配器
 * @description 基于浏览器 MessageChannel API 的消息通信适配器，实现双向消息传递
 * @implements {AbstractMessage<MessageChannel>}
 * @example
 * ```typescript
 * // 创建消息通道适配器
 * const adapter = new MessageChannelAdapter();
 *
 * // 设置消息监听
 * adapter.onMessage(async (message) => {
 *   console.log('收到消息:', message);
 * });
 *
 * // 发送消息
 * await adapter.send({ type: 'greeting', data: 'Hello' });
 * ```
 */
export class MessageChannelAdapter implements AbstractMessage<MessageChannel> {
  /** MessageChannel 实例 */
  readonly instance: MessageChannel = new MessageChannel();
  /** 结构化序列化选项 */
  readonly options: StructuredSerializeOptions | undefined;
  /** 消息回调函数 */
  #onMessageCallback!: (event: MessageEvent<any>) => void;
  /** 错误回调函数 */
  #onErrorCallback!: (event: MessageEvent<any>) => void;

  /**
   * 检查是否已设置消息回调
   * @returns 是否存在消息回调函数
   */
  get hasOnMessageCallback() {
    return Boolean(this.#onMessageCallback);
  }

  /**
   * 消息通道适配器构造函数
   * @description 初始化消息通道适配器，可选择性配置序列化选项
   * @param options - 结构化序列化选项，用于控制消息传递时的序列化行为
   * @example
   * ```typescript
   * // 创建基本适配器
   * const adapter = new MessageChannelAdapter();
   *
   * // 创建带序列化选项的适配器
   * const adapter = new MessageChannelAdapter({
   *   transfer: [arrayBuffer]
   * });
   * ```
   */
  constructor(options?: StructuredSerializeOptions) {
    this.options = options;
  }

  /**
   * 打开消息通道
   * @description 异步打开消息通道连接
   * @returns Promise<void>
   * @example
   * ```typescript
   * await adapter.open();
   * ```
   */
  async open() {
    await Promise.resolve();
  }

  /**
   * 关闭消息通道
   * @description 移除事件监听器并关闭消息通道连接
   * @returns Promise<void>
   * @example
   * ```typescript
   * await adapter.close();
   * ```
   */
  async close() {
    this.instance.port1.removeEventListener('message', this.#onMessageCallback);
    this.instance.port1.removeEventListener('messageerror', this.#onErrorCallback);
    await Promise.resolve();
  }

  /**
   * 发送消息
   * @description 通过消息通道发送消息到另一端
   * @param message - 要发送的消息内容
   * @returns Promise<void>
   * @example
   * ```typescript
   * await adapter.send({
   *   type: 'command',
   *   payload: { action: 'execute', data: 'ls -la' }
   * });
   * ```
   */
  async send(message: any) {
    this.instance.port1.postMessage(message, this.options);
    await Promise.resolve();
  }

  /**
   * 设置消息监听回调
   * @description 注册消息接收回调函数，当收到消息时触发
   * @param callback - 消息处理回调函数
   * @example
   * ```typescript
   * adapter.onMessage(async (message) => {
   *   console.log('收到消息:', message.data);
   *   // 处理消息逻辑
   * });
   * ```
   */
  onMessage(callback: (message: any) => Promise<void>) {
    this.#onMessageCallback = (event) => {
      callback(event).catch((err) => {
        throw err;
      });
    };
    this.instance.port1.addEventListener('message', this.#onMessageCallback);
    this.instance.port1.start?.();
  }

  /**
   * 设置错误监听回调
   * @description 注册错误处理回调函数，当消息传递出错时触发
   * @param callback - 错误处理回调函数
   * @example
   * ```typescript
   * adapter.onError(async (error, event) => {
   *   console.error('消息传递错误:', error.message);
   *   console.error('错误事件:', event);
   * });
   * ```
   */
  onError(callback: (error: Error, event: MessageEvent<any>) => Promise<void>) {
    this.#onErrorCallback = (event) => {
      callback(new ScopeError(`iswork.${this.constructor.name}`, 'MessageChannel发送消息失败'), event).catch((err) => {
        throw err;
      });
    };
    this.instance.port1.addEventListener('messageerror', this.#onErrorCallback);
  }
}
