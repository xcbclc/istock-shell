/**
 * @fileoverview ORM 主键列装饰器
 * @description 提供数据库主键列定义装饰器和元数据获取功能，用于标记和配置模型主键属性
 */

import { isObject } from '@istock-shell/util';
import type { AnyClass } from '../../../interfaces';
import type { DecoratorPrimaryColumnOptions, DecoratorPrimaryColumnMetadata } from '../../types';
import { ORM_COLUMN, ORM_COLUMNS } from '../constants';

/**
 * 主键列装饰器
 * @description 用于标记属性为数据库主键列，默认启用自动递增
 * @param options - 主键列配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @PrimaryColumn()
 *   id: number;
 *
 *   @PrimaryColumn({ autoIncrement: false })
 *   uuid: string;
 * }
 * ```
 */
export function PrimaryColumn(options?: DecoratorPrimaryColumnOptions): PropertyDecorator;

/**
 * 主键列装饰器（带类型）
 * @description 用于标记属性为数据库主键列，并指定列类型和配置选项
 * @param type - 主键列数据类型
 * @param options - 主键列配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @PrimaryColumn('int')
 *   id: number;
 *
 *   @PrimaryColumn('varchar', { length: 36 })
 *   uuid: string;
 * }
 * ```
 */
export function PrimaryColumn(type: string, options?: DecoratorPrimaryColumnOptions): PropertyDecorator;

/**
 * 主键列装饰器实现
 * @description 主键列装饰器的具体实现，支持多种参数形式，默认设置 primary: true 和 autoIncrement: true
 * @param typeOrOptions - 列类型或配置选项
 * @param maybeOptions - 可选的配置选项
 * @returns 属性装饰器函数
 */
export function PrimaryColumn(
  typeOrOptions?: string | DecoratorPrimaryColumnOptions,
  maybeOptions?: DecoratorPrimaryColumnOptions
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

/**
 * 获取主键列元数据
 * @description 从指定类中获取主键列装饰器设置的元数据
 * @param target - 目标类
 * @returns 主键列元数据，如果不存在则返回 undefined
 * @example
 * ```typescript
 * class User {
 *   @PrimaryColumn('int')
 *   id: number;
 * }
 *
 * const metadata = getPrimaryColumnMetadata(User);
 * console.log(metadata?.primary); // true
 * console.log(metadata?.autoIncrement); // true
 * ```
 */
export function getPrimaryColumnMetadata(target: AnyClass) {
  return Reflect.getMetadata(ORM_COLUMN, target) as DecoratorPrimaryColumnMetadata | undefined;
}
