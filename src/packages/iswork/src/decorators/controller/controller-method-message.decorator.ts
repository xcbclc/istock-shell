import type { TCmdpInfo, TControllerMethodMessageMetadata } from '../../types';
import { CONTROLLER_METHOD_MESSAGE_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { EDecoratorCallbackType } from '../../enums';
import { AbstractMethodDecorator } from '../abstract-decorator';

/**
 * 控制器方法 定义消息方法
 */
export class ControllerMethodMessageDecorator extends AbstractMethodDecorator<TControllerMethodMessageMetadata> {
  readonly callbackType = EDecoratorCallbackType.MethodRequest;
  constructor(key: string | symbol = CONTROLLER_METHOD_MESSAGE_METADATA) {
    super(key);
  }

  handler(options: TControllerMethodMessageMetadata = { message: true }): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      Reflect.defineMetadata(this.key, options, target, propertyKey);
      return descriptor;
    };
  }

  callback(value: TControllerMethodMessageMetadata) {
    return (ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
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
