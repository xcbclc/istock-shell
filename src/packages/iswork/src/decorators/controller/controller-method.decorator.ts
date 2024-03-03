import { isArray, isNil, isString, ScopeError } from '@istock/util';
import type { TControllerMethodMetadata } from '../../types';
import { CONTROLLER_METHOD_METADATA, CONTROLLER_METHOD_NAME_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { EDecoratorCallbackType } from '../../enums';

/**
 * 控制器方法装饰器，定义和获取控制器方法元数据，方便cmdp消息解析到对应处理方法
 */
export class ControllerMethodDecorator extends AbstractMethodDecorator<TControllerMethodMetadata> {
  readonly callbackType = EDecoratorCallbackType.MethodRequest;
  constructor(key: string | symbol = CONTROLLER_METHOD_METADATA) {
    super(key);
  }

  handler(alias: string | string[]): MethodDecorator;
  handler(options: TControllerMethodMetadata): MethodDecorator;
  handler(aliasOrOptions?: string | string[] | TControllerMethodMetadata) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      const methodNames: Array<string | symbol> =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_NAME_METADATA, target, propertyKey) ?? [];
      methodNames.push(propertyKey);
      Reflect.defineMetadata(CONTROLLER_METHOD_NAME_METADATA, [...new Set(methodNames)], target);
      if (isString(aliasOrOptions) || isArray(aliasOrOptions)) {
        aliasOrOptions = { alias: aliasOrOptions };
      }
      if (isNil(aliasOrOptions)) {
        if (isString(propertyKey)) {
          aliasOrOptions = { alias: propertyKey };
        } else {
          throw new ScopeError(`global.${this.constructor.name}`, '未找到方法别名');
        }
      }
      Reflect.defineMetadata(this.key, aliasOrOptions, target, propertyKey);
      return descriptor;
    };
  }

  callback() {}
}
