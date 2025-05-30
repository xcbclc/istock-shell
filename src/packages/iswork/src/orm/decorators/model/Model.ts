/**
 * @fileoverview ORM 模型装饰器
 * @description 提供模型定义装饰器和元数据获取功能，用于标记和配置 ORM 模型类
 */

import { isObject } from '@istock-shell/util';
import type { AnyClass } from '../../../interfaces';
import type { DecoratorModelOptions, DecoratorModelMetadata } from '../../types';
import { ORM_MODEL } from '../constants';

/**
 * 模型装饰器
 * @description 用于标记类为 ORM 模型，并设置模型的配置选项
 * @param options - 模型配置选项
 * @returns 类装饰器函数
 * @example
 * ```typescript
 * @Model({ tableName: 'users' })
 * class User {
 *   id: number;
 *   name: string;
 * }
 * ```
 */
export function Model(options?: DecoratorModelOptions): ClassDecorator;

/**
 * 模型装饰器（带名称）
 * @description 用于标记类为 ORM 模型，并指定模型名称和配置选项
 * @param name - 模型名称
 * @param options - 模型配置选项
 * @returns 类装饰器函数
 * @example
 * ```typescript
 * @Model('User', { tableName: 'users' })
 * class UserModel {
 *   id: number;
 *   name: string;
 * }
 * ```
 */
export function Model(name?: string, options?: DecoratorModelOptions): ClassDecorator;

/**
 * 模型装饰器实现
 * @description 模型装饰器的具体实现，支持多种参数形式
 * @param nameOrOptions - 模型名称或配置选项
 * @param maybeOptions - 可选的配置选项
 * @returns 类装饰器函数
 */
export function Model(
  nameOrOptions?: string | DecoratorModelOptions,
  maybeOptions?: DecoratorModelOptions
): ClassDecorator {
  return function (target) {
    const options = (isObject(nameOrOptions) ? nameOrOptions : maybeOptions) ?? {};
    const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.name;
    Reflect.defineMetadata(ORM_MODEL, { name: name ?? target.name, ...options }, target);
  };
}

/**
 * 获取模型元数据
 * @description 从指定类中获取模型装饰器设置的元数据
 * @param target - 目标类
 * @returns 模型元数据，如果不存在则返回 undefined
 * @example
 * ```typescript
 * @Model('User')
 * class UserModel {}
 *
 * const metadata = getModelMetadata(UserModel);
 * console.log(metadata?.name); // 'User'
 * ```
 */
export function getModelMetadata(target: AnyClass) {
  return Reflect.getMetadata(ORM_MODEL, target) as DecoratorModelMetadata | undefined;
}
