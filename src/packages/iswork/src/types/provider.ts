/**
 * @fileoverview 提供者类型定义
 * @description 定义了依赖注入系统中提供者的相关类型
 */

import type { AnyClass, ClassProvider, FactoryProvider, ValueProvider } from '../interfaces';

/**
 * 提供者类类型
 * @description 定义提供者类的类型别名
 * @template Class 类的类型，默认为 unknown
 */
export type ProviderClass<Class = unknown> = AnyClass<Class>;

/**
 * 提供者类型
 * @description 定义所有可能的提供者类型的联合类型
 * @template Class 提供者提供的类型，默认为 unknown
 */
export type Provider<Class = unknown> = ClassProvider<Class> | ValueProvider<Class> | FactoryProvider<Class>;

/**
 * 提供者元数据类型
 * @description 定义提供者元数据的类型，可以是完整的提供者配置或简单的类
 * @template Class 提供者提供的类型，默认为 unknown
 */
export type ProviderMeta<Class = unknown> = Provider<Class> | ProviderClass<Class>;
