import type { IAnyClass, IClassProvider, IFactoryProvider, IValueProvider } from '../interfaces';

export type TProviderClass<Class = unknown> = IAnyClass<Class>;

export type TProvider<Class = unknown> = IClassProvider<Class> | IValueProvider<Class> | IFactoryProvider<Class>;

export type TProviderMeta<Class = unknown> = TProvider<Class> | TProviderClass<Class>;
