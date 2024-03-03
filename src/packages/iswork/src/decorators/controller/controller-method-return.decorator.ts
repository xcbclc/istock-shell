import { isArray, isFunction, isObject, isString } from '@istock/util';
import type { TControllerMethodReturnMetadata, TCmdpInfo } from '../../types';
import { CONTROLLER_METHOD_RETURN_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { EDecoratorCallbackType } from '../../enums';
import type { ApplicationContext } from '../../index';

/**
 * 控制器方法装饰器，定义控制器方法返回数据处理逻辑
 */
export class ControllerMethodReturnDecorator extends AbstractMethodDecorator<TControllerMethodReturnMetadata[]> {
  readonly callbackType = EDecoratorCallbackType.MethodResponse;
  constructor(key: string | symbol = CONTROLLER_METHOD_RETURN_METADATA) {
    super(key);
  }

  handler(pipeName: string): MethodDecorator;
  handler(options: TControllerMethodReturnMetadata | TControllerMethodReturnMetadata[]): MethodDecorator;
  handler(nameOrOptions?: string | TControllerMethodReturnMetadata | TControllerMethodReturnMetadata[]) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      let data: TControllerMethodReturnMetadata[] = [];
      if (isString(nameOrOptions)) {
        data.push({ name: nameOrOptions });
      }
      if (isObject(nameOrOptions)) {
        data = isArray(nameOrOptions) ? nameOrOptions : [nameOrOptions];
      }
      const metaData: TControllerMethodReturnMetadata[] = Reflect.getOwnMetadata(this.key, target, propertyKey) ?? [];

      Reflect.defineMetadata(this.key, [...metaData, ...data], target, propertyKey);
      return descriptor;
    };
  }

  callback(value: TControllerMethodReturnMetadata[] = []) {
    return (ctx: ApplicationContext, cmdInfo: TCmdpInfo, response: unknown) => {
      if (value.length) {
        return ctx.app.pipeFlowExecute(
          value.map((item, index) => {
            const args = (item.args ?? []).map((arg) => {
              if (isFunction(arg)) return arg.call(this, ctx, cmdInfo);
              return arg;
            });
            // 第一个处理函数塞入response
            if (index === 0) {
              args.unshift(response);
            }
            return {
              key: item.name,
              args,
            };
          })
        );
      }
      return response;
    };
  }
}
