import { isObject } from '@istock/util';
import type { IAnyClass } from '../../../interfaces';
import type { TDecoratorIndexMetadata, TDecoratorIndexOptions } from '../../types';
import { ORM_INDEX } from '../constants';

export function Index(options?: TDecoratorIndexOptions): PropertyDecorator;

export function Index(name: string, options?: TDecoratorIndexOptions): PropertyDecorator;

export function Index(
  nameOrOptions?: string | TDecoratorIndexOptions,
  maybeOptions?: TDecoratorIndexOptions
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const options = (isObject(nameOrOptions) ? nameOrOptions : maybeOptions) ?? {};
    const indexName = typeof nameOrOptions === 'string' ? nameOrOptions : options.indexName;
    Reflect.defineMetadata(ORM_INDEX, { indexName: indexName ?? propertyKey, ...maybeOptions }, target, propertyKey);
  };
}

export function getIndexMetadata(target: IAnyClass) {
  return Reflect.getMetadata(ORM_INDEX, target) as TDecoratorIndexMetadata | undefined;
}
