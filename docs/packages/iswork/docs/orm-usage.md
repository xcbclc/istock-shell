# ORM 使用指南

本文档详细介绍 `@istock-shell/iswork` 框架的ORM（对象关系映射）系统，包括数据源配置、模型定义、查询构建和仓储模式的使用。

## 概述

框架内置的ORM系统提供了统一的数据访问接口，支持多种数据源类型，包括IndexedDB、HTTP API、内存存储等。通过抽象的数据访问层，应用可以轻松切换不同的数据存储方案。

### 核心特性

- **多数据源支持**：IndexedDB、HTTP、Memory等
- **统一查询接口**：一致的查询语法和API
- **类型安全**：完整的TypeScript支持
- **关系映射**：支持一对一、一对多、多对多关系
- **查询构建器**：灵活的查询条件构建
- **事务支持**：数据一致性保证
- **缓存集成**：自动缓存和失效策略

## 1. 数据源配置

### DataSource 基础

`DataSource` 是ORM系统的核心，负责管理数据连接、模型注册和仓储创建。

```typescript
class DataSource {
  private connection: any;
  private repositories: Map<any, Repository>;
  private models: Set<any>;

  constructor(private options: DataSourceOptions) {}

  async connect(): Promise<void> {
    // 建立数据连接
  }

  async disconnect(): Promise<void> {
    // 断开数据连接
  }

  getRepository<T>(model: new () => T): Repository<T> {
    // 获取模型仓储
  }
}
```

### 配置选项

```typescript
interface DataSourceOptions {
  type: 'indexeddb' | 'http' | 'memory' | 'websocket';
  name?: string;
  version?: number;
  models?: any[];
  synchronize?: boolean;
  logging?: boolean;
  cache?: CacheOptions;
  // 特定数据源的配置
  [key: string]: any;
}
```

### IndexedDB 数据源

适用于客户端本地数据存储。

```typescript
// IndexedDB 配置
const indexedDbDataSource = new DataSource({
  type: 'indexeddb',
  name: 'MyAppDB',
  version: 2,
  models: [User, Post, Comment],
  synchronize: true,
  logging: true,
  cache: {
    enabled: true,
    ttl: 3600,
    maxSize: 1000,
  },
  // IndexedDB 特定配置
  stores: {
    users: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'email', keyPath: 'email', unique: true },
        { name: 'name', keyPath: 'name', unique: false },
        { name: 'createdAt', keyPath: 'createdAt', unique: false },
      ],
    },
    posts: {
      keyPath: 'id',
      autoIncrement: false,
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: false },
        { name: 'title', keyPath: 'title', unique: false },
        { name: 'publishedAt', keyPath: 'publishedAt', unique: false },
      ],
    },
  },
});

// 连接数据源
await indexedDbDataSource.connect();
```

### HTTP 数据源

适用于RESTful API数据访问。

```typescript
// HTTP 配置
const httpDataSource = new DataSource({
  type: 'http',
  name: 'ApiDataSource',
  models: [User, Post, Comment],
  logging: true,
  cache: {
    enabled: true,
    ttl: 300,
    strategy: 'lru',
  },
  // HTTP 特定配置
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  auth: {
    type: 'bearer',
    token: () => localStorage.getItem('authToken'),
  },
  endpoints: {
    users: {
      list: 'GET /users',
      get: 'GET /users/:id',
      create: 'POST /users',
      update: 'PUT /users/:id',
      delete: 'DELETE /users/:id',
      search: 'POST /users/search',
    },
    posts: {
      list: 'GET /posts',
      get: 'GET /posts/:id',
      create: 'POST /posts',
      update: 'PUT /posts/:id',
      delete: 'DELETE /posts/:id',
      byUser: 'GET /users/:userId/posts',
    },
  },
  interceptors: {
    request: [
      (config) => {
        // 添加请求ID
        config.headers['X-Request-ID'] = crypto.randomUUID();
        return config;
      },
    ],
    response: [
      (response) => {
        // 处理响应数据
        if (response.data && response.data.data) {
          return response.data.data;
        }
        return response.data;
      },
      (error) => {
        // 错误处理
        if (error.response?.status === 401) {
          // 处理认证失败
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    ],
  },
});

// 连接数据源
await httpDataSource.connect();
```

### Memory 数据源

适用于测试和临时数据存储。

```typescript
// Memory 配置
const memoryDataSource = new DataSource({
  type: 'memory',
  name: 'TestDataSource',
  models: [User, Post, Comment],
  logging: false,
  // Memory 特定配置
  initialData: {
    users: [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ],
    posts: [
      { id: '1', title: 'Hello World', userId: '1', content: 'First post' },
      { id: '2', title: 'Second Post', userId: '2', content: 'Another post' },
    ],
  },
  autoIncrement: {
    users: 3,
    posts: 3,
  },
});

// 连接数据源
await memoryDataSource.connect();
```

## 2. 模型定义

### 基础模型

使用装饰器定义数据模型。

```typescript
// 用户模型
@Model('users')
class User {
  @PrimaryColumn()
  @Column({ type: 'string' })
  id: string;

  @Column({ type: 'string', length: 100, nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'string', length: 50, nullable: false })
  @Index()
  name: string;

  @Column({ type: 'string', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  // 注意：关系装饰器、生命周期钩子和验证装饰器在当前版本中不可用
  // 以下功能需要手动实现或等待后续版本支持

  // 手动实现的虚拟属性
  get fullName(): string {
    return `${this.name}`;
  }

  get isNew(): boolean {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.createdAt > oneWeekAgo;
  }

  // 手动实现的生命周期方法
  beforeInsert() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    this.createdAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }

  // 手动实现的验证方法
  validate() {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    if (!this.name || this.name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }
}
```

### 基础模型示例

```typescript
// 文章模型
@Model('posts')
class Post {
  @PrimaryColumn()
  @Column({ type: 'string' })
  id: string;

  @Column({ type: 'string', length: 200, nullable: false })
  @Index()
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'string', nullable: true })
  excerpt?: string;

  @Column({ type: 'string', nullable: false })
  @Index()
  userId: string;

  @Column({ type: 'array', default: [] })
  tags: string[];

  @Column({ type: 'enum', enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: 'draft' | 'published' | 'archived';

  @Column({ type: 'date', nullable: true })
  @Index()
  publishedAt?: Date;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'number', default: 0 })
  viewCount: number;

  @Column({ type: 'number', default: 0 })
  likeCount: number;

  // 注意：关系装饰器在当前版本中不可用
  // 关系需要通过手动查询或业务逻辑实现
    joinColumn: { name: 'postId' },
    inverseJoinColumn: { name: 'tagId' }
  })
  tagEntities: Tag[];

  // 虚拟属性
  @Computed()
  get isPublished(): boolean {
    return this.status === 'published' && this.publishedAt != null;
  }

  @Computed()
  get readingTime(): number {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // 生命周期钩子
  @BeforeInsert()
  beforeInsert() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    this.createdAt = new Date();
    this.generateExcerpt();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
    this.generateExcerpt();

    if (this.status === 'published' && !this.publishedAt) {
      this.publishedAt = new Date();
    }
  }

  private generateExcerpt() {
    if (!this.excerpt && this.content) {
      this.excerpt = this.content.substring(0, 150) + '...';
    }
  }
}

// 评论模型
@Model('comments')
class Comment {
  @PrimaryColumn()
  @Column({ type: 'string' })
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'string', nullable: false })
  @Index()
  userId: string;

  @Column({ type: 'string', nullable: false })
  @Index()
  postId: string;

  @Column({ type: 'string', nullable: true })
  @Index()
  parentId?: string;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'number', default: 0 })
  likeCount: number;

  // 注意：关系装饰器和生命周期钩子在当前版本中不可用
  // 需要手动实现关系查询和生命周期管理

  // 手动实现的生命周期方法
  beforeInsert() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    this.createdAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
}

// 标签模型
@Model('tags')
class Tag {
  @PrimaryColumn()
  @Column({ type: 'string' })
  id: string;

  @Column({ type: 'string', length: 50, nullable: false })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'string', length: 7, nullable: true })
  color?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'number', default: 0 })
  postCount: number;

  // 手动实现的生命周期方法
  beforeInsert() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    this.createdAt = new Date();
  }
}
```

## 3. 查询构建器

### QueryBuilder 基础

`QueryBuilder` 提供了灵活的查询构建功能。

```typescript
class QueryBuilder<T> {
  private model: new () => T;
  private selectFields: string[];
  private whereConditions: any[];
  private joinRelations: any[];
  private orderBy: any[];
  private limitValue?: number;
  private offsetValue?: number;

  constructor(model: new () => T) {
    this.model = model;
  }

  select(fields: string[]): QueryBuilder<T> {
    this.selectFields = fields;
    return this;
  }

  where(field: string, operator: string, value: any): QueryBuilder<T> {
    this.whereConditions.push([field, operator, value]);
    return this;
  }

  join(relation: string): QueryBuilder<T> {
    this.joinRelations.push(relation);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder<T> {
    this.orderBy.push([field, direction]);
    return this;
  }

  limit(count: number): QueryBuilder<T> {
    this.limitValue = count;
    return this;
  }

  offset(count: number): QueryBuilder<T> {
    this.offsetValue = count;
    return this;
  }

  async getMany(): Promise<T[]> {
    // 执行查询并返回结果
  }

  async getOne(): Promise<T | null> {
    // 执行查询并返回单个结果
  }

  async count(): Promise<number> {
    // 返回匹配记录数
  }
}
```

### 基础查询

```typescript
// 获取仓储
const userRepository = dataSource.getRepository(User);
const postRepository = dataSource.getRepository(Post);

// 简单查询
const users = await userRepository.query(User, {
  select: ['id', 'name', 'email'],
  filter: ['isActive', 'eq', true],
  sort: [['createdAt', 'DESC']],
  limit: 10,
  offset: 0,
});

// 使用查询构建器
const activeUsers = await userRepository
  .createQueryBuilder()
  .select(['id', 'name', 'email', 'createdAt'])
  .where('isActive', 'eq', true)
  .where('createdAt', 'gte', new Date('2024-01-01'))
  .orderBy('createdAt', 'DESC')
  .limit(20)
  .getMany();

// 复杂条件查询
const searchUsers = await userRepository
  .createQueryBuilder()
  .where('name', 'like', '%john%')
  .where('email', 'like', '%@gmail.com')
  .where('isActive', 'eq', true)
  .orderBy('name', 'ASC')
  .getMany();
```

### 关系查询

```typescript
// 加载关系数据
const usersWithPosts = await userRepository.createQueryBuilder().join('posts').where('isActive', 'eq', true).getMany();

// 嵌套关系查询
const postsWithUserAndComments = await postRepository
  .createQueryBuilder()
  .join('user')
  .join('comments')
  .join('comments.user')
  .where('status', 'eq', 'published')
  .orderBy('publishedAt', 'DESC')
  .getMany();

// 条件关系查询
const usersWithRecentPosts = await userRepository
  .createQueryBuilder()
  .join('posts', (qb) => {
    return qb.where('publishedAt', 'gte', new Date('2024-01-01'));
  })
  .getMany();
```

### 聚合查询

```typescript
// 计数查询
const userCount = await userRepository.createQueryBuilder().where('isActive', 'eq', true).count();

// 分组统计
const postStats = await postRepository
  .createQueryBuilder()
  .select(['status', 'COUNT(*) as count'])
  .groupBy('status')
  .getMany();

// 复杂聚合
const userPostStats = await userRepository
  .createQueryBuilder()
  .select(['id', 'name', 'COUNT(posts.id) as postCount', 'AVG(posts.viewCount) as avgViews'])
  .join('posts')
  .groupBy('id', 'name')
  .having('COUNT(posts.id)', 'gt', 5)
  .orderBy('postCount', 'DESC')
  .getMany();
```

### 高级查询

```typescript
// 子查询
const popularPosts = await postRepository
  .createQueryBuilder()
  .where('viewCount', 'gt', (qb) => {
    return qb.select('AVG(viewCount)').from(Post).where('status', 'eq', 'published');
  })
  .getMany();

// 存在性查询
const usersWithComments = await userRepository
  .createQueryBuilder()
  .whereExists((qb) => {
    return qb.select('1').from(Comment).where('userId', 'eq', 'User.id');
  })
  .getMany();

// 联合查询
const allContent = await postRepository
  .createQueryBuilder()
  .select(['id', 'title as name', 'createdAt', "'post' as type"])
  .union((qb) => {
    return qb.select(['id', 'content as name', 'createdAt', "'comment' as type"]).from(Comment);
  })
  .orderBy('createdAt', 'DESC')
  .getMany();
```

## 4. 仓储模式

### Repository 基础

`Repository` 提供了模型数据的CRUD操作接口。

```typescript
class Repository<T = any> {
  constructor(
    private dataSource: DataSource,
    private model: new () => T
  ) {}

  // 创建操作
  async createOne(model: new () => T, data: Partial<T>): Promise<string> {
    // 创建单个记录
  }

  async createMany(model: new () => T, data: Partial<T>[]): Promise<string[]> {
    // 批量创建记录
  }

  // 查询操作
  async findOneById(model: new () => T, id: string): Promise<T | null> {
    // 根据ID查找单个记录
  }

  async findOne(model: new () => T, options: QueryOptions): Promise<T | null> {
    // 根据条件查找单个记录
  }

  async query(model: new () => T, options: QueryOptions): Promise<T[]> {
    // 根据条件查询多个记录
  }

  // 更新操作
  async updateOne(model: new () => T, id: string, data: Partial<T>): Promise<T> {
    // 更新单个记录
  }

  async updateMany(model: new () => T, filter: any[], data: Partial<T>): Promise<number> {
    // 批量更新记录
  }

  // 删除操作
  async deleteOne(model: new () => T, id: string): Promise<boolean> {
    // 删除单个记录
  }

  async deleteMany(model: new () => T, filter: any[]): Promise<number> {
    // 批量删除记录
  }

  // 查询构建器
  createQueryBuilder(): QueryBuilder<T> {
    return new QueryBuilder(this.model);
  }
}
```

### 基础CRUD操作

```typescript
// 获取仓储
const userRepository = dataSource.getRepository(User);

// 创建用户
const userId = await userRepository.createOne(User, {
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true,
});

// 批量创建用户
const userIds = await userRepository.createMany(User, [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'Charlie', email: 'charlie@example.com' },
]);

// 根据ID查找用户
const user = await userRepository.findOneById(User, userId);

// 根据条件查找用户
const activeUser = await userRepository.findOne(User, {
  filter: ['email', 'eq', 'john@example.com'],
});

// 查询用户列表
const users = await userRepository.query(User, {
  filter: ['isActive', 'eq', true],
  sort: [['createdAt', 'DESC']],
  limit: 10,
});

// 更新用户
const updatedUser = await userRepository.updateOne(User, userId, {
  name: 'John Smith',
  updatedAt: new Date(),
});

// 批量更新
const updatedCount = await userRepository.updateMany(User, ['isActive', 'eq', false], { isActive: true });

// 删除用户
const deleted = await userRepository.deleteOne(User, userId);

// 批量删除
const deletedCount = await userRepository.deleteMany(User, ['isActive', 'eq', false]);
```

### 自定义仓储

```typescript
// 用户仓储
@Injectable()
class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  // 根据邮箱查找用户
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne(User, {
      filter: ['email', 'eq', email],
    });
  }

  // 查找活跃用户
  async findActiveUsers(limit: number = 10): Promise<User[]> {
    return await this.query(User, {
      filter: ['isActive', 'eq', true],
      sort: [['createdAt', 'DESC']],
      limit,
    });
  }

  // 搜索用户
  async searchUsers(
    keyword: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;

    // 构建搜索条件
    const searchFilter = ['or', ['name', 'like', `%${keyword}%`], ['email', 'like', `%${keyword}%`]];

    // 查询用户
    const users = await this.query(User, {
      filter: ['and', ['isActive', 'eq', true], searchFilter],
      sort: [['name', 'ASC']],
      limit,
      offset,
    });

    // 计算总数
    const total = await this.createQueryBuilder()
      .where('isActive', 'eq', true)
      .where((qb) => {
        return qb.where('name', 'like', `%${keyword}%`).orWhere('email', 'like', `%${keyword}%`);
      })
      .count();

    return {
      users,
      total,
      page,
      limit,
    };
  }

  // 获取用户统计信息
  async getUserStats(userId: string): Promise<{
    postCount: number;
    commentCount: number;
    totalViews: number;
    avgViews: number;
  }> {
    const postRepository = this.dataSource.getRepository(Post);
    const commentRepository = this.dataSource.getRepository(Comment);

    // 文章统计
    const postStats = await postRepository
      .createQueryBuilder()
      .select(['COUNT(*) as count', 'SUM(viewCount) as totalViews', 'AVG(viewCount) as avgViews'])
      .where('userId', 'eq', userId)
      .where('status', 'eq', 'published')
      .getOne();

    // 评论统计
    const commentCount = await commentRepository
      .createQueryBuilder()
      .where('userId', 'eq', userId)
      .where('isActive', 'eq', true)
      .count();

    return {
      postCount: postStats?.count || 0,
      commentCount,
      totalViews: postStats?.totalViews || 0,
      avgViews: postStats?.avgViews || 0,
    };
  }

  // 软删除用户
  async softDelete(userId: string): Promise<boolean> {
    const user = await this.findOneById(User, userId);
    if (!user) {
      return false;
    }

    await this.updateOne(User, userId, {
      isActive: false,
      updatedAt: new Date(),
    });

    return true;
  }

  // 恢复用户
  async restore(userId: string): Promise<boolean> {
    const user = await this.findOneById(User, userId);
    if (!user) {
      return false;
    }

    await this.updateOne(User, userId, {
      isActive: true,
      updatedAt: new Date(),
    });

    return true;
  }
}

// 文章仓储
@Injectable()
class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(dataSource, Post);
  }

  // 发布文章
  async publish(postId: string): Promise<Post> {
    return await this.updateOne(Post, postId, {
      status: 'published',
      publishedAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // 获取已发布文章
  async getPublishedPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;

    const posts = await this.query(Post, {
      filter: ['status', 'eq', 'published'],
      sort: [['publishedAt', 'DESC']],
      limit,
      offset,
      include: ['user'],
    });

    const total = await this.createQueryBuilder().where('status', 'eq', 'published').count();

    return { posts, total, page, limit };
  }

  // 根据标签获取文章
  async getPostsByTag(tagName: string, limit: number = 10): Promise<Post[]> {
    return await this.createQueryBuilder()
      .join('tagEntities')
      .where('tagEntities.name', 'eq', tagName)
      .where('status', 'eq', 'published')
      .orderBy('publishedAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  // 增加浏览量
  async incrementViewCount(postId: string): Promise<void> {
    const post = await this.findOneById(Post, postId);
    if (post) {
      await this.updateOne(Post, postId, {
        viewCount: post.viewCount + 1,
      });
    }
  }

  // 获取热门文章
  async getPopularPosts(days: number = 7, limit: number = 10): Promise<Post[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return await this.createQueryBuilder()
      .where('status', 'eq', 'published')
      .where('publishedAt', 'gte', since)
      .orderBy('viewCount', 'DESC')
      .orderBy('likeCount', 'DESC')
      .limit(limit)
      .getMany();
  }
}
```

## 5. 事务处理

### 基础事务

```typescript
// 事务操作
const transaction = await dataSource.beginTransaction();

try {
  // 创建用户
  const userId = await transaction.createOne(User, {
    name: 'John Doe',
    email: 'john@example.com',
  });

  // 创建用户的第一篇文章
  const postId = await transaction.createOne(Post, {
    title: 'My First Post',
    content: 'Hello, World!',
    userId,
    status: 'published',
    publishedAt: new Date(),
  });

  // 更新用户统计
  await transaction.updateOne(User, userId, {
    metadata: { postCount: 1 },
  });

  // 提交事务
  await transaction.commit();

  console.log('User and post created successfully');
} catch (error) {
  // 回滚事务
  await transaction.rollback();
  console.error('Transaction failed:', error.message);
  throw error;
}
```

### 事务装饰器

```typescript
// 事务装饰器
function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const dataSource = this.dataSource || container.resolve('DATA_SOURCE');
      const transaction = await dataSource.beginTransaction();

      try {
        // 临时替换仓储为事务仓储
        const originalRepositories = new Map();
        for (const [key, repo] of Object.entries(this)) {
          if (repo instanceof Repository) {
            originalRepositories.set(key, repo);
            this[key] = transaction.getRepository(repo.model);
          }
        }

        const result = await originalMethod.apply(this, args);

        // 恢复原始仓储
        for (const [key, repo] of originalRepositories) {
          this[key] = repo;
        }

        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    };
  };
}

// 使用事务装饰器
@Injectable()
class UserService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {}

  @Transactional()
  async createUserWithWelcomePost(userData: CreateUserDto): Promise<{
    user: User;
    post: Post;
  }> {
    // 创建用户
    const userId = await this.userRepository.createOne(User, userData);
    const user = await this.userRepository.findOneById(User, userId);

    // 创建欢迎文章
    const postId = await this.postRepository.createOne(Post, {
      title: `Welcome, ${user.name}!`,
      content: 'Welcome to our platform! This is your first post.',
      userId,
      status: 'published',
      publishedAt: new Date(),
    });
    const post = await this.postRepository.findOneById(Post, postId);

    return { user, post };
  }

  @Transactional()
  async transferPostOwnership(postId: string, fromUserId: string, toUserId: string): Promise<void> {
    // 验证文章所有权
    const post = await this.postRepository.findOneById(Post, postId);
    if (!post || post.userId !== fromUserId) {
      throw new Error('Post not found or access denied');
    }

    // 验证目标用户存在
    const toUser = await this.userRepository.findOneById(User, toUserId);
    if (!toUser) {
      throw new Error('Target user not found');
    }

    // 转移文章所有权
    await this.postRepository.updateOne(Post, postId, {
      userId: toUserId,
      updatedAt: new Date(),
    });

    // 更新用户统计（这里简化处理）
    const fromUserStats = await this.userRepository.getUserStats(fromUserId);
    const toUserStats = await this.userRepository.getUserStats(toUserId);

    await this.userRepository.updateOne(User, fromUserId, {
      metadata: { ...fromUserStats, postCount: fromUserStats.postCount - 1 },
    });

    await this.userRepository.updateOne(User, toUserId, {
      metadata: { ...toUserStats, postCount: toUserStats.postCount + 1 },
    });
  }
}
```

## 6. 缓存集成

### 自动缓存

```typescript
// 缓存配置
const dataSource = new DataSource({
  type: 'http',
  cache: {
    enabled: true,
    ttl: 3600, // 默认缓存1小时
    strategy: 'lru',
    maxSize: 1000,
    keyPrefix: 'app:',
    // 模型特定缓存配置
    models: {
      User: {
        ttl: 7200, // 用户信息缓存2小时
        invalidateOn: ['create', 'update', 'delete'],
      },
      Post: {
        ttl: 1800, // 文章缓存30分钟
        invalidateOn: ['update', 'delete'],
        tags: ['posts'], // 缓存标签
      },
    },
  },
});

// 仓储自动缓存
class CachedRepository<T> extends Repository<T> {
  private cache: CacheService;

  constructor(dataSource: DataSource, model: new () => T, cache: CacheService) {
    super(dataSource, model);
    this.cache = cache;
  }

  async findOneById(model: new () => T, id: string): Promise<T | null> {
    const cacheKey = this.getCacheKey('findOneById', id);

    // 先从缓存获取
    let result = await this.cache.get<T>(cacheKey);
    if (result) {
      return result;
    }

    // 从数据源获取
    result = await super.findOneById(model, id);
    if (result) {
      // 缓存结果
      await this.cache.set(cacheKey, result, this.getCacheTtl());
    }

    return result;
  }

  async updateOne(model: new () => T, id: string, data: Partial<T>): Promise<T> {
    const result = await super.updateOne(model, id, data);

    // 更新缓存
    const cacheKey = this.getCacheKey('findOneById', id);
    await this.cache.set(cacheKey, result, this.getCacheTtl());

    // 清除相关缓存
    await this.invalidateRelatedCache(id);

    return result;
  }

  async deleteOne(model: new () => T, id: string): Promise<boolean> {
    const result = await super.deleteOne(model, id);

    if (result) {
      // 清除缓存
      const cacheKey = this.getCacheKey('findOneById', id);
      await this.cache.delete(cacheKey);

      // 清除相关缓存
      await this.invalidateRelatedCache(id);
    }

    return result;
  }

  private getCacheKey(operation: string, ...args: any[]): string {
    const modelName = this.model.name;
    return `${modelName}:${operation}:${args.join(':')}`;
  }

  private getCacheTtl(): number {
    // 从配置获取TTL
    return 3600; // 默认1小时
  }

  private async invalidateRelatedCache(id: string): Promise<void> {
    // 清除相关的缓存项
    const pattern = `${this.model.name}:*`;
    await this.cache.deletePattern(pattern);
  }
}
```

## 7. 最佳实践

### 性能优化

```typescript
// 1. 使用索引优化查询
@Model('users')
class User {
  @Column()
  @Index() // 为经常查询的字段添加索引
  email: string;

  @Column()
  @Index() // 单字段索引
  status: string;
}

// 2. 分页查询
class PostService {
  async getPosts(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await this.postRepository.query(Post, {
      limit,
      offset,
      sort: [['createdAt', 'DESC']],
    });
  }
}

// 3. 选择性字段加载
class UserService {
  async getUserList() {
    return await this.userRepository.query(User, {
      select: ['id', 'name', 'email'], // 只加载需要的字段
      filter: ['isActive', 'eq', true],
    });
  }
}

// 4. 批量操作
class UserService {
  async createUsers(usersData: CreateUserDto[]) {
    // 使用批量创建而不是循环单个创建
    return await this.userRepository.createMany(User, usersData);
  }
}
```

### 错误处理

```typescript
// 统一错误处理
class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const userId = await this.userRepository.createOne(User, userData);
      return await this.userRepository.findOneById(User, userId);
    } catch (error) {
      if (error.code === 'UNIQUE_CONSTRAINT_VIOLATION') {
        throw new DatabaseError('Email already exists', 'EMAIL_EXISTS', { email: userData.email });
      }

      throw new DatabaseError('Failed to create user', 'CREATE_FAILED', { originalError: error.message });
    }
  }
}
```

### 数据验证

```typescript
// 模型验证（手动实现）
@Model('users')
class User {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  avatar?: string;

  // 注意：验证装饰器在当前版本中不可用
  // 需要手动实现验证逻辑
  validate() {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    if (this.name && this.name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }
}

// 服务层验证
class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    // 验证输入数据
    await this.validateUserData(userData);

    // 检查邮箱是否已存在
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const userId = await this.userRepository.createOne(User, userData);
    return await this.userRepository.findOneById(User, userId);
  }

  private async validateUserData(userData: CreateUserDto): Promise<void> {
    if (!userData.email || !userData.name) {
      throw new Error('Email and name are required');
    }

    if (!userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    if (userData.name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }
}
```

通过合理使用ORM系统，可以大大简化数据访问层的开发，提高代码的可维护性和可测试性。框架提供的多数据源支持和统一查询接口，使得应用可以灵活地适应不同的数据存储需求。
