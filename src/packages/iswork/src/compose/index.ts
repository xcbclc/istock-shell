/**
 * @fileoverview 中间件组合函数
 * @description 提供类似 Koa 的中间件组合功能，将多个中间件函数组合成一个执行链
 */

import type { ApplicationContext } from '../application/context';

/**
 * 组合中间件函数
 * @description 参考 koa-compose 实现，将多个中间件函数组合成一个完整的中间件执行链
 * @param middleware - 中间件函数数组
 * @returns 组合后的中间件执行函数
 * @throws {TypeError} 当中间件不是数组或包含非函数元素时抛出错误
 * @example
 * ```typescript
 * const middleware1 = async (ctx, next) => {
 *   console.log('middleware1 start');
 *   await next();
 *   console.log('middleware1 end');
 * };
 *
 * const middleware2 = async (ctx, next) => {
 *   console.log('middleware2 start');
 *   await next();
 *   console.log('middleware2 end');
 * };
 *
 * const composedMiddleware = compose([middleware1, middleware2]);
 * await composedMiddleware(context);
 * ```
 */
export function compose(middleware: Function[]) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  /**
   * 中间件执行函数
   * @description 执行组合后的中间件链，按顺序调用每个中间件
   * @param context - 应用程序上下文
   * @param next - 可选的下一个中间件函数
   * @returns 执行结果的 Promise
   * @throws {Error} 当 next() 被多次调用时抛出错误
   */
  return async function (context: ApplicationContext, next?: Function): Promise<unknown> {
    // last called middleware #
    let index = -1;
    return await dispatch(0);
    async function dispatch(i: number): Promise<unknown> {
      if (i <= index) return await Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn: Function | undefined = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) {
        await Promise.resolve();
        return;
      }
      try {
        return await Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return await Promise.reject(err);
      }
    }
  };
}
