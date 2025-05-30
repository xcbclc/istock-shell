/**
 * @fileoverview IoC 提供者缓存
 * @description 提供者缓存类，用于存储和管理依赖注入容器中的提供者
 */

import type { InjectionToken, Provider } from '../../types';

/**
 * 提供者缓存类
 * @description 继承自 Map，用于存储注入令牌与提供者的映射关系
 * @extends Map<InjectionToken, Provider>
 * @example
 * ```typescript
 * const cache = new ProviderCache();
 *
 * // 存储提供者
 * cache.set(MyService, {
 *   provide: MyService,
 *   useClass: MyService
 * });
 *
 * // 获取提供者
 * const provider = cache.get(MyService);
 * ```
 */
export class ProviderCache extends Map<InjectionToken, Provider> {}
