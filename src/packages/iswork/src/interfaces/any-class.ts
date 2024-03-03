export interface IAnyClass<T = unknown> extends Function {
  new (...args: any[]): T;
  [k: string | symbol]: any;
}
