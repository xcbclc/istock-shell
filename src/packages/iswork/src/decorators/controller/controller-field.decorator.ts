import { isObject, ScopeError } from '@istock/util';
import type { TControllerMethodParamFiledMetadata, TCmdpInfo, TAnyObject } from '../../types';
import { CONTROLLER_METHOD_PARAM_FILED_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器字段参数装饰器，获取cmdp payload的字段值
 */
export class ControllerFieldDecorator extends AbstractParameterDecorator<TControllerMethodParamFiledMetadata> {
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_FILED_METADATA) {
    super(key);
  }

  handler(field: string) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: TControllerMethodParamFiledMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = field;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  callback(value: string) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
      const { payload } = cmdInfo;
      return isObject(payload) ? (payload as TAnyObject)[value] : undefined;
    };
  }
}
