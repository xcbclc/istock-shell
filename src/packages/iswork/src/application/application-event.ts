import type { TApplicationEventOptions, TCmdpAddressInfo, TCmdpPayload } from '../types';
import { CmdpEvent } from '../cmdp';

/**
 * 应用事件，定义了生命周期事件
 */
export class ApplicationEvent {
  readonly #CmdpEvent = CmdpEvent;
  readonly #emit: TApplicationEventOptions['emit'] = () => {};
  options: TApplicationEventOptions;
  get emit() {
    return this.#emit;
  }

  constructor(options: TApplicationEventOptions) {
    this.options = options;
    if (this.options.emit) this.#emit = this.options.emit;
  }

  /**
   * 发送应用级消息
   * @param controller
   * @param method
   */
  protected sendAppMessage(controller: string, method: string, payload: TCmdpPayload = true) {
    const cmdpInfo: TCmdpAddressInfo = {
      protocol: 'event://',
      user: 'istock',
      domains: ['application'],
      port: '0',
      controller,
      method,
    };
    const eventCmdp = this.#CmdpEvent.create(cmdpInfo);
    this.#emit(eventCmdp.getMessage(payload));
  }

  // 生命周期-初始化完毕
  protected initialized() {
    this.sendAppMessage('lifecycle', 'initialized');
  }

  // 生命周期-已被监听
  protected listened() {
    this.sendAppMessage('lifecycle', 'listened');
  }

  // 生命周期-有输入时触发
  protected listenInput() {
    this.sendAppMessage('lifecycle', 'listenInput');
  }

  // 生命周期-有输出时触发
  protected listenOutput() {
    this.sendAppMessage('lifecycle', 'listenOutput');
  }

  // 生命周期-关闭监听
  protected closed() {
    this.sendAppMessage('lifecycle', 'closed');
  }
}
