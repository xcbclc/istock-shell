// 任意字面量对象
export type TAnyMetadata<T = unknown> = Record<string | symbol, T>;

// 任意字面量对象
export type TAnyObj<T = unknown> = Record<string | symbol, T>;

// 带id任意字面量对象
export type TIdAnyObject<T = unknown> = {
  id: string | number;
} & Record<string | symbol, T>;
