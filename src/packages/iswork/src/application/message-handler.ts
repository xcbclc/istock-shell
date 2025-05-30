/**
 * @fileoverview 消息处理器
 * @description 提供消息处理逻辑的解析和执行功能
 */

import { ScopeError } from '@istock-shell/util';
import type { ApplicationContext } from './context';
import type { DomainHandler } from '../domain/domain-handler';

/**
 * 消息处理器类
 * @description 负责根据应用程序上下文和域处理器解析并创建消息处理函数
 * @example
 * ```typescript
 * const { cmdpHandler, middlewares } = MessageHandler.resolveCmdpHandler(ctx, domainHandler);
 * const result = await cmdpHandler();
 * ```
 */
export class MessageHandler {
  /**
   * 解析 CMDP 消息处理函数
   * @description 根据应用程序上下文和域处理器，解析出对应的消息处理函数和中间件
   * @param ctx - 应用程序上下文，包含消息和应用实例信息
   * @param domainHandler - 域处理器，用于获取控制器和方法信息
   * @returns 包含消息处理函数和中间件的对象
   * @throws {ScopeError} 当找不到对应的处理方法时抛出错误
   * @static
   * @example
   * ```typescript
   * try {
   *   const { cmdpHandler, middlewares } = MessageHandler.resolveCmdpHandler(ctx, domainHandler);
   *   // 执行中间件
   *   const fn = compose([...globalMiddlewares, ...middlewares]);
   *   await fn(ctx, cmdpHandler);
   * } catch (error) {
   *   console.error('消息处理失败:', error.message);
   * }
   * ```
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
