/**
 * 带有作用域信息的自定义错误类型。
 * 继承自标准 Error 类，可用于区分不同模块或功能域的错误。
 *
 * @example
 * throw new ScopeError('network', '请求失败');
 */
export class ScopeError extends Error {
  readonly name: string;
  readonly scope: string;
  /**
   * 创建带有作用域信息的错误实例。
   * 
   * @param scope - 错误所属的作用域或模块名称
   * @param message - 可选的错误消息
   */
  constructor(scope: string, message?: string) {
    super(message);
    (Error as ErrorConstructor & { captureStackTrace: Function }).captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.scope = scope;
  }
}
