/**
 * 函数管道工具
 * 提供函数组合和链式调用的能力，支持函数式编程风格的数据处理
 */

/**
 * 管道函数：组合多个函数，从左到右执行
 * @param fns 要组合的函数数组
 * @returns 组合后的函数
 * @example
 * ```typescript
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const process = pipe(add, multiply);
 * process(5); // (5 + 1) * 2 = 12
 * ```
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T;
export function pipe<T1, T2>(fn1: (arg: T1) => T2): (arg: T1) => T2;
export function pipe<T1, T2, T3>(fn1: (arg: T1) => T2, fn2: (arg: T2) => T3): (arg: T1) => T3;
export function pipe<T1, T2, T3, T4>(fn1: (arg: T1) => T2, fn2: (arg: T2) => T3, fn3: (arg: T3) => T4): (arg: T1) => T4;
export function pipe<T1, T2, T3, T4, T5>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => T4,
  fn4: (arg: T4) => T5
): (arg: T1) => T5;
export function pipe<T1, T2, T3, T4, T5, T6>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => T4,
  fn4: (arg: T4) => T5,
  fn5: (arg: T5) => T6
): (arg: T1) => T6;
export function pipe(...fns: Function[]): Function {
  return (input: any) => fns.reduce((acc, fn) => fn(acc), input);
}

/**
 * 流式处理类：提供链式调用的数据处理管道
 * @example
 * ```typescript
 * const result = flow([1, 2, 3, 4, 5])
 *   .pipe(filter((x: number) => x > 2))
 *   .pipe(map((x: number) => x * 2))
 *   .pipe(sum)
 *   .value(); // 24
 * ```
 */
export class Flow<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * 应用一个函数到当前值
   * @param fn 处理函数
   * @returns 新的Flow实例
   */
  pipe<R>(fn: (arg: T) => R): Flow<R> {
    return new Flow(fn(this._value));
  }

  /**
   * 获取处理后的值
   * @returns 当前值
   */
  value(): T {
    return this._value;
  }

  /**
   * 获取处理后的值（value的别名）
   * @returns 当前值
   */
  get(): T {
    return this._value;
  }
}

/**
 * 创建流式处理实例
 * @param value 初始值
 * @returns Flow实例
 */
export function flow<T>(value: T): Flow<T> {
  return new Flow(value);
}
