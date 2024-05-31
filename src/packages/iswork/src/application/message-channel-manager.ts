import { type ApplicationContext } from './context';
import { MessageChannelAdapter } from '../message';
import { EMessageStatus } from '../enums/index';

export interface IMessageStatusMethod {
  complete: () => void;
}
/**
 * MessageChannel消息管理
 */
export class MessageChannelManager {
  readonly #cache = new Map<string, MessageChannelAdapter>();

  /**
   * 判断是否缓存中是否存在消息实例
   * @param messageId
   */
  hasMessageChannelAdapterCache(messageId: string) {
    return this.#cache.has(messageId);
  }

  /**
   * 创建MessageChannel实例
   * @param messageId
   */
  createMessageChannelAdapter(messageId: string) {
    const messageChannelAdapter = new MessageChannelAdapter();
    this.#cache.set(messageId, messageChannelAdapter);
    return messageChannelAdapter;
  }

  /**
   * 获取MessageChannelAdapter实例
   * @param messageId
   */
  getMessageChannelAdapter(messageId: string) {
    return this.#cache.get(messageId);
  }

  /**
   * 删除MessageChannel实例
   * @param messageId
   */
  deleteMessageChannelAdapter(messageId: string) {
    this.#cache.delete(messageId);
  }

  /**
   * 设置当前上下文消息状态
   * @param ctx
   * @param status
   * @private
   */
  #messageStatus(ctx: ApplicationContext, status: EMessageStatus) {
    const meta = ctx.cmdp.getReturnMeta<Record<string, any>>();
    ctx.cmdp.setReturnMeta({ ...meta, status });
  }

  /**
   * 获取当前上下文的消息状态方法设置函数
   * @param ctx
   */
  getMessageStatusMethod(ctx: ApplicationContext): IMessageStatusMethod {
    return {
      complete: () => {
        this.#messageStatus(ctx, EMessageStatus.COMPLETE);
      },
    };
  }
}
