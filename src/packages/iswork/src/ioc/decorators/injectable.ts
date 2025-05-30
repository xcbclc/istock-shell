/**
 * @fileoverview IoC 可注入装饰器
 * @description 提供可注入装饰器和元数据获取功能，用于标记类可以被依赖注入容器管理
 */

import type { AnyClass } from '../../interfaces';
import { IOC_INJECTABLE } from '../../constants';

/**
 * 可注入装饰器
 * @description 用于标记类可以被依赖注入容器管理，使类能够被注入到其他类中
 * @returns 类装饰器函数
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {
 *   getUsers() {
 *     return ['user1', 'user2'];
 *   }
 * }
 *
 * @Injectable()
 * class UserController {
 *   constructor(private userService: UserService) {}
 * }
 * ```
 */
export function Injectable() {
  return function (target: AnyClass<any>) {
    Reflect.defineMetadata(IOC_INJECTABLE, true, target);
    return target;
  };
}

/**
 * 获取可注入元数据
 * @description 从指定类中获取可注入装饰器设置的元数据
 * @param target - 目标类
 * @returns 是否可注入的布尔值，如果不存在则返回 undefined
 * @example
 * ```typescript
 * @Injectable()
 * class UserService {}
 *
 * const isInjectable = getInjectableMetadata(UserService);
 * console.log(isInjectable); // true
 * ```
 */
export function getInjectableMetadata(target: AnyClass) {
  return Reflect.getMetadata(IOC_INJECTABLE, target) as boolean | undefined;
}
