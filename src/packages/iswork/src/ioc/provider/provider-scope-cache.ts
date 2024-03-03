import type { TInjectionToken } from '../../types';
import type { IDomainClass } from '../../interfaces';

/**
 * 存放domain类
 */
export class ProviderScopeCache extends Map<TInjectionToken, IDomainClass[]> {}
