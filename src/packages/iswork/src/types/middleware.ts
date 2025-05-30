/**
 * @fileoverview 中间件类型定义
 * @description 定义了中间件函数的类型签名
 */

/**
 * 中间件函数类型
 * @description 定义中间件函数的标准签名，用于处理请求和响应的中间逻辑
 * @template T 上下文对象的类型，默认为 any
 * @param ctx 上下文对象，包含请求和响应相关信息
 * @param next 下一个中间件函数，调用它将执行下一个中间件
 * @returns 中间件处理结果
 * @example
 * ```typescript
 * // 定义一个日志中间件
 * const loggerMiddleware: Middleware<{ url: string }> = (ctx, next) => {
 *   console.log(`Request: ${ctx.url}`);
 *   const result = next();
 *   console.log('Response sent');
 *   return result;
 * };
 * ```
 */
export type Middleware<T = any> = (ctx: T, next: () => any) => any;
