# 消息通信系统

本文档详细介绍 `@istock-shell/iswork` 框架的消息通信系统，包括CMDP协议、消息处理、事件系统和最佳实践。

## 概述

框架的消息通信系统基于CMDP（Command Protocol）协议，提供了主线程与Web Worker之间的标准化通信机制。系统支持同步和异步消息处理、事件发布订阅、消息路由和中间件处理。

### 核心特性

- **CMDP协议**：标准化的消息格式和地址规范
- **消息路由**：基于地址的自动路由到控制器方法
- **事件系统**：发布订阅模式的事件通信
- **中间件支持**：消息处理管道
- **类型安全**：完整的TypeScript支持
- **错误处理**：统一的错误处理机制
- **性能优化**：消息缓存和批处理

## 1. CMDP协议详解

### 协议格式

CMDP地址遵循类似URL的格式：

```
protocol://[user@]domain[:port]/path[?query][#fragment]
```

#### 完整格式示例

```
cmdp://user@my-app.example.com:8080/UserController.getUser?id=123&include=posts#section1
```

#### 各部分说明

- **protocol**：协议类型

  - `cmdp`：命令协议，用于业务操作
  - `event`：事件协议，用于事件通知
  - `query`：查询协议，用于数据查询
  - `stream`：流协议，用于数据流传输

- **user**：用户标识（可选）

  - 通常为控制器别名
  - 用于权限控制和路由优化

- **domain**：域名

  - 应用的domainPath
  - 用于多应用隔离

- **port**：端口号（可选）

  - 默认为8080
  - 用于版本控制或环境区分

- **path**：路径

  - 格式：`ControllerName.methodName`
  - 指定目标控制器和方法

- **query**：查询参数（可选）

  - 传递简单参数
  - 格式：`key=value&key2=value2`

- **fragment**：片段标识（可选）
  - 用于特殊标记或路由提示

### 消息结构

```typescript
interface CmdpMessage {
  // 必需字段
  address: string; // CMDP地址

  // 可选字段
  payload?: any; // 请求数据
  meta?: MessageMeta; // 元数据
  headers?: Record<string, string>; // 消息头
  options?: MessageOptions; // 消息选项
}

interface MessageMeta {
  requestId?: string; // 请求ID
  timestamp?: number; // 时间戳
  userId?: string; // 用户ID
  sessionId?: string; // 会话ID
  traceId?: string; // 追踪ID
  priority?: 'low' | 'normal' | 'high' | 'urgent'; // 优先级
  timeout?: number; // 超时时间（毫秒）
  retries?: number; // 重试次数
  [key: string]: any; // 其他元数据
}

interface MessageOptions {
  async?: boolean; // 是否异步处理
  cache?: boolean; // 是否缓存结果
  broadcast?: boolean; // 是否广播
  persistent?: boolean; // 是否持久化
  compress?: boolean; // 是否压缩
}
```

### 地址解析

```typescript
class AddressParser {
  static parse(address: string): ParsedAddress {
    const url = new URL(address);

    return {
      protocol: url.protocol.slice(0, -1), // 移除末尾的':'
      user: url.username || undefined,
      domain: url.hostname,
      port: url.port ? parseInt(url.port) : 8080,
      path: url.pathname.slice(1), // 移除开头的'/'
      query: this.parseQuery(url.search),
      fragment: url.hash.slice(1) || undefined,
    };
  }

  static parseQuery(search: string): Record<string, string> {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};

    for (const [key, value] of params) {
      result[key] = value;
    }

    return result;
  }

  static build(parts: Partial<ParsedAddress>): string {
    const { protocol = 'cmdp', user, domain = 'localhost', port = 8080, path = '', query = {}, fragment } = parts;

    let address = `${protocol}://`;

    if (user) {
      address += `${user}@`;
    }

    address += domain;

    if (port !== 8080) {
      address += `:${port}`;
    }

    if (path) {
      address += `/${path}`;
    }

    const queryString = new URLSearchParams(query).toString();
    if (queryString) {
      address += `?${queryString}`;
    }

    if (fragment) {
      address += `#${fragment}`;
    }

    return address;
  }
}

interface ParsedAddress {
  protocol: string;
  user?: string;
  domain: string;
  port: number;
  path: string;
  query: Record<string, string>;
  fragment?: string;
}
```

## 2. 消息处理流程

### 消息处理管道

```
接收消息 → 地址解析 → 路由匹配 → 中间件处理 → 控制器执行 → 响应处理 → 发送响应
```

### 消息处理器

```typescript
class MessageHandler {
  constructor(
    private router: MessageRouter,
    private middlewares: Middleware[],
    private errorHandler: ErrorHandler
  ) {}

  async handleMessage(message: CmdpMessage): Promise<any> {
    try {
      // 1. 解析地址
      const parsedAddress = AddressParser.parse(message.address);

      // 2. 创建上下文
      const context = this.createContext(message, parsedAddress);

      // 3. 路由匹配
      const route = await this.router.match(parsedAddress);
      if (!route) {
        throw new Error(`No route found for address: ${message.address}`);
      }

      // 4. 执行中间件管道
      const result = await this.executeMiddlewares(context, async () => {
        // 5. 执行控制器方法
        return await this.executeController(route, context);
      });

      return result;
    } catch (error) {
      // 6. 错误处理
      return await this.errorHandler.handle(error, message);
    }
  }

  private createContext(message: CmdpMessage, parsedAddress: ParsedAddress): MessageContext {
    return {
      message,
      parsedAddress,
      response: undefined,
      metadata: new Map(),
      startTime: Date.now(),

      set(key: string, value: any): void {
        this.metadata.set(key, value);
      },

      get<T>(key: string): T | undefined {
        return this.metadata.get(key);
      },

      has(key: string): boolean {
        return this.metadata.has(key);
      },
    };
  }

  private async executeController(route: Route, context: MessageContext): Promise<any> {
    const { controller, method, parameterTypes } = route;

    // 解析方法参数
    const args = await this.resolveParameters(method, parameterTypes, context);

    // 执行控制器方法
    const result = await controller[method.name].apply(controller, args);

    return result;
  }

  private async resolveParameters(
    method: Function,
    parameterTypes: ParameterType[],
    context: MessageContext
  ): Promise<any[]> {
    const args: any[] = [];

    for (const paramType of parameterTypes) {
      switch (paramType.type) {
        case 'payload':
          args.push(this.extractPayload(context.message.payload, paramType.path));
          break;
        case 'meta':
          args.push(this.extractMeta(context.message.meta, paramType.key));
          break;
        case 'field':
          args.push(this.extractField(context.message, paramType.path));
          break;
        case 'context':
          args.push(context);
          break;
        default:
          args.push(undefined);
      }
    }

    return args;
  }

  private extractPayload(payload: any, path?: string): any {
    if (!path) return payload;
    return this.getNestedValue(payload, path);
  }

  private extractMeta(meta: any, key?: string): any {
    if (!key) return meta;
    return meta?.[key];
  }

  private extractField(message: CmdpMessage, path: string): any {
    return this.getNestedValue(message, path);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}

interface MessageContext {
  message: CmdpMessage;
  parsedAddress: ParsedAddress;
  response?: any;
  metadata: Map<string, any>;
  startTime: number;

  set(key: string, value: any): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
}

interface Route {
  controller: any;
  method: Function;
  parameterTypes: ParameterType[];
}

interface ParameterType {
  type: 'payload' | 'meta' | 'field' | 'context';
  path?: string;
  key?: string;
}
```

### 消息路由

```typescript
class MessageRouter {
  private routes: Map<string, Route> = new Map();
  private controllerAliases: Map<string, string> = new Map();

  registerController(controller: any, metadata: ControllerMetadata): void {
    const controllerName = controller.constructor.name;

    // 注册控制器别名
    if (metadata.alias) {
      const aliases = Array.isArray(metadata.alias) ? metadata.alias : [metadata.alias];
      for (const alias of aliases) {
        this.controllerAliases.set(alias, controllerName);
      }
    }

    // 注册控制器方法
    const methods = this.getControllerMethods(controller);
    for (const method of methods) {
      const routeKey = `${controllerName}.${method.name}`;
      this.routes.set(routeKey, {
        controller,
        method,
        parameterTypes: this.getParameterTypes(controller, method.name),
      });
    }
  }

  async match(parsedAddress: ParsedAddress): Promise<Route | null> {
    const { path, user } = parsedAddress;

    // 尝试直接匹配
    let route = this.routes.get(path);
    if (route) {
      return route;
    }

    // 尝试通过别名匹配
    if (user) {
      const controllerName = this.controllerAliases.get(user);
      if (controllerName) {
        const methodName = path.split('.').pop();
        const routeKey = `${controllerName}.${methodName}`;
        route = this.routes.get(routeKey);
        if (route) {
          return route;
        }
      }
    }

    // 解析路径中的控制器和方法
    const [controllerPart, methodName] = path.split('.');

    // 尝试控制器别名
    const controllerName = this.controllerAliases.get(controllerPart) || controllerPart;
    const routeKey = `${controllerName}.${methodName}`;

    return this.routes.get(routeKey) || null;
  }

  private getControllerMethods(controller: any): Function[] {
    const methods: Function[] = [];
    const prototype = Object.getPrototypeOf(controller);

    for (const propertyName of Object.getOwnPropertyNames(prototype)) {
      const property = prototype[propertyName];
      if (typeof property === 'function' && propertyName !== 'constructor') {
        methods.push(property);
      }
    }

    return methods;
  }

  private getParameterTypes(controller: any, methodName: string): ParameterType[] {
    // 从装饰器元数据中获取参数类型信息
    const metadata = Reflect.getMetadata('parameters', controller, methodName) || [];
    return metadata;
  }
}
```

## 3. 事件系统

### 事件发布订阅

```typescript
class EventBus {
  private listeners: Map<string, EventListener[]> = new Map();
  private wildcardListeners: EventListener[] = [];

  // 订阅事件
  on(event: string, listener: EventListener): () => void {
    if (event === '*') {
      this.wildcardListeners.push(listener);
      return () => {
        const index = this.wildcardListeners.indexOf(listener);
        if (index > -1) {
          this.wildcardListeners.splice(index, 1);
        }
      };
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const eventListeners = this.listeners.get(event)!;
    eventListeners.push(listener);

    // 返回取消订阅函数
    return () => {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    };
  }

  // 一次性订阅
  once(event: string, listener: EventListener): () => void {
    const wrappedListener: EventListener = (data, eventName) => {
      unsubscribe();
      return listener(data, eventName);
    };

    const unsubscribe = this.on(event, wrappedListener);
    return unsubscribe;
  }

  // 发布事件
  async emit(event: string, data?: any): Promise<void> {
    const eventData: EventData = {
      name: event,
      data,
      timestamp: Date.now(),
      id: crypto.randomUUID(),
    };

    // 触发通配符监听器
    await this.triggerListeners(this.wildcardListeners, eventData, event);

    // 触发特定事件监听器
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      await this.triggerListeners(eventListeners, eventData, event);
    }
  }

  // 发布消息事件
  async publish(address: string, payload?: any, meta?: MessageMeta): Promise<void> {
    const message: CmdpMessage = {
      address,
      payload,
      meta: {
        ...meta,
        timestamp: Date.now(),
        requestId: crypto.randomUUID(),
      },
    };

    await this.emit('message', message);
  }

  private async triggerListeners(listeners: EventListener[], eventData: EventData, eventName: string): Promise<void> {
    const promises = listeners.map(async (listener) => {
      try {
        await listener(eventData.data, eventName, eventData);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    });

    await Promise.all(promises);
  }

  // 移除所有监听器
  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
      this.wildcardListeners.length = 0;
    }
  }

  // 获取监听器数量
  listenerCount(event: string): number {
    const listeners = this.listeners.get(event);
    return listeners ? listeners.length : 0;
  }
}

type EventListener = (data: any, eventName: string, eventData?: EventData) => void | Promise<void>;

interface EventData {
  name: string;
  data: any;
  timestamp: number;
  id: string;
}
```

### 事件装饰器

```typescript
// 事件监听器装饰器
function EventListener(event: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 标记为事件监听器
    Reflect.defineMetadata('event:listener', event, target, propertyKey);
  };
}

// 事件发布装饰器
function EventEmitter(event: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      // 发布事件
      const eventBus = container.resolve('EVENT_BUS');
      await eventBus.emit(event, {
        method: propertyKey,
        args,
        result,
        timestamp: Date.now(),
      });

      return result;
    };
  };
}

// 使用示例
@Injectable()
class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventBus: EventBus
  ) {}

  @EventEmitter('user.created')
  async createUser(userData: CreateUserDto): Promise<User> {
    const userId = await this.userRepository.createOne(User, userData);
    const user = await this.userRepository.findOneById(User, userId);

    // 事件会自动发布
    return user;
  }

  @EventListener('user.created')
  async onUserCreated(eventData: any): Promise<void> {
    const { result: user } = eventData;
    console.log(`New user created: ${user.name} (${user.email})`);

    // 发送欢迎邮件
    await this.sendWelcomeEmail(user.email);
  }

  @EventListener('user.updated')
  async onUserUpdated(eventData: any): Promise<void> {
    const { args, result } = eventData;
    const [userId, updateData] = args;

    console.log(`User ${userId} updated:`, updateData);

    // 清除缓存
    await this.clearUserCache(userId);
  }

  private async sendWelcomeEmail(email: string): Promise<void> {
    // 发送欢迎邮件逻辑
  }

  private async clearUserCache(userId: string): Promise<void> {
    // 清除用户缓存逻辑
  }
}
```

## 4. 消息中间件

### 中间件处理

框架使用 `compose` 函数来组合中间件，提供类似 Koa 的中间件机制。

```typescript
import { compose } from '@istock-shell/iswork';

// 中间件执行函数
async function executeMiddlewares(
  middlewares: Middleware[],
  context: MessageContext,
  handler: () => Promise<any>
): Promise<any> {
  // 将处理函数作为最后一个中间件
  const allMiddlewares = [
    ...middlewares,
    async (ctx: MessageContext, next: Function) => {
      return await handler();
    },
  ];

  // 使用compose函数组合中间件
  const composedMiddleware = compose(allMiddlewares);
  return await composedMiddleware(context);
}

// 中间件类型定义
type Middleware = (context: MessageContext, next: () => Promise<any>) => Promise<any>;

// 消息处理器中的中间件使用
class MessageHandler {
  constructor(
    private router: MessageRouter,
    private middlewares: Middleware[],
    private errorHandler: ErrorHandler
  ) {}

  async handle(message: CmdpMessage): Promise<any> {
    const context = this.createContext(message);

    return await this.executeMiddlewares(this.middlewares, context, async () => {
      // 路由到控制器方法
      return await this.router.route(context);
    });
  }

  private async executeMiddlewares(
    middlewares: Middleware[],
    context: MessageContext,
    handler: () => Promise<any>
  ): Promise<any> {
    const allMiddlewares = [
      ...middlewares,
      async (ctx: MessageContext, next: Function) => {
        return await handler();
      },
    ];

    const composedMiddleware = compose(allMiddlewares);
    return await composedMiddleware(context);
  }
}
```

### 常用中间件

```typescript
// 日志中间件
const loggingMiddleware: Middleware = async (context, next) => {
  const { message, startTime } = context;
  const logger = container.resolve('LOGGER');

  logger.info(`[${message.meta?.requestId}] Processing: ${message.address}`);

  try {
    const result = await next();
    const duration = Date.now() - startTime;
    logger.info(`[${message.meta?.requestId}] Completed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(`[${message.meta?.requestId}] Failed after ${duration}ms:`, error.message);
    throw error;
  }
};

// 认证中间件
const authMiddleware: Middleware = async (context, next) => {
  const { message } = context;
  const token = message.meta?.token || message.headers?.['Authorization'];

  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const authService = container.resolve('AUTH_SERVICE');
    const user = await authService.validateToken(token);
    context.set('currentUser', user);

    return await next();
  } catch (error) {
    throw new Error('Invalid authentication token');
  }
};

// 权限中间件
const permissionMiddleware = (requiredPermission: string): Middleware => {
  return async (context, next) => {
    const currentUser = context.get('currentUser');

    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    if (!currentUser.hasPermission(requiredPermission)) {
      throw new Error(`Permission denied: ${requiredPermission}`);
    }

    return await next();
  };
};

// 限流中间件
const rateLimitMiddleware = (maxRequests: number, windowMs: number): Middleware => {
  const requests = new Map<string, number[]>();

  return async (context, next) => {
    const { message } = context;
    const clientId = message.meta?.userId || message.meta?.sessionId || 'anonymous';
    const now = Date.now();

    if (!requests.has(clientId)) {
      requests.set(clientId, []);
    }

    const clientRequests = requests.get(clientId)!;

    // 清除过期请求
    const validRequests = clientRequests.filter((time) => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      throw new Error('Rate limit exceeded');
    }

    validRequests.push(now);
    requests.set(clientId, validRequests);

    return await next();
  };
};

// 缓存中间件
const cacheMiddleware = (ttl: number = 3600): Middleware => {
  return async (context, next) => {
    const { message } = context;
    const cacheService = container.resolve('CACHE_SERVICE');

    // 生成缓存键
    const cacheKey = `msg:${message.address}:${JSON.stringify(message.payload)}`;

    // 尝试从缓存获取
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      context.set('fromCache', true);
      return cached;
    }

    // 执行处理逻辑
    const result = await next();

    // 缓存结果
    if (result !== undefined) {
      await cacheService.set(cacheKey, result, ttl);
    }

    return result;
  };
};

// 验证中间件
const validationMiddleware: Middleware = async (context, next) => {
  const { message, parsedAddress } = context;

  // 验证消息格式
  if (!message.address) {
    throw new Error('Message address is required');
  }

  // 验证地址格式
  if (!parsedAddress.path) {
    throw new Error('Invalid message address format');
  }

  // 验证payload（如果需要）
  if (message.payload !== undefined) {
    await validatePayload(message.payload, parsedAddress.path);
  }

  return await next();
};

// 错误处理中间件
const errorHandlingMiddleware: Middleware = async (context, next) => {
  try {
    return await next();
  } catch (error) {
    const logger = container.resolve('LOGGER');
    const { message } = context;

    // 记录错误
    logger.error('Message processing error:', {
      address: message.address,
      error: error.message,
      stack: error.stack,
      requestId: message.meta?.requestId,
    });

    // 返回标准化错误响应
    return {
      error: {
        message: error.message,
        code: error.code || 'INTERNAL_ERROR',
        timestamp: Date.now(),
        requestId: message.meta?.requestId,
      },
    };
  }
};
```

## 5. 消息客户端

### 消息发送器

```typescript
class MessageSender {
  constructor(
    private worker: Worker,
    private eventBus: EventBus
  ) {}

  // 发送命令消息
  async send<T = any>(address: string, payload?: any, options?: SendOptions): Promise<T> {
    const message: CmdpMessage = {
      address,
      payload,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...options?.meta,
      },
      headers: options?.headers,
      options: {
        async: false,
        ...options,
      },
    };

    return new Promise((resolve, reject) => {
      const timeout = options?.timeout || 30000;
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timeout: ${address}`));
      }, timeout);

      const handleResponse = (event: MessageEvent) => {
        const response = event.data;

        if (response.requestId === message.meta?.requestId) {
          clearTimeout(timeoutId);
          this.worker.removeEventListener('message', handleResponse);

          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.data);
          }
        }
      };

      this.worker.addEventListener('message', handleResponse);
      this.worker.postMessage(message);
    });
  }

  // 发送异步消息
  async sendAsync(address: string, payload?: any, options?: SendOptions): Promise<string> {
    const message: CmdpMessage = {
      address,
      payload,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: Date.now(),
        ...options?.meta,
      },
      headers: options?.headers,
      options: {
        async: true,
        ...options,
      },
    };

    this.worker.postMessage(message);
    return message.meta!.requestId!;
  }

  // 发送事件消息
  async emit(event: string, data?: any): Promise<void> {
    const address = `event://@events.app:8080/EventController.${event}`;
    await this.sendAsync(address, data);
  }

  // 批量发送
  async sendBatch<T = any>(messages: BatchMessage[], options?: BatchOptions): Promise<T[]> {
    const batchId = crypto.randomUUID();
    const batchMessage: CmdpMessage = {
      address: 'cmdp://@batch.app:8080/BatchController.process',
      payload: {
        batchId,
        messages,
        options,
      },
      meta: {
        requestId: batchId,
        timestamp: Date.now(),
      },
    };

    return await this.send(batchMessage.address, batchMessage.payload);
  }
}

interface SendOptions {
  timeout?: number;
  retries?: number;
  meta?: Partial<MessageMeta>;
  headers?: Record<string, string>;
  cache?: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

interface BatchMessage {
  address: string;
  payload?: any;
  meta?: Partial<MessageMeta>;
}

interface BatchOptions {
  parallel?: boolean;
  failFast?: boolean;
  timeout?: number;
}
```

### 消息客户端封装

```typescript
// 用户服务客户端
class UserServiceClient {
  constructor(private messageSender: MessageSender) {}

  async getUser(id: string): Promise<User> {
    return await this.messageSender.send('cmdp://@user.app:8080/UserController.getUser', { id });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    return await this.messageSender.send('cmdp://@user.app:8080/UserController.createUser', userData);
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    return await this.messageSender.send('cmdp://@user.app:8080/UserController.updateUser', { id, data: updateData });
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.messageSender.send('cmdp://@user.app:8080/UserController.deleteUser', { id });
  }

  async searchUsers(criteria: SearchCriteria): Promise<SearchResult<User>> {
    return await this.messageSender.send('cmdp://@user.app:8080/UserController.searchUsers', criteria);
  }
}

// 自动生成客户端
function createServiceClient<T>(serviceName: string, methods: string[]): T {
  const client: any = {};

  for (const method of methods) {
    client[method] = async (...args: any[]) => {
      const address = `cmdp://@${serviceName}.app:8080/${serviceName}Controller.${method}`;
      const payload = args.length === 1 ? args[0] : args;

      return await messageSender.send(address, payload);
    };
  }

  return client as T;
}

// 使用示例
const userClient = createServiceClient<UserServiceClient>('user', [
  'getUser',
  'createUser',
  'updateUser',
  'deleteUser',
  'searchUsers',
]);
```

## 6. 性能优化

### 消息缓存

```typescript
class MessageCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number = 1000;
  private defaultTtl: number = 3600000; // 1小时

  set(key: string, value: any, ttl?: number): void {
    // 清理过期缓存
    this.cleanup();

    // 如果缓存已满，删除最旧的条目
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    const entry: CacheEntry = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl,
    };

    this.cache.set(key, entry);
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // 检查是否过期
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();

    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

interface CacheEntry {
  value: any;
  timestamp: number;
  ttl: number;
}
```

### 消息批处理

```typescript
class MessageBatcher {
  private batches: Map<string, BatchInfo> = new Map();
  private batchSize: number = 10;
  private batchTimeout: number = 100; // 100ms

  async addToBatch(batchKey: string, message: CmdpMessage): Promise<any> {
    let batch = this.batches.get(batchKey);

    if (!batch) {
      batch = {
        messages: [],
        promises: [],
        timer: null,
      };
      this.batches.set(batchKey, batch);
    }

    return new Promise((resolve, reject) => {
      batch!.messages.push(message);
      batch!.promises.push({ resolve, reject });

      // 如果达到批次大小，立即处理
      if (batch!.messages.length >= this.batchSize) {
        this.processBatch(batchKey);
      } else if (!batch!.timer) {
        // 设置超时处理
        batch!.timer = setTimeout(() => {
          this.processBatch(batchKey);
        }, this.batchTimeout);
      }
    });
  }

  private async processBatch(batchKey: string): Promise<void> {
    const batch = this.batches.get(batchKey);
    if (!batch || batch.messages.length === 0) {
      return;
    }

    // 清除定时器
    if (batch.timer) {
      clearTimeout(batch.timer);
    }

    // 移除批次
    this.batches.delete(batchKey);

    try {
      // 处理批次消息
      const results = await this.handleBatch(batch.messages);

      // 解析Promise
      for (let i = 0; i < batch.promises.length; i++) {
        batch.promises[i].resolve(results[i]);
      }
    } catch (error) {
      // 拒绝所有Promise
      for (const promise of batch.promises) {
        promise.reject(error);
      }
    }
  }

  private async handleBatch(messages: CmdpMessage[]): Promise<any[]> {
    // 实现批处理逻辑
    const results: any[] = [];

    for (const message of messages) {
      try {
        const result = await this.handleSingleMessage(message);
        results.push(result);
      } catch (error) {
        results.push({ error: error.message });
      }
    }

    return results;
  }

  private async handleSingleMessage(message: CmdpMessage): Promise<any> {
    // 处理单个消息
    const messageHandler = container.resolve('MESSAGE_HANDLER');
    return await messageHandler.handleMessage(message);
  }
}

interface BatchInfo {
  messages: CmdpMessage[];
  promises: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }>;
  timer: NodeJS.Timeout | null;
}
```

## 7. 最佳实践

### 消息设计原则

```typescript
// 1. 使用语义化的地址
// 好的例子
'cmdp://@user.app:8080/UserController.getProfile';
'cmdp://@order.app:8080/OrderController.createOrder';
'event://@notification.app:8080/NotificationController.userRegistered';

// 避免的例子
'cmdp://app/u/get';
'cmdp://service1/method1';

// 2. 合理使用元数据
const message: CmdpMessage = {
  address: 'cmdp://@user.app:8080/UserController.updateProfile',
  payload: {
    name: 'John Doe',
    email: 'john@example.com',
  },
  meta: {
    requestId: 'req-123',
    userId: 'user-456',
    timestamp: Date.now(),
    priority: 'normal',
    timeout: 5000,
  },
};

// 3. 错误处理
class UserController {
  async getUser(@Payload('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundError(`User not found: ${id}`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError('Failed to get user', error);
    }
  }
}

// 4. 使用类型安全的客户端
interface UserServiceClient {
  getUser(id: string): Promise<User>;
  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(id: string, updateData: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
}

const userClient: UserServiceClient = createServiceClient('user', [
  'getUser',
  'createUser',
  'updateUser',
  'deleteUser',
]);
```

### 性能优化建议

```typescript
// 1. 使用消息缓存
@Controller({ alias: 'user' })
class UserController {
  @Cache({ ttl: 300 }) // 缓存5分钟
  async getUser(@Payload('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }
}

// 2. 批量操作
class UserController {
  async batchGetUsers(@Payload('ids') ids: string[]): Promise<User[]> {
    // 批量获取用户，而不是循环单个获取
    return await this.userService.findByIds(ids);
  }
}

// 3. 异步处理
class NotificationController {
  @Method()
  async sendNotification(@Payload() notification: NotificationDto): Promise<void> {
    // 异步处理，不阻塞响应
    await this.notificationService.send(notification);
  }
}

// 4. 消息压缩
const compressedMessage: CmdpMessage = {
  address: 'cmdp://@data.app:8080/DataController.process',
  payload: largeData,
  options: {
    compress: true, // 启用压缩
  },
};
```

### 监控和调试

```typescript
// 消息监控中间件
const monitoringMiddleware: Middleware = async (context, next) => {
  const { message, startTime } = context;
  const monitor = container.resolve('MONITOR');

  // 记录开始
  monitor.recordStart(message.address, {
    requestId: message.meta?.requestId,
    payload: message.payload,
    timestamp: startTime,
  });

  try {
    const result = await next();
    const duration = Date.now() - startTime;

    // 记录成功
    monitor.recordSuccess(message.address, {
      requestId: message.meta?.requestId,
      duration,
      result,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    // 记录失败
    monitor.recordError(message.address, {
      requestId: message.meta?.requestId,
      duration,
      error: error.message,
    });

    throw error;
  }
};

// 调试工具
class MessageDebugger {
  private messages: DebugMessage[] = [];
  private maxMessages: number = 1000;

  recordMessage(message: CmdpMessage, result?: any, error?: Error): void {
    const debugMessage: DebugMessage = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      message,
      result,
      error: error?.message,
      duration: 0, // 需要在中间件中计算
    };

    this.messages.push(debugMessage);

    // 保持消息数量在限制内
    if (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
  }

  getMessages(filter?: MessageFilter): DebugMessage[] {
    let filtered = this.messages;

    if (filter) {
      if (filter.address) {
        filtered = filtered.filter((m) => m.message.address.includes(filter.address!));
      }

      if (filter.hasError !== undefined) {
        filtered = filtered.filter((m) => !!m.error === filter.hasError);
      }

      if (filter.since) {
        filtered = filtered.filter((m) => m.timestamp >= filter.since!);
      }
    }

    return filtered;
  }
}

interface DebugMessage {
  id: string;
  timestamp: number;
  message: CmdpMessage;
  result?: any;
  error?: string;
  duration: number;
}

interface MessageFilter {
  address?: string;
  hasError?: boolean;
  since?: number;
}
```

通过合理使用消息通信系统，可以构建出高效、可靠、可扩展的分布式应用架构。框架提供的CMDP协议和事件系统为复杂的业务场景提供了强大的支持。
