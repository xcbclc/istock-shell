/**
 * @fileoverview 提供者接口定义
 * @description 定义依赖注入系统中各种类型的提供者接口
 */

import type { InjectionToken } from '../types';
import type { AnyClass } from '../interfaces/index';

/**
 * 提供者基类接口
 * @description 所有提供者类型的基础接口，定义了提供者的基本结构
 * @template Type 提供者提供的类型，默认为 unknown
 */
export interface BaseProvider<Type = unknown> {
  /** 注入令牌，用于标识要注入的依赖 */
  provide: InjectionToken<Type>;
}

/**
 * 类提供者接口
 * @description 使用类构造函数作为提供者的接口定义
 * @template Class 类的实例类型，默认为 unknown
 * @example
 * ```typescript
 * const classProvider: ClassProvider<MyService> = {
 *   provide: MyService,
 *   useClass: MyService
 * };
 * ```
 */
export interface ClassProvider<Class = unknown> extends BaseProvider<Class> {
  /** 要使用的类构造函数 */
  useClass: AnyClass<Class>;
}

/**
 * 工厂提供者接口
 * @description 使用工厂函数作为提供者的接口定义
 * @template Class 工厂函数返回的类型，默认为 unknown
 * @example
 * ```typescript
 * const factoryProvider: FactoryProvider<MyService> = {
 *   provide: MyService,
 *   useFactory: (dep1, dep2) => new MyService(dep1, dep2)
 * };
 * ```
 */
export interface FactoryProvider<Class = unknown> extends BaseProvider<Class> {
  /** 工厂函数，用于创建实例 */
  useFactory: (...arg: unknown[]) => Class;
}

/**
 * 值提供者接口
 * @description 使用预定义值作为提供者的接口定义
 * @template Class 值的类型，默认为 unknown
 * @example
 * ```typescript
 * const valueProvider: ValueProvider<string> = {
 *   provide: 'CONFIG_TOKEN',
 *   useValue: 'production'
 * };
 * ```
 */
export interface ValueProvider<Class = unknown> extends BaseProvider<Class> {
  /** 要提供的值 */
  useValue: Class;
}
