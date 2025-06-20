# API 参考文档

本文档提供 `@istock-shell/iswork` 框架的完整API参考，包括所有类、接口、装饰器和工具函数的详细说明。

## 目录

- [核心类](#核心类)
- [装饰器](#装饰器)
- [接口](#接口)
- [工具函数](#工具函数)
- [错误类型](#错误类型)
- [类型定义](#类型定义)

## 核心类

### Application

应用程序的主入口类，负责管理整个应用的生命周期。

```typescript
class Application {
  constructor(options?: ApplicationOptions);

  // 核心方法
  listen(domainClass: DomainClassBase): (event: MessageEvent<CmdpMessage<any>>) => Promise<void>;
  close(): void;

  // 属性访问器
  get globalMiddleware(): Middleware[];
  get allDomain(): Map<string, any>;
  get messageChannelManager(): MessageChannelManager;
  get pipeFlowExecute(): (...args: any[]) => Promise<any>;
}
```

#### ApplicationOptions

```typescript
interface ApplicationOptions {
  domainPath?: string; // 域路径，默认为 'istock'
  middlewares?: Middleware[]; // 全局中间件数组，默认为空数组
  emit?: (message: any) => void; // 消息发送函数，默认为空函数
}
```

### IocContainer

依赖注入容器，管理服务的注册、解析和生命周期。

```typescript
class IocContainer {
  constructor();

  // 服务注册
  register<T>(token: string | symbol, provider: Provider<T>, options?: RegistrationOptions): void;

  registerClass<T>(token: string | symbol, target: Constructor<T>, options?: RegistrationOptions): void;

  registerValue<T>(token: string | symbol, value: T, options?: RegistrationOptions): void;

  registerFactory<T>(token: string | symbol, factory: Factory<T>, options?: RegistrationOptions): void;

  registerAlias(aliasToken: string | symbol, targetToken: string | symbol): void;

  // 服务解析
  resolve<T>(token: string | symbol): T;
  resolveOptional<T>(token: string | symbol): T | undefined;
  resolveAll<T>(token: string | symbol): T[];

  // 容器管理
  createChild(): IocContainer;
  dispose(): Promise<void>;

  // 查询
  has(token: string | symbol): boolean;
  getRegistrations(): RegistrationInfo[];

  // 生命周期
  onDispose(callback: () => void | Promise<void>): void;
}
```

#### Provider 类型

```typescript
type Provider<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T> | AliasProvider;

interface ClassProvider<T> {
  useClass: Constructor<T>;
}

interface ValueProvider<T> {
  useValue: T;
}

interface FactoryProvider<T> {
  useFactory: Factory<T>;
  deps?: (string | symbol)[];
}

interface AliasProvider {
  useExisting: string | symbol;
}

type Factory<T> = (...args: any[]) => T | Promise<T>;
type Constructor<T = {}> = new (...args: any[]) => T;
```

#### RegistrationOptions

```typescript
interface RegistrationOptions {
  scope?: 'singleton' | 'transient' | 'request';
  lazy?: boolean;
  condition?: (container: IocContainer) => boolean;
  onActivation?: (instance: any, container: IocContainer) => void;
  onDeactivation?: (instance: any, container: IocContainer) => void;
}
```

### DataSource

ORM数据源管理类，负责数据库连接和操作。

```typescript
class DataSource {
  constructor(config: DataSourceConfig);

  // 连接管理
  async connect(): Promise<void>;
  async disconnect(): Promise<void>;
  async reconnect(): Promise<void>;

  // 状态查询
  isConnected(): boolean;
  getConfig(): DataSourceConfig;

  // 仓库管理
  getRepository<T>(model: Constructor<T>): Repository<T>;
  createRepository<T>(model: Constructor<T>): Repository<T>;

  // 查询构建
  createQueryBuilder<T>(model: Constructor<T>): QueryBuilder<T>;

  // 事务管理
  async transaction<T>(callback: (manager: TransactionManager) => Promise<T>): Promise<T>;

  // 迁移
  async runMigrations(): Promise<void>;
  async revertMigrations(): Promise<void>;

  // 同步
  async synchronize(): Promise<void>;
}
```

#### DataSourceConfig

```typescript
interface DataSourceConfig {
  type: 'indexeddb' | 'http' | 'memory';
  name?: string;

  // IndexedDB 配置
  database?: string;
  version?: number;

  // HTTP 配置
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;

  // 通用配置
  logging?: boolean;
  cache?: boolean;
  synchronize?: boolean;
  migrations?: Migration[];
}
```

### Repository

数据仓库类，提供模型的CRUD操作。

```typescript
class Repository<T> {
  constructor(model: Constructor<T>, dataSource: DataSource);

  // 查询操作
  async findOne(criteria: FindCriteria<T>): Promise<T | null>;
  async findOneById(id: string | number): Promise<T | null>;
  async findMany(criteria?: FindCriteria<T>): Promise<T[]>;
  async findAndCount(criteria?: FindCriteria<T>): Promise<[T[], number]>;

  // 创建操作
  async createOne(data: CreateData<T>): Promise<string | number>;
  async createMany(data: CreateData<T>[]): Promise<(string | number)[]>;

  // 更新操作
  async updateOne(criteria: UpdateCriteria<T>, data: UpdateData<T>): Promise<boolean>;
  async updateMany(criteria: UpdateCriteria<T>, data: UpdateData<T>): Promise<number>;
  async updateById(id: string | number, data: UpdateData<T>): Promise<boolean>;

  // 删除操作
  async deleteOne(criteria: DeleteCriteria<T>): Promise<boolean>;
  async deleteMany(criteria: DeleteCriteria<T>): Promise<number>;
  async deleteById(id: string | number): Promise<boolean>;

  // 聚合操作
  async count(criteria?: CountCriteria<T>): Promise<number>;
  async sum(field: keyof T, criteria?: CountCriteria<T>): Promise<number>;
  async avg(field: keyof T, criteria?: CountCriteria<T>): Promise<number>;
  async min(field: keyof T, criteria?: CountCriteria<T>): Promise<any>;
  async max(field: keyof T, criteria?: CountCriteria<T>): Promise<any>;

  // 查询构建
  createQueryBuilder(): QueryBuilder<T>;

  // 批量操作
  async bulkInsert(data: CreateData<T>[]): Promise<void>;
  async bulkUpdate(criteria: UpdateCriteria<T>, data: UpdateData<T>): Promise<void>;
  async bulkDelete(criteria: DeleteCriteria<T>): Promise<void>;
}
```

### QueryBuilder

查询构建器，提供灵活的查询构建功能。

```typescript
class QueryBuilder<T> {
  constructor(model: Constructor<T>, dataSource: DataSource);

  // 字段选择
  select(fields: (keyof T)[]): QueryBuilder<T>;
  select(...fields: (keyof T)[]): QueryBuilder<T>;

  // 条件过滤
  where(field: keyof T, operator: ComparisonOperator, value: any): QueryBuilder<T>;
  where(conditions: WhereConditions<T>): QueryBuilder<T>;

  andWhere(field: keyof T, operator: ComparisonOperator, value: any): QueryBuilder<T>;
  andWhere(conditions: WhereConditions<T>): QueryBuilder<T>;

  orWhere(field: keyof T, operator: ComparisonOperator, value: any): QueryBuilder<T>;
  orWhere(conditions: WhereConditions<T>): QueryBuilder<T>;

  // 排序
  orderBy(field: keyof T, direction?: 'ASC' | 'DESC'): QueryBuilder<T>;
  addOrderBy(field: keyof T, direction?: 'ASC' | 'DESC'): QueryBuilder<T>;

  // 分页
  limit(count: number): QueryBuilder<T>;
  offset(count: number): QueryBuilder<T>;
  skip(count: number): QueryBuilder<T>;
  take(count: number): QueryBuilder<T>;

  // 关联
  leftJoin(relation: string, alias?: string): QueryBuilder<T>;
  innerJoin(relation: string, alias?: string): QueryBuilder<T>;

  // 分组
  groupBy(field: keyof T): QueryBuilder<T>;
  addGroupBy(field: keyof T): QueryBuilder<T>;

  having(field: keyof T, operator: ComparisonOperator, value: any): QueryBuilder<T>;

  // 执行
  async getOne(): Promise<T | null>;
  async getMany(): Promise<T[]>;
  async getCount(): Promise<number>;
  async getManyAndCount(): Promise<[T[], number]>;

  // 聚合
  async sum(field: keyof T): Promise<number>;
  async avg(field: keyof T): Promise<number>;
  async min(field: keyof T): Promise<any>;
  async max(field: keyof T): Promise<any>;

  // 原始查询
  async getRawOne(): Promise<any>;
  async getRawMany(): Promise<any[]>;

  // 查询计划
  getQuery(): QueryPlan;
  explain(): Promise<QueryExplanation>;
}
```

#### 比较操作符

```typescript
type ComparisonOperator =
  | 'eq' // 等于
  | 'ne' // 不等于
  | 'gt' // 大于
  | 'gte' // 大于等于
  | 'lt' // 小于
  | 'lte' // 小于等于
  | 'in' // 包含在数组中
  | 'nin' // 不包含在数组中
  | 'like' // 模糊匹配
  | 'nlike' // 不模糊匹配
  | 'ilike' // 忽略大小写模糊匹配
  | 'nilike' // 忽略大小写不模糊匹配
  | 'between' // 在范围内
  | 'nbetween' // 不在范围内
  | 'is' // 是（用于null检查）
  | 'isNot' // 不是（用于null检查）
  | 'exists' // 存在
  | 'nexists' // 不存在
  | 'startsWith' // 以...开始
  | 'endsWith' // 以...结束
  | 'contains' // 包含
  | 'ncontains'; // 不包含
```

## 装饰器

### 类装饰器

#### @Domain

标记类为域类，用于业务逻辑组织。

```typescript
function Domain(options?: DomainOptions): ClassDecorator;

interface DomainOptions {
  name?: string; // 域名称
  description?: string; // 域描述
  version?: string; // 版本号
  dependencies?: string[]; // 依赖的其他域
  providers?: Provider[]; // 域内服务提供者
  exports?: (string | symbol)[]; // 导出的服务
}

// 使用示例
@Domain({
  name: 'user',
  description: '用户管理域',
  version: '1.0.0',
  dependencies: ['auth'],
  providers: [
    { provide: 'USER_SERVICE', useClass: UserService },
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
  ],
  exports: ['USER_SERVICE'],
})
class UserDomain {}
```

#### @Controller

标记类为控制器，处理消息路由。

```typescript
function Controller(options?: ControllerOptions): ClassDecorator;

interface ControllerOptions {
  alias?: string | string[]; // 控制器别名
  prefix?: string; // 路径前缀
  middleware?: Middleware[]; // 控制器级中间件
  guards?: Guard[]; // 守卫
  interceptors?: Interceptor[]; // 拦截器
}

// 使用示例
@Controller({
  alias: ['user', 'users'],
  prefix: 'api/v1',
  middleware: [authMiddleware, loggingMiddleware],
  guards: [AuthGuard, RoleGuard],
})
class UserController {}
```

#### @Injectable

标记类为可注入服务。

```typescript
function Injectable(options?: InjectableOptions): ClassDecorator;

interface InjectableOptions {
  scope?: 'singleton' | 'transient' | 'request';
  token?: string | symbol; // 注入令牌
  factory?: Factory<any>; // 工厂函数
  condition?: (container: IocContainer) => boolean; // 注册条件
}

// 使用示例
@Injectable({
  scope: 'singleton',
  token: 'USER_SERVICE',
})
class UserService {}
```

### 参数装饰器

#### @Payload

从消息载荷中提取参数。

```typescript
function Payload(path?: string): ParameterDecorator;

// 使用示例
class UserController {
  async createUser(
    @Payload() userData: CreateUserDto, // 整个载荷
    @Payload('name') name: string, // 载荷中的name字段
    @Payload('profile.email') email: string // 嵌套字段
  ): Promise<User> {
    // ...
  }
}
```

#### @Meta

从消息元数据中提取参数。

```typescript
function Meta(key?: string): ParameterDecorator;

// 使用示例
class UserController {
  async getUser(
    @Meta() meta: MessageMeta, // 整个元数据
    @Meta('userId') userId: string, // 元数据中的userId
    @Meta('requestId') requestId: string // 请求ID
  ): Promise<User> {
    // ...
  }
}
```

#### @Field

从消息的任意字段中提取参数。

```typescript
function Field(path: string): ParameterDecorator;

// 使用示例
class UserController {
  async processMessage(
    @Field('headers.Authorization') token: string, // 消息头
    @Field('options.timeout') timeout: number, // 选项
    @Field('parsedAddress.query.page') page: string // 查询参数
  ): Promise<any> {
    // ...
  }
}
```

#### @Context

注入消息上下文。

```typescript
function Context(): ParameterDecorator;

// 使用示例
class UserController {
  async handleMessage(@Context() context: MessageContext, @Payload() data: any): Promise<any> {
    const startTime = context.startTime;
    const requestId = context.message.meta?.requestId;
    // ...
  }
}
```

### 属性装饰器

#### @Inject

注入依赖服务。

```typescript
function Inject(token?: string | symbol): PropertyDecorator;

// 使用示例
class UserController {
  @Inject('USER_SERVICE')
  private userService: UserService;

  @Inject()
  private logger: Logger; // 自动推断类型

  @Inject('CONFIG')
  private config: AppConfig;
}
```

### 方法装饰器

#### @Method

标记控制器方法，提供方法级别的配置。

```typescript
function Method(options?: MethodOptions): MethodDecorator;

interface MethodOptions {
  alias?: string | string[]; // 方法别名
  middleware?: Middleware[]; // 方法级中间件
  guards?: Guard[]; // 守卫
  interceptors?: Interceptor[]; // 拦截器
  cache?: CacheOptions; // 缓存配置
  timeout?: number; // 超时时间
}

// 使用示例
class UserController {
  @Method({ alias: 'getUserInfo' })
  async getUser(@Payload('id') id: string): Promise<User> {
    // ...
  }

  @Method({
    alias: ['createNewUser', 'addUser'],
    middleware: [validationMiddleware],
    cache: { ttl: 300 },
  })
  async createUser(@Payload() userData: CreateUserDto): Promise<User> {
    // ...
  }
}
```

#### @Cache

为方法添加缓存。

```typescript
function Cache(options?: CacheOptions): MethodDecorator;

interface CacheOptions {
  ttl?: number; // 生存时间（秒）
  key?: string | ((args: any[]) => string); // 缓存键
  condition?: (args: any[], result: any) => boolean; // 缓存条件
  storage?: 'memory' | 'redis' | 'file'; // 存储类型
}

// 使用示例
class UserService {
  @Cache({ ttl: 300, key: 'user:${args[0]}' })
  async getUserById(id: string): Promise<User> {
    // ...
  }

  @Cache({
    ttl: 600,
    condition: (args, result) => result && result.length > 0,
  })
  async searchUsers(criteria: SearchCriteria): Promise<User[]> {
    // ...
  }
}
```

## 接口

### CmdpMessage

CMDP协议消息接口。

```typescript
interface CmdpMessage {
  address: string; // CMDP地址
  payload?: any; // 载荷数据
  meta?: MessageMeta; // 元数据
  headers?: Record<string, string>; // 消息头
  options?: MessageOptions; // 消息选项
}
```

### MessageMeta

消息元数据接口。

```typescript
interface MessageMeta {
  requestId?: string; // 请求ID
  timestamp?: number; // 时间戳
  userId?: string; // 用户ID
  sessionId?: string; // 会话ID
  traceId?: string; // 追踪ID
  priority?: 'low' | 'normal' | 'high' | 'urgent'; // 优先级
  timeout?: number; // 超时时间
  retries?: number; // 重试次数
  token?: string; // 认证令牌
  clientIp?: string; // 客户端IP
  userAgent?: string; // 用户代理
  [key: string]: any; // 其他元数据
}
```

### MessageOptions

消息选项接口。

```typescript
interface MessageOptions {
  async?: boolean; // 异步处理
  cache?: boolean; // 缓存结果
  broadcast?: boolean; // 广播消息
  persistent?: boolean; // 持久化
  compress?: boolean; // 压缩
  encrypt?: boolean; // 加密
  priority?: 'low' | 'normal' | 'high' | 'urgent'; // 优先级
}
```

### MessageContext

消息处理上下文接口。

```typescript
interface MessageContext {
  message: CmdpMessage; // 原始消息
  parsedAddress: ParsedAddress; // 解析后的地址
  response?: any; // 响应数据
  metadata: Map<string, any>; // 上下文元数据
  startTime: number; // 开始时间
  state: Record<string, any>; // 状态数据
  services: ServiceContainer; // 服务容器

  // 工具方法
  set(key: string, value: any): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
}
```

### ParsedAddress

解析后的CMDP地址接口。

```typescript
interface ParsedAddress {
  protocol: string; // 协议
  user?: string; // 用户标识
  domain: string; // 域名
  port: number; // 端口
  path: string; // 路径
  query: Record<string, string>; // 查询参数
  fragment?: string; // 片段
}
```

### EventListener

事件监听器接口。

```typescript
type EventListener = (data: any, eventName: string, eventData?: EventData) => void | Promise<void>;

interface EventData {
  name: string; // 事件名称
  data: any; // 事件数据
  timestamp: number; // 时间戳
  id: string; // 事件ID
}
```

### Middleware

中间件接口。

```typescript
type Middleware = (context: MiddlewareContext, next: NextFunction) => Promise<any> | any;

type NextFunction = () => Promise<any>;

interface MiddlewareContext extends MessageContext {
  // 继承MessageContext的所有属性和方法
}
```

## 工具函数

### AddressParser

CMDP地址解析工具。

```typescript
class AddressParser {
  static parse(address: string): ParsedAddress;
  static build(parts: Partial<ParsedAddress>): string;
  static parseQuery(search: string): Record<string, string>;
  static buildQuery(params: Record<string, string>): string;
  static normalize(address: string): string;
  static validate(address: string): boolean;
}

// 使用示例
const parsed = AddressParser.parse('cmdp://user@app.example.com:8080/UserController.getUser?id=123');
console.log(parsed);
// {
//   protocol: 'cmdp:',
//   user: 'user',
//   domain: 'app.example.com',
//   port: 8080,
//   path: 'UserController.getUser',
//   query: { id: '123' }
// }

const address = AddressParser.build({
  protocol: 'cmdp:',
  domain: 'app.example.com',
  path: 'UserController.createUser',
});
console.log(address); // 'cmdp://app.example.com:8080/UserController.createUser'
```

### MessageBuilder

消息构建工具。

```typescript
class MessageBuilder {
  static create(address: string): MessageBuilder;

  payload(data: any): MessageBuilder;
  meta(data: Partial<MessageMeta>): MessageBuilder;
  headers(data: Record<string, string>): MessageBuilder;
  options(data: Partial<MessageOptions>): MessageBuilder;

  requestId(id: string): MessageBuilder;
  timeout(ms: number): MessageBuilder;
  priority(level: 'low' | 'normal' | 'high' | 'urgent'): MessageBuilder;

  build(): CmdpMessage;
}

// 使用示例
const message = MessageBuilder.create('cmdp://app.example.com:8080/UserController.createUser')
  .payload({ name: 'John', email: 'john@example.com' })
  .meta({ userId: 'user-123' })
  .timeout(5000)
  .priority('high')
  .build();
```

### ValidationHelper

验证工具函数。

```typescript
class ValidationHelper {
  static validateEmail(email: string): boolean;
  static validateUrl(url: string): boolean;
  static validateUuid(uuid: string): boolean;
  static validateJson(json: string): boolean;

  static isRequired(value: any): boolean;
  static isString(value: any): boolean;
  static isNumber(value: any): boolean;
  static isBoolean(value: any): boolean;
  static isArray(value: any): boolean;
  static isObject(value: any): boolean;

  static minLength(value: string, min: number): boolean;
  static maxLength(value: string, max: number): boolean;
  static minValue(value: number, min: number): boolean;
  static maxValue(value: number, max: number): boolean;

  static matches(value: string, pattern: RegExp): boolean;
  static isIn(value: any, values: any[]): boolean;
  static isNotIn(value: any, values: any[]): boolean;
}

// 使用示例
if (!ValidationHelper.validateEmail(email)) {
  throw new ValidationError('Invalid email format');
}

if (!ValidationHelper.minLength(password, 8)) {
  throw new ValidationError('Password must be at least 8 characters');
}
```

### CacheHelper

缓存工具函数。

```typescript
class CacheHelper {
  static generateKey(...parts: (string | number)[]): string;
  static hashKey(key: string): string;
  static isExpired(timestamp: number, ttl: number): boolean;
  static calculateTtl(expiresAt: Date): number;

  static serialize(data: any): string;
  static deserialize<T>(data: string): T;

  static compress(data: string): Promise<Buffer>;
  static decompress(data: Buffer): Promise<string>;
}

// 使用示例
const cacheKey = CacheHelper.generateKey('user', userId, 'profile');
const hashedKey = CacheHelper.hashKey(cacheKey);

const serialized = CacheHelper.serialize(userData);
const deserialized = CacheHelper.deserialize<User>(serialized);
```

### TypeHelper

类型工具函数。

```typescript
class TypeHelper {
  static getType(value: any): string;
  static isPromise(value: any): boolean;
  static isFunction(value: any): boolean;
  static isClass(value: any): boolean;
  static isConstructor(value: any): boolean;

  static deepClone<T>(obj: T): T;
  static deepMerge<T>(target: T, ...sources: Partial<T>[]): T;
  static deepEqual(a: any, b: any): boolean;

  static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
  static omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;

  static flatten(obj: any, prefix?: string): Record<string, any>;
  static unflatten(obj: Record<string, any>): any;
}

// 使用示例
const cloned = TypeHelper.deepClone(originalObject);
const merged = TypeHelper.deepMerge(target, source1, source2);
const picked = TypeHelper.pick(user, ['id', 'name', 'email']);
```

## 错误类型

### 基础错误类

```typescript
abstract class BaseError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(
    message: string,
    public readonly details?: any,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  toJSON(): ErrorResponse {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: Date.now(),
    };
  }
}

interface ErrorResponse {
  name: string;
  code: string;
  message: string;
  statusCode: number;
  details?: any;
  timestamp: number;
}
```

### 具体错误类型

```typescript
// 验证错误
class ValidationError extends BaseError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
}

// 认证错误
class UnauthorizedError extends BaseError {
  readonly code = 'UNAUTHORIZED';
  readonly statusCode = 401;
}

// 权限错误
class ForbiddenError extends BaseError {
  readonly code = 'FORBIDDEN';
  readonly statusCode = 403;
}

// 未找到错误
class NotFoundError extends BaseError {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;
}

// 冲突错误
class ConflictError extends BaseError {
  readonly code = 'CONFLICT';
  readonly statusCode = 409;
}

// 限流错误
class TooManyRequestsError extends BaseError {
  readonly code = 'TOO_MANY_REQUESTS';
  readonly statusCode = 429;
}

// 内部服务器错误
class InternalServerError extends BaseError {
  readonly code = 'INTERNAL_SERVER_ERROR';
  readonly statusCode = 500;
}

// 服务不可用错误
class ServiceUnavailableError extends BaseError {
  readonly code = 'SERVICE_UNAVAILABLE';
  readonly statusCode = 503;
}

// 超时错误
class TimeoutError extends BaseError {
  readonly code = 'TIMEOUT';
  readonly statusCode = 408;
}

// 网络错误
class NetworkError extends BaseError {
  readonly code = 'NETWORK_ERROR';
  readonly statusCode = 502;
}

// 配置错误
class ConfigurationError extends BaseError {
  readonly code = 'CONFIGURATION_ERROR';
  readonly statusCode = 500;
}

// 依赖注入错误
class DependencyInjectionError extends BaseError {
  readonly code = 'DEPENDENCY_INJECTION_ERROR';
  readonly statusCode = 500;
}
```

## 类型定义

### 通用类型

```typescript
// 构造函数类型
type Constructor<T = {}> = new (...args: any[]) => T;

// 工厂函数类型
type Factory<T> = (...args: any[]) => T | Promise<T>;

// 可选属性类型
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 深度可选类型
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 深度只读类型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 非空类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 提取Promise类型
type Awaited<T> = T extends Promise<infer U> ? U : T;
```

### 查询类型

```typescript
// 查询条件类型
type FindCriteria<T> = {
  where?: WhereConditions<T>;
  select?: (keyof T)[];
  relations?: string[];
  order?: OrderConditions<T>;
  skip?: number;
  take?: number;
};

// Where条件类型
type WhereConditions<T> = {
  [P in keyof T]?: T[P] | WhereOperator<T[P]>;
} & {
  $and?: WhereConditions<T>[];
  $or?: WhereConditions<T>[];
  $not?: WhereConditions<T>;
};

// Where操作符类型
type WhereOperator<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
  $nin?: T[];
  $like?: string;
  $ilike?: string;
  $between?: [T, T];
  $exists?: boolean;
  $regex?: RegExp;
};

// 排序条件类型
type OrderConditions<T> = {
  [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1;
};

// 创建数据类型
type CreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// 更新数据类型
type UpdateData<T> = Partial<Omit<T, 'id' | 'createdAt'>>;

// 更新条件类型
type UpdateCriteria<T> = WhereConditions<T>;

// 删除条件类型
type DeleteCriteria<T> = WhereConditions<T>;

// 计数条件类型
type CountCriteria<T> = {
  where?: WhereConditions<T>;
};
```

### 事件类型

```typescript
// 事件映射类型
interface EventMap {
  'application.started': { timestamp: number };
  'application.stopped': { timestamp: number };
  'message.received': { message: CmdpMessage };
  'message.processed': { message: CmdpMessage; result: any; duration: number };
  'message.failed': { message: CmdpMessage; error: Error; duration: number };
  'user.created': { user: User };
  'user.updated': { user: User; changes: Partial<User> };
  'user.deleted': { userId: string };
  'error.occurred': { error: Error; context?: any };
}

// 类型安全的事件发射器
interface TypedEventEmitter<T extends Record<string, any>> {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): () => void;
  emit<K extends keyof T>(event: K, data: T[K]): Promise<void>;
  once<K extends keyof T>(event: K, listener: (data: T[K]) => void): () => void;
  removeAllListeners<K extends keyof T>(event?: K): void;
}
```

### ORM 装饰器

#### @Model

标记类为ORM模型。

```typescript
function Model(name?: string): ClassDecorator;

// 使用示例
@Model('users') // 指定表名
class User {}

@Model() // 使用类名作为表名
class Product {}
```

#### @Column

标记属性为数据库列。

```typescript
function Column(options?: ColumnOptions): PropertyDecorator

interface ColumnOptions {
  type?: string;
  length?: number;
  nullable?: boolean;
  default?: any;
  unique?: boolean;
}

// 使用示例
@Column({ type: 'string', length: 100, nullable: false })
name: string;

@Column()  // 使用默认配置
age: number;
```

#### @PrimaryColumn

标记属性为主键列。

```typescript
function PrimaryColumn(options?: ColumnOptions): PropertyDecorator

// 使用示例
@PrimaryColumn()
id: string;
```

#### @Index

为属性创建索引。

```typescript
function Index(options?: IndexOptions): PropertyDecorator

interface IndexOptions {
  unique?: boolean;
  name?: string;
}

// 使用示例
@Index({ unique: true })
email: string;

@Index()
name: string;
```

### 配置类型

```typescript
// 应用配置类型
interface ApplicationConfig {
  app: {
    name: string;
    version: string;
    description?: string;
    domainPath: string;
    port: number;
  };

  server: {
    timeout: number;
    maxPayloadSize: number;
    enableCors: boolean;
    enableCompression: boolean;
  };

  database: {
    type: 'indexeddb' | 'http' | 'memory';
    name?: string;
    url?: string;
    options?: Record<string, any>;
  };

  cache: {
    enabled: boolean;
    type: 'memory' | 'redis' | 'file';
    ttl: number;
    maxSize: number;
  };

  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
    outputs: ('console' | 'file' | 'remote')[];
  };

  security: {
    enableAuth: boolean;
    jwtSecret?: string;
    apiKeys?: string[];
    rateLimiting: {
      enabled: boolean;
      maxRequests: number;
      windowMs: number;
    };
  };
}

// 环境配置类型
type Environment = 'development' | 'test' | 'staging' | 'production';

// 配置提供者类型
interface ConfigProvider {
  get<T = any>(key: string): T;
  set(key: string, value: any): void;
  has(key: string): boolean;
  getAll(): Record<string, any>;
}
```

这个API参考文档提供了框架的完整接口定义，开发者可以根据这些定义来正确使用框架的各种功能。所有的类型定义都是类型安全的，支持TypeScript的智能提示和类型检查。
