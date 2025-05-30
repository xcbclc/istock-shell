/**
 * @fileoverview 依赖注入令牌类型定义
 * @description 定义依赖注入系统中使用的令牌类型
 */

import type { AnyClass } from '../interfaces';

/**
 * 依赖注入令牌类型
 * @description 用于标识依赖注入容器中的服务或值的令牌类型
 * @template Type 令牌对应的类型，默认为 unknown
 * @example
 * ```typescript
 * // 使用类作为令牌
 * const classToken: InjectionToken<MyService> = MyService;
 *
 * // 使用字符串作为令牌
 * const stringToken: InjectionToken<string> = 'CONFIG_VALUE';
 *
 * // 使用符号作为令牌
 * const symbolToken: InjectionToken<number> = Symbol('PORT');
 * ```
 */
export type InjectionToken<Type = unknown> = AnyClass<Type> | string | symbol;
