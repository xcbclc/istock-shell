export type TMiddleware<T = any> = (ctx: T, next: () => any) => any;
