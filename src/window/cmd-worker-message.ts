import { EventEmitter, ScopeError, isNil, isString, unWarp, wrap } from '@istock-shell/util';
import { MessageStatus, Cmdp } from '@istock-shell/iswork';
import type { CmdWindow } from '@/window/cmd-window.svelte';

export type TWorkerMessageMeta = (Record<string, unknown> & { messageId?: string }) | null;

export type TWorkerMessage<T = unknown> = {
  address: string;
  meta?: TWorkerMessageMeta;
  payload?: T;
  ports?: [MessagePort];
};

export type TWorkerMessageOptions = {
  timeout?: number;
};

export class CmdWorkerMessage extends EventEmitter {
  readonly cmdWindow: CmdWindow;
  readonly windowId: number;
  readonly #timeout = 60 * 1000;
  readonly #messageBaseInfoCache = new Map<string, TWorkerMessage<any>>();

  constructor(cmdWindow: CmdWindow, windowId: number = 0, options: TWorkerMessageOptions = {}) {
    super();
    this.cmdWindow = cmdWindow;
    this.windowId = windowId;
    if (!isNil(options.timeout)) {
      this.#timeout = options.timeout;
    }
  }

  async send<Result = unknown>(
    domainPath: string,
    executePath: string,
    payload: unknown,
    meta: TWorkerMessageMeta = {}
  ): Promise<TWorkerMessage<Result>> {
    const { worker, store: windowStore, cmdpProtocol } = this.cmdWindow;
    const { user } = windowStore;
    const domains = domainPath.split('.');
    const [controller, method] = executePath.split('.');
    // 获取执行域
    // const originPrompt = get(this.#ctx.cmdStore.cmdPrompt);
    // const { domains } = originPrompt;
    // const domainNames: string[] = domains.map((domain) => domain.name);
    // const domainName: string = domainNames.join('.');
    const request = {
      payload,
      address: Cmdp.getAddressByInfo({
        protocol: cmdpProtocol,
        user: user.data.username,
        domains,
        port: `${this.cmdWindow.workId}${this.windowId}`,
        controller,
        method,
      }), // 使用cmd协议地址
      meta: { domainName: 'global', ...meta, messageId: this.cmdWindow.getNextId() },
    };
    worker.postMessage(wrap(request));

    const promises = [
      new Promise((resolve, reject) => {
        this.once(`${request.address}?messageId=${request.meta.messageId}`, (event: TWorkerMessage<Result>) => {
          if (event.meta && isString(event.meta.errorMsg) && isString(event.meta.errorStack)) {
            const error = new ScopeError(`util.${this.constructor.name}`, event.meta.errorMsg);
            error.stack = event.meta?.errorStack + error.stack;
            reject(error);
          } else {
            resolve(unWarp(event));
          }
        });
      }),
      new Promise((_resolve, reject) => {
        setTimeout(() => {
          reject(new ScopeError(`util.${this.constructor.name}`, `${request.address}，调用超时`));
        }, this.#timeout);
      }),
    ];
    return await (Promise.race(promises) as Promise<TWorkerMessage<Result>>);
  }

  /**
   * 异步通道消息生成器函数
   * @param message
   */
  async *#messageChannelAsyncGenerator<Payload>(
    message: TWorkerMessage<Payload>
  ): AsyncGenerator<TWorkerMessage<Payload>, void, unknown> {
    const { meta, ports } = message;
    const [port2] = ports ?? [];
    if (!meta?.messageId) throw new ScopeError(this.constructor.name, '未获取到消息ID');
    if (!port2) throw new ScopeError(this.constructor.name, '未获取到消息发送端口');
    this.#messageBaseInfoCache.set(meta.messageId, message);
    let loop = true;
    port2.start?.();
    while (loop) {
      // 创建一个新的Promise来等待message事件
      yield await new Promise((resolve, reject) => {
        port2.addEventListener(
          'message',
          (event: MessageEvent<TWorkerMessage<Payload>>) => {
            const newMessage = event.data;
            if (newMessage?.meta?.status === MessageStatus.COMPLETE) {
              this.#messageBaseInfoCache.delete(`${meta.messageId}`);
              loop = false;
            }
            resolve(newMessage);
          },
          { once: true }
        );
        port2.addEventListener('messageerror', reject, { once: true });
      });
    }
  }

  /**
   * 获取通道消息异步迭代器
   * @param message
   */
  getMessageChannelAsyncIterator<Payload>(
    message: TWorkerMessage<Payload>
  ): AsyncGenerator<TWorkerMessage<Payload>, void, unknown> {
    return this.#messageChannelAsyncGenerator(message);
  }

  /**
   * 监听通道消息
   * @param message
   */
  onMessageChannel(message: TWorkerMessage<any>, onMessageHandler?: (message: TWorkerMessage<any>) => Promise<void>) {
    const { meta, ports } = message;
    const [port2] = ports ?? [];
    if (!meta?.messageId) throw new ScopeError(this.constructor.name, '未获取到消息ID');
    if (!port2) throw new ScopeError(this.constructor.name, '未获取到消息发送端口');
    this.#messageBaseInfoCache.set(meta.messageId, message);
    const eventHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message?.meta?.status === MessageStatus.COMPLETE) {
        this.#messageBaseInfoCache.delete(`${meta.messageId}`);
        port2.removeEventListener('message', eventHandler);
        port2.removeEventListener('messageerror', errorHandler);
      }
      onMessageHandler?.(message).catch((e) => {
        throw new ScopeError(this.constructor.name, `onMessageChannel回调函数报错: ${e?.message ?? ''}`);
      });
    };
    const errorHandler = (_event: MessageEvent) => {
      throw new ScopeError(this.constructor.name, 'onMessageChannel获取消息失败');
    };
    port2.addEventListener('message', eventHandler);
    port2.addEventListener('messageerror', errorHandler);
    port2.start?.();
  }

  /**
   * 发送通道消息
   * @param messageId
   * @param payload
   * @param newMeta
   */
  sendMessageToChannel(messageId: string, payload: any, newMeta: TWorkerMessageMeta = {}) {
    const messageBaseInfo = this.#messageBaseInfoCache.get(messageId);
    if (!messageBaseInfo) throw new ScopeError(this.constructor.name, '未获取到消息基本描述数据');
    const [port2] = messageBaseInfo.ports ?? [];
    if (port2) {
      const message: TWorkerMessage<any> = {
        address: messageBaseInfo.address,
        meta: { ...(messageBaseInfo.meta ?? {}), ...newMeta },
        payload,
      };
      port2.postMessage(message);
    }
  }

  destroy() {}
}
