import { EventEmitter, ScopeError, isNil, isString, FESnowflake, unWarp, wrap } from '@istock/util';
import type { CmdWindowContext } from './cmd-window-context';
import { get } from 'svelte/store';

export type TWorkerMessageMeta = Record<string, unknown> | null;

export type TWorkerMessage<T = unknown> = {
  address: string;
  meta?: TWorkerMessageMeta;
  payload?: T;
};

export type TWorkerMessageOptions = {
  timeout?: number;
};

export class WorkerMessage extends EventEmitter {
  readonly #timeout = 60 * 1000;
  readonly #protocol = 'cmdp://';
  readonly #ctx: CmdWindowContext;
  readonly #generateId: FESnowflake;

  get protocol() {
    return this.#protocol;
  }

  constructor(ctx: CmdWindowContext, options: TWorkerMessageOptions = {}) {
    super();
    this.#ctx = ctx;
    if (!isNil(options.timeout)) {
      this.#timeout = options.timeout;
    }
    this.#generateId = new FESnowflake(1, this.#ctx.windowId);
  }

  /**
   * 构建下一个id
   */
  nextId() {
    return this.#generateId.nextId();
  }

  async send<Result = unknown>(
    domainPath: string,
    executePath: string,
    payload: unknown,
    meta: TWorkerMessageMeta = {}
  ): Promise<TWorkerMessage<Result>> {
    const { windowId, worker, domainStore } = this.#ctx;

    // 获取执行域
    const originPrompt = get(this.#ctx.cmdStore.cmdPrompt);
    const { domains } = originPrompt;
    const domainNames: string[] = domains.map((domain) => domain.name);
    const domainName: string = domainNames.join('.');

    const userInfo = domainStore.user.getUserInfo();
    const request = {
      payload,
      address: `${this.#protocol}@${userInfo.username}.${domainPath}:${windowId}/${executePath}`, // 使用cmd协议
      meta: { domainName, ...meta, messageId: this.nextId() },
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
}
