/**
 * @fileoverview CMDP 协议抽象基类
 * @description 定义 CMDP (Command Protocol) 协议的核心抽象接口和基础实现
 */

import { ScopeError } from '@istock-shell/util';
import type { CmdpAddressInfo, CmdpInfo, CmdpMeta, CmdpOptions, CmdpPayload } from '../types';

/**
 * CMDP 协议抽象基类
 * @description 定义 CMDP 协议的核心抽象接口，提供地址解析、信息管理和数据处理的基础功能
 * @abstract
 * @example
 * ```typescript
 * class MyCmdp extends AbstractCmdp {
 *   protected meta: CmdpMeta | undefined;
 *   protected returnMeta: CmdpMeta | undefined;
 *   protected payload: CmdpPayload | undefined;
 *   protected returnPayload: CmdpPayload | undefined;
 *
 *   setMeta(value: CmdpMeta): void {
 *     this.meta = value;
 *   }
 *
 *   getMeta<Return = typeof this.meta>(): Return {
 *     return this.meta as Return;
 *   }
 *
 *   // 实现其他抽象方法...
 * }
 * ```
 */
export abstract class AbstractCmdp {
  /** CMDP 协议标识符，默认为 'cmdp://' */
  protected protocol: string = 'cmdp://';

  /** 用户名 */
  protected user!: string;

  /** 域名数组，支持多级域名 */
  protected domains!: string[];

  /** 端口号 */
  protected port!: string;

  /** 控制器名称 */
  protected controller!: string;

  /** 方法名称 */
  protected method!: string;

  /** 完整的 CMDP 地址 */
  protected address!: string;

  /** 请求元数据，由子类实现 */
  protected abstract meta: CmdpMeta | undefined;

  /** 响应元数据，由子类实现 */
  protected abstract returnMeta: CmdpMeta | undefined;

  /** 请求载荷数据，由子类实现 */
  protected abstract payload: CmdpPayload | undefined;

  /** 响应载荷数据，由子类实现 */
  protected abstract returnPayload: CmdpPayload | undefined;

  /**
   * 根据地址信息构建完整的 CMDP 地址
   * @description 将 CmdpAddressInfo 对象转换为标准的 CMDP 地址字符串
   * @param info CMDP 地址信息对象
   * @returns 格式化的 CMDP 地址字符串
   * @static
   * @example
   * ```typescript
   * const info: CmdpAddressInfo = {
   *   protocol: 'cmdp://',
   *   user: 'admin',
   *   domains: ['example', 'com'],
   *   port: '8080',
   *   controller: 'UserController',
   *   method: 'getUser'
   * };
   * const address = AbstractCmdp.getAddressByInfo(info);
   * // 返回: 'cmdp://@admin.example.com:8080/UserController.getUser'
   * ```
   */
  static getAddressByInfo(info: CmdpAddressInfo) {
    const { protocol, user, domains, port, controller, method } = info;
    return `${protocol}@${user}.${domains.join('.')}:${port}/${controller}.${method}`;
  }

  /**
   * 构造函数
   * @description 创建 AbstractCmdp 实例，支持通过地址字符串或地址信息对象初始化
   * @param addOrInfo CMDP 地址字符串或地址信息对象
   * @param options 可选的配置选项
   * @example
   * ```typescript
   * // 使用地址字符串初始化
   * const cmdp1 = new MyCmdp('cmdp://@admin.example.com:8080/UserController.getUser');
   *
   * // 使用地址信息对象初始化
   * const info: CmdpAddressInfo = {
   *   protocol: 'cmdp://',
   *   user: 'admin',
   *   domains: ['example', 'com'],
   *   port: '8080',
   *   controller: 'UserController',
   *   method: 'getUser'
   * };
   * const cmdp2 = new MyCmdp(info, { protocol: 'custom://' });
   * ```
   */
  constructor(addOrInfo: CmdpAddressInfo | string, options?: CmdpOptions) {
    if (options?.protocol) this.protocol = options.protocol;
    if (typeof addOrInfo === 'string') {
      this.initByAddress(addOrInfo);
    } else {
      this.setAddressInfo(addOrInfo);
    }
  }

  /**
   * 获取完整的 CMDP 信息
   * @description 返回包含所有 CMDP 相关信息的对象，包括地址信息、元数据和载荷数据
   * @returns 完整的 CMDP 信息对象
   * @public
   * @example
   * ```typescript
   * const cmdp = new MyCmdp('cmdp://@admin.example.com:8080/UserController.getUser');
   * const info = cmdp.getInfo();
   * console.log(info.protocol); // 'cmdp://'
   * console.log(info.user); // 'admin'
   * console.log(info.domains); // ['example', 'com']
   * console.log(info.controller); // 'UserController'
   * console.log(info.method); // 'getUser'
   * ```
   */
  public getInfo(): CmdpInfo {
    const keys: Array<keyof CmdpInfo> = [
      'protocol',
      'user',
      'domains',
      'port',
      'controller',
      'method',
      'address',
      'meta',
      'returnMeta',
      'payload',
      'returnPayload',
    ];
    return keys.reduce<any>((info, key) => {
      info[key] = this[key];
      return info;
    }, {}) as CmdpInfo;
  }

  /**
   * 通过地址字符串初始化实例
   * @description 解析 CMDP 地址字符串并设置实例的各个属性
   * @param address CMDP 地址字符串
   * @throws {ScopeError} 当地址格式不正确时抛出错误
   * @protected
   * @example
   * ```typescript
   * // 在子类构造函数中使用
   * this.initByAddress('cmdp://@admin.example.com:8080/UserController.getUser');
   * ```
   */
  protected initByAddress(address: string) {
    if (!this.check(address)) {
      throw new ScopeError(
        `iswork.${this.constructor.name}`,
        `校验地址失败，请传入正确的"${this.protocol}"协议地址，地址：${address}`
      );
    }
    const info = this.parse(address);
    this.address = address;
    this.setAddressInfo(info);
  }

  /**
   * 设置地址基本信息
   * @description 根据地址信息对象设置实例的各个属性，并重新生成完整地址
   * @param info CMDP 地址信息对象
   * @protected
   * @example
   * ```typescript
   * const info: CmdpAddressInfo = {
   *   protocol: 'cmdp://',
   *   user: 'admin',
   *   domains: ['example', 'com'],
   *   port: '8080',
   *   controller: 'UserController',
   *   method: 'getUser'
   * };
   * this.setAddressInfo(info);
   * ```
   */
  protected setAddressInfo(info: CmdpAddressInfo) {
    const { protocol, user, domains, port, controller, method } = info;
    if (protocol) this.protocol = protocol;
    this.user = user;
    this.domains = domains;
    this.port = port;
    this.controller = controller;
    this.method = method;
    this.address = AbstractCmdp.getAddressByInfo(this.getInfo());
  }

  /**
   * 检查地址格式是否正确
   * @description 验证传入的地址字符串是否符合 CMDP 协议格式
   * @param address 待检查的地址字符串
   * @returns 如果地址格式正确返回 true，否则返回 false
   * @protected
   * @example
   * ```typescript
   * // 正确格式示例: cmdp://@user.domain.subDomain:1/controllerName.methodName
   * const isValid = this.check('cmdp://@admin.example.com:8080/UserController.getUser');
   * console.log(isValid); // true
   *
   * const isInvalid = this.check('invalid-address');
   * console.log(isInvalid); // false
   * ```
   */
  protected check(address: string): boolean {
    const protocol = this.protocol.replace('//', '');

    const pattern = `^${protocol}\/\/@\\w{1,20}(\\.[\\w]{1,20}){1,5}:[0-9]{1,4}\/[\\w]{1,20}\.[\\w]{1,20}$`;
    const regExp = new RegExp(pattern);
    return regExp.test(address);
  }

  /**
   * 解析 CMDP 地址字符串
   * @description 将 CMDP 地址字符串解析为结构化的地址信息对象
   * @param address 要解析的 CMDP 地址字符串
   * @returns 解析后的 CMDP 信息对象
   * @protected
   * @example
   * ```typescript
   * const address = 'cmdp://@admin.example.com:8080/UserController.getUser';
   * const info = this.parse(address);
   * // 返回:
   * // {
   * //   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
   * //   protocol: 'cmdp://',
   * //   user: 'admin',
   * //   domains: ['example', 'com'],
   * //   port: '8080',
   * //   controller: 'UserController',
   * //   method: 'getUser'
   * // }
   * ```
   */
  protected parse(address: string): CmdpInfo {
    const [mainAddress, command] = address.replace(this.protocol, '').split('/');
    const [controller, method] = command.split('.');
    const [userOrDomain, port] = mainAddress.split(':');
    const [user, domain] = userOrDomain.split('.');
    return {
      address,
      protocol: this.protocol,
      user: user.replace('@', ''),
      domains: domain.split('.'),
      port,
      controller,
      method,
    };
  }

  /**
   * 设置请求元数据
   * @description 设置当前请求的元数据信息，由子类具体实现
   * @param value 要设置的元数据对象
   * @abstract
   */
  abstract setMeta(value: CmdpMeta): void;

  /**
   * 获取请求元数据
   * @description 获取当前请求的元数据信息，由子类具体实现
   * @template Return 返回值类型，默认为 meta 属性的类型
   * @returns 请求元数据对象
   * @abstract
   */
  abstract getMeta<Return = typeof this.meta>(): Return;

  /**
   * 设置响应元数据
   * @description 设置响应的元数据信息，由子类具体实现
   * @param value 要设置的响应元数据对象
   * @abstract
   */
  abstract setReturnMeta(value: CmdpMeta): void;

  /**
   * 获取响应元数据
   * @description 获取响应的元数据信息，由子类具体实现
   * @template Return 返回值类型，默认为 returnMeta 属性的类型
   * @returns 响应元数据对象
   * @abstract
   */
  abstract getReturnMeta<Return = typeof this.returnMeta>(): Return;

  /**
   * 设置请求载荷数据
   * @description 设置要发送的请求数据，由子类具体实现
   * @param payload 要设置的请求载荷数据
   * @abstract
   */
  abstract setPayload(payload: CmdpPayload): void;

  /**
   * 获取请求载荷数据
   * @description 获取当前的请求载荷数据，由子类具体实现
   * @template Return 返回值类型，默认为 returnPayload 属性的类型
   * @returns 请求载荷数据
   * @abstract
   */
  abstract getPayload<Return = typeof this.returnPayload>(): Return;

  /**
   * 设置响应载荷数据
   * @description 设置接收到的响应数据，由子类具体实现
   * @param payload 要设置的响应载荷数据
   * @abstract
   */
  abstract setReturnPayload(payload: CmdpPayload): void;

  /**
   * 获取响应载荷数据
   * @description 获取接收到的响应载荷数据，由子类具体实现
   * @template Return 返回值类型，默认为 returnPayload 属性的类型
   * @returns 响应载荷数据
   * @abstract
   */
  abstract getReturnPayload<Return = typeof this.returnPayload>(): Return;
}
