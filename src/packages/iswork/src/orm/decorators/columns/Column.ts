import { isObject } from '@istock/util';
import type { IAnyClass } from '../../../interfaces';
import type { TDecoratorColumnOptions, TDecoratorColumnMetadata } from '../../types';
import { ORM_COLUMN, ORM_COLUMNS } from '../constants';

/**
 * 定义属性列
 * @param options
 * @constructor
 */
export function Column(options?: TDecoratorColumnOptions): PropertyDecorator;

export function Column(type: string, options?: TDecoratorColumnOptions): PropertyDecorator;
export function Column(
  typeOrOptions?: string | TDecoratorColumnOptions,
  maybeOptions?: TDecoratorColumnOptions
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const options = (isObject(typeOrOptions) ? typeOrOptions : maybeOptions) ?? {};
    const type = typeof typeOrOptions === 'string' ? typeOrOptions : options.type;
    const columns = (Reflect.getMetadata(ORM_COLUMNS, target) || []) as Array<string | symbol>;
    columns.push(propertyKey);
    Reflect.defineMetadata(ORM_COLUMNS, [...new Set(columns)], target);
    Reflect.defineMetadata(ORM_COLUMN, { type, name: propertyKey, ...maybeOptions }, target, propertyKey);
  };
}

export function getColumnMetadata(target: IAnyClass) {
  return Reflect.getMetadata(ORM_COLUMN, target) as TDecoratorColumnMetadata | undefined;
}
