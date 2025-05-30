# 核心概念

本文档详细介绍 `@istock-shell/iswork` 框架的核心概念和架构设计。

## 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                        主线程 (UI)                          │
├─────────────────────────────────────────────────────────────┤
│                    MessageChannel                          │
├─────────────────────────────────────────────────────────────┤
│                   Web Worker 层                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                Application                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │    │
│  │  │   Domain    │  │   Domain    │  │   Domain    │  │    │
│  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │  │    │
│  │  │ │Controller│ │  │ │Controller│ │  │ │Controller│ │  │    │
│  │  │ │Service  │ │  │ │Service  │ │  │ │Service  │ │  │    │
│  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                IoC Container                        │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                ORM Layer                            │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │    │
│  │  │IndexedDB│  │  HTTP   │  │ Memory  │             │    │
│  │  └─────────┘  └─────────┘  └─────────┘             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 1. 应用程序（Application）

### 概念

`Application` 是框架的核心入口，负责管理整个应用的生命周期、消息路由、中间件处理等。

### 主要职责

- **生命周期管理**：应用启动、停止、重启等
- **消息路由**：根据CMDP地址路由到对应的控制器方法
- **中间件处理**：执行全局和局部中间件
- **事件管理**：应用级事件的发布和订阅
- **域管理**：管理注册的业务域

### 配置选项

```typescript
interface ApplicationOptions {
  domainPath: string; // 应用域路径
  middlewares?: Middleware[]; // 全局中间件
  emit?: (event: string, data: any) => void; // 事件发射器
}
```

### 使用示例

```typescript
const app = new Application({
  domainPath: 'my-app',
  middlewares: [
    // 日志中间件
    async (ctx, next) => {
      const start = Date.now();
      await next();
      const duration = Date.now() - start;
      console.log(`${ctx.message.address} - ${duration}ms`);
    },
    // 错误处理中间件
    async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        ctx.response = { error: error.message };
      }
    },
  ],
  emit: (event, data) => {
    console.log(`Event: ${event}`, data);
  },
});
```

## 2. 域（Domain）

### 概念

域是业务逻辑的组织单元，用于将相关的控制器、服务和配置组织在一起。每个域代表一个独立的业务模块。

### 设计原则

- **单一职责**：每个域专注于特定的业务领域
- **高内聚**：域内组件紧密相关
- **低耦合**：域间依赖最小化
- **可复用**：域可以在不同应用中复用

### 域元数据

```typescript
interface DomainMetadata {
  name: string; // 域名称
  description?: string; // 域描述
  version?: string; // 版本号
  dependencies?: string[]; // 依赖的其他域
}
```

### 使用示例

```typescript
@Domain({
  name: 'UserManagement',
  description: '用户管理域，负责用户相关的所有业务逻辑',
  version: '1.2.0',
  dependencies: ['Authentication', 'Notification'],
})
class UserDomain {
  // 域初始化逻辑
  async onInit() {
    console.log('UserDomain initialized');
  }

  // 域销毁逻辑
  async onDestroy() {
    console.log('UserDomain destroyed');
  }
}
```

## 3. 控制器（Controller）

### 概念

控制器是处理具体业务请求的组件，类似于传统Web框架中的控制器。每个控制器方法对应一个可调用的业务操作。

### 主要特性

- **路由映射**：通过CMDP地址映射到控制器方法
- **参数绑定**：自动从消息中提取和绑定参数
- **依赖注入**：自动注入所需的服务依赖
- **返回值处理**：自动序列化返回值

### 控制器元数据

```typescript
interface ControllerMetadata {
  alias?: string | string[]; // 控制器别名
  description?: string; // 控制器描述
  version?: string; // 版本号
}
```

### 使用示例

```typescript
@Controller({
  alias: ['user', 'users'],
  description: '用户管理控制器',
  version: '1.0.0',
})
class UserController {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  // 获取用户信息
  async getUser(@Payload('id') id: string) {
    return await this.userService.findById(id);
  }

  // 创建用户
  async createUser(@Payload() userData: CreateUserDto, @Meta('requestId') requestId: string) {
    const user = await this.userService.create(userData);
    await this.notificationService.sendWelcomeEmail(user.email);
    return { user, requestId };
  }

  // 批量操作
  async batchUpdate(@Payload('users') users: UpdateUserDto[], @Field('options') options: BatchOptions) {
    const results = [];
    for (const user of users) {
      const result = await this.userService.update(user.id, user);
      results.push(result);
    }
    return { results, total: results.length };
  }
}
```

## 4. 服务（Service）

### 概念

服务是封装业务逻辑的组件，可以被控制器或其他服务注入使用。服务通常是无状态的，专注于特定的业务功能。

### 设计原则

- **单一职责**：每个服务专注于特定功能
- **无状态**：服务本身不保存状态信息
- **可测试**：易于进行单元测试
- **可复用**：可以在多个控制器中使用

### 使用示例

```typescript
@Injectable()
class UserService {
  constructor(
    private userRepository: Repository,
    private cacheService: CacheService
  ) {}

  async findById(id: string): Promise<User | null> {
    // 先从缓存查找
    const cached = await this.cacheService.get(`user:${id}`);
    if (cached) {
      return cached;
    }

    // 从数据库查找
    const user = await this.userRepository.findOneById(User, id);
    if (user) {
      // 缓存结果
      await this.cacheService.set(`user:${id}`, user, 3600);
    }

    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    // 验证数据
    await this.validateUserData(userData);

    // 创建用户
    const userId = await this.userRepository.createOne(User, userData);
    const user = await this.userRepository.findOneById(User, userId);

    // 清除相关缓存
    await this.cacheService.delete('users:list');

    return user;
  }

  private async validateUserData(userData: CreateUserDto): Promise<void> {
    if (!userData.email || !userData.name) {
      throw new Error('Email and name are required');
    }

    const existingUser = await this.userRepository.query(User, {
      filter: ['email', 'eq', userData.email],
    });

    if (existingUser.length > 0) {
      throw new Error('Email already exists');
    }
  }
}
```

## 5. 依赖注入（IoC Container）

### 概念

依赖注入容器负责管理对象的创建、依赖关系的解析和生命周期的管理。

### 提供者类型

#### 类提供者（ClassProvider）

```typescript
{
  provide: UserService,
  useClass: UserService,
  scope: 'singleton' // 或 'transient'
}
```

#### 值提供者（ValueProvider）

```typescript
{
  provide: 'CONFIG',
  useValue: { apiUrl: 'https://api.example.com' }
}
```

#### 工厂提供者（FactoryProvider）

```typescript
{
  provide: 'DATABASE',
  useFactory: (config: Config) => {
    return new Database(config.connectionString);
  },
  inject: ['CONFIG']
}
```

### 作用域管理

- **全局作用域**：在整个应用中共享
- **域作用域**：在特定域中共享
- **请求作用域**：每个请求创建新实例

## 6. CMDP协议

### 概念

CMDP（Command Protocol）是框架专有的通信协议，用于在主线程和Web Worker之间传递消息。

### 地址格式

```
protocol://user@domain:port/Controller.method
```

- `protocol`：协议类型（cmdp、event等）
- `user`：用户标识（通常为控制器别名）
- `domain`：域名（应用的domainPath）
- `port`：端口号（通常为8080）
- `Controller.method`：目标控制器和方法

### 消息结构

```typescript
interface CmdpMessage {
  address: string; // 目标地址
  payload?: any; // 请求数据
  meta?: any; // 元数据
}
```

### 使用示例

```typescript
// 调用用户服务获取用户信息
const message = {
  address: 'cmdp://@user.my-app:8080/UserController.getUser',
  payload: { id: '123' },
  meta: { requestId: 'req-001', timestamp: Date.now() },
};

// 发送事件通知
const eventMessage = {
  address: 'event://@notification.my-app:8080/NotificationController.send',
  payload: {
    type: 'email',
    to: 'user@example.com',
    subject: 'Welcome!',
  },
  meta: { priority: 'high' },
};
```

## 7. 中间件系统

### 概念

中间件是在请求处理过程中执行的函数，可以用于日志记录、身份验证、错误处理等横切关注点。

### 中间件类型

```typescript
type Middleware = (context: ApplicationContext, next: () => Promise<void>) => Promise<void>;
```

### 执行顺序

中间件按照洋葱模型执行：

```
请求 → 中间件1 → 中间件2 → 控制器 → 中间件2 → 中间件1 → 响应
```

### 使用示例

```typescript
// 身份验证中间件
const authMiddleware: Middleware = async (ctx, next) => {
  const token = ctx.message.meta?.token;
  if (!token) {
    throw new Error('Authentication required');
  }

  const user = await validateToken(token);
  ctx.user = user;

  await next();
};

// 性能监控中间件
const performanceMiddleware: Middleware = async (ctx, next) => {
  const start = performance.now();

  await next();

  const duration = performance.now() - start;
  console.log(`${ctx.message.address} took ${duration.toFixed(2)}ms`);
};
```

## 8. 应用上下文（ApplicationContext）

### 概念

应用上下文包含了处理单个请求所需的所有信息，在中间件和控制器之间传递。

### 上下文结构

```typescript
interface ApplicationContext {
  message: CmdpMessage; // 原始消息
  response?: any; // 响应数据
  user?: any; // 当前用户信息
  metadata: Map<string, any>; // 元数据存储

  // 工具方法
  set(key: string, value: any): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
}
```

### 使用示例

```typescript
const middleware: Middleware = async (ctx, next) => {
  // 设置请求开始时间
  ctx.set('startTime', Date.now());

  // 解析用户信息
  const userId = ctx.message.meta?.userId;
  if (userId) {
    const user = await userService.findById(userId);
    ctx.set('currentUser', user);
  }

  await next();

  // 记录请求耗时
  const startTime = ctx.get<number>('startTime');
  const duration = Date.now() - startTime;
  console.log(`Request duration: ${duration}ms`);
};
```

## 总结

`@istock-shell/iswork` 框架通过这些核心概念的有机结合，提供了一个完整的Web Worker层服务解决方案：

1. **应用程序**提供统一的入口和生命周期管理
2. **域**组织业务逻辑，实现模块化
3. **控制器**处理具体请求，提供业务接口
4. **服务**封装业务逻辑，支持复用
5. **依赖注入**管理对象依赖，降低耦合
6. **CMDP协议**提供标准化的通信机制
7. **中间件**处理横切关注点
8. **应用上下文**在组件间传递请求信息

这些概念共同构成了一个灵活、可扩展、易维护的现代化服务框架。
