/**
 * @fileoverview 消息观察者模式实现
 * @description 提供基于观察者模式的消息处理机制，支持订阅、取消订阅和消息推送
 */

/**
 * 观察者基础接口
 * @description 定义观察者的基本方法，用于处理值推送、错误和完成事件
 * @template V - 观察值的类型，默认为 unknown
 * @example
 * ```typescript
 * const observer: ObserverBase<string> = {
 *   next: (value) => console.log('收到值:', value),
 *   error: (err) => console.error('发生错误:', err),
 *   complete: (value) => console.log('完成:', value)
 * };
 * ```
 */
export interface ObserverBase<V = unknown> {
  /**
   * 处理下一个值
   * @param value - 推送的值
   */
  next: (value: V) => void;

  /**
   * 处理错误
   * @param err - 发生的错误
   */
  error: (err: any) => void;

  /**
   * 处理完成事件
   * @param value - 可选的完成值
   */
  complete: (value?: V) => void;
}

/**
 * 订阅回调函数类型
 * @description 定义订阅时的回调函数签名
 * @template V - 观察值的类型，默认为 unknown
 * @param observer - 观察者实例
 * @returns UnSubscribe 取消订阅的对象
 */
export type SubscribeCallback<V = unknown> = (observer: ObserverBase<V>) => UnSubscribe;

/**
 * 取消订阅对象类型
 * @description 包含取消订阅方法的对象
 */
export type UnSubscribe = { unsubscribe: () => void };

/**
 * 可观察对象类
 * @description 实现观察者模式的核心类，支持订阅和消息推送机制
 * @template V - 观察值的类型，默认为 unknown
 * @example
 * ```typescript
 * // 创建可观察对象
 * const observable = new Observable<number>((observer) => {
 *   let count = 0;
 *   const interval = setInterval(() => {
 *     observer.next(++count);
 *     if (count >= 5) {
 *       observer.complete(count);
 *       clearInterval(interval);
 *     }
 *   }, 1000);
 *
 *   return {
 *     unsubscribe: () => clearInterval(interval)
 *   };
 * });
 *
 * // 订阅观察
 * const subscription = observable.subscribe({
 *   next: (value) => console.log('值:', value),
 *   error: (err) => console.error('错误:', err),
 *   complete: (value) => console.log('完成:', value)
 * });
 *
 * // 取消订阅
 * subscription.unsubscribe();
 * ```
 */
export class Observable<V = unknown> {
  /** 订阅回调函数 */
  readonly #subscribeCallback: SubscribeCallback<V>;

  /**
   * 可观察对象构造函数
   * @description 创建一个新的可观察对象实例
   * @param subscribeCallback - 订阅回调函数，定义订阅时的行为
   */
  constructor(subscribeCallback: SubscribeCallback<V>) {
    this.#subscribeCallback = subscribeCallback;
  }

  /**
   * 订阅观察者
   * @description 注册一个观察者，开始接收推送的值
   * @param observer - 观察者实例
   * @returns UnSubscribe 取消订阅的对象
   * @example
   * ```typescript
   * const subscription = observable.subscribe({
   *   next: (value) => console.log(value),
   *   error: (err) => console.error(err),
   *   complete: () => console.log('完成')
   * });
   * ```
   */
  subscribe(observer: ObserverBase<V>): UnSubscribe {
    return this.#subscribeCallback(observer);
  }

  /**
   * 创建可观察对象
   * @description 静态工厂方法，创建一个新的可观察对象实例
   * @template V - 观察值的类型
   * @param subscribeCallback - 订阅回调函数
   * @returns Observable<V> 新的可观察对象实例
   * @example
   * ```typescript
   * const observable = Observable.create<string>((observer) => {
   *   observer.next('Hello');
   *   observer.next('World');
   *   observer.complete();
   *
   *   return {
   *     unsubscribe: () => console.log('取消订阅')
   *   };
   * });
   * ```
   */
  static create<V>(subscribeCallback: SubscribeCallback<V>): Observable<V> {
    return new Observable<V>(subscribeCallback);
  }
}
