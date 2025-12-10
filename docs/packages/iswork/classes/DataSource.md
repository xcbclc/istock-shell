[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSource

# Class: DataSource\<Type\>

Defined in: orm/data-source.ts:27

数据源类

## Description

管理数据库连接和仓库，提供统一的数据访问接口

## Example

```typescript
const dataSource = new DataSource({
  type: 'memory',
  name: 'default',
  entities: [UserModel, PostModel],
});

await dataSource.initialize();
const userRepository = await dataSource.getRepository(UserModel);
```

## Type Parameters

### Type

`Type` _extends_ [`DataSourceType`](../type-aliases/DataSourceType.md)

数据源类型

## Constructors

### Constructor

> **new DataSource**\<`Type`\>(`options`): `DataSource`\<`Type`\>

Defined in: orm/data-source.ts:77

数据源构造函数

#### Parameters

##### options

[`DataSourceAllOptions`](../type-aliases/DataSourceAllOptions.md)\[`Type`\]

数据源配置选项

#### Returns

`DataSource`\<`Type`\>

#### Description

创建数据源实例，设置名称和配置选项

#### Example

```typescript
const dataSource = new DataSource({
  type: 'indexedDB',
  name: 'myApp',
  database: 'myDatabase',
  entities: [UserModel],
});
```

## Accessors

### driver

#### Get Signature

> **get** **driver**(): `AbstractDriver`

Defined in: orm/data-source.ts:59

获取数据库驱动

##### Returns

`AbstractDriver`

数据库驱动实例

---

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: orm/data-source.ts:43

获取数据源名称

##### Returns

`string`

数据源名称

---

### options

#### Get Signature

> **get** **options**(): [`DataSourceAllOptions`](../type-aliases/DataSourceAllOptions.md)\[`Type`\]

Defined in: orm/data-source.ts:51

获取数据源配置选项

##### Returns

[`DataSourceAllOptions`](../type-aliases/DataSourceAllOptions.md)\[`Type`\]

数据源配置选项

## Methods

### connect()

> **connect**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: orm/data-source.ts:147

连接数据库

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>

数据源实例

#### Description

建立与数据库的连接

#### Example

```typescript
await dataSource.connect();
```

---

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: orm/data-source.ts:176

断开数据库连接

#### Returns

`Promise`\<`void`\>

#### Description

断开与数据库的连接，释放资源

#### Example

```typescript
await dataSource.disconnect();
```

---

### getRepository()

> **getRepository**(`model`): `Promise`\<[`Repository`](Repository.md)\>

Defined in: orm/data-source.ts:94

获取模型仓库

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

模型仓库实例

#### Description

获取指定模型的仓库实例，自动处理连接状态和重连逻辑

#### Example

```typescript
const userRepository = await dataSource.getRepository(UserModel);
const users = await userRepository.find();
```

---

### initialize()

> **initialize**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: orm/data-source.ts:121

初始化数据源

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>

数据源实例

#### Description

初始化数据源，创建驱动、建立连接、初始化仓库管理器

#### Example

```typescript
const dataSource = new DataSource(options);
await dataSource.initialize();
```

---

### reconnect()

> **reconnect**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: orm/data-source.ts:161

重新连接数据库

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>

数据源实例

#### Description

重新建立与数据库的连接

#### Example

```typescript
await dataSource.reconnect();
```
