# 中间件和管道系统

本文档详细介绍 `@istock-shell/iswork` 框架的中间件系统和处理管道，包括中间件的创建、配置、执行流程和最佳实践。

## 概述

中间件系统是框架的核心组件之一，提供了一种灵活的方式来处理横切关注点，如认证、授权、日志记录、缓存、验证等。中间件采用洋葱模型（Onion Model）的执行方式，确保请求和响应都能被正确处理。

### 核心特性

- **洋葱模型**：请求从外到内，响应从内到外
- **异步支持**：完全支持异步中间件
- **类型安全**：完整的TypeScript支持
- **灵活配置**：支持全局、路由级别和方法级别的中间件
- **依赖注入**：中间件可以使用依赖注入
- **错误处理**：统一的错误处理机制
- **性能优化**：中间件缓存和优化执行

## 1. 中间件基础

### 中间件接口

```typescript
// 基础中间件接口
interface Middleware {
  (context: MiddlewareContext, next: NextFunction): Promise<any> | any;
}

type NextFunction = () => Promise<any>;

// 中间件上下文
interface MiddlewareContext {
  // 消息相关
  message: CmdpMessage;
  parsedAddress: ParsedAddress;

  // 响应相关
  response?: any;

  // 元数据
  metadata: Map<string, any>;

  // 时间信息
  startTime: number;

  // 工具方法
  set(key: string, value: any): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;

  // 状态管理
  state: Record<string, any>;

  // 服务访问
  services: ServiceContainer;
}

// 解析后的地址
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

### 简单中间件示例

```typescript
// 日志中间件
const loggingMiddleware: Middleware = async (context, next) => {
  const { message, startTime } = context;
  const logger = context.services.get('Logger');

  logger.info(`[${message.meta?.requestId}] Start: ${message.address}`);

  try {
    const result = await next();
    const duration = Date.now() - startTime;
    logger.info(`[${message.meta?.requestId}] Success: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(`[${message.meta?.requestId}] Error: ${duration}ms`, error);
    throw error;
  }
};

// 计时中间件
const timingMiddleware: Middleware = async (context, next) => {
  const start = performance.now();

  try {
    const result = await next();
    const duration = performance.now() - start;
    context.set('duration', duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    context.set('duration', duration);
    throw error;
  }
};

// 请求ID中间件
const requestIdMiddleware: Middleware = async (context, next) => {
  if (!context.message.meta?.requestId) {
    context.message.meta = {
      ...context.message.meta,
      requestId: crypto.randomUUID(),
    };
  }

  context.set('requestId', context.message.meta.requestId);
  return await next();
};
```

## 2. 中间件配置

### 域级中间件配置

```typescript
// 域级中间件配置
import { Domain, Middleware } from '@istock-shell/iswork';

// 定义域级中间件
const domainMiddlewares: Middleware[] = [loggingMiddleware, authMiddleware, validationMiddleware];

@Domain({
  alias: 'user-service',
  middlewares: domainMiddlewares,
})
class UserDomain {
  // 域实现
}

// 控制器示例
@Controller({ alias: 'user' })
class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async getUser(@Payload('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  async createUser(@Payload() userData: CreateUserDto): Promise<User> {
    return await this.userService.create(userData);
  }

  async updateUser(@Payload('id') id: string, @Payload('data') updateData: UpdateUserDto): Promise<User> {
    return await this.userService.update(id, updateData);
  }
}
```

### 常用中间件示例

```typescript
// 日志中间件
import { Middleware } from '@istock-shell/iswork';

export const loggingMiddleware: Middleware = async (context, next) => {
  const { message, parsedAddress } = context;
  const startTime = Date.now();

  console.log(`[${new Date().toISOString()}] ${parsedAddress.domain}/${parsedAddress.path}`);

  try {
    const result = await next();
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Completed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${new Date().toISOString()}] Error after ${duration}ms:`, error.message);
    throw error;
  }
};

// 错误处理中间件
export const errorHandlerMiddleware: Middleware = async (context, next) => {
  try {
    return await next();
  } catch (error) {
    // 记录错误
    console.error('Middleware error:', error);

    // 根据错误类型返回不同的响应
    if (error.name === 'ValidationError') {
      throw new Error(`验证失败: ${error.message}`);
    } else if (error.name === 'UnauthorizedError') {
      throw new Error('未授权访问');
    } else {
      throw new Error('服务器内部错误');
    }
  }
};

// 权限中间件工厂函数
function createPermissionMiddleware(requiredPermission: string): Middleware {
  return async (context: MiddlewareContext, next: NextFunction) => {
    const currentUser = context.get('currentUser');

    if (!currentUser) {
      throw new UnauthorizedError('User not authenticated');
    }

    const permissionService = context.services.get('PermissionService');
    const logger = context.services.get('Logger');

    const hasPermission = await permissionService.checkPermission(currentUser.id, requiredPermission);

    if (!hasPermission) {
      logger.warn(`Permission denied: ${currentUser.id} -> ${requiredPermission}`);
      throw new ForbiddenError(`Permission denied: ${requiredPermission}`);
    }

    logger.debug(`Permission granted: ${currentUser.id} -> ${requiredPermission}`);

    return await next();
  };
}

// 验证中间件工厂函数
function createValidationMiddleware(schema: ValidationSchema): Middleware {
  return async (context: MiddlewareContext, next: NextFunction) => {
    const { message } = context;

    try {
      const validator = context.services.get('Validator');

      // 验证payload
      if (message.payload && schema.payload) {
        await validator.validate(message.payload, schema.payload);
      }

      // 验证查询参数
      if (context.parsedAddress.query && schema.query) {
        await validator.validate(context.parsedAddress.query, schema.query);
      }

      // 验证元数据
      if (message.meta && schema.meta) {
        await validator.validate(message.meta, schema.meta);
      }

      return await next();
    } catch (error) {
      throw new ValidationError('Validation failed', error.details);
    }
  };
}

interface ValidationSchema {
  payload?: any;
  query?: any;
  meta?: any;
}
```

## 3. 中间件组合

### compose 函数

框架使用 `compose` 函数来组合多个中间件，类似于 Koa 的中间件机制。

```typescript
import { compose } from '@istock-shell/iswork';

// 组合中间件
const composedMiddleware = compose([loggingMiddleware, errorHandlerMiddleware, authMiddleware, validationMiddleware]);

// 手动执行中间件链
async function executeMiddlewares(context: MiddlewareContext) {
  return await composedMiddleware(context);
}

// 在域中使用
@Domain({
  alias: 'user-service',
  middlewares: [loggingMiddleware, errorHandlerMiddleware, authMiddleware],
})
class UserDomain {
  // 域实现
}
```

### 中间件执行流程

中间件的执行遵循洋葱模型，每个中间件都可以在请求处理前后执行逻辑。

```typescript
// 中间件执行示例
const executeMiddlewares = async (context: MiddlewareContext, handler: Function) => {
  // 获取域级中间件
  const domainMiddlewares = context.domain.middlewares || [];

  // 组合所有中间件
  const allMiddlewares = [
    ...domainMiddlewares,
    // 最后执行实际的处理函数
    async (ctx: MiddlewareContext, next: Function) => {
      return await handler(ctx);
    }
  ];

  // 使用compose函数组合并执行
  const composedMiddleware = compose(allMiddlewares);
  return await composedMiddleware(context);
};

// 中间件执行顺序示例
const middlewareStack = [
  // 1. 日志中间件 - 开始
  loggingMiddleware,
  // 2. 错误处理中间件 - 包装
  errorHandlerMiddleware,
  // 3. 认证中间件 - 验证
  authMiddleware,
  // 4. 验证中间件 - 数据验证
  validationMiddleware
  // 5. 控制器方法 - 业务逻辑
];

// 执行流程:
// logging start -> error wrapper -> auth check -> validation ->
// controller method -> validation end -> auth end -> error end -> logging end
}
```

## 4. 内置中间件

### 认证和授权中间件

```typescript
// JWT认证中间件
const jwtAuthMiddleware: Middleware = async (context, next) => {
  const { message } = context;
  const token = extractToken(message);

  if (!token) {
    throw new UnauthorizedError('JWT token required');
  }

  try {
    const jwtService = context.services.get('JwtService');
    const payload = await jwtService.verify(token);

    context.set('jwtPayload', payload);
    context.set('currentUser', payload.user);

    return await next();
  } catch (error) {
    throw new UnauthorizedError('Invalid JWT token');
  }
};

// API密钥认证中间件
const apiKeyAuthMiddleware: Middleware = async (context, next) => {
  const { message } = context;
  const apiKey = message.headers?.['X-API-Key'] || message.meta?.apiKey;

  if (!apiKey) {
    throw new UnauthorizedError('API key required');
  }

  const apiKeyService = context.services.get('ApiKeyService');
  const isValid = await apiKeyService.validate(apiKey);

  if (!isValid) {
    throw new UnauthorizedError('Invalid API key');
  }

  const apiKeyInfo = await apiKeyService.getInfo(apiKey);
  context.set('apiKey', apiKeyInfo);

  return await next();
};

// 基于角色的访问控制中间件
function rbacMiddleware(requiredRoles: string[]): Middleware {
  return async (context, next) => {
    const currentUser = context.get('currentUser');

    if (!currentUser) {
      throw new UnauthorizedError('User not authenticated');
    }

    const userRoles = currentUser.roles || [];
    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
      throw new ForbiddenError(`Required roles: ${requiredRoles.join(', ')}`);
    }

    return await next();
  };
}

function extractToken(message: CmdpMessage): string | null {
  // 从Authorization头提取
  const authHeader = message.headers?.['Authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // 从meta提取
  if (message.meta?.token) {
    return message.meta.token;
  }

  // 从查询参数提取
  if (message.meta?.query?.token) {
    return message.meta.query.token;
  }

  return null;
}
```

### 缓存中间件

```typescript
// 响应缓存中间件
function cacheMiddleware(options: CacheOptions = {}): Middleware {
  return async (context, next) => {
    const { ttl = 3600, keyGenerator = defaultKeyGenerator, condition = () => true, storage = 'memory' } = options;

    // 检查是否应该缓存
    if (!condition(context)) {
      return await next();
    }

    const cacheService = context.services.get('CacheService');
    const cacheKey = keyGenerator(context);

    // 尝试从缓存获取
    const cached = await cacheService.get(cacheKey, storage);
    if (cached !== null) {
      context.set('fromCache', true);
      return cached;
    }

    // 执行处理逻辑
    const result = await next();

    // 缓存结果
    if (result !== undefined) {
      await cacheService.set(cacheKey, result, ttl, storage);
    }

    return result;
  };
}

// 默认缓存键生成器
function defaultKeyGenerator(context: MiddlewareContext): string {
  const { message, parsedAddress } = context;

  const parts = [
    'cache',
    parsedAddress.path,
    JSON.stringify(message.payload || {}),
    JSON.stringify(parsedAddress.query || {}),
  ];

  return parts.join(':');
}

// 缓存失效中间件
function cacheInvalidationMiddleware(patterns: string[]): Middleware {
  return async (context, next) => {
    const result = await next();

    // 执行成功后失效相关缓存
    const cacheService = context.services.get('CacheService');

    for (const pattern of patterns) {
      await cacheService.invalidatePattern(pattern);
    }

    return result;
  };
}

interface CacheOptions {
  ttl?: number;
  keyGenerator?: (context: MiddlewareContext) => string;
  condition?: (context: MiddlewareContext) => boolean;
  storage?: 'memory' | 'redis' | 'file';
}
```

### 限流中间件

```typescript
// 基于令牌桶的限流中间件
function rateLimitMiddleware(options: RateLimitOptions): Middleware {
  const {
    maxRequests = 100,
    windowMs = 60000,
    keyGenerator = defaultRateLimitKeyGenerator,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  const buckets = new Map<string, TokenBucket>();

  return async (context, next) => {
    const key = keyGenerator(context);

    if (!buckets.has(key)) {
      buckets.set(key, new TokenBucket(maxRequests, windowMs));
    }

    const bucket = buckets.get(key)!;

    if (!bucket.consume()) {
      throw new TooManyRequestsError('Rate limit exceeded');
    }

    try {
      const result = await next();

      // 如果配置跳过成功请求，则返还令牌
      if (skipSuccessfulRequests) {
        bucket.refund();
      }

      return result;
    } catch (error) {
      // 如果配置跳过失败请求，则返还令牌
      if (skipFailedRequests) {
        bucket.refund();
      }

      throw error;
    }
  };
}

// 令牌桶实现
class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number // 每毫秒补充的令牌数
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  consume(): boolean {
    this.refill();

    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }

    return false;
  }

  refund(): void {
    if (this.tokens < this.capacity) {
      this.tokens++;
    }
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = Math.floor((timePassed * this.refillRate) / 1000);

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}

function defaultRateLimitKeyGenerator(context: MiddlewareContext): string {
  const currentUser = context.get('currentUser');
  if (currentUser) {
    return `user:${currentUser.id}`;
  }

  const apiKey = context.get('apiKey');
  if (apiKey) {
    return `apikey:${apiKey.id}`;
  }

  // 回退到IP地址（如果可用）
  const clientIp = context.message.meta?.clientIp;
  if (clientIp) {
    return `ip:${clientIp}`;
  }

  return 'anonymous';
}

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
  keyGenerator?: (context: MiddlewareContext) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}
```

### 验证中间件

```typescript
// JSON Schema验证中间件
function jsonSchemaValidationMiddleware(schema: any): Middleware {
  return async (context, next) => {
    const { message } = context;
    const validator = context.services.get('JsonSchemaValidator');

    try {
      await validator.validate(message.payload, schema);
      return await next();
    } catch (error) {
      throw new ValidationError('Payload validation failed', error.errors);
    }
  };
}

// 自定义验证中间件
function customValidationMiddleware(
  validator: (payload: any, context: MiddlewareContext) => Promise<void>
): Middleware {
  return async (context, next) => {
    await validator(context.message.payload, context);
    return await next();
  };
}

// 文件上传验证中间件
function fileUploadValidationMiddleware(options: FileUploadOptions): Middleware {
  return async (context, next) => {
    const { message } = context;
    const files = message.payload?.files;

    if (!files || !Array.isArray(files)) {
      return await next();
    }

    for (const file of files) {
      // 检查文件大小
      if (options.maxSize && file.size > options.maxSize) {
        throw new ValidationError(`File too large: ${file.name}`);
      }

      // 检查文件类型
      if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
        throw new ValidationError(`File type not allowed: ${file.type}`);
      }

      // 检查文件扩展名
      if (options.allowedExtensions) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (!ext || !options.allowedExtensions.includes(ext)) {
          throw new ValidationError(`File extension not allowed: ${ext}`);
        }
      }
    }

    return await next();
  };
}

interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
}
```

## 5. 错误处理中间件

### 全局错误处理

```typescript
// 全局错误处理中间件
const globalErrorHandlerMiddleware: Middleware = async (context, next) => {
  try {
    return await next();
  } catch (error) {
    const logger = context.services.get('Logger');
    const errorHandler = context.services.get('ErrorHandler');

    // 记录错误
    logger.error('Unhandled error in middleware pipeline:', {
      error: error.message,
      stack: error.stack,
      address: context.message.address,
      requestId: context.message.meta?.requestId,
    });

    // 处理错误
    return await errorHandler.handle(error, context);
  }
};

// 错误转换中间件
const errorTransformMiddleware: Middleware = async (context, next) => {
  try {
    return await next();
  } catch (error) {
    // 转换已知错误类型
    if (error.name === 'ValidationError') {
      throw new BadRequestError(error.message, error.details);
    }

    if (error.name === 'NotFoundError') {
      throw new NotFoundError(error.message);
    }

    if (error.name === 'UnauthorizedError') {
      throw new UnauthorizedError(error.message);
    }

    // 未知错误转换为内部服务器错误
    throw new InternalServerError('An unexpected error occurred');
  }
};

// 错误恢复中间件
function errorRecoveryMiddleware(recoveryStrategies: RecoveryStrategy[]): Middleware {
  return async (context, next) => {
    try {
      return await next();
    } catch (error) {
      // 尝试恢复策略
      for (const strategy of recoveryStrategies) {
        if (strategy.canRecover(error, context)) {
          try {
            return await strategy.recover(error, context);
          } catch (recoveryError) {
            // 恢复失败，继续尝试下一个策略
            continue;
          }
        }
      }

      // 所有恢复策略都失败，重新抛出原始错误
      throw error;
    }
  };
}

interface RecoveryStrategy {
  canRecover(error: Error, context: MiddlewareContext): boolean;
  recover(error: Error, context: MiddlewareContext): Promise<any>;
}

// 重试恢复策略
class RetryRecoveryStrategy implements RecoveryStrategy {
  constructor(
    private maxRetries: number = 3,
    private retryDelay: number = 1000
  ) {}

  canRecover(error: Error, context: MiddlewareContext): boolean {
    // 只对特定类型的错误进行重试
    return error.name === 'TimeoutError' || error.name === 'NetworkError' || error.name === 'ServiceUnavailableError';
  }

  async recover(error: Error, context: MiddlewareContext): Promise<any> {
    const retryCount = context.get('retryCount') || 0;

    if (retryCount >= this.maxRetries) {
      throw error;
    }

    // 等待重试延迟
    await new Promise((resolve) => setTimeout(resolve, this.retryDelay * (retryCount + 1)));

    // 增加重试计数
    context.set('retryCount', retryCount + 1);

    // 重新执行
    throw new RetryError('Retry required');
  }
}

// 降级恢复策略
class FallbackRecoveryStrategy implements RecoveryStrategy {
  constructor(private fallbackHandler: (error: Error, context: MiddlewareContext) => Promise<any>) {}

  canRecover(error: Error, context: MiddlewareContext): boolean {
    return true; // 可以作为最后的降级策略
  }

  async recover(error: Error, context: MiddlewareContext): Promise<any> {
    return await this.fallbackHandler(error, context);
  }
}
```

## 6. 性能监控中间件

### 性能指标收集

```typescript
// 性能监控中间件
const performanceMonitoringMiddleware: Middleware = async (context, next) => {
  const startTime = performance.now();
  const startMemory = process.memoryUsage();

  const metricsCollector = context.services.get('MetricsCollector');
  const requestId = context.message.meta?.requestId;

  try {
    const result = await next();

    // 收集成功指标
    const endTime = performance.now();
    const endMemory = process.memoryUsage();

    const metrics = {
      requestId,
      address: context.message.address,
      duration: endTime - startTime,
      memoryUsed: endMemory.heapUsed - startMemory.heapUsed,
      status: 'success',
      timestamp: Date.now(),
    };

    await metricsCollector.record(metrics);

    return result;
  } catch (error) {
    // 收集错误指标
    const endTime = performance.now();
    const endMemory = process.memoryUsage();

    const metrics = {
      requestId,
      address: context.message.address,
      duration: endTime - startTime,
      memoryUsed: endMemory.heapUsed - startMemory.heapUsed,
      status: 'error',
      errorType: error.constructor.name,
      errorMessage: error.message,
      timestamp: Date.now(),
    };

    await metricsCollector.record(metrics);

    throw error;
  }
};

// 慢查询检测中间件
function slowQueryDetectionMiddleware(threshold: number = 1000): Middleware {
  return async (context, next) => {
    const startTime = performance.now();

    try {
      const result = await next();

      const duration = performance.now() - startTime;
      if (duration > threshold) {
        const logger = context.services.get('Logger');
        logger.warn('Slow query detected:', {
          address: context.message.address,
          duration,
          threshold,
          requestId: context.message.meta?.requestId,
        });
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      if (duration > threshold) {
        const logger = context.services.get('Logger');
        logger.warn('Slow failed query detected:', {
          address: context.message.address,
          duration,
          threshold,
          error: error.message,
          requestId: context.message.meta?.requestId,
        });
      }

      throw error;
    }
  };
}

// 内存使用监控中间件
function memoryMonitoringMiddleware(options: MemoryMonitoringOptions = {}): Middleware {
  const {
    threshold = 100 * 1024 * 1024, // 100MB
    alertCallback,
  } = options;

  return async (context, next) => {
    const startMemory = process.memoryUsage();

    try {
      const result = await next();

      const endMemory = process.memoryUsage();
      const memoryUsed = endMemory.heapUsed - startMemory.heapUsed;

      if (memoryUsed > threshold) {
        const logger = context.services.get('Logger');
        logger.warn('High memory usage detected:', {
          address: context.message.address,
          memoryUsed,
          threshold,
          requestId: context.message.meta?.requestId,
        });

        if (alertCallback) {
          await alertCallback({
            address: context.message.address,
            memoryUsed,
            threshold,
            context,
          });
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
}

interface MemoryMonitoringOptions {
  threshold?: number;
  alertCallback?: (alert: MemoryAlert) => Promise<void>;
}

interface MemoryAlert {
  address: string;
  memoryUsed: number;
  threshold: number;
  context: MiddlewareContext;
}
```

## 7. 最佳实践

### 中间件设计原则

```typescript
// 1. 单一职责原则
// 好的例子：专门处理认证的中间件
const authMiddleware: Middleware = async (context, next) => {
  // 只处理认证逻辑
  const token = extractToken(context.message);
  const user = await validateToken(token);
  context.set('currentUser', user);
  return await next();
};

// 避免的例子：混合多种职责
const badMiddleware: Middleware = async (context, next) => {
  // 认证
  const token = extractToken(context.message);
  const user = await validateToken(token);

  // 日志记录
  console.log('User authenticated:', user.id);

  // 权限检查
  if (!user.hasPermission('read')) {
    throw new Error('Permission denied');
  }

  // 缓存
  const cacheKey = generateCacheKey(context);
  const cached = await getFromCache(cacheKey);
  if (cached) return cached;

  return await next();
};

// 2. 错误处理
// 好的例子：适当的错误处理
const robustMiddleware: Middleware = async (context, next) => {
  try {
    const result = await someAsyncOperation();
    context.set('operationResult', result);
    return await next();
  } catch (error) {
    // 记录错误
    const logger = context.services.get('Logger');
    logger.error('Operation failed:', error);

    // 根据错误类型决定是否继续
    if (error instanceof CriticalError) {
      throw error;
    }

    // 非关键错误，设置默认值并继续
    context.set('operationResult', null);
    return await next();
  }
};

// 3. 性能考虑
// 好的例子：避免重复计算
const efficientMiddleware: Middleware = async (context, next) => {
  // 检查是否已经计算过
  if (context.has('expensiveResult')) {
    return await next();
  }

  // 只在需要时进行昂贵的计算
  const result = await expensiveOperation();
  context.set('expensiveResult', result);

  return await next();
};

// 4. 可配置性
// 好的例子：可配置的中间件
function configurableMiddleware(options: ConfigurableOptions): Middleware {
  const { enabled = true, timeout = 5000, retries = 3, onError = defaultErrorHandler } = options;

  return async (context, next) => {
    if (!enabled) {
      return await next();
    }

    // 使用配置选项
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new TimeoutError()), timeout);
    });

    try {
      return await Promise.race([next(), timeoutPromise]);
    } catch (error) {
      return await onError(error, context, retries);
    }
  };
}

interface ConfigurableOptions {
  enabled?: boolean;
  timeout?: number;
  retries?: number;
  onError?: (error: Error, context: MiddlewareContext, retries: number) => Promise<any>;
}
```

### 中间件组合模式

```typescript
// 中间件组合器
class MiddlewareComposer {
  static compose(...middlewares: Middleware[]): Middleware {
    return async (context, next) => {
      let index = 0;

      const dispatch = async (): Promise<any> => {
        if (index < middlewares.length) {
          const middleware = middlewares[index++];
          return await middleware(context, dispatch);
        } else {
          return await next();
        }
      };

      return await dispatch();
    };
  }

  static conditional(condition: (context: MiddlewareContext) => boolean, middleware: Middleware): Middleware {
    return async (context, next) => {
      if (condition(context)) {
        return await middleware(context, next);
      } else {
        return await next();
      }
    };
  }

  static parallel(...middlewares: Middleware[]): Middleware {
    return async (context, next) => {
      // 并行执行中间件（注意：这可能会导致副作用）
      const promises = middlewares.map((middleware) => middleware(context, async () => undefined));

      await Promise.all(promises);
      return await next();
    };
  }

  static retry(middleware: Middleware, maxRetries: number = 3, delay: number = 1000): Middleware {
    return async (context, next) => {
      let lastError: Error;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await middleware(context, next);
        } catch (error) {
          lastError = error;

          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, delay * (attempt + 1)));
          }
        }
      }

      throw lastError!;
    };
  }
}

// 使用示例
const composedMiddleware = MiddlewareComposer.compose(
  requestIdMiddleware,
  loggingMiddleware,
  MiddlewareComposer.conditional((context) => context.message.meta?.requiresAuth === true, authMiddleware),
  MiddlewareComposer.retry(externalServiceMiddleware, 3, 1000),
  cacheMiddleware({ ttl: 300 })
);
```

### 中间件测试

```typescript
// 中间件测试工具
class MiddlewareTestHelper {
  static createMockContext(overrides: Partial<MiddlewareContext> = {}): MiddlewareContext {
    const defaultContext: MiddlewareContext = {
      message: {
        address: 'cmdp://test.app:8080/TestController.testMethod',
        payload: {},
        meta: {
          requestId: 'test-request-id',
          timestamp: Date.now(),
        },
      },
      parsedAddress: {
        protocol: 'cmdp:',
        domain: 'test.app',
        port: 8080,
        path: 'TestController.testMethod',
        query: {},
      },
      metadata: new Map(),
      startTime: Date.now(),
      state: {},
      services: new MockServiceContainer(),

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

    return { ...defaultContext, ...overrides };
  }

  static async testMiddleware(
    middleware: Middleware,
    context: MiddlewareContext,
    nextHandler: () => Promise<any> = async () => 'next-result'
  ): Promise<any> {
    return await middleware(context, nextHandler);
  }
}

// 中间件测试示例
describe('AuthMiddleware', () => {
  let authMiddleware: Middleware;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      validateToken: jest.fn(),
    } as any;

    authMiddleware = createAuthMiddleware(mockAuthService);
  });

  it('should authenticate valid token', async () => {
    // Arrange
    const user = { id: 'user-123', name: 'Test User' };
    mockAuthService.validateToken.mockResolvedValue(user);

    const context = MiddlewareTestHelper.createMockContext({
      message: {
        address: 'cmdp://test.app:8080/TestController.testMethod',
        meta: { token: 'valid-token' },
      },
    });

    // Act
    const result = await MiddlewareTestHelper.testMiddleware(authMiddleware, context);

    // Assert
    expect(result).toBe('next-result');
    expect(context.get('currentUser')).toEqual(user);
    expect(mockAuthService.validateToken).toHaveBeenCalledWith('valid-token');
  });

  it('should throw error for invalid token', async () => {
    // Arrange
    mockAuthService.validateToken.mockRejectedValue(new Error('Invalid token'));

    const context = MiddlewareTestHelper.createMockContext({
      message: {
        address: 'cmdp://test.app:8080/TestController.testMethod',
        meta: { token: 'invalid-token' },
      },
    });

    // Act & Assert
    await expect(MiddlewareTestHelper.testMiddleware(authMiddleware, context)).rejects.toThrow(
      'Invalid authentication token'
    );
  });

  it('should throw error for missing token', async () => {
    // Arrange
    const context = MiddlewareTestHelper.createMockContext();

    // Act & Assert
    await expect(MiddlewareTestHelper.testMiddleware(authMiddleware, context)).rejects.toThrow(
      'Authentication token required'
    );
  });
});
```

通过合理使用中间件系统，可以构建出模块化、可维护、高性能的应用程序。中间件提供了一种优雅的方式来处理横切关注点，使业务逻辑更加清晰和专注。
