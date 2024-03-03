export class ScopeError extends Error {
  readonly name: string;
  readonly scope: string;
  /**
   * 重写报错，附带更多错误信息
   * @param scope
   * @param message
   */
  constructor(scope: string, message?: string) {
    super(message);
    (Error as ErrorConstructor & { captureStackTrace: Function }).captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.scope = scope;
  }
}
