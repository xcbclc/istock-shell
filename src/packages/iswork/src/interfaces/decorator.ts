export interface Decorator {
  // 装饰器
  handler: (...args: unknown[]) => unknown;
  // 获取装饰器元数据
  getMetadata: (...args: unknown[]) => unknown;
  // 执行时的回调函数
  callback?: (...args: unknown[]) => unknown;
}
