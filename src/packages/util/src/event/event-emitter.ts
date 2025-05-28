/**
 * 事件处理函数类型定义
 * 支持同步和异步处理函数
 *
 * @template T - 事件载荷的类型，默认为 unknown
 * @param payload - 事件载荷数据
 * @returns 无返回值或 Promise<void>
 */
type EventHandler<T = unknown> = (payload: T) => void | Promise<void>;

/**
 * 事件对象接口定义
 * 描述了事件的基本结构
 *
 * @template T - 事件载荷的类型，默认为 unknown
 */
export interface Event<T = unknown> {
  /** 事件类型名称 */
  type: string;
  /** 事件处理函数 */
  handler: EventHandler<T>;
  /** 是否只触发一次，可选属性 */
  once?: boolean;
}

/**
 * 事件发射器类
 * 提供事件的注册、取消注册和触发功能
 * 支持一次性事件和异步事件处理
 *
 * @example
 * ```typescript
 * const emitter = new EventEmitter();
 *
 * // 注册事件监听器
 * emitter.on('test', (data) => {
 *   console.log('收到数据:', data);
 * });
 *
 * // 触发事件
 * emitter.emit('test', { message: 'Hello World' });
 * ```
 */
export class EventEmitter {
  /**
   * 存储所有注册的事件
   * 使用私有字段确保数据封装性
   */
  #events: Array<Event<any>> = [];

  /**
   * 获取所有已注册的事件列表
   *
   * @returns 事件数组的只读副本
   */
  get events(): Array<Event<any>> {
    return this.#events;
  }

  /**
   * 注册事件监听器
   * 每次触发指定类型的事件时都会执行处理函数
   *
   * @template T - 事件载荷的类型
   * @param type - 事件类型名称
   * @param handler - 事件处理函数
   * @example
   * ```typescript
   * emitter.on('userLogin', (user) => {
   *   console.log(`用户 ${user.name} 已登录`);
   * });
   * ```
   */
  on<T>(type: string, handler: EventHandler<T>): void {
    this.#events.push({ type, handler });
  }

  /**
   * 注册一次性事件监听器
   * 只在第一次触发指定类型的事件时执行，执行后自动移除
   *
   * @template T - 事件载荷的类型
   * @param type - 事件类型名称
   * @param handler - 事件处理函数
   * @example
   * ```typescript
   * emitter.once('appReady', () => {
   *   console.log('应用已准备就绪');
   * });
   * ```
   */
  once<T>(type: string, handler: EventHandler<T>): void {
    this.#events.push({ type, handler, once: true });
  }

  /**
   * 移除事件监听器
   * 可以移除指定类型的所有监听器，或移除特定的处理函数
   *
   * @template T - 事件载荷的类型
   * @param type - 事件类型名称
   * @param handler - 可选，指定要移除的处理函数。如果不提供，则移除该类型的所有监听器
   * @example
   * ```typescript
   * // 移除特定处理函数
   * emitter.off('userLogin', specificHandler);
   *
   * // 移除所有 userLogin 事件监听器
   * emitter.off('userLogin');
   * ```
   */
  off<T>(type: string, handler?: EventHandler<T>): void {
    this.#events = this.#events.filter((event) => {
      if (event.type !== type) return true;
      if (handler && event.handler !== handler) return true;
      return false;
    });
  }

  /**
   * 触发指定类型的事件
   * 按注册顺序依次执行所有匹配的事件处理函数
   * 支持异步处理函数，会等待每个处理函数完成后再执行下一个
   *
   * @template T - 事件载荷的类型
   * @param type - 事件类型名称
   * @param payload - 可选，传递给事件处理函数的数据
   * @returns Promise<void> - 当所有事件处理函数执行完成后解析
   * @example
   * ```typescript
   * // 触发事件并传递数据
   * await emitter.emit('dataUpdate', { id: 1, name: '新数据' });
   *
   * // 触发无载荷事件
   * await emitter.emit('refresh');
   * ```
   */
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
