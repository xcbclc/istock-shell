import { isArray, isNumber, isObject, ScopeError } from '@istock/util';
import type { TControllerMethodCmdRouteArguments, TCmdpInfo } from '../../types';
import { CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';
/**
 * 控制器路由参数装饰器，定义和获取路由命令参数
 */
export class ControllerCmdRouteArgumentsDecorator extends AbstractParameterDecorator<TControllerMethodCmdRouteArguments> {
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA) {
    super(key);
  }

  handler(index?: number) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: TControllerMethodCmdRouteArguments =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      if (isNumber(index)) {
        paramsMetadata[parameterIndex] = index;
      }
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  callback(value: number | undefined) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
      const { payload } = cmdInfo;
      if (!isObject(payload)) return undefined;
      const args = payload.arguments;
      if (!isNumber(value)) return arguments;
      return isArray(args) ? args[value] : undefined;
    };
  }
}
