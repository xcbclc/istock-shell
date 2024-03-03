// 定义事件处理函数类型
type EventHandler<T = unknown> = (payload: T) => void | Promise<void>;

// 定义事件接口
interface Event<T = unknown> {
  type: string;
  handler: EventHandler<T>;
  once?: boolean;
}

export class EventEmitter {
  // 存储所有事件
  #events: Array<Event<any>> = [];

  get events(): Array<Event<any>> {
    return this.#events;
  }

  // 注册事件处理函数，每次事件都会触发
  on<T>(type: string, handler: EventHandler<T>): void {
    this.#events.push({ type, handler });
  }

  // 注册事件处理函数，只会触发一次
  once<T>(type: string, handler: EventHandler<T>): void {
    this.#events.push({ type, handler, once: true });
  }

  // 取消注册事件处理函数
  off<T>(type: string, handler?: EventHandler<T>): void {
    this.#events = this.#events.filter((event) => {
      if (event.type !== type) return true;
      if (handler && event.handler !== handler) return true;
      return false;
    });
  }

  // 触发事件，支持异步处理函数
  async emit<T>(type: string, payload?: T): Promise<void> {
    const events = this.#events.filter((event) => event.type === type);
    for (const event of events) {
      const { handler, once } = event;
      await Promise.resolve(handler(payload)); // 用 Promise.resolve 确保异步处理函数能够正常执行
      if (once) {
        this.off(type, handler); // 如果只能触发一次，则在触发后取消注册
      }
    }
  }
}
