# 快速入门指南

本指南将帮助您快速上手 `@istock-shell/iswork` 框架，了解基本概念和使用方法。

## 安装

```bash
npm install @istock-shell/iswork
```

## 基本概念

### 1. 应用程序（Application）

应用程序是框架的核心入口，负责管理整个应用的生命周期。

```typescript
import { Application } from '@istock-shell/iswork';

const app = new Application({
  domainPath: 'my-app',
  middlewares: [], // 全局中间件
});
```

### 2. 域（Domain）

域是业务逻辑的容器，用于组织相关的控制器和服务。

```typescript
import { Domain } from '@istock-shell/iswork';

@Domain({
  name: 'UserDomain',
  description: '用户管理域',
})
class UserDomain {
  // 域实现
}
```

### 3. 控制器（Controller）

控制器处理具体的业务请求，类似于传统Web框架中的控制器。

```typescript
import { Controller, Payload, Meta } from '@istock-shell/iswork';

@Controller('user')
class UserController {
  async getUser(@Payload('id') id: string) {
    return { id, name: 'John Doe', email: 'john@example.com' };
  }

  async createUser(@Payload() userData: any, @Meta('timestamp') timestamp: number) {
    // 创建用户逻辑
    return { success: true, id: 'new-user-id' };
  }
}
```

### 4. 服务（Service）

服务用于封装业务逻辑，可以被控制器或其他服务注入使用。

```typescript
import { Injectable } from '@istock-shell/iswork';

@Injectable()
class UserService {
  private users = new Map();

  async findById(id: string) {
    return this.users.get(id);
  }

  async create(userData: any) {
    const id = this.generateId();
    this.users.set(id, { id, ...userData });
    return id;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

## 完整示例

以下是一个完整的用户管理示例：

```typescript
import { Application, Domain, Controller, Injectable, Payload, Meta } from '@istock-shell/iswork';

// 1. 定义数据模型
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// 2. 定义服务
@Injectable()
class UserService {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<string> {
    const id = this.generateId();
    const user: User = {
      id,
      ...userData,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return id;
  }

  async update(id: string, userData: Partial<User>): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.set(id, { ...user, ...userData });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// 3. 定义控制器
@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  async getUser(@Payload('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAllUsers() {
    return await this.userService.findAll();
  }

  async createUser(@Payload() userData: { name: string; email: string }, @Meta('timestamp') timestamp: number) {
    const id = await this.userService.create(userData);
    return { success: true, id, timestamp };
  }

  async updateUser(@Payload('id') id: string, @Payload('data') userData: Partial<User>) {
    const success = await this.userService.update(id, userData);
    return { success };
  }

  async deleteUser(@Payload('id') id: string) {
    const success = await this.userService.delete(id);
    return { success };
  }
}

// 4. 定义域
@Domain({
  name: 'UserDomain',
  description: '用户管理域',
  version: '1.0.0',
})
class UserDomain {
  // 可以在这里定义域级别的配置和初始化逻辑
}

// 5. 创建和启动应用
const app = new Application({
  domainPath: 'user-management-app',
  middlewares: [
    // 可以添加全局中间件
    async (ctx, next) => {
      console.log('Request received:', ctx.message.address);
      await next();
      console.log('Response sent');
    },
  ],
});

// 启动应用
app.listen(UserDomain);

// 6. 发送消息测试
// 在实际使用中，这些消息会从主线程发送到Web Worker
const testMessages = [
  {
    address: 'cmdp://@user.user-management-app:8080/UserController.createUser',
    payload: { name: 'John Doe', email: 'john@example.com' },
    meta: { timestamp: Date.now() },
  },
  {
    address: 'cmdp://@user.user-management-app:8080/UserController.getAllUsers',
    payload: {},
    meta: {},
  },
];

// 模拟消息处理
testMessages.forEach(async (message) => {
  try {
    const result = await app.handleMessage(message);
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
});
```

## 消息格式

框架使用CMDP协议进行消息通信，消息格式如下：

```typescript
interface CmdpMessage {
  address: string; // 目标地址，格式：protocol://user@domain:port/Controller.method
  payload?: any; // 请求数据
  meta?: any; // 元数据
}
```

### 地址格式说明

- `protocol`：协议类型，通常为 `cmdp:` 或 `event:`
- `user`：用户标识，通常为控制器别名
- `domain`：域名，对应应用的 domainPath
- `port`：端口号，通常为 8080
- `Controller.method`：控制器类名和方法名

示例地址：

```
cmdp://@user.my-app:8080/UserController.getUser
event://@notification.my-app:8080/NotificationController.send
```

## 下一步

- 了解[核心概念](./core-concepts.md)以深入理解框架架构
- 学习[装饰器指南](./decorators.md)掌握装饰器的使用
- 探索[依赖注入](./dependency-injection.md)了解DI容器的高级用法
- 查看[ORM使用](./orm.md)学习数据访问层的使用
