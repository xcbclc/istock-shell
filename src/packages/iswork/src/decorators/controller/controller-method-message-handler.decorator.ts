import { ScopeError } from '@istock-shell/util';
import type { ControllerMethodMessageHandlerMetadata, CmdpPayload } from '../../types';
import { CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';
import {
  Observable,
  MessageIterator,
  MessageSSE,
  type SubscribeCallback,
  type MessageSSEOptions,
} from '../../message/index';
import { MessageCmdAction } from '../../enums/index';

/**
 * 消息处理器接口
 * @description 定义控制器方法中消息处理的标准接口，提供消息完成、命令操作和各种消息类型创建功能
 * @example
 * ```typescript
 * // 在控制器方法中使用
 * async handleMessage(@MessageHandler() handler: IMessageHandler) {
 *   // 创建可观察对象
 *   const observable = handler.createObservable((observer) => {
 *     observer.next({ data: 'message' });
 *     observer.complete();
 *   });
 *
 *   // 完成消息处理
 *   return handler.complete({ result: 'success' });
 * }
 * ```
 */
export interface IMessageHandler {
  /** 完成消息处理并返回最终载荷 */
  complete: (payload?: CmdpPayload) => CmdpPayload;
  /** 追加命令到载荷 */
  cmdAppend: (payload: CmdpPayload) => CmdpPayload;
  /** 替换载荷中的命令 */
  cmdReplace: (payload: CmdpPayload) => CmdpPayload;
  /** 创建可观察对象的工厂方法 */
  createObservable: typeof Observable.create;
  /** 创建消息迭代器的工厂方法 */
  createMessageIterator: typeof MessageIterator.create;
  /** 创建服务器发送事件的工厂方法 */
  createMessageSSE: typeof MessageSSE.create;
}

/**
 * 控制器方法参数装饰器 - 消息处理器
 * @description 用于在控制器方法参数中注入消息处理器，提供消息完成、命令操作和各种消息类型创建功能
 * @example
 * ```typescript
 * // 在控制器方法中使用消息处理器
 * @Controller()
 * export class MyController {
 *   @Message()
 *   async handleMessage(@MessageHandler() handler: IMessageHandler) {
 *     // 创建可观察对象
 *     const observable = handler.createObservable((observer) => {
 *       observer.next({ data: 'message' });
 *       observer.complete();
 *     });
 *
 *     // 完成消息处理
 *     return handler.complete({ result: 'success' });
 *   }
 * }
 * ```
 */
export class ControllerMethodMessageHandlerDecorator extends AbstractParameterDecorator<ControllerMethodMessageHandlerMetadata> {
  /**
   * 构造函数
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 创建参数装饰器，用于标记需要注入消息处理器的参数
   * @returns 参数装饰器函数
   * @throws {ScopeError} 当未找到 propertyKey 时抛出错误
   */
  handler() {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: ControllerMethodMessageHandlerMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = true;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 回调函数
   * @description 在方法执行时创建并返回消息处理器实例
   * @param _data - 装饰器元数据（未使用）
   * @returns 返回创建消息处理器的函数
   */
  callback(_data: ControllerMethodMessageHandlerMetadata) {
    return (ctx: ApplicationContext): IMessageHandler => {
      const messageStatusMethod = ctx.app.messageChannelManager.getMessageStatusMethod(ctx);
      const meta = ctx.cmdp.getReturnMeta() ?? {};
      return {
        /**
         * 完成消息处理
         * @param payload - 要返回的载荷数据
         * @returns 返回载荷数据
         */
        complete: (payload: CmdpPayload) => {
          messageStatusMethod.complete();
          return payload;
        },
        /**
         * 追加命令到载荷
         * @param payload - 载荷数据
         * @returns 返回载荷数据
         */
        cmdAppend: (payload: CmdpPayload) => {
          ctx.cmdp.setReturnMeta({ ...meta, cmdAction: MessageCmdAction.APPEND });
          return payload;
        },
        /**
         * 替换载荷中的命令
         * @param payload - 载荷数据
         * @returns 返回载荷数据
         */
        cmdReplace: (payload: CmdpPayload) => {
          ctx.cmdp.setReturnMeta({ ...meta, cmdAction: MessageCmdAction.REPLACE });
          return payload;
        },
        /**
         * 创建可观察对象
         * @param subscribeCallback - 订阅回调函数
         * @returns 可观察对象实例
         */
        createObservable: <V = unknown>(subscribeCallback: SubscribeCallback<V>) => {
          return Observable.create<V>(subscribeCallback);
        },
        /**
         * 创建消息迭代器
         * @param callback - 迭代器回调函数
         * @returns 消息迭代器实例
         */
        createMessageIterator: (callback: (messageIterator: MessageIterator) => void) => {
          return MessageIterator.create(callback);
        },
        /**
         * 创建服务器发送事件
         * @param options - SSE 配置选项
         * @returns Promise<MessageSSE> SSE 实例
         */
        createMessageSSE: async (options: MessageSSEOptions) => {
          return await MessageSSE.create(options);
        },
      };
    };
  }
}
