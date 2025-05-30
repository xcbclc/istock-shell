# @istock-shell/iswork

## 概述

**`@istock-shell/iswork`** 是一个精心设计的`Web Worker`层服务框架，专为提升数据查询业务的高效开发与可维护性而生。它深受NestJS框架的影响，集成了`模块化`、`依赖注入（DI）`、`面向切面编程（AOP）`、`ORM`、`消息通信`和`CMDP协议`等先进理念，为开发者提供了一个高效、灵活且易于扩展的开发平台。

## 核心功能

### 1. **应用程序框架（Application）**

- **生命周期管理**：提供完整的应用程序生命周期管理，包括启动、监听、中间件处理等
- **事件驱动**：基于事件驱动架构，支持应用程序状态变化的监听和处理
- **中间件支持**：类似Koa的中间件机制，支持洋葱模型的请求处理流程
- **消息处理**：内置消息处理机制，支持CMDP协议的消息路由和处理

### 2. **依赖注入（IoC Container）**

- **多种提供者**：支持类提供者（ClassProvider）、值提供者（ValueProvider）、工厂提供者（FactoryProvider）
- **作用域管理**：支持全局作用域和域级作用域的依赖管理
- **自动注入**：通过装饰器自动解析和注入依赖项

### 3. **装饰器系统（Decorators）**

- **域装饰器**：`@Domain` 用于标记业务域类
- **控制器装饰器**：`@Controller` 用于标记控制器类
- **方法装饰器**：支持路由、参数、返回值等方法级装饰器
- **注入装饰器**：`@Injectable`、`@Inject` 用于依赖注入
- **参数装饰器**：`@Payload`、`@Meta`、`@Field` 等用于参数绑定

### 4. **ORM 数据访问层**

- **多数据源支持**：原生支持`IndexedDB`、`HTTP请求`、`内存`等多种数据源
- **查询构建器**：提供灵活的QueryBuilder，支持复杂查询条件构建
- **仓库模式**：实现Repository模式，提供标准的CRUD操作接口
- **模型定义**：支持实体模型定义和元数据管理
- **数据源管理**：统一的数据源连接和生命周期管理

### 5. **消息通信系统**

- **多种适配器**：支持MessageChannel、SSE、Observable等多种消息通信方式
- **异步迭代器**：支持消息的异步迭代处理
- **事件监听**：提供消息和错误事件的监听机制
- **通道管理**：统一的消息通道管理和路由

### 6. **CMDP协议**

- **协议标准**：定义了完整的命令协议规范，类似HTTP协议
- **地址解析**：支持类似URL的地址解析和路由
- **元数据管理**：支持请求和响应的元数据处理
- **事件协议**：专门的事件协议支持（event://）

### 7. **中间件和管道**

- **中间件组合**：类似Koa的中间件组合机制，通过compose函数实现
- **管道处理**：支持数据处理管道的定义和执行，通过PipeManager管理
- **函数式中间件**：支持函数式中间件定义，无需装饰器

## 快速开始

### 安装

```bash
npm install @istock-shell/iswork
```

### 基本使用

```typescript
import { Application, Domain, Controller, Injectable } from '@istock-shell/iswork';

// 定义服务
@Injectable()
class UserService {
  async getUser(id: string) {
    return { id, name: 'John Doe' };
  }
}

// 定义控制器
@Controller('user')
class UserController {
  constructor(private userService: UserService) {}

  async getUser(@Payload('id') id: string) {
    return await this.userService.getUser(id);
  }
}

// 定义域
@Domain({ name: 'UserDomain' })
class UserDomain {
  // 域实现
}

// 创建应用
const app = new Application({
  domainPath: 'my-app',
});

// 启动应用
app.listen(UserDomain);
```

## 架构特点

- **类型安全**：完全基于TypeScript开发，提供完整的类型支持
- **模块化设计**：清晰的模块划分，便于维护和扩展
- **装饰器驱动**：通过装饰器简化配置和元数据管理
- **异步优先**：全面支持异步操作和Promise
- **Web Worker优化**：专为Web Worker环境设计和优化

## 文档导航

- [快速入门](./doc/quick-start.md) - 快速上手指南
- [核心概念](./doc/core-concepts.md) - 框架核心概念详解
- [装饰器指南](./doc/decorators.md) - 装饰器使用指南
- [依赖注入](./doc/dependency-injection.md) - 依赖注入详解
- [ORM使用](./doc/orm.md) - ORM数据访问层使用指南
- [消息通信](./doc/messaging.md) - 消息通信系统使用
- [CMDP协议](./doc/cmdp.md) - CMDP协议详解
- [API参考](./doc/api-reference.md) - 完整API参考文档

## 结语

**`@istock-shell/iswork`** 是一款集NestJS精髓与Web Worker优势于一体的现代化服务框架。它通过一系列先进的编程理念和技术手段，为开发者带来了前所未有的开发体验与项目质量提升。
