import { isObject, ScopeError } from '@istock/util';
import type { TControllerMethodParamMetaMetadata, TCmdpInfo, TAnyObject } from '../../types';
import { CONTROLLER_METHOD_PARAM_META_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器字段参数装饰器，获取cmdp meta的字段值
 */
export class ControllerMetaDecorator extends AbstractParameterDecorator<TControllerMethodParamMetaMetadata> {
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_META_METADATA) {
    super(key);
  }

  handler(field: string) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: TControllerMethodParamMetaMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = field;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  callback(value: string) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
      const { meta } = cmdInfo;
      return isObject(meta) ? (meta as TAnyObject)[value] : undefined;
    };
  }
}
