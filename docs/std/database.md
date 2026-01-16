# 数据存储规范

本文档定义了 **istock-shell** 项目中数据持久化和存储的标准，基于 **iswork** 框架内置的 ORM 系统，支持多数据源管理和对象关系映射。

## 1. 存储架构

### 1.1 ORM 系统

项目采用 Code-First 的 ORM（对象关系映射）模式。开发者通过定义 TypeScript 类（Model）来描述数据结构，框架自动处理数据库表的创建和数据的增删改查。

### 1.2 数据源

框架支持多种类型的驱动（Driver），根据应用场景选择合适的存储介质：

| 驱动类型      | 标识        | 适用场景                                                     | 持久性       |
| :------------ | :---------- | :----------------------------------------------------------- | :----------- |
| **IndexedDB** | `indexeddb` | **客户端核心存储**。适用于保存用户配置、本地缓存、离线数据。 | 持久化       |
| **Memory**    | `memory`    | 临时数据、单元测试、会话级缓存。                             | 页面刷新丢失 |
| **HTTP**      | `http`      | 远程 API 数据映射。将后端接口映射为本地模型操作。            | 远程持久化   |

## 2. 模型定义

### 2.1 实体类

所有数据模型类必须继承自 `BaseModel` 或实现相应接口，并使用 `@Model` 装饰器标记。

```typescript
import { Model, Column, PrimaryColumn } from '@istock-shell/iswork';

@Model('sys_user') // 表名为 sys_user
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: Date.now })
  createdAt: number;
}
```

### 2.2 字段装饰器

- **@PrimaryColumn()**: 主键字段。
- **@Column()**: 普通列。支持配置 `nullable`, `default`, `unique`, `type` 等属性。
- **@Index()**: 创建索引，用于优化查询性能。

## 3. 数据访问

### 3.1 仓储模式

**禁止**在 Controller 或 Service 中直接操作底层数据库连接。**必须**通过 `Repository` 对象进行数据访问。

```typescript
import { Inject, Repository } from '@istock-shell/iswork';

export class UserService {
  @Inject(User)
  private userRepo: Repository<User>;

  async createUser(name: string) {
    const user = new User();
    user.username = name;
    return await this.userRepo.save(user);
  }

  async findUser(name: string) {
    return await this.userRepo.findOne({ where: { username: name } });
  }
}
```

### 3.2 查询构建

对于复杂查询，应使用 Repository 提供的查询接口或 QueryBuilder（如果支持）。

- `find()`: 查询多条。
- `findOne()`: 查询单条。
- `save()`: 保存或更新。
- `delete()`: 删除。

## 4. 最佳实践

### 4.1 异步操作

所有数据库操作均为异步（Async/Await）。开发者必须确保在调用链中正确处理 Promise。

### 4.2 命名规范

- **表名**: 使用 `snake_case`（如 `sys_user`, `trade_record`）。
- **字段名**: 使用 `camelCase`（如 `userName`, `orderId`），ORM 会自动映射。
