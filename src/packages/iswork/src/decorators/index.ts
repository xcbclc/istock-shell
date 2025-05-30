/**
 * @fileoverview 装饰器模块入口文件
 * @description 提供框架中所有装饰器的统一导出和注册管理
 */

import type { AbstractDecorator } from './abstract-decorator';
import { DecoratorRegister } from './decorator-register';
import { GlobalDomainDecorator } from './domain/global-domain.decorator';
import { DomainDecorator } from './domain/domain.decorator';
import { ControllerDecorator } from './controller/controller.decorator';
import { ControllerCmdRouteDecorator } from './controller/controller-cmd-route.decorator';
import { ControllerCmdRouteOptionsDecorator } from './controller/controller-cmd-route-options.decorator';
import { ControllerCmdRouteArgumentsDecorator } from './controller/controller-cmd-route-arguments.decorator';
import { ControllerFieldDecorator } from './controller/controller-field.decorator';
import { ControllerMetaDecorator } from './controller/controller-meta.decorator';
import { ControllerMethodDecorator } from './controller/controller-method.decorator';
import { ControllerPayloadDecorator } from './controller/controller-payload.decorator';
import { ControllerComponentDecorator } from './controller/controller-component.decorator';
import { ControllerMethodReturnDecorator } from './controller/controller-method-return.decorator';
import { ControllerMethodMessageDecorator } from './controller/controller-method-message.decorator';
import { ControllerMethodMessageHandlerDecorator } from './controller/controller-method-message-handler.decorator';

// 导出类型和其他模块
export type { IMessageHandler } from './controller/controller-method-message-handler.decorator';
export * from '../ioc/decorators/index';

/**
 * 装饰器类集合
 * @description 包含所有装饰器类的对象，用于内部引用
 */
const Decorator = {
  GlobalDomainDecorator,
  DomainDecorator,
  ControllerDecorator,
  ControllerCmdRouteDecorator,
  ControllerCmdRouteOptionsDecorator,
  ControllerCmdRouteArgumentsDecorator,
  ControllerFieldDecorator,
  ControllerMethodDecorator,
  ControllerPayloadDecorator,
  ControllerMetaDecorator,
  ControllerComponentDecorator,
  ControllerMethodReturnDecorator,
};

export default Decorator;

/**
 * 注册装饰器并包装处理函数
 * @description 将装饰器注册到装饰器注册器中，并返回包装后的处理函数
 * @template Decorator - 装饰器类型，必须继承自 AbstractDecorator
 * @param decoratorRegister - 装饰器注册器实例
 * @param decorator - 装饰器构造函数
 * @returns 包装后的装饰器处理函数
 * @example
 * ```typescript
 * const handler = registerAndWrapHandler(register, MyDecorator);
 * // 使用返回的处理函数作为装饰器
 * @handler('param')
 * class MyClass {}
 * ```
 */
export function registerAndWrapHandler<Decorator extends AbstractDecorator>(
  decoratorRegister: DecoratorRegister,
  decorator: new (key?: string | symbol) => Decorator
): Decorator['handler'] {
  const instance = decoratorRegister.add<Decorator>(decorator);
  return (...args: unknown[]) => instance.handler(...args);
}
/**
 * 装饰器注册器实例
 * @description 用于管理和注册所有装饰器的全局实例
 */
export const decoratorRegister = DecoratorRegister.create();

/**
 * 全局领域装饰器
 * @description 用于标记全局领域类的装饰器
 */
export const Global = registerAndWrapHandler<GlobalDomainDecorator>(decoratorRegister, GlobalDomainDecorator);

/**
 * 领域装饰器
 * @description 用于标记领域类的装饰器
 */
export const Domain = registerAndWrapHandler<DomainDecorator>(decoratorRegister, DomainDecorator);

/**
 * 控制器装饰器
 * @description 用于标记控制器类的装饰器
 */
export const Controller = registerAndWrapHandler<ControllerDecorator>(decoratorRegister, ControllerDecorator);

/**
 * 命令路由装饰器
 * @description 用于定义控制器方法的命令路由
 */
export const CmdRoute = registerAndWrapHandler<ControllerCmdRouteDecorator>(
  decoratorRegister,
  ControllerCmdRouteDecorator
);

/**
 * 命令路由选项装饰器
 * @description 用于配置命令路由的选项参数
 */
export const CmdRouteOptions = registerAndWrapHandler<ControllerCmdRouteOptionsDecorator>(
  decoratorRegister,
  ControllerCmdRouteOptionsDecorator
);

/**
 * 命令路由参数装饰器
 * @description 用于定义命令路由的参数配置
 */
export const CmdRouteArguments = registerAndWrapHandler<ControllerCmdRouteArgumentsDecorator>(
  decoratorRegister,
  ControllerCmdRouteArgumentsDecorator
);

/**
 * 字段装饰器
 * @description 用于标记控制器类的字段属性
 */
export const Field = registerAndWrapHandler<ControllerFieldDecorator>(decoratorRegister, ControllerFieldDecorator);

/**
 * 元数据装饰器
 * @description 用于为控制器或方法添加元数据信息
 */
export const Meta = registerAndWrapHandler<ControllerMetaDecorator>(decoratorRegister, ControllerMetaDecorator);

/**
 * 方法装饰器
 * @description 用于标记控制器的方法
 */
export const Method = registerAndWrapHandler<ControllerMethodDecorator>(decoratorRegister, ControllerMethodDecorator);

/**
 * 组件装饰器
 * @description 用于标记控制器的组件属性
 */
export const Component = registerAndWrapHandler<ControllerComponentDecorator>(
  decoratorRegister,
  ControllerComponentDecorator
);

/**
 * 返回值装饰器
 * @description 用于定义控制器方法的返回值处理
 */
export const Return = registerAndWrapHandler<ControllerMethodReturnDecorator>(
  decoratorRegister,
  ControllerMethodReturnDecorator
);

/**
 * 负载装饰器
 * @description 用于定义控制器方法的负载数据处理
 */
export const Payload = registerAndWrapHandler<ControllerPayloadDecorator>(
  decoratorRegister,
  ControllerPayloadDecorator
);

/**
 * 消息装饰器
 * @description 用于标记控制器方法处理的消息类型
 */
export const Message = registerAndWrapHandler<ControllerMethodMessageDecorator>(
  decoratorRegister,
  ControllerMethodMessageDecorator
);

/**
 * 消息处理器装饰器
 * @description 用于定义控制器方法的消息处理逻辑
 */
export const MessageHandler = registerAndWrapHandler<ControllerMethodMessageHandlerDecorator>(
  decoratorRegister,
  ControllerMethodMessageHandlerDecorator
);
