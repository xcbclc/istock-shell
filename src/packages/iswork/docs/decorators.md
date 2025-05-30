# 装饰器系统

本文档详细介绍 `@istock-shell/iswork` 框架提供的装饰器系统，包括各种装饰器的使用方法和最佳实践。

## 装饰器概览

框架提供了以下几类装饰器：

- **类装饰器**：`@Domain`、`@Controller`、`@Injectable`
- **参数装饰器**：`@Payload`、`@Meta`、`@Field`、`@Context`
- **属性装饰器**：`@Inject`
- **方法装饰器**：`@Method`、`@Return`、`@MessageHandler`

## 1. 类装饰器

### @Domain

用于标记和配置域类，定义业务模块的元数据。

#### 语法

```typescript
@Domain(metadata?: DomainMetadata)
class DomainClass {}
```

#### 参数

```typescript
interface DomainMetadata {
  name: string; // 域名称
  description?: string; // 域描述
  version?: string; // 版本号
  dependencies?: string[]; // 依赖的其他域
}
```

#### 使用示例

```typescript
@Domain({
  name: 'UserManagement',
  description: '用户管理域，负责用户注册、登录、信息管理等功能',
  version: '2.1.0',
  dependencies: ['Authentication', 'Notification', 'FileStorage'],
})
class UserDomain {
  // 域初始化钩子
  async onInit() {
    console.log('UserDomain 初始化完成');
    // 执行域级别的初始化逻辑
    await this.setupUserIndexes();
    await this.migrateUserData();
  }

  // 域销毁钩子
  async onDestroy() {
    console.log('UserDomain 正在销毁');
    // 清理资源
    await this.cleanupTempFiles();
  }

  private async setupUserIndexes() {
    // 设置用户数据索引
  }

  private async migrateUserData() {
    // 数据迁移逻辑
  }

  private async cleanupTempFiles() {
    // 清理临时文件
  }
}
```

### @Controller

用于标记控制器类，定义请求处理器的元数据。

#### 语法

```typescript
@Controller(metadata?: ControllerMetadata)
class ControllerClass {}
```

#### 参数

```typescript
interface ControllerMetadata {
  alias?: string | string[]; // 控制器别名
  description?: string; // 控制器描述
  version?: string; // 版本号
}
```

#### 使用示例

```typescript
@Controller({
  alias: ['user', 'users', 'account'],
  description: '用户控制器，处理用户相关的所有HTTP请求',
  version: '1.3.0',
})
class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private logService: LogService
  ) {}

  // 获取用户列表
  async getUsers(
    @Payload('page') page: number = 1,
    @Payload('limit') limit: number = 10,
    @Payload('search') search?: string
  ) {
    const options = { page, limit, search };
    const result = await this.userService.findUsers(options);

    await this.logService.log('user.list.accessed', {
      page,
      limit,
      search,
      resultCount: result.data.length,
    });

    return result;
  }

  // 创建用户
  async createUser(
    @Payload() userData: CreateUserDto,
    @Meta('requestId') requestId: string,
    @Context() ctx: ApplicationContext
  ) {
    // 验证权限
    const currentUser = ctx.get('currentUser');
    if (!currentUser.hasPermission('user.create')) {
      throw new Error('权限不足');
    }

    const user = await this.userService.createUser(userData);

    await this.logService.log('user.created', {
      userId: user.id,
      createdBy: currentUser.id,
      requestId,
    });

    return { user, requestId };
  }
}
```

### @Injectable

用于标记可注入的服务类，使其能够被依赖注入容器管理。

#### 语法

```typescript
@Injectable(options?: InjectableOptions)
class ServiceClass {}
```

#### 参数

```typescript
interface InjectableOptions {
  scope?: 'singleton' | 'transient' | 'request'; // 作用域
  alias?: string | string[]; // 服务别名
}
```

#### 使用示例

```typescript
@Injectable({
  scope: 'singleton',
  alias: ['userSvc', 'userService'],
})
class UserService {
  constructor(
    private userRepository: Repository,
    private cacheService: CacheService,
    private eventBus: EventBus
  ) {}

  async findById(id: string): Promise<User | null> {
    // 实现用户查找逻辑
    const cacheKey = `user:${id}`;

    // 先从缓存获取
    let user = await this.cacheService.get<User>(cacheKey);
    if (user) {
      return user;
    }

    // 从数据库获取
    user = await this.userRepository.findOneById(User, id);
    if (user) {
      // 缓存用户信息
      await this.cacheService.set(cacheKey, user, 3600);
    }

    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // 创建用户
    const userId = await this.userRepository.createOne(User, userData);
    const user = await this.userRepository.findOneById(User, userId);

    // 发布用户创建事件
    await this.eventBus.publish('user.created', {
      userId: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });

    return user;
  }
}
```

## 2. 参数装饰器

### @Payload

用于从消息的 payload 中提取参数。

#### 语法

```typescript
@Payload(path?: string)
parameter: any
```

#### 使用示例

```typescript
class UserController {
  // 获取整个 payload
  async createUser(@Payload() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  // 获取 payload 中的特定字段
  async updateUser(@Payload('id') userId: string, @Payload('data') updateData: UpdateUserDto) {
    return await this.userService.update(userId, updateData);
  }

  // 获取嵌套字段
  async updateProfile(@Payload('user.id') userId: string, @Payload('user.profile') profile: UserProfile) {
    return await this.userService.updateProfile(userId, profile);
  }

  // 获取数组元素
  async batchUpdate(@Payload('users.0.id') firstUserId: string, @Payload('users') allUsers: UpdateUserDto[]) {
    // 处理批量更新
    const results = [];
    for (const user of allUsers) {
      const result = await this.userService.update(user.id, user);
      results.push(result);
    }
    return results;
  }
}
```

### @Meta

用于从消息的 meta 中提取元数据。

#### 语法

```typescript
@Meta(key?: string)
parameter: any
```

#### 使用示例

```typescript
class UserController {
  // 获取整个 meta 对象
  async getUser(@Payload('id') id: string, @Meta() meta: any) {
    console.log('请求元数据:', meta);
    return await this.userService.findById(id);
  }

  // 获取特定的元数据字段
  async createUser(
    @Payload() userData: CreateUserDto,
    @Meta('requestId') requestId: string,
    @Meta('timestamp') timestamp: number,
    @Meta('clientInfo') clientInfo: ClientInfo
  ) {
    const user = await this.userService.create(userData);

    // 记录审计日志
    await this.auditService.log({
      action: 'user.created',
      userId: user.id,
      requestId,
      timestamp,
      clientInfo,
    });

    return user;
  }

  // 获取用户认证信息
  async getProfile(@Meta('auth.userId') currentUserId: string, @Meta('auth.permissions') permissions: string[]) {
    // 检查权限
    if (!permissions.includes('profile.read')) {
      throw new Error('权限不足');
    }

    return await this.userService.findById(currentUserId);
  }
}
```

### @Field

用于从消息中提取任意字段，支持深度路径访问。

#### 语法

```typescript
@Field(path: string)
parameter: any
```

#### 使用示例

```typescript
class UserController {
  async complexOperation(
    @Field('payload.user.id') userId: string,
    @Field('meta.auth.token') authToken: string,
    @Field('headers.contentType') contentType: string,
    @Field('options.timeout') timeout: number = 5000
  ) {
    // 验证认证令牌
    const isValid = await this.authService.validateToken(authToken);
    if (!isValid) {
      throw new Error('无效的认证令牌');
    }

    // 根据内容类型处理请求
    const processor = this.getProcessor(contentType);

    // 设置超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), timeout);
    });

    const operationPromise = this.userService.complexOperation(userId);

    return await Promise.race([operationPromise, timeoutPromise]);
  }

  // 处理文件上传
  async uploadAvatar(
    @Field('payload.userId') userId: string,
    @Field('payload.file.data') fileData: ArrayBuffer,
    @Field('payload.file.name') fileName: string,
    @Field('payload.file.type') fileType: string,
    @Field('meta.uploadId') uploadId: string
  ) {
    // 验证文件类型
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(fileType)) {
      throw new Error('不支持的文件类型');
    }

    // 上传文件
    const fileUrl = await this.fileService.upload({
      data: fileData,
      name: fileName,
      type: fileType,
      uploadId,
    });

    // 更新用户头像
    await this.userService.updateAvatar(userId, fileUrl);

    return { fileUrl, uploadId };
  }
}
```

### @Context

用于注入应用上下文对象。

#### 语法

```typescript
@Context()
parameter: ApplicationContext
```

#### 使用示例

```typescript
class UserController {
  async getUser(@Payload('id') id: string, @Context() ctx: ApplicationContext) {
    // 从上下文获取当前用户
    const currentUser = ctx.get('currentUser');

    // 检查权限
    if (id !== currentUser.id && !currentUser.isAdmin) {
      throw new Error('权限不足');
    }

    // 记录访问日志
    ctx.set('accessLog', {
      action: 'user.view',
      targetUserId: id,
      accessedBy: currentUser.id,
      timestamp: Date.now(),
    });

    return await this.userService.findById(id);
  }

  async updateUser(
    @Payload('id') id: string,
    @Payload('data') updateData: UpdateUserDto,
    @Context() ctx: ApplicationContext
  ) {
    // 设置操作开始时间
    ctx.set('operationStart', Date.now());

    try {
      const result = await this.userService.update(id, updateData);

      // 记录成功操作
      ctx.set('operationResult', 'success');

      return result;
    } catch (error) {
      // 记录失败操作
      ctx.set('operationResult', 'failed');
      ctx.set('operationError', error.message);

      throw error;
    }
  }
}
```

## 3. 属性装饰器

### @Inject

用于属性级别的依赖注入。

#### 语法

```typescript
@Inject(token?: any)
property: any
```

#### 使用示例

```typescript
class UserController {
  // 注入服务
  @Inject()
  private userService: UserService;

  // 注入配置
  @Inject('CONFIG')
  private config: AppConfig;

  // 注入工厂创建的对象
  @Inject('DATABASE')
  private database: Database;

  // 注入带别名的服务
  @Inject('userSvc')
  private userSvc: UserService;

  async getUser(id: string) {
    // 使用注入的服务
    const user = await this.userService.findById(id);

    // 使用注入的配置
    if (this.config.enableCache) {
      await this.cacheUser(user);
    }

    return user;
  }

  private async cacheUser(user: User) {
    // 使用注入的数据库连接
    await this.database.cache.set(`user:${user.id}`, user);
  }
}
```

## 4. 方法装饰器

### @Method

用于标记控制器方法，定义方法别名和元数据。

#### 语法

```typescript
@Method(alias?: string | string[])
@Method(options?: ControllerMethodMetadata)
method() {}
```

#### 使用示例

```typescript
class UserController {
  @Method('createUser')
  async create(@Payload() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @Method(['getUser', 'findUser'])
  async get(@Payload('id') userId: string) {
    return await this.userService.findById(userId);
  }

  @Method({ alias: 'updateUser', description: '更新用户信息' })
  async update(@Payload('id') id: string, @Payload('data') updateData: UpdateUserDto) {
    return await this.userService.update(id, updateData);
  }
}
```

### @Return

用于标记方法的返回值处理，定义返回值的转换和验证规则。

#### 语法

```typescript
@Return(options?: ReturnOptions)
method() {}
```

#### 参数

```typescript
interface ReturnOptions {
  transform?: (value: any) => any; // 返回值转换函数
  validate?: (value: any) => boolean; // 返回值验证函数
  cache?: boolean; // 是否缓存返回值
}
```

#### 使用示例

```typescript
class UserController {
  // 简单返回值处理
  @Return({ cache: true })
  async getUser(@Payload('id') id: string) {
    return await this.userService.findById(id);
  }

  // 返回值转换
  @Return({
    transform: (user) => ({
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
    }),
  })
  async getUserProfile(@Payload('id') id: string) {
    return await this.userService.getProfile(id);
  }

  // 返回值验证
  @Return({
    validate: (users) => Array.isArray(users) && users.length >= 0,
    transform: (users) => ({
      data: users,
      count: users.length,
      timestamp: Date.now(),
    }),
  })
  async searchUsers(@Payload() searchCriteria: UserSearchCriteria) {
    return await this.userService.search(searchCriteria);
  }

  // 复合处理
  @Return({
    validate: (stats) => stats && typeof stats === 'object',
    transform: (stats) => ({
      ...stats,
      generatedAt: new Date().toISOString(),
      version: '1.0',
    }),
    cache: true,
  })
  async getUserStats(@Payload('id') id: string, @Payload('type') userType: string) {
    return await this.userService.getStats(id);
  }
}
```

## 5. 装饰器组合使用

### 完整示例

```typescript
@Controller({
  alias: ['user', 'account'],
  description: '用户管理控制器',
  version: '2.0.0',
})
class UserController {
  @Inject()
  private userService: UserService;

  @Inject('CONFIG')
  private config: AppConfig;

  @Inject('CACHE')
  private cache: CacheService;

  // 获取用户信息 - 带缓存和权限验证
  @Method()
  @Return({
    cache: true,
    ttl: 300,
  })
  async getUser(@Payload('id') id: string, @Meta('requestId') requestId: string, @Context() ctx: ApplicationContext) {
    const currentUser = ctx.get('currentUser');

    // 权限检查
    if (id !== currentUser.id && !currentUser.hasPermission('user.read')) {
      throw new Error('权限不足');
    }

    const user = await this.userService.findById(id);

    // 记录访问日志
    await this.logAccess({
      action: 'user.read',
      targetUserId: id,
      accessedBy: currentUser.id,
      requestId,
    });

    return user;
  }

  // 创建用户 - 带验证、审计和通知
  @Method()
  async createUser(
    @Payload() userData: CreateUserDto,
    @Meta('requestId') requestId: string,
    @Meta('clientInfo') clientInfo: ClientInfo,
    @Field('options.sendWelcomeEmail') sendWelcomeEmail: boolean = true,
    @Context() ctx: ApplicationContext
  ) {
    const currentUser = ctx.get('currentUser');

    // 设置创建者信息
    userData.createdBy = currentUser.id;
    userData.createdAt = new Date();

    // 创建用户
    const user = await this.userService.create(userData);

    // 发送欢迎邮件
    if (sendWelcomeEmail && this.config.emailEnabled) {
      await this.notificationService.sendWelcomeEmail(user.email);
    }

    // 清除相关缓存
    await this.cache.deletePattern('user:list:*');

    // 记录操作日志
    ctx.set('operationLog', {
      action: 'user.created',
      userId: user.id,
      createdBy: currentUser.id,
      requestId,
      clientInfo,
    });

    return { user, requestId };
  }

  // 批量操作 - 带事务和进度跟踪
  @Method('batchUpdateUsers')
  async batchUpdateUsers(
    @Payload('users') users: UpdateUserDto[],
    @Payload('options') options: BatchOptions,
    @Meta('requestId') requestId: string,
    @Context() ctx: ApplicationContext
  ) {
    const currentUser = ctx.get('currentUser');
    const results = [];
    const errors = [];

    // 设置进度跟踪
    ctx.set('batchProgress', {
      total: users.length,
      completed: 0,
      failed: 0,
    });

    for (let i = 0; i < users.length; i++) {
      try {
        const user = users[i];
        const result = await this.userService.update(user.id, user);
        results.push(result);

        // 更新进度
        const progress = ctx.get('batchProgress');
        progress.completed++;
        ctx.set('batchProgress', progress);
      } catch (error) {
        errors.push({
          index: i,
          userId: users[i].id,
          error: error.message,
        });

        // 更新失败计数
        const progress = ctx.get('batchProgress');
        progress.failed++;
        ctx.set('batchProgress', progress);

        // 如果设置了快速失败，则停止处理
        if (options.failFast) {
          break;
        }
      }
    }

    // 清除相关缓存
    await this.cache.deletePattern('user:*');

    return {
      results,
      errors,
      summary: {
        total: users.length,
        successful: results.length,
        failed: errors.length,
      },
      requestId,
    };
  }

  private async logAccess(logData: any) {
    // 记录访问日志的实现
  }
}
```

## 6. 最佳实践

### 装饰器使用原则

1. **单一职责**：每个装饰器专注于特定功能
2. **组合使用**：合理组合多个装饰器实现复杂功能
3. **性能考虑**：避免过度使用装饰器影响性能
4. **可读性**：保持代码清晰，避免装饰器嵌套过深

### 常见模式

```typescript
// 标准CRUD控制器模式
@Controller({ alias: 'resource' })
class ResourceController {
  @Method('list')
  async list(@Payload() query: ListQuery) {
    // 列表查询
  }

  @Method('get')
  async get(@Payload('id') id: string) {
    // 单个资源获取
  }

  @Method('create')
  async create(@Payload() data: CreateDto) {
    // 创建资源
  }

  @Method('update')
  async update(@Payload('id') id: string, @Payload('data') data: UpdateDto) {
    // 更新资源
  }

  @Method('delete')
  async delete(@Payload('id') id: string) {
    // 删除资源
  }
}
```

### 错误处理

```typescript
// 装饰器错误处理
class UserController {
  @Method('riskyOperation')
  async riskyOperation(@Payload() data: any) {
    try {
      // 可能抛出异常的操作
      return await this.userService.performRiskyOperation(data);
    } catch (error) {
      // 统一错误处理
      throw {
        error: error.message,
        code: error.code || 'UNKNOWN_ERROR',
        timestamp: Date.now(),
      };
    }
  }
}
```

通过合理使用这些装饰器，可以大大简化代码编写，提高开发效率，同时保持代码的清晰性和可维护性。
