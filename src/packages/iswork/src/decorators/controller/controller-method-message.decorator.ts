import type { CmdpInfo, ControllerMethodMessageMetadata } from '../../types';
import { CONTROLLER_METHOD_MESSAGE_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { DecoratorCallbackType } from '../../enums';
import { AbstractMethodDecorator } from '../abstract-decorator';

/**
 * 控制器方法装饰器 - 消息方法定义
 * @description 用于标记控制器方法为消息处理方法，自动管理消息通道的创建和初始化
 * @example
 * ```typescript
 * @Controller()
 * export class MyController {
 *   // 启用消息处理功能
 *   @Message()
 *   async handleMessage() {
 *     return { data: 'message response' };
 *   }
 *
 *   // 自定义消息配置
 *   @Message({ message: true })
 *   async customMessage() {
 *     return { result: 'custom message' };
 *   }
 * }
 * ```
 */
export class ControllerMethodMessageDecorator extends AbstractMethodDecorator<ControllerMethodMessageMetadata> {
  /** 装饰器回调类型，标识为方法请求类型 */
  readonly callbackType = DecoratorCallbackType.MethodRequest;

  /**
   * 构造函数
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_MESSAGE_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_MESSAGE_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 创建方法装饰器，用于标记方法为消息处理方法
   * @param options - 消息配置选项，默认启用消息功能
   * @returns 方法装饰器函数
   */
  handler(options: ControllerMethodMessageMetadata = { message: true }): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      Reflect.defineMetadata(this.key, options, target, propertyKey);
      return descriptor;
    };
  }

  /**
   * 回调函数
   * @description 在方法执行前处理消息通道的初始化
   * @param value - 消息元数据配置
   * @returns 返回处理应用上下文和命令信息的函数
   */
  callback(value: ControllerMethodMessageMetadata) {
    return (ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      const returnMeta = cmdInfo.returnMeta ?? {};
      if (
        value.message &&
        returnMeta.messageId &&
        !ctx.app.messageChannelManager.hasMessageChannelAdapterCache(`${returnMeta.messageId}`)
      ) {
        // 初始化创建MessageChannel
        ctx.app.messageChannelManager.createMessageChannelAdapter(`${returnMeta.messageId}`);
      }
      return cmdInfo.payload;
    };
  }
}
