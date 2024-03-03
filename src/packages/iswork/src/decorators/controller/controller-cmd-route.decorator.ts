import type {
  TControllerMethodCmdRouteMetadata,
  TControllerMethodCmdRoute,
  TControllerMethodCmdRouteOptions,
} from '../../types';
import { CONTROLLER_METHOD_CMDROUTE_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { EDecoratorCallbackType } from '../../enums';
/**
 * 控制器方法路由装饰器，定义和获取路由信息
 */
export class ControllerCmdRouteDecorator extends AbstractMethodDecorator<TControllerMethodCmdRouteMetadata> {
  readonly callbackType = EDecoratorCallbackType.MethodRequest;
  constructor(key: string | symbol = CONTROLLER_METHOD_CMDROUTE_METADATA) {
    super(key);
  }

  /**
   * 将选项数据格式化成元数据
   * @param options
   * @private
   */
  #formatToMetadata(options: TControllerMethodCmdRoute): TControllerMethodCmdRouteMetadata {
    const { subcommand, ...other } = options;
    let subcommandOptions: TControllerMethodCmdRouteOptions[] = [];
    if (subcommand?.options) {
      subcommandOptions = Object.values(subcommand.options ?? {});
    }
    const metadata: TControllerMethodCmdRouteMetadata = { ...other, options: Object.values(options.options ?? {}) };
    if (subcommand) {
      metadata.subcommand = Object.assign<TControllerMethodCmdRoute, Partial<TControllerMethodCmdRouteMetadata>>(
        subcommand,
        { options: subcommandOptions }
      );
    }
    return metadata;
  }

  handler(options: TControllerMethodCmdRoute) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      Reflect.defineMetadata(this.key, this.#formatToMetadata(options), target, propertyKey);
      return descriptor;
    };
  }

  callback() {}
}
