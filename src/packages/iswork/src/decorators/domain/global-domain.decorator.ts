/**
 * @fileoverview 全局域装饰器
 * @description 提供将域类标记为全局域的装饰器功能
 */

import { GLOBAL_DOMAIN_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';

/**
 * 全局域装饰器类
 * @description 用于将域类标记为全局域的装饰器，全局域在整个应用程序中可见
 * @extends AbstractClassDecorator<boolean>
 * @example
 * ```typescript
 * @Global()
 * class MyGlobalDomain {
 *   // 全局域实现
 * }
 * ```
 */
export class GlobalDomainDecorator extends AbstractClassDecorator<boolean> {
  /**
   * 全局域装饰器构造函数
   * @description 初始化全局域装饰器实例
   * @param key - 元数据键，默认为 GLOBAL_DOMAIN_METADATA
   */
  constructor(key: string | symbol = GLOBAL_DOMAIN_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 返回用于标记类为全局域的装饰器函数
   * @returns 类装饰器函数
   * @example
   * ```typescript
   * const decorator = new GlobalDomainDecorator();
   * const classDecorator = decorator.handler();
   *
   * @classDecorator
   * class MyDomain {}
   * ```
   */
  handler() {
    return (target: Function) => {
      Reflect.defineMetadata(this.key, true, target);
    };
  }

  /**
   * 装饰器回调函数
   * @description 全局域装饰器的回调处理，当前为空实现
   */
  callback() {}
}
