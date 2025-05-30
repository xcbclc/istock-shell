# 依赖注入（Dependency Injection）

本文档详细介绍 `@istock-shell/iswork` 框架的依赖注入系统，包括IoC容器的使用、提供者配置和最佳实践。

## 概述

依赖注入（DI）是一种设计模式，用于实现控制反转（IoC）。框架内置的IoC容器负责管理对象的创建、依赖关系的解析和生命周期的管理。

### 核心优势

- **降低耦合**：组件不直接创建依赖，而是通过容器注入
- **提高可测试性**：易于进行单元测试和模拟
- **增强可维护性**：依赖关系集中管理
- **支持多种模式**：单例、瞬态、请求作用域等

## 1. IoC容器基础

### 容器结构

```typescript
class IocContainer {
  // 全局提供者
  private globalProviders: Map<any, Provider>;

  // 域级提供者
  private domainProviders: Map<string, Map<any, Provider>>;

  // 实例缓存
  private instances: Map<any, any>;

  // 作用域管理
  private scopes: Map<string, Map<any, any>>;
}
```

### 基本使用

```typescript
// 创建容器实例
const container = new IocContainer();

// 注册服务
container.register({
  provide: UserService,
  useClass: UserService,
  scope: 'singleton',
});

// 解析服务
const userService = container.resolve(UserService);
```

## 2. 提供者类型

### 类提供者（ClassProvider）

最常用的提供者类型，直接使用类构造函数创建实例。

```typescript
interface ClassProvider {
  provide: any; // 提供者令牌
  useClass: new (...args: any[]) => any; // 实现类
  scope?: 'singleton' | 'transient' | 'request'; // 作用域
  inject?: any[]; // 依赖注入令牌
}
```

#### 使用示例

```typescript
// 基本类提供者
container.register({
  provide: UserService,
  useClass: UserService,
  scope: 'singleton',
});

// 接口实现
container.register({
  provide: 'IUserRepository',
  useClass: DatabaseUserRepository,
  scope: 'singleton',
});

// 带依赖注入的类提供者
container.register({
  provide: UserController,
  useClass: UserController,
  inject: [UserService, 'CONFIG', 'LOGGER'],
});

// 不同实现的切换
if (process.env.NODE_ENV === 'test') {
  container.register({
    provide: 'IUserRepository',
    useClass: MockUserRepository,
  });
} else {
  container.register({
    provide: 'IUserRepository',
    useClass: DatabaseUserRepository,
  });
}
```

### 值提供者（ValueProvider）

直接提供一个值或对象实例。

```typescript
interface ValueProvider {
  provide: any; // 提供者令牌
  useValue: any; // 提供的值
}
```

#### 使用示例

```typescript
// 配置对象
container.register({
  provide: 'CONFIG',
  useValue: {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    features: {
      enableCache: true,
      enableLogging: true,
    },
  },
});

// 常量值
container.register({
  provide: 'API_VERSION',
  useValue: 'v2.1.0',
});

// 预创建的实例
const logger = new Logger({ level: 'info' });
container.register({
  provide: 'LOGGER',
  useValue: logger,
});

// 函数
container.register({
  provide: 'UUID_GENERATOR',
  useValue: () => crypto.randomUUID(),
});

// 复杂对象
container.register({
  provide: 'DATABASE_CONFIG',
  useValue: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'myapp',
    ssl: process.env.NODE_ENV === 'production',
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 30000,
    },
  },
});
```

### 工厂提供者（FactoryProvider）

使用工厂函数创建实例，支持复杂的创建逻辑。

```typescript
interface FactoryProvider {
  provide: any; // 提供者令牌
  useFactory: (...args: any[]) => any; // 工厂函数
  inject?: any[]; // 工厂函数的依赖
  scope?: 'singleton' | 'transient' | 'request'; // 作用域
}
```

#### 使用示例

```typescript
// 数据库连接工厂
container.register({
  provide: 'DATABASE',
  useFactory: (config: DatabaseConfig, logger: Logger) => {
    const db = new Database({
      connectionString: config.connectionString,
      ssl: config.ssl,
      pool: config.pool,
    });

    // 添加日志记录
    db.on('connect', () => logger.info('Database connected'));
    db.on('error', (error) => logger.error('Database error:', error));

    return db;
  },
  inject: ['DATABASE_CONFIG', 'LOGGER'],
  scope: 'singleton',
});

// HTTP客户端工厂
container.register({
  provide: 'HTTP_CLIENT',
  useFactory: (config: AppConfig) => {
    const client = new HttpClient({
      baseURL: config.apiUrl,
      timeout: config.timeout,
      retries: config.retries,
    });

    // 添加请求拦截器
    client.interceptors.request.use((request) => {
      request.headers['User-Agent'] = `MyApp/${config.version}`;
      request.headers['X-Request-ID'] = crypto.randomUUID();
      return request;
    });

    // 添加响应拦截器
    client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('HTTP Error:', error.message);
        return Promise.reject(error);
      }
    );

    return client;
  },
  inject: ['CONFIG'],
  scope: 'singleton',
});

// 缓存服务工厂
container.register({
  provide: 'CACHE_SERVICE',
  useFactory: (config: AppConfig, logger: Logger) => {
    if (config.cache.type === 'redis') {
      return new RedisCache({
        host: config.cache.redis.host,
        port: config.cache.redis.port,
        password: config.cache.redis.password,
        logger,
      });
    } else if (config.cache.type === 'memory') {
      return new MemoryCache({
        maxSize: config.cache.memory.maxSize,
        ttl: config.cache.memory.defaultTtl,
        logger,
      });
    } else {
      return new NoOpCache();
    }
  },
  inject: ['CONFIG', 'LOGGER'],
  scope: 'singleton',
});

// 条件工厂
container.register({
  provide: 'NOTIFICATION_SERVICE',
  useFactory: (config: AppConfig) => {
    const services = [];

    if (config.notifications.email.enabled) {
      services.push(new EmailNotificationService(config.notifications.email));
    }

    if (config.notifications.sms.enabled) {
      services.push(new SmsNotificationService(config.notifications.sms));
    }

    if (config.notifications.push.enabled) {
      services.push(new PushNotificationService(config.notifications.push));
    }

    return new CompositeNotificationService(services);
  },
  inject: ['CONFIG'],
  scope: 'singleton',
});
```

### 别名提供者（AliasProvider）

为现有提供者创建别名。

```typescript
interface AliasProvider {
  provide: any; // 新的令牌
  useExisting: any; // 现有的令牌
}
```

#### 使用示例

```typescript
// 为服务创建别名
container.register({
  provide: UserService,
  useClass: UserService,
});

container.register({
  provide: 'USER_SERVICE',
  useExisting: UserService,
});

container.register({
  provide: 'userSvc',
  useExisting: UserService,
});

// 接口别名
container.register({
  provide: 'IUserRepository',
  useClass: DatabaseUserRepository,
});

container.register({
  provide: 'UserRepo',
  useExisting: 'IUserRepository',
});
```

## 3. 作用域管理

### 单例作用域（Singleton）

在整个应用生命周期中只创建一个实例。

```typescript
// 单例服务
@Injectable({ scope: 'singleton' })
class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  get(key: string): any {
    return this.config[key];
  }

  private loadConfig(): AppConfig {
    // 加载配置逻辑
    return {
      apiUrl: process.env.API_URL,
      dbUrl: process.env.DATABASE_URL,
      // ...
    };
  }
}

// 注册单例
container.register({
  provide: ConfigService,
  useClass: ConfigService,
  scope: 'singleton',
});
```

### 瞬态作用域（Transient）

每次请求都创建新的实例。

```typescript
// 瞬态服务
@Injectable({ scope: 'transient' })
class RequestLogger {
  private requestId: string;

  constructor() {
    this.requestId = crypto.randomUUID();
  }

  log(message: string): void {
    console.log(`[${this.requestId}] ${message}`);
  }
}

// 注册瞬态
container.register({
  provide: RequestLogger,
  useClass: RequestLogger,
  scope: 'transient',
});
```

### 请求作用域（Request）

在单个请求处理过程中共享同一个实例。

```typescript
// 请求作用域服务
@Injectable({ scope: 'request' })
class RequestContext {
  private data: Map<string, any> = new Map();

  set(key: string, value: any): void {
    this.data.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.data.get(key);
  }

  has(key: string): boolean {
    return this.data.has(key);
  }
}

// 注册请求作用域
container.register({
  provide: RequestContext,
  useClass: RequestContext,
  scope: 'request',
});
```

## 4. 依赖注入方式

### 构造函数注入

最推荐的注入方式，在类构造函数中声明依赖。

```typescript
@Injectable()
class UserService {
  constructor(
    private userRepository: Repository,
    private cacheService: CacheService,
    private eventBus: EventBus,
    @Inject('CONFIG') private config: AppConfig,
    @Inject('LOGGER') private logger: Logger
  ) {}

  async findById(id: string): Promise<User | null> {
    this.logger.info(`Finding user by ID: ${id}`);

    // 先从缓存查找
    if (this.config.enableCache) {
      const cached = await this.cacheService.get(`user:${id}`);
      if (cached) {
        this.logger.debug(`User found in cache: ${id}`);
        return cached;
      }
    }

    // 从数据库查找
    const user = await this.userRepository.findOneById(User, id);

    if (user && this.config.enableCache) {
      await this.cacheService.set(`user:${id}`, user, 3600);
    }

    // 发布事件
    await this.eventBus.publish('user.accessed', { userId: id });

    return user;
  }
}
```

### 属性注入

使用 `@Inject` 装饰器进行属性注入。

```typescript
@Controller()
class UserController {
  @Inject()
  private userService: UserService;

  @Inject('CONFIG')
  private config: AppConfig;

  @Inject('LOGGER')
  private logger: Logger;

  @Inject('CACHE_SERVICE')
  private cache: CacheService;

  async getUser(@Payload('id') id: string) {
    this.logger.info(`Getting user: ${id}`);

    const user = await this.userService.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
```

### 方法注入

在特定方法中注入依赖（较少使用）。

```typescript
class UserService {
  async processUser(user: User, @Inject('NOTIFICATION_SERVICE') notificationService: NotificationService) {
    // 处理用户逻辑
    await this.updateUser(user);

    // 发送通知
    await notificationService.send({
      to: user.email,
      template: 'user-updated',
      data: { user },
    });
  }
}
```

## 5. 高级特性

### 循环依赖处理

框架自动检测和处理循环依赖。

```typescript
// 服务A依赖服务B
@Injectable()
class ServiceA {
  constructor(@Inject(() => ServiceB) private serviceB: ServiceB) {}
}

// 服务B依赖服务A
@Injectable()
class ServiceB {
  constructor(@Inject(() => ServiceA) private serviceA: ServiceA) {}
}

// 使用前向引用解决循环依赖
container.register({
  provide: ServiceA,
  useClass: ServiceA,
});

container.register({
  provide: ServiceB,
  useClass: ServiceB,
});
```

### 条件注册

根据条件注册不同的实现。

```typescript
// 根据环境注册不同的服务
if (process.env.NODE_ENV === 'production') {
  container.register({
    provide: 'LOGGER',
    useFactory: () =>
      new ProductionLogger({
        level: 'warn',
        format: 'json',
        transports: ['file', 'elasticsearch'],
      }),
  });
} else if (process.env.NODE_ENV === 'development') {
  container.register({
    provide: 'LOGGER',
    useFactory: () =>
      new DevelopmentLogger({
        level: 'debug',
        format: 'pretty',
        transports: ['console'],
      }),
  });
} else {
  container.register({
    provide: 'LOGGER',
    useFactory: () =>
      new TestLogger({
        level: 'error',
        format: 'simple',
        transports: ['memory'],
      }),
  });
}

// 根据配置注册服务
container.register({
  provide: 'STORAGE_SERVICE',
  useFactory: (config: AppConfig) => {
    switch (config.storage.type) {
      case 's3':
        return new S3StorageService(config.storage.s3);
      case 'local':
        return new LocalStorageService(config.storage.local);
      case 'azure':
        return new AzureStorageService(config.storage.azure);
      default:
        throw new Error(`Unsupported storage type: ${config.storage.type}`);
    }
  },
  inject: ['CONFIG'],
});
```

### 装饰器增强

使用装饰器增强服务功能。

```typescript
// 自动重试装饰器
function Retry(attempts: number = 3, delay: number = 1000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error;

      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          if (i < attempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      throw lastError;
    };
  };
}

// 性能监控装饰器
function Monitor(operation: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const logger = container.resolve('LOGGER');

      try {
        const result = await originalMethod.apply(this, args);
        const duration = Date.now() - start;
        logger.info(`${operation} completed in ${duration}ms`);
        return result;
      } catch (error) {
        const duration = Date.now() - start;
        logger.error(`${operation} failed after ${duration}ms:`, error.message);
        throw error;
      }
    };
  };
}

// 使用装饰器增强的服务
@Injectable()
class UserService {
  constructor(
    private userRepository: Repository,
    @Inject('LOGGER') private logger: Logger
  ) {}

  @Retry(3, 1000)
  @Monitor('user.create')
  async createUser(userData: CreateUserDto): Promise<User> {
    // 可能失败的用户创建逻辑
    const userId = await this.userRepository.createOne(User, userData);
    return await this.userRepository.findOneById(User, userId);
  }

  @Monitor('user.search')
  async searchUsers(criteria: SearchCriteria): Promise<User[]> {
    // 搜索用户逻辑
    return await this.userRepository.query(User, {
      filter: this.buildFilter(criteria),
      sort: criteria.sort,
      limit: criteria.limit,
      offset: criteria.offset,
    });
  }

  private buildFilter(criteria: SearchCriteria): any[] {
    // 构建查询过滤器
    const filters = [];

    if (criteria.name) {
      filters.push(['name', 'like', `%${criteria.name}%`]);
    }

    if (criteria.email) {
      filters.push(['email', 'eq', criteria.email]);
    }

    if (criteria.status) {
      filters.push(['status', 'eq', criteria.status]);
    }

    return filters;
  }
}
```

## 6. 测试支持

### 模拟依赖

在测试中使用模拟对象替换真实依赖。

```typescript
// 测试用例
describe('UserService', () => {
  let userService: UserService;
  let mockRepository: jest.Mocked<Repository>;
  let mockCache: jest.Mocked<CacheService>;
  let mockLogger: jest.Mocked<Logger>;
  let testContainer: IocContainer;

  beforeEach(() => {
    // 创建测试容器
    testContainer = new IocContainer();

    // 创建模拟对象
    mockRepository = {
      findOneById: jest.fn(),
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      query: jest.fn(),
    } as any;

    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
    } as any;

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
    } as any;

    // 注册模拟依赖
    testContainer.register({
      provide: Repository,
      useValue: mockRepository,
    });

    testContainer.register({
      provide: 'CACHE_SERVICE',
      useValue: mockCache,
    });

    testContainer.register({
      provide: 'LOGGER',
      useValue: mockLogger,
    });

    testContainer.register({
      provide: 'CONFIG',
      useValue: { enableCache: true },
    });

    // 注册被测试的服务
    testContainer.register({
      provide: UserService,
      useClass: UserService,
    });

    // 解析服务
    userService = testContainer.resolve(UserService);
  });

  describe('findById', () => {
    it('should return user from cache if available', async () => {
      // 准备测试数据
      const userId = '123';
      const cachedUser = { id: userId, name: 'John Doe' };

      // 设置模拟行为
      mockCache.get.mockResolvedValue(cachedUser);

      // 执行测试
      const result = await userService.findById(userId);

      // 验证结果
      expect(result).toEqual(cachedUser);
      expect(mockCache.get).toHaveBeenCalledWith(`user:${userId}`);
      expect(mockRepository.findOneById).not.toHaveBeenCalled();
    });

    it('should fetch from database and cache if not in cache', async () => {
      // 准备测试数据
      const userId = '123';
      const dbUser = { id: userId, name: 'John Doe' };

      // 设置模拟行为
      mockCache.get.mockResolvedValue(null);
      mockRepository.findOneById.mockResolvedValue(dbUser);

      // 执行测试
      const result = await userService.findById(userId);

      // 验证结果
      expect(result).toEqual(dbUser);
      expect(mockCache.get).toHaveBeenCalledWith(`user:${userId}`);
      expect(mockRepository.findOneById).toHaveBeenCalledWith(User, userId);
      expect(mockCache.set).toHaveBeenCalledWith(`user:${userId}`, dbUser, 3600);
    });
  });
});
```

### 集成测试

测试真实的依赖注入配置。

```typescript
// 集成测试
describe('User Management Integration', () => {
  let app: Application;
  let container: IocContainer;

  beforeAll(async () => {
    // 创建测试应用
    container = new IocContainer();

    // 注册测试配置
    container.register({
      provide: 'CONFIG',
      useValue: {
        database: {
          type: 'memory',
          synchronize: true,
        },
        cache: {
          type: 'memory',
          maxSize: 1000,
        },
      },
    });

    // 注册真实服务
    container.register({
      provide: 'DATABASE',
      useFactory: (config) => new MemoryDatabase(config.database),
      inject: ['CONFIG'],
    });

    container.register({
      provide: Repository,
      useFactory: (db) => new Repository(db),
      inject: ['DATABASE'],
    });

    container.register({
      provide: UserService,
      useClass: UserService,
    });

    container.register({
      provide: UserController,
      useClass: UserController,
    });

    // 创建应用
    app = new Application({
      domainPath: 'test-app',
      container,
    });

    await app.start();
  });

  afterAll(async () => {
    await app.stop();
  });

  it('should handle complete user lifecycle', async () => {
    // 创建用户
    const createResponse = await app.handleMessage({
      address: 'cmdp://@user.test-app:8080/UserController.createUser',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    expect(createResponse.user).toBeDefined();
    expect(createResponse.user.name).toBe('John Doe');

    const userId = createResponse.user.id;

    // 获取用户
    const getResponse = await app.handleMessage({
      address: 'cmdp://@user.test-app:8080/UserController.getUser',
      payload: { id: userId },
    });

    expect(getResponse).toEqual(createResponse.user);

    // 更新用户
    const updateResponse = await app.handleMessage({
      address: 'cmdp://@user.test-app:8080/UserController.updateUser',
      payload: {
        id: userId,
        data: { name: 'Jane Doe' },
      },
    });

    expect(updateResponse.name).toBe('Jane Doe');
  });
});
```

## 7. 最佳实践

### 设计原则

1. **依赖接口而非实现**：使用接口定义依赖契约
2. **单一职责**：每个服务专注于特定功能
3. **避免循环依赖**：合理设计服务层次结构
4. **合理使用作用域**：根据需求选择合适的生命周期

### 常见模式

```typescript
// 服务层次结构
// 控制器层 -> 服务层 -> 仓储层 -> 数据层

@Controller()
class UserController {
  constructor(private userService: UserService) {}
}

@Injectable()
class UserService {
  constructor(
    private userRepository: IUserRepository,
    private eventBus: IEventBus
  ) {}
}

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private database: IDatabase) {}
}
```

### 配置管理

```typescript
// 配置服务模式
@Injectable({ scope: 'singleton' })
class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  get database() {
    return this.config.database;
  }

  get cache() {
    return this.config.cache;
  }

  get features() {
    return this.config.features;
  }

  private loadConfig(): AppConfig {
    return {
      database: {
        url: process.env.DATABASE_URL,
        pool: {
          min: parseInt(process.env.DB_POOL_MIN) || 2,
          max: parseInt(process.env.DB_POOL_MAX) || 10,
        },
      },
      cache: {
        type: process.env.CACHE_TYPE || 'memory',
        ttl: parseInt(process.env.CACHE_TTL) || 3600,
      },
      features: {
        enableLogging: process.env.ENABLE_LOGGING === 'true',
        enableMetrics: process.env.ENABLE_METRICS === 'true',
      },
    };
  }
}
```

通过合理使用依赖注入系统，可以构建出松耦合、易测试、可维护的应用程序。框架的IoC容器提供了强大而灵活的依赖管理能力，支持各种复杂的应用场景。
