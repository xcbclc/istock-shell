import { isObject } from '@istock/util';
import type { IAnyClass } from '../../../interfaces';
import type { TDecoratorPrimaryColumnOptions, TDecoratorPrimaryColumnMetadata } from '../../types';
import { ORM_COLUMN, ORM_COLUMNS } from '../constants';

/**
 * 定义主键属性列
 * @param options
 * @constructor
 */
export function PrimaryColumn(options?: TDecoratorPrimaryColumnOptions): PropertyDecorator;
export function PrimaryColumn(type: string, options?: TDecoratorPrimaryColumnOptions): PropertyDecorator;
export function PrimaryColumn(
  typeOrOptions?: string | TDecoratorPrimaryColumnOptions,
  maybeOptions?: TDecoratorPrimaryColumnOptions
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const options = (isObject(typeOrOptions) ? typeOrOptions : maybeOptions) ?? {};
    const type = typeof typeOrOptions === 'string' ? typeOrOptions : options.type;
    const columns = (Reflect.getMetadata(ORM_COLUMNS, target) || []) as Array<string | symbol>;
    columns.push(propertyKey);
    Reflect.defineMetadata(ORM_COLUMNS, [...new Set(columns)], target);
    Reflect.defineMetadata(
      ORM_COLUMN,
      { type, name: propertyKey, primary: true, autoIncrement: true, ...maybeOptions },
      target,
      propertyKey
    );
  };
}

export function getPrimaryColumnMetadata(target: IAnyClass) {
  return Reflect.getMetadata(ORM_COLUMN, target) as TDecoratorPrimaryColumnMetadata | undefined;
}
