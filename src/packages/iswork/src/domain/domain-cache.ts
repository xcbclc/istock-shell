/**
 * @fileoverview 领域缓存类定义
 * @description 提供领域对象的缓存管理功能
 */

import type { AnyClass } from '../interfaces';
import type { Domain } from './domain';

/**
 * 领域缓存类
 * @description 继承自 Map，用于缓存领域类和对应的领域实例的映射关系
 * @extends Map<AnyClass, Domain>
 * @example
 * ```typescript
 * // 创建领域缓存实例
 * const cache = DomainCache.create();
 *
 * // 缓存领域实例
 * cache.set(UserDomain, userDomainInstance);
 *
 * // 获取缓存的领域实例
 * const domain = cache.get(UserDomain);
 * ```
 */
export class DomainCache extends Map<AnyClass, Domain> {
  /**
   * 创建领域缓存实例
   * @description 静态工厂方法，用于创建新的领域缓存实例
   * @returns 新的领域缓存实例
   */
  static create() {
    return new this();
  }
}
