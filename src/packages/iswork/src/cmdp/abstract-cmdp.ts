import { ScopeError } from '@istock/util';
import type { TCmdpAddressInfo, TCmdpInfo, TCmdpMeta, TCmdpOptions, TCmdpPayload } from '../types';

/**
 * 抽象cmdp协议核心
 */
export abstract class AbstractCmdp {
  protected protocol: string = 'cmdp://';
  protected user!: string;
  protected domains!: string[];
  protected port!: string;
  protected controller!: string;
  protected method!: string;
  protected address!: string;
  protected abstract meta: TCmdpMeta | undefined;
  protected abstract returnMeta: TCmdpMeta | undefined;
  protected abstract payload: TCmdpPayload | undefined;
  protected abstract returnPayload: TCmdpPayload | undefined;

  /**
   * 根据传入信息获取地址
   * @param info
   */
  static getAddressByInfo(info: TCmdpAddressInfo) {
    const { protocol, user, domains, port, controller, method } = info;
    return `${protocol}@${user}.${domains.join('.')}:${port}/${controller}.${method}`;
  }

  constructor(addOrInfo: TCmdpAddressInfo | string, options?: TCmdpOptions) {
    if (options?.protocol) this.protocol = options.protocol;
    if (typeof addOrInfo === 'string') {
      this.initByAddress(addOrInfo);
    } else {
      this.setAddressInfo(addOrInfo);
    }
  }

  /**
   * 获取cmdp信息
   */
  public getInfo(): TCmdpInfo {
    const keys: Array<keyof TCmdpInfo> = [
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
    }, {}) as TCmdpInfo;
  }

  /**
   * 用地址初始化
   * @param address
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
   * 设置基本信息
   * @param info
   */
  protected setAddressInfo(info: TCmdpAddressInfo) {
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
   * 检查是否是cmdp地址  例如: cmdp://@user.domain.subDomain:1/controllerName.methodName
   * @param address
   * @protected
   */
  protected check(address: string): boolean {
    const protocol = this.protocol.replace('//', '');
    // eslint-disable-next-line no-useless-escape
    const pattern = `^${protocol}\/\/@\\w{1,20}(\\.[\\w]{1,20}){1,5}:[0-9]{1,4}\/[\\w]{1,20}\.[\\w]{1,20}$`;
    const regExp = new RegExp(pattern);
    return regExp.test(address);
  }

  /**
   * 解析cmdp地址信息
   * @param address
   * @protected
   */
  protected parse(address: string): TCmdpInfo {
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
   * @param value
   */
  abstract setMeta(value: TCmdpMeta): void;

  /**
   * 获取请求元数据
   */
  abstract getMeta<Return = typeof this.meta>(): Return;

  /**
   * 设置响应元数据
   * @param value
   */
  abstract setReturnMeta(value: TCmdpMeta): void;

  /**
   * 获取响应元数据
   */
  abstract getReturnMeta<Return = typeof this.returnMeta>(): Return;

  /**
   * 设置请求数据
   * @param payload
   */
  abstract setPayload(payload: TCmdpPayload): void;

  /**
   * 获取请求数据
   */
  abstract getPayload<Return = typeof this.returnPayload>(): Return;

  /**
   * 设置响应数据
   * @param payload
   */
  abstract setReturnPayload(payload: TCmdpPayload): void;

  /**
   * 获取响应数据
   */
  abstract getReturnPayload<Return = typeof this.returnPayload>(): Return;
}
