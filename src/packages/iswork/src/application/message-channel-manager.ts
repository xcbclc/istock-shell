/**
 * @fileoverview 消息通道管理器
 * @description 提供消息通道的创建、缓存和状态管理功能
 */

import { type ApplicationContext } from './context';
import { MessageChannelAdapter } from '../message';
import { MessageStatus } from '../enums/index';

/**
 * 消息状态方法接口
 * @description 定义消息状态控制方法的接口
 */
export interface MessageStatusMethod {
  /** 标记消息完成的方法 */
  complete: () => void;
}

/**
 * 消息通道管理器
 * @description 管理 MessageChannel 实例的创建、缓存、获取和删除，以及消息状态的控制
 * @example
 * ```typescript
 * const manager = new MessageChannelManager();
 * const adapter = manager.createMessageChannelAdapter('msg-001');
 * const statusMethod = manager.getMessageStatusMethod(ctx);
 * statusMethod.complete(); // 标记消息完成
 * ```
 */
export class MessageChannelManager {
  /** 消息通道适配器缓存映射表 */
  readonly #cache = new Map<string, MessageChannelAdapter>();

  /**
   * 检查缓存中是否存在指定的消息通道适配器
   * @description 根据消息 ID 检查缓存中是否已存在对应的 MessageChannelAdapter 实例
   * @param messageId - 消息唯一标识符
   * @returns 如果存在返回 true，否则返回 false
   * @example
   * ```typescript
   * const exists = manager.hasMessageChannelAdapterCache('msg-001');
   * if (exists) {
   *   console.log('消息通道已存在');
   * }
   * ```
   */
  hasMessageChannelAdapterCache(messageId: string) {
    return this.#cache.has(messageId);
  }

  /**
   * 创建消息通道适配器实例
   * @description 创建新的 MessageChannelAdapter 实例并将其缓存到映射表中
   * @param messageId - 消息唯一标识符，用作缓存键
   * @returns 新创建的 MessageChannelAdapter 实例
   * @example
   * ```typescript
   * const adapter = manager.createMessageChannelAdapter('msg-001');
   * // 现在可以使用 adapter 进行消息通信
   * ```
   */
  createMessageChannelAdapter(messageId: string) {
    const messageChannelAdapter = new MessageChannelAdapter();
    this.#cache.set(messageId, messageChannelAdapter);
    return messageChannelAdapter;
  }

  /**
   * 获取消息通道适配器实例
   * @description 根据消息 ID 从缓存中获取对应的 MessageChannelAdapter 实例
   * @param messageId - 消息唯一标识符
   * @returns MessageChannelAdapter 实例，如果不存在则返回 undefined
   * @example
   * ```typescript
   * const adapter = manager.getMessageChannelAdapter('msg-001');
   * if (adapter) {
   *   // 使用已存在的适配器
   *   adapter.send(message);
   * }
   * ```
   */
  getMessageChannelAdapter(messageId: string) {
    return this.#cache.get(messageId);
  }

  /**
   * 删除消息通道适配器实例
   * @description 根据消息 ID 从缓存中删除对应的 MessageChannelAdapter 实例
   * @param messageId - 消息唯一标识符
   * @example
   * ```typescript
   * manager.deleteMessageChannelAdapter('msg-001');
   * // 消息通道适配器已从缓存中移除
   * ```
   */
  deleteMessageChannelAdapter(messageId: string) {
    this.#cache.delete(messageId);
  }

  /**
   * 设置当前上下文的消息状态
   * @description 更新应用程序上下文中的消息状态元数据
   * @param ctx - 应用程序上下文实例
   * @param status - 要设置的消息状态
   * @private
   */
  #messageStatus(ctx: ApplicationContext, status: MessageStatus) {
    const meta = ctx.cmdp.getReturnMeta<Record<string, any>>();
    ctx.cmdp.setReturnMeta({ ...meta, status });
  }

  /**
   * 获取消息状态控制方法
   * @description 返回一个包含消息状态控制方法的对象，用于管理消息的生命周期状态
   * @param ctx - 应用程序上下文实例
   * @returns 消息状态控制方法对象
   * @example
   * ```typescript
   * const statusMethod = manager.getMessageStatusMethod(ctx);
   * // 标记消息处理完成
   * statusMethod.complete();
   * ```
   */
  getMessageStatusMethod(ctx: ApplicationContext): MessageStatusMethod {
    return {
      complete: () => {
        this.#messageStatus(ctx, MessageStatus.COMPLETE);
      },
    };
  }
}
