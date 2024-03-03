import type { TInjectionToken } from '../types';
import type { IAnyClass } from '../interfaces/index';

/** Provider基类 */
export interface BaseProvider<Type = unknown> {
  provide: TInjectionToken<Type>;
}

/**
 * class-provider
 */
export interface IClassProvider<Class = unknown> extends BaseProvider<Class> {
  useClass: IAnyClass<Class>;
}

/**
 * factory-provider
 */
export interface IFactoryProvider<Class = unknown> extends BaseProvider<Class> {
  useFactory: (...arg: unknown[]) => Class;
}

/**
 * value-provider
 **/
export interface IValueProvider<Class = unknown> extends BaseProvider<Class> {
  useValue: Class;
}
