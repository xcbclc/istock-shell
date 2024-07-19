import { ScopeError } from '@istock/util';
import type { TControllerMethodMessageHandlerMetadata, TCmdpPayload } from '../../types';
import { CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';
import {
  Observable,
  MessageIterator,
  MessageSSE,
  type TSubscribeCallback,
  type TMessageSSEOptions,
} from '../../message/index';
import { EMessageCmdAction } from '../../enums/index';

export interface IMessageHandler {
  complete: (payload?: TCmdpPayload) => TCmdpPayload;
  cmdAppend: (payload: TCmdpPayload) => TCmdpPayload;
  cmdReplace: (payload: TCmdpPayload) => TCmdpPayload;
  createObservable: typeof Observable.create;
  createMessageIterator: typeof MessageIterator.create;
  createMessageSSE: typeof MessageSSE.create;
}

/**
 * 控制器方法参数 获取消息操作者
 */
export class ControllerMethodMessageHandlerDecorator extends AbstractParameterDecorator<TControllerMethodMessageHandlerMetadata> {
  constructor(key: string | symbol = CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA) {
    super(key);
  }

  handler() {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: TControllerMethodMessageHandlerMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = true;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  callback(_data: TControllerMethodMessageHandlerMetadata) {
    return (ctx: ApplicationContext): IMessageHandler => {
      const messageStatusMethod = ctx.app.messageChannelManager.getMessageStatusMethod(ctx);
      const meta = ctx.cmdp.getReturnMeta() ?? {};
      return {
        complete: (payload: TCmdpPayload) => {
          messageStatusMethod.complete();
          return payload;
        },
        cmdAppend: (payload: TCmdpPayload) => {
          ctx.cmdp.setReturnMeta({ ...meta, cmdAction: EMessageCmdAction.APPEND });
          return payload;
        },
        cmdReplace: (payload: TCmdpPayload) => {
          ctx.cmdp.setReturnMeta({ ...meta, cmdAction: EMessageCmdAction.REPLACE });
          return payload;
        },
        createObservable: <V = unknown>(subscribeCallback: TSubscribeCallback<V>) => {
          return Observable.create<V>(subscribeCallback);
        },
        createMessageIterator: (callback: (messageIterator: MessageIterator) => void) => {
          return MessageIterator.create(callback);
        },
        createMessageSSE: async (options: TMessageSSEOptions) => {
          return await MessageSSE.create(options);
        },
      };
    };
  }
}
