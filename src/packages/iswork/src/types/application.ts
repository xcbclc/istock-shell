/**
 * @fileoverview 应用程序类型定义
 * @description 定义应用程序相关的配置选项和事件处理类型
 */

import type { Middleware } from './middleware';

/**
 * 应用程序事件选项类型
 * @description 定义应用程序事件处理的配置选项
 * @example
 * ```typescript
 * const eventOptions: ApplicationEventOptions = {
 *   emit: (message, options) => {
 *     console.log('Emitting message:', message);
 *   }
 * };
 * ```
 */
export type ApplicationEventOptions = {
  /** 事件发射函数，用于发送消息 */
  emit: (message: unknown, options?: { targetOrigin?: string; transfer?: Transferable[] }) => void;
};

/**
 * 应用程序选项类型
 * @description 定义应用程序的完整配置选项，包括中间件、域路径和事件选项
 * @example
 * ```typescript
 * const appOptions: ApplicationOptions = {
 *   middlewares: [authMiddleware, loggerMiddleware],
 *   domainPath: '/api/v1',
 *   emit: (message) => console.log(message)
 * };
 * ```
 */
export type ApplicationOptions = {
  /** 中间件数组 */
  middlewares: Middleware[];
  /** 域路径 */
  domainPath: string;
} & ApplicationEventOptions;
