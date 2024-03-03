import { isObject } from '@istock/util';
import type { IAnyClass } from '../../../interfaces';
import type { TDecoratorModelOptions, TDecoratorModelMetadata } from '../../types';
import { ORM_MODEL } from '../constants';

/**
 * 定义模型
 * @param options
 * @constructor
 */
export function Model(options?: TDecoratorModelOptions): ClassDecorator;
export function Model(name?: string, options?: TDecoratorModelOptions): ClassDecorator;
export function Model(
  nameOrOptions?: string | TDecoratorModelOptions,
  maybeOptions?: TDecoratorModelOptions
): ClassDecorator {
  return function (target) {
    const options = (isObject(nameOrOptions) ? nameOrOptions : maybeOptions) ?? {};
    const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.name;
    Reflect.defineMetadata(ORM_MODEL, { name: name ?? target.name, ...options }, target);
  };
}

export function getModelMetadata(target: IAnyClass) {
  return Reflect.getMetadata(ORM_MODEL, target) as TDecoratorModelMetadata | undefined;
}
