import { ScopeError, wrap, unWarp, isAsyncIterableIterator } from '@istock/util';
import type { IDomainClass } from '../interfaces';
import type { TMiddleware, TApplicationOptions, TCmdpMessage } from '../types';
import { compose } from '../compose';
import { DomainHandler } from '../domain/domain-handler';
import { PipeManager, type TPipeKey } from '../pipe';
import { ApplicationContext } from './context';
import { MessageHandler } from './message-handler';
import { ApplicationEvent } from './application-event';
import { MessageChannelManager } from './message-channel-manager';
import { Observable } from '../message/index';
import { EMessageStatus } from '../enums/index';

/**
 * 应用框架入口
 */
export class Application extends ApplicationEvent {
  readonly #Context = ApplicationContext;
  readonly #MessageHandler = MessageHandler;
  readonly #compose: typeof compose = compose;
  readonly #options: TApplicationOptions;
  readonly #domainHandler: DomainHandler;
  readonly #pipeManager: PipeManager = new PipeManager();
  readonly #messageChannelManager: MessageChannelManager = new MessageChannelManager();
  #messageCallback: (event: MessageEvent<TCmdpMessage<any>>) => Promise<void> = async () => {};

  get globalMiddleware() {
    return this.#options.middlewares;
  }

  get allDomain() {
    return this.#domainHandler.domainManager.domains;
  }

  get messageChannelManager() {
    return this.#messageChannelManager;
  }

  /**
   * 批量执行pipe方法
   */
  get pipeFlowExecute() {
    return this.#pipeManager.flowExecute.bind(this.#pipeManager);
  }

  /**
   * 合并初始选项值
   * @param options
   * @private
   */
  static #mergeOptions(options: Partial<TApplicationOptions>): TApplicationOptions {
    return {
      domainPath: 'istock',
      middlewares: [],
      emit: () => {},
      ...options,
    };
  }

  constructor(options: Partial<TApplicationOptions> = {}) {
    const mergeOptions: TApplicationOptions = Application.#mergeOptions(options);
    super(mergeOptions);
    this.#options = mergeOptions;
    this.#domainHandler = DomainHandler.create();

    this.initialized();
  }

  /**
   * 通过domain获取消息处理函数
   * @param domainClass
   */
  listen(domainClass: IDomainClass) {
    this.#domainHandler.domainManager.scanDomain(domainClass);
    this.#domainHandler.addGlobalProvider();
    this.listened();
    this.#messageCallback = this.#callback();
    return this.#messageCallback;
  }

  /**
   * 关闭应用
   */
  close() {
    this.closed();
  }

  /**
   * 消息处理函数
   */
  #callback(_options?: unknown) {
    return async (event: MessageEvent<TCmdpMessage<any>>) => {
      this.listenInput();
      const data = unWarp<TCmdpMessage<any>>(event.data);
      // 根据消息创建上下文
      const ctx = this.#Context.create(this, data);
      try {
        // 根据上下文信息获取消息处理函数
        const { cmdpHandler, middlewares } = this.#MessageHandler.resolveCmdpHandler(ctx, this.#domainHandler);
        // 编排中间件
        const fn = this.#compose([...this.#options.middlewares, ...middlewares]);
        // 执行中间件
        await fn(ctx, async (ctx: ApplicationContext) => {
          if (!cmdpHandler) return;
          const payload = await cmdpHandler();
          let message = ctx.cmdp.getReturnMessage(payload);
          const wrapMessage =
            message.payload instanceof Observable || isAsyncIterableIterator(message.payload) ? message : wrap(message);
          const returnMeta = ctx.cmdp.getReturnMeta();
          const messageChannelAdapter = ctx.app.messageChannelManager.getMessageChannelAdapter(
            `${returnMeta?.messageId ?? ''}`
          );
          if (!messageChannelAdapter) {
            this.emit(wrapMessage);
            return;
          }
          if (returnMeta?.status === EMessageStatus.COMPLETE) {
            await messageChannelAdapter.close(); // 关闭当前消息通道监听
          }
          if (messageChannelAdapter.hasOnMessageCallback) {
            // 发送消息给port2
            if (message.payload instanceof Observable) {
              // 可观察对象处理
              const subscription = message.payload.subscribe({
                next: (value) => {
                  message = ctx.cmdp.getReturnMessage(value ?? null);
                  messageChannelAdapter.send(wrap(message)).catch((error) => {
                    this.#messageCallbackErrorHandler(ctx, error);
                  });
                },
                complete: (value) => {
                  message = ctx.cmdp.getReturnMessage(value ?? null);
                  if (!message.meta) {
                    message.meta = {};
                  }
                  message.meta.status = EMessageStatus.COMPLETE;
                  messageChannelAdapter
                    .send(wrap(message))
                    .catch((error) => {
                      this.#messageCallbackErrorHandler(ctx, error);
                    })
                    .finally(() => {
                      subscription.unsubscribe();
                    });
                },
                error: (error) => {
                  this.#messageCallbackErrorHandler(ctx, error);
                },
              });
            } else if (isAsyncIterableIterator<TCmdpMessage>(message.payload)) {
              // 可迭代对象
              for await (const msg of message.payload) {
                message = ctx.cmdp.getReturnMessage(msg ?? null);
                await messageChannelAdapter.send(message);
              }
            } else {
              await messageChannelAdapter.send(message); // 通过消息通道发送消息;
            }
          } else {
            if (returnMeta?.status !== EMessageStatus.COMPLETE) {
              messageChannelAdapter.onMessage(this.#messageCallback); // 建立监听消息通道
            }
            this.emit(wrapMessage, {
              transfer: [messageChannelAdapter.instance.port2],
            }); // 发送消息并附带消息通道port2
          }
        });
      } catch (err) {
        this.#messageCallbackErrorHandler(ctx, err);
      } finally {
        this.listenOutput();
      }
    };
  }

  #messageCallbackErrorHandler(ctx: ApplicationContext, err: any) {
    if (err instanceof Error) {
      ctx.cmdp.setReturnMeta('errorMsg', err.message ?? '请求错误');
      ctx.cmdp.setReturnMeta('errorStack', err.stack ?? new Error().stack);
    }
    const returnMeta = ctx.cmdp.getReturnMeta();
    const messageChannelAdapter = ctx.app.messageChannelManager.getMessageChannelAdapter(
      `${returnMeta?.messageId ?? ''}`
    );
    const errorMessage = wrap(ctx.cmdp.getReturnMessage({}));
    if (messageChannelAdapter) {
      // 使用通道发送错误消息
      messageChannelAdapter.send(errorMessage).catch((err) => {
        throw err;
      });
    } else {
      // 正常发送错误消息
      this.emit(errorMessage);
    }
    throw err;
  }

  /**
   * 新增中间件
   * @param fn
   */
  useMiddleware(fn: TMiddleware) {
    if (typeof fn !== 'function') {
      throw new ScopeError(`iswork.${this.constructor.name}`, '中间件必须是一个方法');
    }
    this.#options.middlewares.push(fn);
    return this;
  }

  /**
   * 新增domain
   * @param domainClass
   */
  useDomain(domainClass: IDomainClass) {
    this.#domainHandler.domainManager.scanDomain(domainClass);
  }

  /**
   * 获取domain
   * @param name
   */
  getDomain<T extends IDomainClass<any>>(name: string) {
    return this.#domainHandler.domainManager.getDomain<T>(name);
  }

  /**
   * 新增管道函数
   * @param key
   * @param fn
   */
  usePipe(key: TPipeKey, fn: Function) {
    this.#pipeManager.add(key, fn);
  }

  /**
   * 获取管道函数
   * @param key
   */
  getPipe<Fn extends Function>(key: TPipeKey) {
    return this.#pipeManager.get(key) as Fn;
  }

  /**
   * 获取全部管道函数记录
   */
  getPipeRecord() {
    return this.#pipeManager.getAllRecord();
  }
}
