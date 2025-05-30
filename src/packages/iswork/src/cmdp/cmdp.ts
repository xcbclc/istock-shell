/**
 * @fileoverview CMDP 协议具体实现
 * @description 提供 CMDP (Command Protocol) 协议的完整实现，包括元数据和负载数据的管理
 */
import { ScopeError } from '@istock-shell/util';
import type { CmdpMeta, CmdpPayload, CmdpMessage, CmdpMetaValue, CmdpOptions, CmdpAddressInfo } from '../types';
import { AbstractCmdp } from './abstract-cmdp';

/**
 * CMDP 协议实现类
 * @description 继承自 AbstractCmdp，提供完整的 CMDP 协议功能实现，包括元数据管理、负载处理、消息构建等
 * @extends AbstractCmdp
 * @example
 * ```typescript
 * // 通过地址字符串创建实例
 * const cmdp1 = new Cmdp('cmdp://@admin.example.com:8080/UserController.getUser');
 *
 * // 通过消息对象创建实例
 * const cmdp2 = new Cmdp({
 *   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
 *   meta: { timestamp: Date.now() },
 *   payload: { userId: '123' }
 * });
 *
 * // 通过地址信息对象创建实例
 * const cmdp3 = new Cmdp({
 *   user: 'admin',
 *   domains: ['example', 'com'],
 *   port: '8080',
 *   controller: 'UserController',
 *   method: 'getUser'
 * });
 * ```
 */
export class Cmdp extends AbstractCmdp {
  /**
   * 请求元数据
   * @description 存储请求相关的元数据信息
   * @protected
   */
  protected meta: CmdpMeta | undefined;

  /**
   * 请求负载数据
   * @description 存储请求的负载数据
   * @protected
   */
  protected payload: CmdpPayload | undefined;

  /**
   * 响应元数据
   * @description 存储响应相关的元数据信息
   * @protected
   */
  protected returnMeta: CmdpMeta | undefined;

  /**
   * 响应负载数据
   * @description 存储响应的负载数据
   * @protected
   */
  protected returnPayload: CmdpPayload | undefined;

  /**
   * 创建 CMDP 实例的静态工厂方法
   * @description 提供创建 CMDP 实例的便捷方法
   * @param addOrInfo CMDP 消息对象或地址信息对象
   * @param options 可选的协议配置
   * @returns CMDP 实例
   * @static
   * @example
   * ```typescript
   * // 使用静态方法创建实例
   * const cmdp = Cmdp.create({
   *   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
   *   meta: { source: 'client' },
   *   payload: { userId: '123' }
   * });
   * ```
   */
  static create(addOrInfo: CmdpMessage | CmdpAddressInfo, options?: CmdpOptions): Cmdp {
    return new Cmdp(addOrInfo, options);
  }

  /**
   * 构造函数
   * @description 创建 CMDP 协议实例，支持通过消息对象或地址信息对象初始化
   * @param msgOrInfo CMDP 消息对象或地址信息对象
   * @param options 可选的协议配置
   * @example
   * ```typescript
   * // 通过消息对象初始化
   * const cmdp1 = new Cmdp({
   *   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
   *   meta: { timestamp: Date.now() },
   *   payload: { userId: '123' }
   * });
   *
   * // 通过地址信息对象初始化
   * const cmdp2 = new Cmdp({
   *   user: 'admin',
   *   domains: ['example', 'com'],
   *   port: '8080',
   *   controller: 'UserController',
   *   method: 'getUser'
   * });
   * ```
   */
  constructor(msgOrInfo: CmdpMessage | CmdpAddressInfo, options?: CmdpOptions) {
    if ((msgOrInfo as CmdpMessage).address) {
      const message = msgOrInfo as CmdpMessage;
      super(message.address, options);
      if (message.meta !== undefined) this.meta = message.meta;
      if (message.payload !== undefined) this.payload = message.payload;
      if (message.meta?.messageId) {
        this.setReturnMeta('messageId', message.meta.messageId);
      }
    } else {
      super(msgOrInfo as CmdpAddressInfo, options);
    }
  }

  /**
   * 设置请求元数据
   * @description 设置单个元数据键值对
   * @param key 元数据键名
   * @param value 元数据值
   * @public
   */
  public setMeta(key: string, value: CmdpMetaValue): void;
  /**
   * 设置请求元数据
   * @description 设置完整的元数据对象
   * @param value 元数据对象
   * @public
   */
  public setMeta(value: CmdpMeta): void;
  /**
   * 设置请求元数据的实现
   * @description 支持设置单个键值对或完整的元数据对象
   * @param keyOrValue 元数据键名或完整元数据对象
   * @param value 元数据值（当第一个参数为键名时使用）
   * @example
   * ```typescript
   * // 设置单个元数据
   * cmdp.setMeta('timestamp', Date.now());
   * cmdp.setMeta('userId', '123');
   *
   * // 设置完整元数据对象
   * cmdp.setMeta({
   *   timestamp: Date.now(),
   *   userId: '123',
   *   source: 'client'
   * });
   * ```
   */
  public setMeta(keyOrValue: string | CmdpMeta, value?: CmdpMetaValue) {
    if (!this.meta) this.meta = {};
    if (typeof keyOrValue === 'string') {
      this.meta[keyOrValue] = value;
    } else {
      this.meta = keyOrValue;
    }
  }

  /**
   * 获取完整的请求元数据
   * @description 获取完整的元数据对象
   * @template Return 返回值类型
   * @returns 完整的元数据对象
   * @public
   */
  public getMeta<Return extends typeof this.meta>(): Return;
  /**
   * 获取指定键的请求元数据
   * @description 获取指定键名的元数据值
   * @template Return 返回值类型
   * @param key 元数据键名
   * @returns 指定键的元数据值
   * @public
   */
  public getMeta<Return extends CmdpMetaValue>(key: keyof CmdpMeta): Return;
  /**
   * 获取请求元数据的实现
   * @description 支持获取完整元数据对象或指定键的值
   * @template Return 返回值类型
   * @param key 可选的元数据键名
   * @returns 元数据对象或指定键的值
   * @example
   * ```typescript
   * // 获取完整元数据
   * const allMeta = cmdp.getMeta();
   *
   * // 获取指定键的元数据
   * const timestamp = cmdp.getMeta('timestamp');
   * const userId = cmdp.getMeta<string>('userId');
   * ```
   */
  public getMeta<Return extends typeof this.meta | CmdpMetaValue>(key?: keyof CmdpMeta): Return {
    const meta = this.meta;
    if (key && meta && typeof meta === 'object') return meta[key] as Return;
    return meta as Return;
  }

  /**
   * 设置请求负载数据
   * @description 设置单个负载数据键值对
   * @param key 负载数据键名
   * @param value 负载数据值
   * @public
   */
  public setPayload(key: string, value: unknown): void;
  /**
   * 设置请求负载数据
   * @description 设置完整的负载数据对象
   * @param payload 负载数据对象
   * @public
   */
  public setPayload(payload: CmdpPayload): void;
  /**
   * 设置请求负载数据的实现
   * @description 支持设置单个键值对或完整的负载数据对象
   * @param keyOrPayload 负载数据键名或完整负载数据对象
   * @param value 负载数据值（当第一个参数为键名时使用）
   * @example
   * ```typescript
   * // 设置单个负载数据
   * cmdp.setPayload('userId', '123');
   * cmdp.setPayload('action', 'login');
   *
   * // 设置完整负载数据对象
   * cmdp.setPayload({
   *   userId: '123',
   *   action: 'login',
   *   timestamp: Date.now()
   * });
   * ```
   */
  public setPayload(keyOrPayload: string | CmdpPayload, value?: unknown) {
    if (!this.payload) this.payload = {};
    if (typeof keyOrPayload === 'string' && typeof this.payload === 'object') {
      this.payload[keyOrPayload] = value;
    } else {
      this.payload = keyOrPayload;
    }
  }

  /**
   * 获取完整的请求负载数据
   * @description 获取完整的负载数据对象
   * @template Return 返回值类型
   * @returns 完整的负载数据对象
   * @public
   */
  public getPayload<Return extends typeof this.payload>(): Return;
  /**
   * 获取指定键的请求负载数据
   * @description 获取指定键名的负载数据值
   * @template Return 返回值类型
   * @param key 负载数据键名
   * @returns 指定键的负载数据值
   * @public
   */
  public getPayload<Return = unknown>(key: string): Return;
  /**
   * 获取请求负载数据的实现
   * @description 支持获取完整负载数据对象或指定键的值
   * @template Return 返回值类型
   * @param key 可选的负载数据键名
   * @returns 负载数据对象或指定键的值
   * @example
   * ```typescript
   * // 获取完整负载数据
   * const allPayload = cmdp.getPayload();
   *
   * // 获取指定键的负载数据
   * const userId = cmdp.getPayload<string>('userId');
   * const action = cmdp.getPayload('action');
   * ```
   */
  public getPayload<Return extends typeof this.payload>(key?: string): Return {
    const payload = this.payload;
    if (key && payload && typeof payload === 'object') {
      return payload[key] as Return;
    }
    return payload as Return;
  }

  /**
   * 设置响应元数据
   * @description 设置单个响应元数据键值对
   * @param key 元数据键名
   * @param value 元数据值
   * @public
   */
  public setReturnMeta(key: string, value: CmdpMetaValue): void;
  /**
   * 设置响应元数据
   * @description 设置完整的响应元数据对象
   * @param value 元数据对象
   * @public
   */
  public setReturnMeta(value: CmdpMeta): void;
  /**
   * 设置响应元数据的实现
   * @description 支持设置单个键值对或完整的响应元数据对象
   * @param keyOrValue 元数据键名或完整元数据对象
   * @param value 元数据值（当第一个参数为键名时使用）
   * @example
   * ```typescript
   * // 设置单个响应元数据
   * cmdp.setReturnMeta('status', 'success');
   * cmdp.setReturnMeta('timestamp', Date.now());
   *
   * // 设置完整响应元数据对象
   * cmdp.setReturnMeta({
   *   status: 'success',
   *   timestamp: Date.now(),
   *   messageId: 'msg-123'
   * });
   * ```
   */
  public setReturnMeta(keyOrValue: string | CmdpMeta, value?: CmdpMetaValue) {
    if (!this.returnMeta) this.returnMeta = {};
    if (typeof keyOrValue === 'string') {
      this.returnMeta[keyOrValue] = value;
    } else {
      this.returnMeta = keyOrValue;
    }
  }

  /**
   * 获取完整的响应元数据
   * @description 获取完整的响应元数据对象
   * @template Return 返回值类型
   * @returns 完整的响应元数据对象
   * @public
   */
  public getReturnMeta<Return extends typeof this.returnMeta>(): Return;
  /**
   * 获取指定键的响应元数据
   * @description 获取指定键名的响应元数据值
   * @template Return 返回值类型
   * @param key 元数据键名
   * @returns 指定键的响应元数据值
   * @public
   */
  public getReturnMeta<Return extends CmdpMetaValue>(key: keyof CmdpMeta): Return;
  /**
   * 获取响应元数据的实现
   * @description 支持获取完整响应元数据对象或指定键的值
   * @template Return 返回值类型
   * @param key 可选的元数据键名
   * @returns 响应元数据对象或指定键的值
   * @example
   * ```typescript
   * // 获取完整响应元数据
   * const allReturnMeta = cmdp.getReturnMeta();
   *
   * // 获取指定键的响应元数据
   * const status = cmdp.getReturnMeta<string>('status');
   * const timestamp = cmdp.getReturnMeta('timestamp');
   * ```
   */
  public getReturnMeta<Return extends typeof this.returnMeta | CmdpMetaValue>(key?: keyof CmdpMeta): Return {
    const meta = this.returnMeta;
    if (key && meta && typeof meta === 'object') return meta[key] as Return;
    return meta as Return;
  }

  /**
   * 设置响应负载数据
   * @description 设置单个响应负载数据键值对
   * @param key 负载数据键名
   * @param value 负载数据值
   * @public
   */
  public setReturnPayload(key: string, value: unknown): void;
  /**
   * 设置响应负载数据
   * @description 设置完整的响应负载数据对象
   * @param payload 负载数据对象
   * @public
   */
  public setReturnPayload(payload: CmdpPayload): void;
  /**
   * 设置响应负载数据的实现
   * @description 支持设置单个键值对或完整的响应负载数据对象
   * @param keyOrPayload 负载数据键名或完整负载数据对象
   * @param value 负载数据值（当第一个参数为键名时使用）
   * @example
   * ```typescript
   * // 设置单个响应负载数据
   * cmdp.setReturnPayload('result', { success: true });
   * cmdp.setReturnPayload('data', userData);
   *
   * // 设置完整响应负载数据对象
   * cmdp.setReturnPayload({
   *   result: { success: true },
   *   data: userData,
   *   timestamp: Date.now()
   * });
   * ```
   */
  public setReturnPayload(keyOrPayload: string | CmdpPayload, value?: unknown) {
    if (!this.returnPayload) this.returnPayload = {};
    if (typeof keyOrPayload === 'string' && typeof this.returnPayload === 'object' && value !== undefined) {
      this.returnPayload[keyOrPayload] = value;
    } else {
      this.returnPayload = keyOrPayload;
    }
  }

  /**
   * 获取完整的响应负载数据
   * @description 获取完整的响应负载数据对象
   * @template Return 返回值类型
   * @returns 完整的响应负载数据对象
   * @public
   */
  public getReturnPayload<Return extends typeof this.returnPayload>(): Return;
  /**
   * 获取指定键的响应负载数据
   * @description 获取指定键名的响应负载数据值
   * @template Return 返回值类型
   * @param key 负载数据键名
   * @returns 指定键的响应负载数据值
   * @public
   */
  public getReturnPayload<Return = unknown>(key: string): Return;
  /**
   * 获取响应负载数据的实现
   * @description 支持获取完整响应负载数据对象或指定键的值
   * @template Return 返回值类型
   * @param key 可选的负载数据键名
   * @returns 响应负载数据对象或指定键的值
   * @example
   * ```typescript
   * // 获取完整响应负载数据
   * const allReturnPayload = cmdp.getReturnPayload();
   *
   * // 获取指定键的响应负载数据
   * const result = cmdp.getReturnPayload<any>('result');
   * const data = cmdp.getReturnPayload('data');
   * ```
   */
  public getReturnPayload<Return extends typeof this.returnPayload>(key?: string): Return {
    const payload = this.returnPayload;
    if (key && payload && typeof payload === 'object') {
      return payload[key] as Return;
    }
    return payload as Return;
  }

  /**
   * 查找子域
   * @description 从域名列表中查找子域，排除指定的根域名
   * @param rootDomain 根域名，默认为空字符串
   * @returns 找到的子域名
   * @throws {ScopeError} 当未找到子域时抛出错误
   * @public
   * @example
   * ```typescript
   * // 假设域名为 ['api', 'example', 'com']
   * const subDomain1 = cmdp.searchSubDomain('com'); // 返回 'example'
   * const subDomain2 = cmdp.searchSubDomain(); // 返回 'com'
   * ```
   */
  public searchSubDomain(rootDomain: string = '') {
    const subDomains = this.domains.filter((domain) => domain !== rootDomain);
    if (subDomains.length === 0) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '未找到子域');
    }
    return subDomains[subDomains.length - 1];
  }

  /**
   * 获取消息数据
   * @description 获取当前的消息数据，包含地址、响应元数据和响应负载
   * @returns CMDP 消息对象
   * @public
   */
  public getMessage(): CmdpMessage;
  /**
   * 获取消息数据
   * @description 设置响应负载并获取消息数据
   * @param payload 响应负载数据
   * @returns CMDP 消息对象
   * @public
   */
  public getMessage(payload: typeof this.payload): CmdpMessage;
  /**
   * 获取消息数据的实现
   * @description 获取包含地址、响应元数据和响应负载的完整消息对象
   * @param payload 可选的响应负载数据
   * @returns CMDP 消息对象
   * @example
   * ```typescript
   * // 获取当前消息
   * const message1 = cmdp.getMessage();
   *
   * // 设置负载并获取消息
   * const message2 = cmdp.getMessage({ result: 'success', data: userData });
   *
   * // 消息结构:
   * // {
   * //   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
   * //   meta: { status: 'success', timestamp: 1234567890 },
   * //   payload: { result: 'success', data: userData }
   * // }
   * ```
   */
  public getMessage(payload?: typeof this.payload): CmdpMessage {
    if (payload) this.setReturnPayload(payload);
    return {
      address: this.address,
      meta: this.returnMeta,
      payload: this.returnPayload,
    };
  }

  /**
   * 获取返回消息数据
   * @description 获取当前的返回消息数据，包含地址、响应元数据和响应负载
   * @returns CMDP 消息对象
   * @public
   */
  public getReturnMessage(): CmdpMessage;
  /**
   * 获取返回消息数据
   * @description 设置响应负载并获取返回消息数据
   * @param payload 响应负载数据
   * @returns CMDP 消息对象
   * @public
   */
  public getReturnMessage(payload: typeof this.returnPayload): CmdpMessage;
  /**
   * 获取返回消息数据的实现
   * @description 获取包含地址、响应元数据和响应负载的完整返回消息对象
   * @param payload 可选的响应负载数据
   * @returns CMDP 消息对象
   * @example
   * ```typescript
   * // 获取当前返回消息
   * const returnMessage1 = cmdp.getReturnMessage();
   *
   * // 设置负载并获取返回消息
   * const returnMessage2 = cmdp.getReturnMessage({
   *   success: true,
   *   data: processedData
   * });
   *
   * // 返回消息结构:
   * // {
   * //   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
   * //   meta: { status: 'completed', messageId: 'msg-123' },
   * //   payload: { success: true, data: processedData }
   * // }
   * ```
   */
  public getReturnMessage(payload?: typeof this.returnPayload): CmdpMessage {
    if (payload) this.setReturnPayload(payload);
    return {
      address: this.address,
      meta: this.returnMeta,
      payload: this.returnPayload,
    };
  }
}
