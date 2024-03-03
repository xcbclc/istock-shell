import type { IAnyClass } from '../interfaces';

/** 令牌类型 */
export type TInjectionToken<Type = unknown> = IAnyClass<Type> | string | symbol;
