[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / RepositoryManager

# Class: RepositoryManager

Defined in: orm/repository/repository-manager.ts:31

仓库管理器类

## Description

管理模型仓库实例，提供数据库操作的统一接口，与数据源一对一绑定

## Example

```typescript
const repositoryManager = new RepositoryManager(dataSource);
const userRepository = repositoryManager.getRepository(UserModel);

// 创建记录
const userIds = await repositoryManager.create(UserModel, [{ name: 'John' }]);

// 查询记录
const users = await repositoryManager.query(UserModel, { filter: ['name', 'eq', 'John'] });

// 更新记录
await repositoryManager.update(UserModel, { name: 'John Doe' }, { filter: ['id', 'eq', 1] });

// 删除记录
await repositoryManager.delete(UserModel, { filter: ['id', 'eq', 1] });
```

## Constructors

### Constructor

> **new RepositoryManager**(`dataSource`): `RepositoryManager`

Defined in: orm/repository/repository-manager.ts:61

仓库管理器构造函数

#### Parameters

##### dataSource

[`DataSource`](DataSource.md)\<[`DataSourceType`](../type-aliases/DataSourceType.md)\>

数据源实例

#### Returns

`RepositoryManager`

#### Description

创建仓库管理器实例

## Accessors

### connector

#### Get Signature

> **get** **connector**(): `unknown`

Defined in: orm/repository/repository-manager.ts:42

获取连接器

##### Description

获取数据库连接器实例

##### Returns

`unknown`

数据库连接器

---

### runner

#### Get Signature

> **get** **runner**(): `AbstractRunner`\<`unknown`\>

Defined in: orm/repository/repository-manager.ts:51

获取运行器

##### Description

获取数据库运行器实例

##### Returns

`AbstractRunner`\<`unknown`\>

数据库运行器

## Methods

### create()

> **create**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

Defined in: orm/repository/repository-manager.ts:135

创建记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### createDatas

[`IdAnyObject`](../type-aliases/IdAnyObject.md)[]

创建数据数组

#### Returns

`Promise`\<(`string` \| `number`)[]\>

新记录的 ID 数组

#### Description

批量创建记录

#### Example

```typescript
const userIds = await repositoryManager.create(UserModel, [
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' },
]);
```

---

### delete()

> **delete**(`model`, `query`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository-manager.ts:189

删除记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### query

[`OrmQuery`](../type-aliases/OrmQuery.md)

查询条件

#### Returns

`Promise`\<`boolean`\>

是否删除成功

#### Description

根据查询条件删除记录

#### Example

```typescript
const success = await repositoryManager.delete(UserModel, {
  filter: ['status', 'eq', 'inactive'],
});
```

---

### getRepository()

> **getRepository**(`target`): [`Repository`](Repository.md)

Defined in: orm/repository/repository-manager.ts:76

获取模型仓库

#### Parameters

##### target

_typeof_ [`BaseModel`](BaseModel.md)

模型类

#### Returns

[`Repository`](Repository.md)

仓库实例

#### Description

根据模型获取对应的仓库实例，如果不存在则创建新的仓库实例

#### Example

```typescript
const userRepository = repositoryManager.getRepository(UserModel);
const postRepository = repositoryManager.getRepository(PostModel);
```

---

### query()

> **query**\<`Result`\>(`model`, `query`): `Promise`\<`Result`[]\>

Defined in: orm/repository/repository-manager.ts:117

查询数据

#### Type Parameters

##### Result

`Result` = `unknown`

返回结果类型

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### query

[`OrmQuery`](../type-aliases/OrmQuery.md)

查询条件

#### Returns

`Promise`\<`Result`[]\>

查询结果数组

#### Description

根据查询条件查询数据

#### Example

```typescript
const users = await repositoryManager.query(UserModel, {
  filter: ['name', 'cont', 'john'],
  sort: ['createdAt', 'DESC'],
  limit: 10,
});
```

---

### run()

> **run**\<`Result`\>(`model`, ...`executeArgs`): `Promise`\<`Result`\>

Defined in: orm/repository/repository-manager.ts:97

执行自定义操作

#### Type Parameters

##### Result

`Result` = `unknown`

返回结果类型

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### executeArgs

...`unknown`[]

执行参数

#### Returns

`Promise`\<`Result`\>

执行结果

#### Description

执行自定义的数据库操作

#### Example

```typescript
const result = await repositoryManager.run<number>(UserModel, 'customOperation', params);
```

---

### update()

> **update**(`model`, `updateData`, `query`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository-manager.ts:154

更新记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### updateData

[`AnyObj`](../type-aliases/AnyObj.md)

更新数据

##### query

[`OrmQuery`](../type-aliases/OrmQuery.md)

查询条件

#### Returns

`Promise`\<`boolean`\>

是否更新成功

#### Description

根据查询条件更新记录

#### Example

```typescript
const success = await repositoryManager.update(UserModel, { name: 'John Updated' }, { filter: ['id', 'eq', 1] });
```

---

### updateMany()

> **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository-manager.ts:172

批量更新记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### updateDataList

[`AnyObj`](../type-aliases/AnyObj.md)[]

更新数据数组

#### Returns

`Promise`\<`boolean`\>

是否更新成功

#### Description

批量更新多条记录

#### Example

```typescript
const success = await repositoryManager.updateMany(UserModel, [
  { id: 1, name: 'John Updated' },
  { id: 2, name: 'Jane Updated' },
]);
```
