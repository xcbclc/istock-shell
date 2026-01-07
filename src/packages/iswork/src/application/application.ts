/**
 * @fileoverview 应用框架核心类
 * @description 提供应用程序的主要功能，包括消息处理、中间件管理、域管理等
 */

import { ScopeError, wrap, unwrap, isAsyncIterableIterator } from '@istock-shell/util';
import type { DomainClassBase } from '../interfaces';
import type { Middleware, ApplicationOptions, CmdpMessage } from '../types';
import { compose } from '../compose';
import { DomainHandler } from '../domain/domain-handler';
import { PipeManager, type TPipeKey } from '../pipe';
import { ApplicationContext } from './context';
import { MessageHandler } from './message-handler';
import { ApplicationEvent } from './application-event';
import { MessageChannelManager } from './message-channel-manager';
import { Observable } from '../message/index';
import { MessageStatus } from '../enums/index';

/**
 * 应用框架入口类
 * @description 继承自 ApplicationEvent，提供完整的应用程序生命周期管理
 * @example
 * ```typescript
 * const app = new Application({
 *   domainPath: 'my-app',
 *   middlewares: [loggerMiddleware]
 * });
 *
 * app.listen(MyDomainClass);
 * ```
 */
export class Application extends ApplicationEvent {
  /** 应用上下文类引用 */
  readonly #Context = ApplicationContext;
  /** 消息处理器类引用 */
  readonly #MessageHandler = MessageHandler;
  /** 中间件组合函数引用 */
  readonly #compose: typeof compose = compose;
  /** 应用配置选项 */
  readonly #options: ApplicationOptions;
  /** 域处理器实例 */
  readonly #domainHandler: DomainHandler;
  /** 管道管理器实例 */
  readonly #pipeManager: PipeManager = new PipeManager();
  /** 消息通道管理器实例 */
  readonly #messageChannelManager: MessageChannelManager = new MessageChannelManager();
  /** 消息回调函数 */
  #messageCallback: (event: MessageEvent<CmdpMessage<any>>) => Promise<void> = async () => {};

  /**
   * 获取全局中间件列表
   * @returns 全局中间件数组
   */
  get globalMiddleware() {
    return this.#options.middlewares;
  }

  /**
   * 获取所有已注册的域
   * @returns 域映射表
   */
  get allDomain() {
    return this.#domainHandler.domainManager.domains;
  }

  /**
   * 获取消息通道管理器
   * @returns 消息通道管理器实例
   */
  get messageChannelManager() {
    return this.#messageChannelManager;
  }

  /**
   * 获取管道流执行函数
   * @description 批量执行pipe方法的绑定函数
   * @returns 绑定了上下文的管道流执行函数
   */
  get pipeFlowExecute() {
    return this.#pipeManager.flowExecute.bind(this.#pipeManager);
  }

  /**
   * 合并初始选项值
   * @description 将用户提供的选项与默认选项合并
   * @param options - 用户提供的部分应用选项
   * @returns 完整的应用选项配置
   * @private
   */
  static #mergeOptions(options: Partial<ApplicationOptions>): ApplicationOptions {
    return {
      domainPath: 'istock',
      middlewares: [],
      emit: () => {},
      ...options,
    };
  }

  /**
   * 应用程序构造函数
   * @description 初始化应用程序实例，设置配置选项和核心组件
   * @param options - 应用程序配置选项，可选
   * @param options.domainPath - 域路径，默认为 'istock'
   * @param options.middlewares - 全局中间件数组，默认为空数组
   * @param options.emit - 消息发送函数，默认为空函数
   * @example
   * ```typescript
   * const app = new Application({
   *   domainPath: 'my-app',
   *   middlewares: [authMiddleware, loggerMiddleware],
   *   emit: (message) => {
   *     // 自定义消息发送逻辑
   *     postMessage(message);
   *   }
   * });
   * ```
   */
  constructor(options: Partial<ApplicationOptions> = {}) {
    const mergeOptions: ApplicationOptions = Application.#mergeOptions(options);
    super(mergeOptions);
    this.#options = mergeOptions;
    this.#domainHandler = DomainHandler.create();

    this.initialized();
  }

  /**
   * 启动应用程序监听
   * @description 通过指定的域类启动应用程序，扫描域并返回消息处理函数
   * @param domainClass - 要监听的域类
   * @returns 消息处理回调函数
   * @example
   * ```typescript
   * const messageHandler = app.listen(MyDomainClass);
   * // 在 Web Worker 中使用
   * self.addEventListener('message', messageHandler);
   * ```
   */
  listen(domainClass: DomainClassBase) {
    this.#domainHandler.domainManager.scanDomain(domainClass);
    this.#domainHandler.addGlobalProvider();
    this.listened();
    this.#messageCallback = this.#callback();
    return this.#messageCallback;
  }

  /**
   * 关闭应用程序
   * @description 停止应用程序运行，清理资源
   */
  close() {
    this.closed();
  }

  /**
   * 创建消息处理回调函数
   * @description 内部方法，创建处理消息事件的回调函数
   * @param _options - 可选的配置参数（当前未使用）
   * @returns 异步消息处理函数
   * @private
   */
  #callback(_options?: unknown) {
    return async (event: MessageEvent<CmdpMessage<any>>) => {
      this.listenInput();
      const data = unwrap<CmdpMessage<any>>(event.data);
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
          if (returnMeta?.status === MessageStatus.COMPLETE) {
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
                  message.meta.status = MessageStatus.COMPLETE;
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
            } else if (isAsyncIterableIterator<CmdpMessage>(message.payload)) {
              // 可迭代对象
              for await (const msg of message.payload) {
                message = ctx.cmdp.getReturnMessage(msg ?? null);
                await messageChannelAdapter.send(message);
              }
            } else {
              await messageChannelAdapter.send(message); // 通过消息通道发送消息;
            }
          } else {
            if (returnMeta?.status !== MessageStatus.COMPLETE) {
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

  /**
   * 消息回调错误处理器
   * @description 处理消息回调过程中发生的错误，设置错误信息到返回元数据中，并通过适当的通道发送错误消息
   * @param ctx - 应用程序上下文实例
   * @param err - 发生的错误对象
   * @throws 重新抛出原始错误以便上层处理
   * @private
   * @example
   * ```typescript
   * try {
   *   await someAsyncOperation();
   * } catch (error) {
   *   this.#messageCallbackErrorHandler(ctx, error);
   * }
   * ```
   */
  #messageCallbackErrorHandler(ctx: ApplicationContext, err: any) {
    if (err instanceof Error) {
      ctx.cmdp.setReturnMeta('errorMsg', err.message ?? '请求错误');
      ctx.cmdp.setReturnMeta('errorStack', err.stack ?? new Error().stack);
    }
    // 发送错误消息时meta附带消息传输完成
    ctx.cmdp.setReturnMeta('status', MessageStatus.COMPLETE);

    const returnMeta = ctx.cmdp.getReturnMeta();
    const messageChannelAdapter = ctx.app.messageChannelManager.getMessageChannelAdapter(
      `${returnMeta?.messageId ?? ''}`
    );
    const errorMessage = wrap(ctx.cmdp.getReturnMessage({}));
    if (messageChannelAdapter) {
      // 使用通道发送错误消息
      messageChannelAdapter
        .send(errorMessage)
        .then(() => messageChannelAdapter.close())
        .catch((err) => {
          throw err;
        });
    } else {
      // 正常发送错误消息
      this.emit(errorMessage);
    }
    throw err;
  }

  /**
   * 添加中间件
   * @description 向应用程序添加中间件函数，中间件将在消息处理过程中执行
   * @param fn - 中间件函数
   * @returns 返回应用程序实例，支持链式调用
   * @throws {ScopeError} 当传入的参数不是函数时抛出错误
   * @example
   * ```typescript
   * app.useMiddleware(async (ctx, next) => {
   *   console.log('Before processing');
   *   await next();
   *   console.log('After processing');
   * });
   * ```
   */
  useMiddleware(fn: Middleware) {
    if (typeof fn !== 'function') {
      throw new ScopeError(`iswork.${this.constructor.name}`, '中间件必须是一个方法');
    }
    this.#options.middlewares.push(fn);
    return this;
  }

  /**
   * 添加域
   * @description 向应用程序添加域类，扫描并注册域中的控制器和服务
   * @param domainClass - 要添加的域类
   * @example
   * ```typescript
   * app.useDomain(UserDomain);
   * ```
   */
  useDomain(domainClass: DomainClassBase) {
    this.#domainHandler.domainManager.scanDomain(domainClass);
  }

  /**
   * 获取指定名称的域
   * @description 根据域名称获取已注册的域实例
   * @param name - 域名称
   * @returns 域实例，如果不存在则返回 undefined
   * @template T - 域类类型
   * @example
   * ```typescript
   * const userDomain = app.getDomain<UserDomain>('user');
   * ```
   */
  getDomain<T extends DomainClassBase<any>>(name: string) {
    return this.#domainHandler.domainManager.getDomain<T>(name);
  }

  /**
   * 添加管道函数
   * @description 向管道管理器添加一个管道函数
   * @param key - 管道函数的键名
   * @param fn - 管道函数
   * @example
   * ```typescript
   * app.usePipe('validation', (data) => {
   *   // 验证逻辑
   *   return validatedData;
   * });
   * ```
   */
  usePipe(key: TPipeKey, fn: Function) {
    this.#pipeManager.add(key, fn);
  }

  /**
   * 获取管道函数
   * @description 根据键名获取已注册的管道函数
   * @param key - 管道函数的键名
   * @returns 管道函数，如果不存在则返回 undefined
   * @template Fn - 函数类型
   * @example
   * ```typescript
   * const validator = app.getPipe<(data: any) => any>('validation');
   * ```
   */
  getPipe<Fn extends Function>(key: TPipeKey) {
    return this.#pipeManager.get(key) as Fn;
  }

  /**
   * 获取所有管道函数记录
   * @description 获取管道管理器中所有已注册的管道函数记录
   * @returns 管道函数记录映射表
   */
  getPipeRecord() {
    return this.#pipeManager.getAllRecord();
  }
}
