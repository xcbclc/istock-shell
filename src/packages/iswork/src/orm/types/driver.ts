/**
 * @fileoverview 驱动器类型定义
 * @description 定义 ORM 驱动器相关的类型，包括 Fetch 和 SSE 相关配置
 */

/**
 * Fetch SSE 消息类型
 * @description 定义 Server-Sent Events (SSE) 消息的结构
 * @example
 * ```typescript
 * const sseMessage: FetchSSEMessage = {
 *   id: 1,
 *   data: '{"message": "Hello World"}',
 *   event: 'update',
 *   retry: 3000
 * };
 * ```
 */
export type FetchSSEMessage = {
  /** 消息唯一标识符 */
  id: number;
  /** 消息数据内容 */
  data: string;
  /** 事件类型（可选） */
  event?: string;
  /** 重试间隔时间（毫秒，可选） */
  retry?: number;
};

/**
 * Fetch 包装选项类型
 * @description 定义 Fetch API 的包装配置选项
 * @example
 * ```typescript
 * const fetchOptions: FetchWrapOptions = {
 *   requestOptions: {
 *     headers: { 'Content-Type': 'application/json' },
 *     method: 'POST'
 *   },
 *   prefixUrl: 'https://api.example.com'
 * };
 * ```
 */
export type FetchWrapOptions = {
  /** 请求配置选项 */
  requestOptions?: RequestInit;
  /** URL 前缀 */
  prefixUrl?: string;
};
