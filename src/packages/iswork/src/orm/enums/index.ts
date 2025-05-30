/**
 * @fileoverview ORM 枚举定义
 * @description 定义 ORM 模块使用的枚举类型
 */

/**
 * 驱动器连接状态枚举
 * @description 定义数据库驱动器的连接状态
 * @enum {number}
 * @example
 * ```typescript
 * if (driver.status === DriverConnectStatus.connected) {
 *   console.log('数据库已连接');
 * }
 * ```
 */
export enum DriverConnectStatus {
  /** 就绪状态 - 驱动器已初始化但未连接 */
  'ready',
  /** 连接中状态 - 正在建立数据库连接 */
  'connecting',
  /** 已连接状态 - 数据库连接已建立 */
  'connected',
  /** 已断开状态 - 数据库连接已断开 */
  'disconnected',
}
