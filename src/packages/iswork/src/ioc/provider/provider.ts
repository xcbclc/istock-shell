/**
 * @fileoverview IoC 提供者类型检查工具
 * @description 提供各种提供者类型的检查函数，用于判断提供者的具体类型
 */

import type { Provider } from '../../types';
import type { ClassProvider, FactoryProvider, ValueProvider } from '../../interfaces';

/**
 * 检查是否为类提供者
 * @description 判断提供者是否为类提供者类型（使用 useClass 属性）
 * @template Class - 类类型，默认为 unknown
 * @param provider - 要检查的提供者
 * @returns 是否为类提供者的类型谓词
 * @example
 * ```typescript
 * const provider = { provide: MyService, useClass: MyService };
 * if (isClassProvider(provider)) {
 *   // provider 现在被推断为 ClassProvider 类型
 *   console.log(provider.useClass); // 类型安全
 * }
 * ```
 */
export function isClassProvider<Class = unknown>(provider: Provider<Class>): provider is ClassProvider<Class> {
  return !!(provider as ClassProvider<Class>).useClass;
}

/**
 * 检查是否为工厂提供者
 * @description 判断提供者是否为工厂提供者类型（使用 useFactory 属性）
 * @template Class - 类类型，默认为 unknown
 * @param provider - 要检查的提供者
 * @returns 是否为工厂提供者的类型谓词
 * @example
 * ```typescript
 * const provider = { provide: 'CONFIG', useFactory: () => ({ apiUrl: 'https://api.com' }) };
 * if (isFactoryProvider(provider)) {
 *   // provider 现在被推断为 FactoryProvider 类型
 *   console.log(provider.useFactory); // 类型安全
 * }
 * ```
 */
export function isFactoryProvider<Class = unknown>(provider: Provider<Class>): provider is FactoryProvider<Class> {
  return !!(provider as FactoryProvider<Class>).useFactory;
}

/**
 * 检查是否为值提供者
 * @description 判断提供者是否为值提供者类型（使用 useValue 属性）
 * @template Class - 类类型，默认为 unknown
 * @param provider - 要检查的提供者
 * @returns 是否为值提供者的类型谓词
 * @example
 * ```typescript
 * const provider = { provide: 'API_URL', useValue: 'https://api.example.com' };
 * if (isValueProvider(provider)) {
 *   // provider 现在被推断为 ValueProvider 类型
 *   console.log(provider.useValue); // 类型安全
 * }
 * ```
 */
export function isValueProvider<Class = unknown>(provider: Provider<Class>): provider is ValueProvider<Class> {
  return (provider as ValueProvider<Class>).useValue !== undefined;
}

/**
 * 检查是否为有效提供者
 * @description 判断对象是否为有效的提供者（类、工厂或值提供者中的任意一种）
 * @param provider - 要检查的对象
 * @returns 是否为有效提供者的类型谓词
 * @example
 * ```typescript
 * const provider = { provide: MyService, useClass: MyService };
 * if (isProvider(provider)) {
 *   // provider 现在被推断为 Provider 类型
 *   container.addProvider(provider); // 类型安全
 * }
 * ```
 */
export function isProvider(provider: any): provider is Provider {
  return isClassProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider);
}
