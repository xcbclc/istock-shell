/**
 * @fileoverview 域装饰器
 * @description 提供域类装饰器功能，用于标记和配置域类
 */

import { DOMAIN_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';
import type { DomainMetadata } from '../../types';

/**
 * 域装饰器类
 * @description 用于标记和配置域类的装饰器，域是应用程序的业务逻辑单元
 * @extends AbstractClassDecorator<DomainMetadata>
 * @example
 * ```typescript
 * @Domain({ name: 'UserDomain', version: '1.0.0' })
 * class UserDomain {
 *   // 域实现
 * }
 * ```
 */
export class DomainDecorator extends AbstractClassDecorator<DomainMetadata> {
  /**
   * 域装饰器构造函数
   * @description 初始化域装饰器实例
   * @param key - 元数据键，默认为 DOMAIN_METADATA
   */
  constructor(key: string | symbol = DOMAIN_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 返回用于标记和配置域类的装饰器函数
   * @param metadata - 域元数据配置
   * @returns 类装饰器函数
   * @example
   * ```typescript
   * const decorator = new DomainDecorator();
   * const classDecorator = decorator.handler({ name: 'MyDomain' });
   *
   * @classDecorator
   * class MyDomain {}
   * ```
   */
  handler(metadata: DomainMetadata) {
    return (target: Function) => {
      Reflect.defineMetadata(this.key, metadata, target);
    };
  }

  /**
   * 装饰器回调函数
   * @description 域装饰器的回调处理，当前为空实现
   */
  callback() {}
}
