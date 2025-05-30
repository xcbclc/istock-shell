/**
 * @fileoverview 应用程序上下文
 * @description 提供应用程序执行期间的上下文信息和状态管理
 */

import { Cmdp } from '../cmdp';
import type { ApplicationContextOptions, CmdpMessage } from '../types';
import type { Application } from './application';

/**
 * 应用程序上下文类
 * @description 封装应用程序执行期间的上下文信息，包括应用实例、消息数据和命令处理器
 * @example
 * ```typescript
 * // 通常在中间件中使用
 * app.useMiddleware(async (ctx: ApplicationContext, next) => {
 *   console.log('处理消息:', ctx.message);
 *   console.log('命令路径:', ctx.cmdp.path);
 *   await next();
 * });
 * ```
 */
export class ApplicationContext {
  /** 应用程序实例 */
  readonly #app: Application;
  /** 上下文配置选项 */
  readonly #options: ApplicationContextOptions;
  /** 命令处理器实例 */
  cmdp: Cmdp;
  /** 原始消息数据 */
  message: CmdpMessage;

  /**
   * 获取上下文配置选项
   * @returns 上下文配置选项
   */
  get options() {
    return this.#options;
  }

  /**
   * 获取应用程序实例
   * @returns 应用程序实例
   */
  get app() {
    return this.#app;
  }

  /**
   * 应用程序上下文构造函数
   * @description 初始化应用程序上下文，设置应用实例、消息数据和命令处理器
   * @param app - 应用程序实例
   * @param message - 命令消息数据
   * @param options - 上下文配置选项，可选
   * @example
   * ```typescript
   * const ctx = new ApplicationContext(app, {
   *   path: 'user.create',
   *   payload: { name: 'John', email: 'john@example.com' }
   * });
   * ```
   */
  constructor(app: Application, message: CmdpMessage, options: ApplicationContextOptions = {}) {
    this.#app = app;
    this.#options = options;
    this.cmdp = new Cmdp(message);
    this.message = message;
    if (message.meta) this.cmdp.setMeta(message.meta);
    if (message.payload) this.cmdp.setPayload(message.payload);
  }

  /**
   * 创建应用程序上下文实例
   * @description 静态工厂方法，用于创建应用程序上下文实例
   * @param app - 应用程序实例
   * @param message - 命令消息数据
   * @param options - 上下文配置选项，可选
   * @returns 新的应用程序上下文实例
   * @example
   * ```typescript
   * const ctx = ApplicationContext.create(app, {
   *   path: 'user.list',
   *   payload: { page: 1, limit: 10 }
   * });
   * ```
   */
  static create(app: Application, message: CmdpMessage, options: ApplicationContextOptions = {}) {
    return new this(app, message, options);
  }
}
