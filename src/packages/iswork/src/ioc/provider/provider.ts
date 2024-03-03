import type { TProvider } from '../../types';
import type { IClassProvider, IFactoryProvider, IValueProvider } from '../../interfaces';

export function isClassProvider<Class = unknown>(provider: TProvider<Class>): provider is IClassProvider<Class> {
  return !!(provider as IClassProvider<Class>).useClass;
}

export function isFactoryProvider<Class = unknown>(provider: TProvider<Class>): provider is IFactoryProvider<Class> {
  return !!(provider as IFactoryProvider<Class>).useFactory;
}

export function isValueProvider<Class = unknown>(provider: TProvider<Class>): provider is IValueProvider<Class> {
  return (provider as IValueProvider<Class>).useValue !== undefined;
}

export function isProvider(provider: any): provider is TProvider {
  return isClassProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider);
}
