/**
 * @fileoverview CMDP 事件协议实现
 * @description 基于 CMDP 协议的事件通信实现，使用 'event://' 协议标识符
 */

import type { CmdpInfo, CmdpMessage } from '../types';
import { Cmdp } from './cmdp';

/**
 * CMDP 事件协议类
 * @description 继承自 Cmdp 类，专门用于处理事件类型的 CMDP 协议通信
 * @extends Cmdp
 * @example
 * ```typescript
 * // 通过消息对象创建事件协议实例
 * const eventCmdp1 = new CmdpEvent({
 *   address: 'event://@admin.example.com:8080/EventController.handleEvent',
 *   meta: { timestamp: Date.now() },
 *   payload: { eventType: 'user-login', userId: '123' }
 * });
 *
 * // 通过地址信息创建事件协议实例
 * const eventCmdp2 = new CmdpEvent({
 *   user: 'admin',
 *   domains: ['example', 'com'],
 *   port: '8080',
 *   controller: 'EventController',
 *   method: 'handleEvent'
 * });
 * ```
 */
export class CmdpEvent extends Cmdp {
  /**
   * 构造函数
   * @description 创建 CMDP 事件协议实例，自动使用 'event://' 协议标识符
   * @param msgOrInfo CMDP 消息对象或地址信息对象
   * @example
   * ```typescript
   * // 使用消息对象初始化
   * const eventCmdp = new CmdpEvent({
   *   address: 'event://@admin.example.com:8080/EventController.handleEvent',
   *   meta: { source: 'client' },
   *   payload: { action: 'click', target: 'button' }
   * });
   *
   * // 使用地址信息初始化
   * const eventCmdp2 = new CmdpEvent({
   *   user: 'system',
   *   domains: ['internal', 'service'],
   *   port: '9000',
   *   controller: 'NotificationController',
   *   method: 'sendAlert'
   * });
   * ```
   */
  constructor(msgOrInfo: CmdpMessage | CmdpInfo) {
    super(msgOrInfo, { protocol: 'event:' });
  }
}
// Event
