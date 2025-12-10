# 完整教程

本教程将通过实际示例，逐步引导您掌握 `@istock-shell/iswork` 框架的各个功能模块。

## 目录

- [环境准备](#环境准备)
- [第一个应用](#第一个应用)
- [数据管理](#数据管理)
- [高级特性](#高级特性)
- [实战项目](#实战项目)
- [性能优化](#性能优化)
- [故障排除](#故障排除)

## 环境准备

### 1. 安装依赖

```bash
npm install @istock-shell/iswork
# 或者
yarn add @istock-shell/iswork
# 或者
pnpm add @istock-shell/iswork
```

### 2. TypeScript 配置

确保您的 `tsconfig.json` 包含以下配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 3. 项目结构

推荐的项目结构：

```
src/
├── domains/           # 业务域
│   ├── user/
│   │   ├── user.domain.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.model.ts
│   └── product/
├── shared/            # 共享模块
│   ├── middleware/
│   ├── decorators/
│   └── utils/
├── config/            # 配置文件
└── main.ts           # 应用入口
```

## 第一个应用

### 1. 创建基础模型

首先定义数据模型：

```typescript
// src/domains/user/user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}
```

### 2. 创建服务层

实现业务逻辑：

```typescript
// src/domains/user/user.service.ts
import { Injectable } from '@istock-shell/iswork';
import { User, CreateUserDto, UpdateUserDto } from './user.model';

@Injectable()
export class UserService {
  private users = new Map<string, User>();
  private idCounter = 1;

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const id = this.generateId();
    const now = new Date();

    const user: User = {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(id, user);
    return user;
  }

  async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return null;
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async search(query: string): Promise<User[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.users.values()).filter(
      (user) => user.name.toLowerCase().includes(lowercaseQuery) || user.email.toLowerCase().includes(lowercaseQuery)
    );
  }

  private generateId(): string {
    return `user_${this.idCounter++}_${Date.now()}`;
  }
}
```

### 3. 创建控制器

处理消息路由：

```typescript
// src/domains/user/user.controller.ts
import { Controller, Payload, Meta } from '@istock-shell/iswork';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers() {
    const users = await this.userService.findAll();
    return {
      success: true,
      data: users,
      total: users.length,
    };
  }

  async getUserById(@Payload('id') id: string) {
    if (!id) {
      throw new Error('用户ID不能为空');
    }

    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    return {
      success: true,
      data: user,
    };
  }

  async getUserByEmail(@Payload('email') email: string) {
    if (!email) {
      throw new Error('邮箱不能为空');
    }

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('用户不存在');
    }

    return {
      success: true,
      data: user,
    };
  }

  async createUser(@Payload() userData: CreateUserDto, @Meta('requestId') requestId: string) {
    // 验证输入数据
    if (!userData.name || !userData.email) {
      throw new Error('姓名和邮箱是必填项');
    }

    // 检查邮箱是否已存在
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('该邮箱已被注册');
    }

    const user = await this.userService.create(userData);

    return {
      success: true,
      data: user,
      message: '用户创建成功',
      requestId,
    };
  }

  async updateUser(
    @Payload('id') id: string,
    @Payload('data') userData: UpdateUserDto,
    @Meta('requestId') requestId: string
  ) {
    if (!id) {
      throw new Error('用户ID不能为空');
    }

    // 如果更新邮箱，检查是否已存在
    if (userData.email) {
      const existingUser = await this.userService.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('该邮箱已被其他用户使用');
      }
    }

    const user = await this.userService.update(id, userData);
    if (!user) {
      throw new Error('用户不存在');
    }

    return {
      success: true,
      data: user,
      message: '用户更新成功',
      requestId,
    };
  }

  async deleteUser(@Payload('id') id: string, @Meta('requestId') requestId: string) {
    if (!id) {
      throw new Error('用户ID不能为空');
    }

    const success = await this.userService.delete(id);
    if (!success) {
      throw new Error('用户不存在');
    }

    return {
      success: true,
      message: '用户删除成功',
      requestId,
    };
  }

  async searchUsers(@Payload('query') query: string, @Payload('limit') limit: number = 10) {
    if (!query || query.trim().length === 0) {
      throw new Error('搜索关键词不能为空');
    }

    const users = await this.userService.search(query.trim());
    const limitedUsers = users.slice(0, limit);

    return {
      success: true,
      data: limitedUsers,
      total: users.length,
      limit,
      hasMore: users.length > limit,
    };
  }
}
```

### 4. 创建域

组织业务模块：

```typescript
// src/domains/user/user.domain.ts
import { Domain } from '@istock-shell/iswork';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Domain({
  name: 'UserDomain',
  description: '用户管理域 - 负责用户相关的所有业务逻辑',
  version: '1.0.0',
  providers: [
    { provide: UserService, useClass: UserService },
    { provide: UserController, useClass: UserController },
  ],
  exports: [UserService], // 导出服务供其他域使用
})
export class UserDomain {
  constructor() {
    console.log('UserDomain 初始化完成');
  }
}
```

### 5. 创建应用入口

```typescript
// src/main.ts
import { Application } from '@istock-shell/iswork';
import { UserDomain } from './domains/user/user.domain';

// 创建应用实例
const app = new Application({
  domainPath: 'tutorial-app',
  middlewares: [
    // 全局日志中间件
    async (ctx, next) => {
      const start = Date.now();
      console.log(`[${new Date().toISOString()}] 收到消息:`, ctx.message.address);

      try {
        await next();
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] 处理完成，耗时: ${duration}ms`);
      } catch (error) {
        const duration = Date.now() - start;
        console.error(`[${new Date().toISOString()}] 处理失败，耗时: ${duration}ms`, error);
        throw error;
      }
    },

    // 全局错误处理中间件
    async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        console.error('全局错误处理:', error);

        // 返回统一的错误格式
        const errorResponse = {
          success: false,
          error: {
            message: error instanceof Error ? error.message : '未知错误',
            code: 'INTERNAL_ERROR',
            timestamp: new Date().toISOString(),
          },
        };

        // 设置错误响应
        ctx.cmdp.setReturnMessage(errorResponse);
      }
    },
  ],
});

// 启动应用
const messageHandler = app.listen(UserDomain);

// 在 Web Worker 环境中使用
if (typeof self !== 'undefined' && 'addEventListener' in self) {
  self.addEventListener('message', messageHandler);
  console.log('应用已启动，等待消息...');
}

// 导出应用实例（用于测试）
export { app };
```

### 6. 测试应用

创建测试文件：

```typescript
// src/test.ts
import { app } from './main';

// 模拟消息发送
function sendMessage(address: string, payload?: any, meta?: any) {
  const message = {
    address,
    payload,
    meta: {
      requestId: `req_${Date.now()}`,
      timestamp: Date.now(),
      ...meta,
    },
  };

  const event = new MessageEvent('message', { data: message });
  return app.listen(UserDomain)(event);
}

// 测试用例
async function runTests() {
  console.log('开始测试...');

  try {
    // 1. 创建用户
    console.log('\n=== 测试创建用户 ===');
    await sendMessage('cmdp://@user.tutorial-app:8080/UserController.createUser', {
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25,
    });

    // 2. 获取所有用户
    console.log('\n=== 测试获取所有用户 ===');
    await sendMessage('cmdp://@user.tutorial-app:8080/UserController.getAllUsers');

    // 3. 搜索用户
    console.log('\n=== 测试搜索用户 ===');
    await sendMessage('cmdp://@user.tutorial-app:8080/UserController.searchUsers', {
      query: '张',
      limit: 5,
    });

    // 4. 测试错误情况
    console.log('\n=== 测试错误处理 ===');
    await sendMessage('cmdp://@user.tutorial-app:8080/UserController.createUser', {
      name: '', // 空名称，应该报错
      email: 'invalid-email',
    });
  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 运行测试
runTests();
```

## 数据管理

### 1. 使用 ORM 数据源

配置数据源：

```typescript
// src/config/database.ts
import { DataSource } from '@istock-shell/iswork';

// IndexedDB 数据源配置
export const indexedDbDataSource = new DataSource({
  type: 'indexeddb',
  database: 'tutorial_app',
  version: 1,
  logging: true,
  synchronize: true,
});

// HTTP 数据源配置
export const httpDataSource = new DataSource({
  type: 'http',
  baseUrl: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer your-token',
  },
  timeout: 5000,
  logging: true,
});

// 内存数据源配置（用于测试）
export const memoryDataSource = new DataSource({
  type: 'memory',
  logging: true,
});
```

### 2. 定义实体模型

使用装饰器定义模型：

```typescript
// src/domains/user/user.entity.ts
import { Model, Column, PrimaryColumn, Index } from '@istock-shell/iswork';

@Model('users')
export class UserEntity {
  @PrimaryColumn()
  @Column({ type: 'string' })
  id: string;

  @Column({ type: 'string', length: 100 })
  name: string;

  @Column({ type: 'string', length: 255, unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'number', nullable: true })
  age?: number;

  @Column({ type: 'string', length: 20, default: 'active' })
  status: 'active' | 'inactive' | 'suspended';

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', default: () => new Date() })
  updatedAt: Date;
}
```

### 3. 使用仓库模式

创建数据访问层：

```typescript
// src/domains/user/user.repository.ts
import { Injectable, Repository } from '@istock-shell/iswork';
import { UserEntity } from './user.entity';
import { indexedDbDataSource } from '../../config/database';

@Injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = indexedDbDataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.findMany();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.repository.findOneById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({
      where: { email: { $eq: email } },
    });
  }

  async findActiveUsers(): Promise<UserEntity[]> {
    return await this.repository.findMany({
      where: { status: { $eq: 'active' } },
      order: { createdAt: 'DESC' },
    });
  }

  async create(userData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return await this.repository.createOne(userData);
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<boolean> {
    return await this.repository.updateById(id, {
      ...userData,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.deleteById(id);
  }

  async search(query: string): Promise<UserEntity[]> {
    return await this.repository.findMany({
      where: {
        $or: [{ name: { $like: `%${query}%` } }, { email: { $like: `%${query}%` } }],
      },
      order: { name: 'ASC' },
    });
  }

  async getUserStats(): Promise<{ total: number; active: number; inactive: number }> {
    const total = await this.repository.count();
    const active = await this.repository.count({
      where: { status: { $eq: 'active' } },
    });
    const inactive = await this.repository.count({
      where: { status: { $ne: 'active' } },
    });

    return { total, active, inactive };
  }
}
```

### 4. 使用查询构建器

复杂查询示例：

```typescript
// src/domains/user/user.query.service.ts
import { Injectable, QueryBuilder } from '@istock-shell/iswork';
import { UserEntity } from './user.entity';
import { indexedDbDataSource } from '../../config/database';

@Injectable()
export class UserQueryService {
  private queryBuilder: QueryBuilder<UserEntity>;

  constructor() {
    this.queryBuilder = indexedDbDataSource.createQueryBuilder(UserEntity);
  }

  async getUsersWithPagination(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const [users, total] = await this.queryBuilder
      .select(['id', 'name', 'email', 'status', 'createdAt'])
      .where('status', 'eq', 'active')
      .orderBy('createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async getUsersByAgeRange(minAge: number, maxAge: number) {
    return await this.queryBuilder
      .select(['id', 'name', 'email', 'age'])
      .where('age', 'gte', minAge)
      .andWhere('age', 'lte', maxAge)
      .orderBy('age', 'ASC')
      .getMany();
  }

  async getRecentUsers(days: number = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await this.queryBuilder.where('createdAt', 'gte', cutoffDate).orderBy('createdAt', 'DESC').getMany();
  }

  async getUserStatsByStatus() {
    const stats = await this.queryBuilder.select(['status']).groupBy('status').getRawMany();

    return stats.reduce(
      (acc, stat) => {
        acc[stat.status] = stat.count;
        return acc;
      },
      {} as Record<string, number>
    );
  }
}
```

## 高级特性

### 1. 自定义中间件

创建认证中间件：

```typescript
// src/shared/middleware/auth.middleware.ts
import { Middleware } from '@istock-shell/iswork';

export const authMiddleware: Middleware = async (ctx, next) => {
  const token = ctx.message.meta?.token || ctx.message.headers?.Authorization;

  if (!token) {
    throw new Error('缺少认证令牌');
  }

  try {
    // 验证令牌（这里是示例，实际应该调用认证服务）
    const user = await validateToken(token);

    // 将用户信息添加到上下文
    ctx.set('currentUser', user);
    ctx.set('isAuthenticated', true);

    await next();
  } catch (error) {
    throw new Error('认证失败: ' + error.message);
  }
};

// 模拟令牌验证
async function validateToken(token: string) {
  // 这里应该是实际的令牌验证逻辑
  if (token === 'valid-token') {
    return {
      id: 'user-123',
      name: '管理员',
      role: 'admin',
    };
  }
  throw new Error('无效的令牌');
}
```

创建缓存中间件：

```typescript
// src/shared/middleware/cache.middleware.ts
import { Middleware } from '@istock-shell/iswork';

interface CacheOptions {
  ttl?: number; // 缓存时间（秒）
  key?: (ctx: any) => string; // 缓存键生成函数
}

export function cacheMiddleware(options: CacheOptions = {}): Middleware {
  const { ttl = 300, key = defaultKeyGenerator } = options;
  const cache = new Map<string, { data: any; expires: number }>();

  return async (ctx, next) => {
    const cacheKey = key(ctx);
    const now = Date.now();

    // 检查缓存
    const cached = cache.get(cacheKey);
    if (cached && cached.expires > now) {
      console.log(`缓存命中: ${cacheKey}`);
      ctx.cmdp.setReturnMessage(cached.data);
      return;
    }

    // 执行下一个中间件
    await next();

    // 缓存结果
    const result = ctx.cmdp.getReturnMessage();
    if (result && !result.error) {
      cache.set(cacheKey, {
        data: result,
        expires: now + ttl * 1000,
      });
      console.log(`结果已缓存: ${cacheKey}`);
    }
  };
}

function defaultKeyGenerator(ctx: any): string {
  const address = ctx.message.address;
  const payload = JSON.stringify(ctx.message.payload || {});
  return `${address}:${Buffer.from(payload).toString('base64')}`;
}
```

### 2. 自定义装饰器

创建权限检查装饰器：

```typescript
// src/shared/decorators/require-role.decorator.ts
import { Middleware } from '@istock-shell/iswork';

export function RequireRole(role: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // 获取上下文（这里需要根据实际框架实现调整）
      const ctx = this.getContext?.() || args.find((arg) => arg?.message);

      if (!ctx) {
        throw new Error('无法获取请求上下文');
      }

      const currentUser = ctx.get('currentUser');
      if (!currentUser || currentUser.role !== role) {
        throw new Error(`需要 ${role} 权限`);
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
```

创建验证装饰器：

```typescript
// src/shared/decorators/validate.decorator.ts
export function Validate(schema: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // 获取载荷数据
      const payload = args.find((arg) => typeof arg === 'object' && arg !== null);

      if (payload) {
        const errors = validateSchema(payload, schema);
        if (errors.length > 0) {
          throw new Error(`验证失败: ${errors.join(', ')}`);
        }
      }

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// 简单的验证函数
function validateSchema(data: any, schema: any): string[] {
  const errors: string[] = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    const fieldRules = rules as any;

    if (fieldRules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} 是必填项`);
    }

    if (value !== undefined && fieldRules.type && typeof value !== fieldRules.type) {
      errors.push(`${field} 类型错误，期望 ${fieldRules.type}`);
    }

    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors.push(`${field} 长度不能少于 ${fieldRules.minLength} 个字符`);
    }

    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors.push(`${field} 长度不能超过 ${fieldRules.maxLength} 个字符`);
    }
  }

  return errors;
}
```

### 3. 事件系统

创建事件发布订阅：

```typescript
// src/shared/events/user.events.ts
export interface UserCreatedEvent {
  userId: string;
  userData: {
    name: string;
    email: string;
  };
  timestamp: Date;
}

export interface UserUpdatedEvent {
  userId: string;
  changes: Record<string, any>;
  timestamp: Date;
}

export interface UserDeletedEvent {
  userId: string;
  timestamp: Date;
}
```

在服务中发布事件：

```typescript
// src/domains/user/user.service.ts (更新版本)
import { Injectable, EventEmitter } from '@istock-shell/iswork';
import { UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent } from '../../shared/events/user.events';

@Injectable()
export class UserService {
  constructor(private eventEmitter: EventEmitter) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user = await this.createUser(userData);

    // 发布用户创建事件
    await this.eventEmitter.emit('user.created', {
      userId: user.id,
      userData: {
        name: user.name,
        email: user.email,
      },
      timestamp: new Date(),
    } as UserCreatedEvent);

    return user;
  }

  async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    const user = await this.updateUser(id, userData);

    if (user) {
      // 发布用户更新事件
      await this.eventEmitter.emit('user.updated', {
        userId: id,
        changes: userData,
        timestamp: new Date(),
      } as UserUpdatedEvent);
    }

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const success = await this.deleteUser(id);

    if (success) {
      // 发布用户删除事件
      await this.eventEmitter.emit('user.deleted', {
        userId: id,
        timestamp: new Date(),
      } as UserDeletedEvent);
    }

    return success;
  }
}
```

创建事件监听器：

```typescript
// src/shared/listeners/user.listener.ts
import { Injectable, EventListener } from '@istock-shell/iswork';
import { UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent } from '../events/user.events';

@Injectable()
export class UserEventListener {
  @EventListener('user.created')
  async onUserCreated(event: UserCreatedEvent) {
    console.log(`用户创建: ${event.userData.name} (${event.userId})`);

    // 发送欢迎邮件
    await this.sendWelcomeEmail(event.userData.email);

    // 记录审计日志
    await this.logUserAction('CREATE', event.userId, event.userData);
  }

  @EventListener('user.updated')
  async onUserUpdated(event: UserUpdatedEvent) {
    console.log(`用户更新: ${event.userId}`, event.changes);

    // 记录审计日志
    await this.logUserAction('UPDATE', event.userId, event.changes);
  }

  @EventListener('user.deleted')
  async onUserDeleted(event: UserDeletedEvent) {
    console.log(`用户删除: ${event.userId}`);

    // 清理相关数据
    await this.cleanupUserData(event.userId);

    // 记录审计日志
    await this.logUserAction('DELETE', event.userId);
  }

  private async sendWelcomeEmail(email: string) {
    // 发送欢迎邮件的逻辑
    console.log(`发送欢迎邮件到: ${email}`);
  }

  private async logUserAction(action: string, userId: string, data?: any) {
    // 记录审计日志的逻辑
    console.log(`审计日志: ${action} - ${userId}`, data);
  }

  private async cleanupUserData(userId: string) {
    // 清理用户相关数据的逻辑
    console.log(`清理用户数据: ${userId}`);
  }
}
```

## 实战项目

### 1. 博客管理系统

创建文章模型：

```typescript
// src/domains/blog/article.model.ts
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  summary?: string;
  categoryId: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  summary?: string;
  categoryId?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}
```

创建文章服务：

```typescript
// src/domains/blog/article.service.ts
import { Injectable } from '@istock-shell/iswork';
import { Article, CreateArticleDto, UpdateArticleDto } from './article.model';

@Injectable()
export class ArticleService {
  private articles = new Map<string, Article>();
  private idCounter = 1;

  async findAll(options?: {
    status?: string;
    authorId?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ articles: Article[]; total: number }> {
    let filteredArticles = Array.from(this.articles.values());

    // 应用过滤条件
    if (options?.status) {
      filteredArticles = filteredArticles.filter((article) => article.status === options.status);
    }
    if (options?.authorId) {
      filteredArticles = filteredArticles.filter((article) => article.authorId === options.authorId);
    }
    if (options?.categoryId) {
      filteredArticles = filteredArticles.filter((article) => article.categoryId === options.categoryId);
    }

    // 排序
    filteredArticles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // 分页
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const offset = (page - 1) * limit;
    const paginatedArticles = filteredArticles.slice(offset, offset + limit);

    return {
      articles: paginatedArticles,
      total: filteredArticles.length,
    };
  }

  async findById(id: string): Promise<Article | null> {
    return this.articles.get(id) || null;
  }

  async create(authorId: string, articleData: CreateArticleDto): Promise<Article> {
    const id = this.generateId();
    const now = new Date();

    const article: Article = {
      id,
      ...articleData,
      authorId,
      summary: articleData.summary || this.generateSummary(articleData.content),
      tags: articleData.tags || [],
      status: articleData.status || 'draft',
      publishedAt: articleData.status === 'published' ? now : undefined,
      createdAt: now,
      updatedAt: now,
    };

    this.articles.set(id, article);
    return article;
  }

  async update(id: string, articleData: UpdateArticleDto): Promise<Article | null> {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      return null;
    }

    const updatedArticle: Article = {
      ...existingArticle,
      ...articleData,
      publishedAt:
        articleData.status === 'published' && !existingArticle.publishedAt ? new Date() : existingArticle.publishedAt,
      updatedAt: new Date(),
    };

    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async delete(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  async searchByTitle(query: string): Promise<Article[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.articles.values()).filter((article) => article.title.toLowerCase().includes(lowercaseQuery));
  }

  async findByTag(tag: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter((article) => article.tags.includes(tag));
  }

  private generateId(): string {
    return `article_${this.idCounter++}_${Date.now()}`;
  }

  private generateSummary(content: string): string {
    // 简单的摘要生成逻辑
    const plainText = content.replace(/<[^>]*>/g, ''); // 移除HTML标签
    return plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
  }
}
```

创建文章控制器：

```typescript
// src/domains/blog/article.controller.ts
import { Controller, Payload, Meta, Middleware } from '@istock-shell/iswork';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './article.model';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { cacheMiddleware } from '../../shared/middleware/cache.middleware';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Method()
  async getArticles(
    @Payload('status') status?: string,
    @Payload('authorId') authorId?: string,
    @Payload('categoryId') categoryId?: string,
    @Payload('page') page: number = 1,
    @Payload('limit') limit: number = 10
  ) {
    const result = await this.articleService.findAll({
      status,
      authorId,
      categoryId,
      page,
      limit,
    });

    return {
      success: true,
      data: result.articles,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }

  @Method()
  async getArticleById(@Payload('id') id: string) {
    if (!id) {
      throw new Error('文章ID不能为空');
    }

    const article = await this.articleService.findById(id);
    if (!article) {
      throw new Error('文章不存在');
    }

    return {
      success: true,
      data: article,
    };
  }

  @Method()
  async createArticle(@Payload() articleData: CreateArticleDto, @Meta('currentUser') currentUser: any) {
    if (!articleData.title || !articleData.content) {
      throw new Error('标题和内容是必填项');
    }

    const article = await this.articleService.create(currentUser.id, articleData);

    return {
      success: true,
      data: article,
      message: '文章创建成功',
    };
  }

  @Method()
  async updateArticle(
    @Payload('id') id: string,
    @Payload('data') articleData: UpdateArticleDto,
    @Meta('currentUser') currentUser: any
  ) {
    if (!id) {
      throw new Error('文章ID不能为空');
    }

    // 检查文章是否存在且用户有权限修改
    const existingArticle = await this.articleService.findById(id);
    if (!existingArticle) {
      throw new Error('文章不存在');
    }
    if (existingArticle.authorId !== currentUser.id && currentUser.role !== 'admin') {
      throw new Error('没有权限修改此文章');
    }

    const article = await this.articleService.update(id, articleData);

    return {
      success: true,
      data: article,
      message: '文章更新成功',
    };
  }

  @Method()
  async deleteArticle(@Payload('id') id: string, @Meta('currentUser') currentUser: any) {
    if (!id) {
      throw new Error('文章ID不能为空');
    }

    // 检查权限
    const existingArticle = await this.articleService.findById(id);
    if (!existingArticle) {
      throw new Error('文章不存在');
    }
    if (existingArticle.authorId !== currentUser.id && currentUser.role !== 'admin') {
      throw new Error('没有权限删除此文章');
    }

    const success = await this.articleService.delete(id);

    return {
      success,
      message: '文章删除成功',
    };
  }

  async searchArticles(@Payload('query') query: string, @Payload('type') type: 'title' | 'tag' = 'title') {
    if (!query || query.trim().length === 0) {
      throw new Error('搜索关键词不能为空');
    }

    let articles;
    if (type === 'tag') {
      articles = await this.articleService.findByTag(query.trim());
    } else {
      articles = await this.articleService.searchByTitle(query.trim());
    }

    return {
      success: true,
      data: articles,
      total: articles.length,
    };
  }
}
```

## 性能优化

### 1. 连接池管理

```typescript
// src/shared/utils/connection-pool.ts
export class ConnectionPool {
  private connections: Map<string, any> = new Map();
  private maxConnections: number;
  private activeConnections: number = 0;

  constructor(maxConnections: number = 10) {
    this.maxConnections = maxConnections;
  }

  async getConnection(key: string): Promise<any> {
    if (this.connections.has(key)) {
      return this.connections.get(key);
    }

    if (this.activeConnections >= this.maxConnections) {
      throw new Error('连接池已满');
    }

    const connection = await this.createConnection(key);
    this.connections.set(key, connection);
    this.activeConnections++;

    return connection;
  }

  async releaseConnection(key: string): Promise<void> {
    if (this.connections.has(key)) {
      const connection = this.connections.get(key);
      await this.closeConnection(connection);
      this.connections.delete(key);
      this.activeConnections--;
    }
  }

  private async createConnection(key: string): Promise<any> {
    // 创建连接的逻辑
    console.log(`创建连接: ${key}`);
    return { id: key, created: new Date() };
  }

  private async closeConnection(connection: any): Promise<void> {
    // 关闭连接的逻辑
    console.log(`关闭连接: ${connection.id}`);
  }
}
```

### 2. 批量操作

```typescript
// src/shared/utils/batch-processor.ts
export class BatchProcessor<T> {
  private batch: T[] = [];
  private batchSize: number;
  private flushInterval: number;
  private processor: (items: T[]) => Promise<void>;
  private timer?: NodeJS.Timeout;

  constructor(processor: (items: T[]) => Promise<void>, batchSize: number = 100, flushInterval: number = 5000) {
    this.processor = processor;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.startTimer();
  }

  add(item: T): void {
    this.batch.push(item);

    if (this.batch.length >= this.batchSize) {
      this.flush();
    }
  }

  async flush(): Promise<void> {
    if (this.batch.length === 0) return;

    const items = [...this.batch];
    this.batch = [];

    try {
      await this.processor(items);
    } catch (error) {
      console.error('批量处理失败:', error);
      // 可以选择重新加入队列或记录错误
    }
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.flush(); // 处理剩余项目
  }
}
```

### 3. 内存监控

```typescript
// src/shared/utils/memory-monitor.ts
export class MemoryMonitor {
  private maxMemoryUsage: number;
  private checkInterval: number;
  private onMemoryWarning?: (usage: number) => void;
  private timer?: NodeJS.Timeout;

  constructor(
    maxMemoryUsage: number = 100 * 1024 * 1024, // 100MB
    checkInterval: number = 10000, // 10秒
    onMemoryWarning?: (usage: number) => void
  ) {
    this.maxMemoryUsage = maxMemoryUsage;
    this.checkInterval = checkInterval;
    this.onMemoryWarning = onMemoryWarning;
    this.start();
  }

  start(): void {
    this.timer = setInterval(() => {
      this.checkMemoryUsage();
    }, this.checkInterval);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private checkMemoryUsage(): void {
    if (typeof performance !== 'undefined' && performance.memory) {
      const usage = performance.memory.usedJSHeapSize;

      if (usage > this.maxMemoryUsage) {
        console.warn(`内存使用过高: ${this.formatBytes(usage)}`);
        this.onMemoryWarning?.(usage);
      }
    }
  }

  getMemoryUsage(): { used: number; total: number; percentage: number } {
    if (typeof performance !== 'undefined' && performance.memory) {
      const used = performance.memory.usedJSHeapSize;
      const total = performance.memory.totalJSHeapSize;
      const percentage = (used / total) * 100;

      return { used, total, percentage };
    }

    return { used: 0, total: 0, percentage: 0 };
  }

  private formatBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
```

## 故障排除

### 1. 常见问题

#### 问题：装饰器不工作

**原因**：TypeScript 配置问题

**解决方案**：

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

#### 问题：依赖注入失败

**原因**：循环依赖或服务未注册

**解决方案**：

```typescript
// 检查服务是否正确注册
@Injectable()
class MyService {}

// 检查是否存在循环依赖
// A -> B -> A 这种情况需要重构
```

#### 问题：消息路由失败

**原因**：地址格式错误或控制器未注册

**解决方案**：

```typescript
// 确保地址格式正确
'cmdp://@domain.app:8080/Controller.method';

// 确保控制器正确注册
@Controller('mycontroller')
class MyController {}
```

### 2. 调试技巧

#### 启用详细日志

```typescript
// src/config/logger.ts
export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
};
```

#### 性能分析

```typescript
// src/shared/utils/performance.ts
export function measurePerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const start = performance.now();

    try {
      const result = await fn();
      const end = performance.now();
      console.log(`${name} 执行时间: ${end - start}ms`);
      resolve(result);
    } catch (error) {
      const end = performance.now();
      console.error(`${name} 执行失败，耗时: ${end - start}ms`, error);
      reject(error);
    }
  });
}

// 使用示例
const result = await measurePerformance('getUserById', async () => {
  return await userService.findById('123');
});
```

### 3. 测试策略

#### 单元测试

```typescript
// src/domains/user/user.service.test.ts
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('create', () => {
    it('应该成功创建用户', async () => {
      const userData = {
        name: '测试用户',
        email: 'test@example.com',
      };

      const user = await userService.create(userData);

      expect(user.id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('应该拒绝重复的邮箱', async () => {
      const userData = {
        name: '测试用户',
        email: 'test@example.com',
      };

      await userService.create(userData);

      await expect(userService.create(userData)).rejects.toThrow('该邮箱已被注册');
    });
  });
});
```

#### 集成测试

```typescript
// src/test/integration/user.test.ts
import { Application } from '@istock-shell/iswork';
import { UserDomain } from '../domains/user/user.domain';

describe('User Integration Tests', () => {
  let app: Application;
  let messageHandler: any;

  beforeEach(() => {
    app = new Application({ domainPath: 'test-app' });
    messageHandler = app.listen(UserDomain);
  });

  afterEach(() => {
    app.close();
  });

  it('应该处理用户创建消息', async () => {
    const message = {
      address: 'cmdp://@user.test-app:8080/UserController.createUser',
      payload: {
        name: '集成测试用户',
        email: 'integration@example.com',
      },
      meta: { requestId: 'test-123' },
    };

    const event = new MessageEvent('message', { data: message });
    const result = await messageHandler(event);

    expect(result.success).toBe(true);
    expect(result.data.name).toBe('集成测试用户');
  });
});
```

## 总结

通过本教程，您已经学会了：

1. **基础概念**：应用程序、域、控制器、服务的创建和使用
2. **数据管理**：ORM 数据源配置、实体定义、仓库模式
3. **高级特性**：自定义中间件、装饰器、事件系统
4. **实战项目**：完整的博客管理系统实现
5. **性能优化**：连接池、批量处理、内存监控
6. **故障排除**：常见问题解决、调试技巧、测试策略

`@istock-shell/iswork` 框架提供了强大而灵活的功能，帮助您构建高质量的 Web Worker 应用程序。继续探索框架的更多功能，并根据您的具体需求进行定制和扩展。
