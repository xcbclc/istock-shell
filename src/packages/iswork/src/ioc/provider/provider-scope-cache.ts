/**
 * @fileoverview IoC 提供者作用域缓存
 * @description 提供者作用域缓存类，用于存储和管理特定作用域内的领域类实例
 */

import type { InjectionToken } from '../../types';
import type { DomainClassBase } from '../../interfaces';

/**
 * 提供者作用域缓存类
 * @description 继承自 Map，用于存储注入令牌与领域类数组的映射关系，支持作用域管理
 * @extends Map<InjectionToken, DomainClassBase[]>
 * @example
 * ```typescript
 * const scopeCache = new ProviderScopeCache();
 *
 * // 存储领域类实例数组
 * const userDomains = [new UserDomain(), new UserProfileDomain()];
 * scopeCache.set(UserService, userDomains);
 *
 * // 获取领域类实例数组
 * const domains = scopeCache.get(UserService);
 * console.log(domains?.length); // 2
 * ```
 */
export class ProviderScopeCache extends Map<InjectionToken, DomainClassBase[]> {}
