import type { TInjectionToken } from '../../types';
import { IOC_INJECT } from '../../constants';
import type { IAnyClass } from '../../interfaces';

/**
 * 注入装饰器
 * @param token
 * @constructor
 */
export function Inject(token: TInjectionToken) {
  return function (target: IAnyClass<any>, propertyKey: string | symbol, index: number) {
    let tokens: TInjectionToken[] = Reflect.getMetadata(IOC_INJECT, target, propertyKey);
    if (!tokens) tokens = [];
    tokens[index] = token;
    Reflect.defineMetadata(IOC_INJECT, tokens, target, propertyKey);
    return target;
  };
}

export function getInjectMetadata(target: IAnyClass, propertyKey: string) {
  return Reflect.getMetadata(IOC_INJECT, target, propertyKey) as Array<TInjectionToken | undefined> | undefined;
}
