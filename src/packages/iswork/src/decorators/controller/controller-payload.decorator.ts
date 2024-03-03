import { ScopeError } from '@istock/util';
import type { TControllerMethodParamPayloadMetadata, TCmdpInfo } from '../../types';
import { CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';

import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器方法参数获取消息Payload装饰器，获取cmdp消息的Payload数据
 */
export class ControllerPayloadDecorator extends AbstractParameterDecorator<TControllerMethodParamPayloadMetadata> {
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA) {
    super(key);
  }

  handler() {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: TControllerMethodParamPayloadMetadata =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = true;
      Reflect.defineMetadata(CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA, paramsMetadata, target, propertyKey);
    };
  }

  callback(_value: boolean) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
      const { payload } = cmdInfo;
      return payload;
    };
  }
}
