import type { TInjectionToken, TProvider } from '../../types';

/**
 * 存放提供者，能注入的类
 */
export class ProviderCache extends Map<TInjectionToken, TProvider> {}
