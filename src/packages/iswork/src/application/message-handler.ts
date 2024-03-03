import { ScopeError } from '@istock/util';
import type { ApplicationContext } from './context';
import type { DomainHandler } from '../domain/domain-handler';

/**
 * 根据上下文处理消息
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MessageHandler {
  /**
   * 根据上下文及消息获取处理函数
   * @param ctx
   * @param domainHandler
   */
  static resolveCmdpHandler(ctx: ApplicationContext, domainHandler: DomainHandler) {
    const { cmdp } = ctx;
    const cmdpInfo = cmdp.getInfo();
    const subDomainName = cmdp.searchSubDomain();
    const {
      controller,
      controllerCallback,
      methodProperty,
      methodCallback,
      methodReturnCallback,
      methodParams,
      middlewares,
    } = domainHandler.getMessageHandlerInfo({ ...cmdpInfo, subDomain: subDomainName });
    let handler: Function | undefined;
    if (methodProperty) handler = controller[methodProperty];
    if (!handler) {
      throw new ScopeError(
        `iswork.${this.constructor.name}`,
        `未找到对应的处理方法，${[subDomainName, controller, methodProperty].join('-')}`
      );
    }

    return {
      cmdpHandler: async () => {
        // 先执行装饰器回调
        controllerCallback(ctx, cmdpInfo);
        methodCallback(ctx, cmdpInfo);
        const response = await handler?.bind(
          controller,
          ...methodParams.map((fn) => fn(ctx, cmdpInfo)) // 绑定参数
        )();
        return methodReturnCallback(ctx, cmdpInfo, response) ?? response;
      },
      middlewares,
    };
  }
}
