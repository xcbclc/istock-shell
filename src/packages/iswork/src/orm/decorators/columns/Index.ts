/**
 * @fileoverview ORM 索引装饰器
 * @description 提供数据库索引定义装饰器和元数据获取功能，用于标记和配置模型属性索引
 */

import { isObject } from '@istock-shell/util';
import type { AnyClass } from '../../../interfaces';
import type { DecoratorIndexMetadata, DecoratorIndexOptions } from '../../types';
import { ORM_INDEX } from '../constants';

/**
 * 索引装饰器
 * @description 用于标记属性为数据库索引，并设置索引的配置选项
 * @param options - 索引配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @Index({ unique: true })
 *   email: string;
 *
 *   @Index({ type: 'btree' })
 *   name: string;
 * }
 * ```
 */
export function Index(options?: DecoratorIndexOptions): PropertyDecorator;

/**
 * 索引装饰器（带名称）
 * @description 用于标记属性为数据库索引，并指定索引名称和配置选项
 * @param name - 索引名称
 * @param options - 索引配置选项
 * @returns 属性装饰器函数
 * @example
 * ```typescript
 * class User {
 *   @Index('idx_user_email', { unique: true })
 *   email: string;
 *
 *   @Index('idx_user_name')
 *   name: string;
 * }
 * ```
 */
export function Index(name: string, options?: DecoratorIndexOptions): PropertyDecorator;

/**
 * 索引装饰器实现
 * @description 索引装饰器的具体实现，支持多种参数形式
 * @param nameOrOptions - 索引名称或配置选项
 * @param maybeOptions - 可选的配置选项
 * @returns 属性装饰器函数
 */
export function Index(
  nameOrOptions?: string | DecoratorIndexOptions,
  maybeOptions?: DecoratorIndexOptions
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const options = (isObject(nameOrOptions) ? nameOrOptions : maybeOptions) ?? {};
    const indexName = typeof nameOrOptions === 'string' ? nameOrOptions : options.indexName;
    Reflect.defineMetadata(ORM_INDEX, { indexName: indexName ?? propertyKey, ...maybeOptions }, target, propertyKey);
  };
}

/**
 * 获取索引元数据
 * @description 从指定类中获取索引装饰器设置的元数据
 * @param target - 目标类
 * @returns 索引元数据，如果不存在则返回 undefined
 * @example
 * ```typescript
 * class User {
 *   @Index('idx_user_email', { unique: true })
 *   email: string;
 * }
 *
 * const metadata = getIndexMetadata(User);
 * console.log(metadata?.indexName); // 'idx_user_email'
 * console.log(metadata?.unique); // true
 * ```
 */
export function getIndexMetadata(target: AnyClass) {
  return Reflect.getMetadata(ORM_INDEX, target) as DecoratorIndexMetadata | undefined;
}
