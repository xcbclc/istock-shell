/**
 * @fileoverview 抽象消息通信接口
 * @description 定义消息通信的抽象基类，提供统一的消息传递接口规范
 */

/**
 * 抽象消息通信类
 * @description 定义消息通信的基础接口，所有具体的消息通信实现都应继承此抽象类
 * @template T - 消息通信实例的类型，默认为 unknown
 * @abstract
 * @example
 * ```typescript
 * class MyMessageAdapter extends AbstractMessage<WebSocket> {
 *   readonly instance: WebSocket;
 *
 *   async open() {
 *     // 实现连接逻辑
 *   }
 *
 *   async close() {
 *     // 实现关闭逻辑
 *   }
 *
 *   async send(message: any) {
 *     // 实现发送逻辑
 *   }
 *
 *   onMessage(callback: (message: any) => Promise<void>) {
 *     // 实现消息监听逻辑
 *   }
 *
 *   onError(callback: (error: Error) => Promise<void>) {
 *     // 实现错误监听逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractMessage<T = unknown> {
  /**
   * 消息通信实例
   * @description 具体的消息通信实例，如 WebSocket、MessageChannel 等
   * @readonly
   */
  abstract readonly instance: T;

  /**
   * 打开连接或初始化通信
   * @description 建立消息通信连接，准备进行消息传递
   * @returns Promise<void> 连接建立完成的 Promise
   * @abstract
   */
  abstract open(): Promise<void>;

  /**
   * 关闭连接或结束通信
   * @description 关闭消息通信连接，清理相关资源
   * @returns Promise<void> 连接关闭完成的 Promise
   * @abstract
   */
  abstract close(): Promise<void>;

  /**
   * 发送消息
   * @description 通过当前通信通道发送消息
   * @param message - 要发送的消息内容
   * @returns Promise<void> 消息发送完成的 Promise
   * @abstract
   */
  abstract send(message: any): Promise<void>;

  /**
   * 监听消息
   * @description 注册消息接收回调函数，当收到消息时触发
   * @param callback - 消息处理回调函数
   * @abstract
   */
  abstract onMessage(callback: (message: any) => Promise<void>): void;

  /**
   * 监听错误
   * @description 注册错误处理回调函数，当通信出现错误时触发
   * @param callback - 错误处理回调函数
   * @abstract
   */
  abstract onError(callback: (error: Error) => Promise<void>): void;
}
