/**
 * @fileoverview IoC 注入装饰器
 * @description 提供依赖注入装饰器和元数据获取功能，用于标记构造函数参数的注入令牌
 */

import type { InjectionToken } from '../../types';
import { IOC_INJECT } from '../../constants';
import type { AnyClass } from '../../interfaces';

/**
 * 注入装饰器
 * @description 用于标记构造函数参数需要注入的依赖，指定注入令牌
 * @param token - 注入令牌，用于标识要注入的依赖
 * @returns 参数装饰器函数
 * @example
 * ```typescript
 * class UserService {
 *   constructor(
 *     @Inject('CONFIG') private config: Config,
 *     @Inject(DatabaseService) private db: DatabaseService
 *   ) {}
 * }
 * ```
 */
export function Inject(token: InjectionToken) {
  return function (target: AnyClass<any>, propertyKey: string | symbol, index: number) {
    let tokens: InjectionToken[] = Reflect.getMetadata(IOC_INJECT, target, propertyKey);
    if (!tokens) tokens = [];
    tokens[index] = token;
    Reflect.defineMetadata(IOC_INJECT, tokens, target, propertyKey);
    return target;
  };
}

/**
 * 获取注入元数据
 * @description 从指定类的构造函数中获取注入装饰器设置的元数据
 * @param target - 目标类
 * @param propertyKey - 属性键（通常为构造函数名）
 * @returns 注入令牌数组，如果不存在则返回 undefined
 * @example
 * ```typescript
 * class UserService {
 *   constructor(@Inject('CONFIG') config: Config) {}
 * }
 *
 * const metadata = getInjectMetadata(UserService, 'constructor');
 * console.log(metadata); // ['CONFIG']
 * ```
 */
export function getInjectMetadata(target: AnyClass, propertyKey: string) {
  return Reflect.getMetadata(IOC_INJECT, target, propertyKey) as Array<InjectionToken | undefined> | undefined;
}
