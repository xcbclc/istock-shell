/**
 * @fileoverview ORM 列装饰器
 * @description 提供数据库列定义装饰器和元数据获取功能，用于标记和配置模型属性
 */

import { isObject } from '@istock-shell/util';
import type { AnyClass } from '../../../interfaces';
import type { DecoratorColumnOptions, DecoratorColumnMetadata } from '../../types';
import { ORM_COLUMN, ORM_COLUMNS } from '../constants';

/**
 * 列装饰器
 * @description 用于标记属性为数据库列，并设置列的配置选项
 * @param options - 列配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @Column({ nullable: false })
 *   name: string;
 *
 *   @Column({ default: 0 })
 *   age: number;
 * }
 * ```
 */
export function Column(options?: DecoratorColumnOptions): PropertyDecorator;

/**
 * 列装饰器（带类型）
 * @description 用于标记属性为数据库列，并指定列类型和配置选项
 * @param type - 列数据类型
 * @param options - 列配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @Column('varchar', { length: 100 })
 *   name: string;
 *
 *   @Column('int', { default: 0 })
 *   age: number;
 * }
 * ```
 */
export function Column(type: string, options?: DecoratorColumnOptions): PropertyDecorator;

/**
 * 列装饰器实现
 * @description 列装饰器的具体实现，支持多种参数形式
 * @param typeOrOptions - 列类型或配置选项
 * @param maybeOptions - 可选的配置选项
 * @returns 属性装饰器函数
 */
export function Column(
  typeOrOptions?: string | DecoratorColumnOptions,
  maybeOptions?: DecoratorColumnOptions
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

/**
 * 获取列元数据
 * @description 从指定类中获取列装饰器设置的元数据
 * @param target - 目标类
 * @returns 列元数据，如果不存在则返回 undefined
 * @example
 * ```typescript
 * class User {
 *   @Column('varchar')
 *   name: string;
 * }
 *
 * const metadata = getColumnMetadata(User);
 * console.log(metadata?.type); // 'varchar'
 * ```
 */
export function getColumnMetadata(target: AnyClass) {
  return Reflect.getMetadata(ORM_COLUMN, target) as DecoratorColumnMetadata | undefined;
}
