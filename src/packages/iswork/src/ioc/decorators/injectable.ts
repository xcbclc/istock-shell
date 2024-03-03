import type { IAnyClass } from '../../interfaces';
import { IOC_INJECTABLE } from '../../constants';

/**
 * 定义类能注入装饰器
 * @constructor
 */
export function Injectable() {
  return function (target: IAnyClass<any>) {
    Reflect.defineMetadata(IOC_INJECTABLE, true, target);
    return target;
  };
}

export function getInjectableMetadata(target: IAnyClass) {
  return Reflect.getMetadata(IOC_INJECTABLE, target) as boolean | undefined;
}
