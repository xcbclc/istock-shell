import { isFunction } from './is';

export const stringify = (v: unknown) =>
  JSON.stringify(v, (_k, v) => {
    if (isFunction(v)) return v.toString();
    return v;
  });

export const parse = (v: string) => JSON.parse(v);

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
