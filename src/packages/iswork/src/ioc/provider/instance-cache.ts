/**
 * @fileoverview IoC 实例缓存
 * @description 实例缓存类，用于存储和管理依赖注入容器中已创建的实例
 */

import type { InjectionToken } from '../../types';
import type { AnyClass } from '../../interfaces';

/**
 * 实例缓存类
 * @description 继承自 Map，用于存储注入令牌与实例的映射关系，实现单例模式
 * @extends Map<InjectionToken, AnyClass>
 * @example
 * ```typescript
 * const cache = new InstanceCache();
 *
 * // 存储实例
 * const userService = new UserService();
 * cache.set(UserService, userService);
 *
 * // 获取实例
 * const instance = cache.get(UserService);
 * console.log(instance === userService); // true，单例模式
 * ```
 */
export class InstanceCache extends Map<InjectionToken, AnyClass> {}
