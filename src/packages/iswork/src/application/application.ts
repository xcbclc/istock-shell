import { ScopeError, wrap, unWarp } from '@istock/util';
import type { IDomainClass } from '../interfaces';
import type { TMiddleware, TApplicationOptions, TCmdpMessage } from '../types';
import { compose } from '../compose';
import { DomainHandler } from '../domain/domain-handler';
import { PipeManager, type TPipeKey } from '../pipe';
import { ApplicationContext } from './context';
import { MessageHandler } from './message-handler';
import { ApplicationEvent } from './application-event';

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

  get globalMiddleware() {
    return this.#options.middlewares;
  }

  get allDomain() {
    return this.#domainHandler.domainManager.domains;
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
    return this.#callback();
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
          if (cmdpHandler) {
            const payload = await cmdpHandler();
            const message = ctx.cmdp.getReturnMessage(payload);
            this.emit(wrap(message));
          }
        });
      } catch (err) {
        if (err instanceof Error) {
          ctx.cmdp.setReturnMeta('errorMsg', err.message ?? '请求错误');
          ctx.cmdp.setReturnMeta('errorStack', err.stack ?? new Error().stack);
        }
        this.emit(ctx.cmdp.getReturnMessage({}));
        throw err;
      } finally {
        this.listenOutput();
      }
    };
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
