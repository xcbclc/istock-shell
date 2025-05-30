/**
 * @fileoverview 应用程序上下文类型定义
 * @description 定义应用程序上下文相关的类型
 */

/**
 * 应用程序上下文选项
 * @description 用于配置应用程序上下文的选项
 * @example
 * ```typescript
 * const options: ApplicationContextOptions = {
 *   name: 'MyApplication'
 * };
 * ```
 */
export type ApplicationContextOptions = {
  /** 应用程序名称 */
  name?: string;
};
