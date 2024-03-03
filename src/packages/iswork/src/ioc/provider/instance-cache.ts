import type { TInjectionToken } from '../../types';
import type { IAnyClass } from '../../interfaces';

/**
 * 存放类的实例
 */
export class InstanceCache extends Map<TInjectionToken, IAnyClass> {}
