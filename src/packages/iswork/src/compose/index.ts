import type { ApplicationContext } from '../application/context';

/**
 * 参考koa-compose
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

export function compose(middleware: Function[]) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
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
