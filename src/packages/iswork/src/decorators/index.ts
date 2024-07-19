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

export type { IMessageHandler } from './controller/controller-method-message-handler.decorator';
export * from '../ioc/decorators/index';

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
 * 内部装饰注册
 */
export function registerAndWrapHandler<Decorator extends AbstractDecorator>(
  decoratorRegister: DecoratorRegister,
  decorator: new (key?: string | symbol) => Decorator
): Decorator['handler'] {
  const instance = decoratorRegister.add<Decorator>(decorator);
  return (...args: unknown[]) => instance.handler(...args);
}
export const decoratorRegister = DecoratorRegister.create();
export const Global = registerAndWrapHandler<GlobalDomainDecorator>(decoratorRegister, GlobalDomainDecorator);
export const Domain = registerAndWrapHandler<DomainDecorator>(decoratorRegister, DomainDecorator);
export const Controller = registerAndWrapHandler<ControllerDecorator>(decoratorRegister, ControllerDecorator);
export const CmdRoute = registerAndWrapHandler<ControllerCmdRouteDecorator>(
  decoratorRegister,
  ControllerCmdRouteDecorator
);
export const CmdRouteOptions = registerAndWrapHandler<ControllerCmdRouteOptionsDecorator>(
  decoratorRegister,
  ControllerCmdRouteOptionsDecorator
);
export const CmdRouteArguments = registerAndWrapHandler<ControllerCmdRouteArgumentsDecorator>(
  decoratorRegister,
  ControllerCmdRouteArgumentsDecorator
);
export const Field = registerAndWrapHandler<ControllerFieldDecorator>(decoratorRegister, ControllerFieldDecorator);
export const Meta = registerAndWrapHandler<ControllerMetaDecorator>(decoratorRegister, ControllerMetaDecorator);
export const Method = registerAndWrapHandler<ControllerMethodDecorator>(decoratorRegister, ControllerMethodDecorator);
export const Component = registerAndWrapHandler<ControllerComponentDecorator>(
  decoratorRegister,
  ControllerComponentDecorator
);
export const Return = registerAndWrapHandler<ControllerMethodReturnDecorator>(
  decoratorRegister,
  ControllerMethodReturnDecorator
);
export const Payload = registerAndWrapHandler<ControllerPayloadDecorator>(
  decoratorRegister,
  ControllerPayloadDecorator
);

export const Message = registerAndWrapHandler<ControllerMethodMessageDecorator>(
  decoratorRegister,
  ControllerMethodMessageDecorator
);

export const MessageHandler = registerAndWrapHandler<ControllerMethodMessageHandlerDecorator>(
  decoratorRegister,
  ControllerMethodMessageHandlerDecorator
);
