// 抽象的消息通讯接口
export abstract class AbstractMessage<T = unknown> {
  abstract readonly instance: T; // 消息通讯方法实例
  abstract open(): Promise<void>; // 打开连接或初始化通信
  abstract close(): Promise<void>; // 关闭连接或结束通信
  abstract send(message: any): Promise<void>; // 发送消息
  abstract onMessage(callback: (message: any) => Promise<void>): void; // 监听消息
  abstract onError(callback: (error: Error) => Promise<void>): void; // 监听错误
}
