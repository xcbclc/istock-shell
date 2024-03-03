import { ScopeError } from '@istock/util';
import type { TCmdpMeta, TCmdpPayload, TCmdpMessage, TCmdpMetaValue, TCmdpOptions, TCmdpAddressInfo } from '../types';
import { AbstractCmdp } from './abstract-cmdp';

/**
 * istock cmdp协议实现
 */
export class Cmdp extends AbstractCmdp {
  protected meta: TCmdpMeta | undefined;
  protected payload: TCmdpPayload | undefined;
  protected returnMeta: TCmdpMeta | undefined;
  protected returnPayload: TCmdpPayload | undefined;

  static create(addOrInfo: TCmdpMessage | TCmdpAddressInfo, options?: TCmdpOptions): Cmdp {
    return new Cmdp(addOrInfo, options);
  }

  constructor(msgOrInfo: TCmdpMessage | TCmdpAddressInfo, options?: TCmdpOptions) {
    if ((msgOrInfo as TCmdpMessage).address) {
      const message = msgOrInfo as TCmdpMessage;
      super(message.address, options);
      if (message.meta !== undefined) this.meta = message.meta;
      if (message.payload !== undefined) this.payload = message.payload;
      if (message.meta?.messageId) {
        this.setReturnMeta('messageId', message.meta.messageId);
      }
    } else {
      super(msgOrInfo as TCmdpAddressInfo, options);
    }
  }

  public setMeta(key: string, value: TCmdpMetaValue): void;
  public setMeta(value: TCmdpMeta): void;
  public setMeta(keyOrValue: string | TCmdpMeta, value?: TCmdpMetaValue) {
    if (!this.meta) this.meta = {};
    if (typeof keyOrValue === 'string') {
      this.meta[keyOrValue] = value;
    } else {
      this.meta = keyOrValue;
    }
  }

  public getMeta<Return extends typeof this.meta>(): Return;
  public getMeta<Return extends TCmdpMetaValue>(key: keyof TCmdpMeta): Return;
  public getMeta<Return extends typeof this.meta | TCmdpMetaValue>(key?: keyof TCmdpMeta): Return {
    const meta = this.meta;
    if (key && meta && typeof meta === 'object') return meta[key] as Return;
    return meta as Return;
  }

  public setPayload(key: string, value: unknown): void;
  public setPayload(payload: TCmdpPayload): void;
  public setPayload(keyOrPayload: string | TCmdpPayload, value?: unknown) {
    if (!this.payload) this.payload = {};
    if (typeof keyOrPayload === 'string' && typeof this.payload === 'object') {
      this.payload[keyOrPayload] = value;
    } else {
      this.payload = keyOrPayload;
    }
  }

  public getPayload<Return extends typeof this.payload>(): Return;
  public getPayload<Return = unknown>(key: string): Return;
  public getPayload<Return extends typeof this.payload>(key?: string): Return {
    const payload = this.payload;
    if (key && payload && typeof payload === 'object') {
      return payload[key] as Return;
    }
    return payload as Return;
  }

  public setReturnMeta(key: string, value: TCmdpMetaValue): void;
  public setReturnMeta(value: TCmdpMeta): void;
  public setReturnMeta(keyOrValue: string | TCmdpMeta, value?: TCmdpMetaValue) {
    if (!this.returnMeta) this.returnMeta = {};
    if (typeof keyOrValue === 'string') {
      this.returnMeta[keyOrValue] = value;
    } else {
      this.returnMeta = keyOrValue;
    }
  }

  public getReturnMeta<Return extends typeof this.returnMeta>(): Return;
  public getReturnMeta<Return extends TCmdpMetaValue>(key: keyof TCmdpMeta): Return;
  public getReturnMeta<Return extends typeof this.returnMeta | TCmdpMetaValue>(key?: keyof TCmdpMeta): Return {
    const meta = this.returnMeta;
    if (key && meta && typeof meta === 'object') return meta[key] as Return;
    return meta as Return;
  }

  public setReturnPayload(key: string, value: unknown): void;
  public setReturnPayload(payload: TCmdpPayload): void;
  public setReturnPayload(keyOrPayload: string | TCmdpPayload, value?: unknown) {
    if (!this.returnPayload) this.returnPayload = {};
    if (typeof keyOrPayload === 'string' && typeof this.returnPayload === 'object' && value !== undefined) {
      this.returnPayload[keyOrPayload] = value;
    } else {
      this.returnPayload = keyOrPayload;
    }
  }

  public getReturnPayload<Return extends typeof this.returnPayload>(): Return;
  public getReturnPayload<Return = unknown>(key: string): Return;
  public getReturnPayload<Return extends typeof this.returnPayload>(key?: string): Return {
    const payload = this.returnPayload;
    if (key && payload && typeof payload === 'object') {
      return payload[key] as Return;
    }
    return payload as Return;
  }

  /**
   * 查找子域
   * @param rootDomain
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
   */
  public getMessage(): TCmdpMessage;
  public getMessage(payload: typeof this.payload): TCmdpMessage;
  public getMessage(payload?: typeof this.payload): TCmdpMessage {
    if (payload) this.setReturnPayload(payload);
    return {
      address: this.address,
      meta: this.returnMeta,
      payload: this.returnPayload,
    };
  }

  /**
   * 获取返回消息数据
   */
  public getReturnMessage(): TCmdpMessage;
  public getReturnMessage(payload: typeof this.returnPayload): TCmdpMessage;
  public getReturnMessage(payload?: typeof this.returnPayload): TCmdpMessage {
    if (payload) this.setReturnPayload(payload);
    return {
      address: this.address,
      meta: this.returnMeta,
      payload: this.returnPayload,
    };
  }
}
