/**
 * @fileoverview 应用程序事件管理类
 * @description 提供应用程序生命周期事件的管理和发送功能
 */

import type { ApplicationEventOptions, CmdpAddressInfo, CmdpPayload } from '../types';
import { CmdpEvent } from '../cmdp';

/**
 * 应用程序事件管理类
 * @description 定义和管理应用程序的生命周期事件，包括初始化、监听、输入输出和关闭等事件
 * @example
 * ```typescript
 * class MyApp extends ApplicationEvent {
 *   constructor() {
 *     super({ emit: (message) => console.log(message) });
 *   }
 * }
 * ```
 */
export class ApplicationEvent {
  /** CMDP 事件类引用 */
  readonly #CmdpEvent = CmdpEvent;
  /** 消息发送函数 */
  readonly #emit: ApplicationEventOptions['emit'] = () => {};
  /** 应用事件配置选项 */
  options: ApplicationEventOptions;

  /**
   * 获取消息发送函数
   * @description 返回当前配置的消息发送函数
   * @returns 消息发送函数
   */
  get emit() {
    return this.#emit;
  }

  /**
   * 应用程序事件构造函数
   * @description 初始化应用程序事件管理器，设置消息发送函数
   * @param options - 应用事件配置选项
   * @param options.emit - 消息发送函数，用于发送应用程序事件消息
   * @example
   * ```typescript
   * const appEvent = new ApplicationEvent({
   *   emit: (message) => {
   *     // 自定义消息发送逻辑
   *     postMessage(message);
   *   }
   * });
   * ```
   */
  constructor(options: ApplicationEventOptions) {
    this.options = options;
    if (this.options.emit) this.#emit = this.options.emit;
  }

  /**
   * 发送应用程序级别消息
   * @description 创建并发送应用程序内部事件消息，用于生命周期事件通知
   * @param controller - 控制器名称，标识消息的处理模块
   * @param method - 方法名称，标识具体的事件类型
   * @param payload - 消息载荷，默认为 true
   * @protected
   * @example
   * ```typescript
   * // 发送初始化完成事件
   * this.sendAppMessage('lifecycle', 'initialized');
   * // 发送自定义事件
   * this.sendAppMessage('custom', 'userAction', { action: 'click' });
   * ```
   */
  protected sendAppMessage(controller: string, method: string, payload: CmdpPayload = true) {
    const cmdpInfo: CmdpAddressInfo = {
      protocol: 'event:',
      user: 'istock',
      domains: ['application'],
      port: '0',
      controller,
      method,
    };
    const eventCmdp = this.#CmdpEvent.create(cmdpInfo);
    this.#emit(eventCmdp.getMessage(payload));
  }

  /**
   * 应用程序初始化完成事件
   * @description 在应用程序初始化完成后触发此事件
   * @protected
   */
  protected initialized() {
    this.sendAppMessage('lifecycle', 'initialized');
  }

  /**
   * 应用程序开始监听事件
   * @description 在应用程序开始监听消息后触发此事件
   * @protected
   */
  protected listened() {
    this.sendAppMessage('lifecycle', 'listened');
  }

  /**
   * 应用程序接收输入事件
   * @description 在应用程序接收到输入消息时触发此事件
   * @protected
   */
  protected listenInput() {
    this.sendAppMessage('lifecycle', 'listenInput');
  }

  /**
   * 应用程序产生输出事件
   * @description 在应用程序产生输出消息时触发此事件
   * @protected
   */
  protected listenOutput() {
    this.sendAppMessage('lifecycle', 'listenOutput');
  }

  /**
   * 应用程序关闭监听事件
   * @description 在应用程序停止监听消息后触发此事件
   * @protected
   */
  protected closed() {
    this.sendAppMessage('lifecycle', 'closed');
  }
}
