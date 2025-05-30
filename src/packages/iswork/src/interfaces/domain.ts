/**
 * @fileoverview 领域类基础接口定义
 * @description 定义了领域类的基础接口，用于领域驱动设计中的领域对象
 */

import type { AnyClass } from './any-class';

/**
 * 领域类基础接口
 * @description 定义领域类的基础结构，允许任意属性的动态扩展
 * @example
 * ```typescript
 * // 实现领域类基础接口
 * class UserDomain implements DomainClassBase {
 *   id: string;
 *   name: string;
 *   email: string;
 *
 *   constructor(id: string, name: string, email: string) {
 *     this.id = id;
 *     this.name = name;
 *     this.email = email;
 *   }
 *
 *   // 可以添加任意其他属性
 *   [key: string]: any;
 * }
 * ```
 */
export interface DomainClassBase<T = any> extends AnyClass<T> {
  /** 允许任意字符串键的动态属性 */
  [key: string]: any;
}
