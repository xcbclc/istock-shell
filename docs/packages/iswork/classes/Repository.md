[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Repository

# Class: Repository

Defined in: orm/repository/repository.ts:29

仓库类

## Description

提供模型数据的增删改查操作，可扩展基本方法，添加默认查询条件

## Example

```typescript
const userRepository = await dataSource.getRepository(UserModel);

// 创建单个记录
const userId = await userRepository.createOne(UserModel, { name: 'John', email: 'john@example.com' });

// 查询记录
const user = await userRepository.findOneById(UserModel, userId);

// 更新记录
await userRepository.updateById(UserModel, userId, { name: 'John Doe' });

// 删除记录
await userRepository.deleteById(UserModel, userId);
```

## Constructors

### Constructor

> **new Repository**(`repositoryManager`): `Repository`

Defined in: orm/repository/repository.ts:38

仓库构造函数

#### Parameters

##### repositoryManager

[`RepositoryManager`](RepositoryManager.md)

仓库管理器实例

#### Returns

`Repository`

#### Description

创建仓库实例

## Methods

### createMany()

> **createMany**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

Defined in: orm/repository/repository.ts:111

创建多个记录

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

批量创建多条记录

#### Example

```typescript
const userIds = await repository.createMany(UserModel, [
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' },
]);
```

---

### createOne()

> **createOne**(`model`, `createData`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: orm/repository/repository.ts:92

创建单个记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### createData

[`IdAnyObject`](../type-aliases/IdAnyObject.md)

创建数据

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

新记录的 ID，如果创建失败则返回 null

#### Description

创建一条新记录

#### Example

```typescript
const userId = await repository.createOne(UserModel, {
  name: 'John Doe',
  email: 'john@example.com',
});
```

---

### deleteById()

> **deleteById**(`model`, `id`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository.ts:182

根据 ID 删除记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### id

记录 ID

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

是否删除成功

#### Description

根据 ID 删除单条记录

#### Example

```typescript
const success = await repository.deleteById(UserModel, 1);
```

---

### deleteMany()

> **deleteMany**(`model`, `query`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository.ts:167

批量删除记录

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

根据查询条件批量删除记录

#### Example

```typescript
const success = await repository.deleteMany(UserModel, {
  filter: ['status', 'eq', 'inactive'],
});
```

---

### findOneById()

> **findOneById**(`model`, `id`): `Promise`\<`unknown`\>

Defined in: orm/repository/repository.ts:204

根据 ID 查找单条记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### id

记录 ID

`string` | `number`

#### Returns

`Promise`\<`unknown`\>

查找到的记录，如果不存在则返回 null

#### Description

根据 ID 查找单条记录

#### Example

```typescript
const user = await repository.findOneById(UserModel, 1);
if (user) {
  console.log('找到用户:', user);
} else {
  console.log('用户不存在');
}
```

---

### query()

> **query**\<`Result`\>(`model`, `query`): `Promise`\<`Result`[]\>

Defined in: orm/repository/repository.ts:74

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
const users = await repository.query(UserModel, {
  filter: ['name', 'cont', 'john'],
  sort: ['createdAt', 'DESC'],
  limit: 10,
});
```

---

### run()

> **run**\<`Result`\>(`model`, ...`executeArgs`): `Promise`\<`Result`\>

Defined in: orm/repository/repository.ts:54

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
const result = await repository.run<number>(UserModel, 'customOperation', params);
```

---

### updateById()

> **updateById**(`model`, `id`, `updateData`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository.ts:148

根据 ID 更新记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### id

记录 ID

`string` | `number`

##### updateData

[`AnyObj`](../type-aliases/AnyObj.md)

更新数据

#### Returns

`Promise`\<`boolean`\>

是否更新成功

#### Description

根据 ID 更新单条记录

#### Example

```typescript
const success = await repository.updateById(UserModel, 1, {
  name: 'John Updated',
  email: 'john.updated@example.com',
});
```

---

### updateMany()

> **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

Defined in: orm/repository/repository.ts:129

批量更新记录

#### Parameters

##### model

_typeof_ [`BaseModel`](BaseModel.md)

模型类

##### updateDataList

[`IdAnyObject`](../type-aliases/IdAnyObject.md)[]

更新数据数组

#### Returns

`Promise`\<`boolean`\>

是否更新成功

#### Description

批量更新多条记录

#### Example

```typescript
const success = await repository.updateMany(UserModel, [
  { id: 1, name: 'John Updated' },
  { id: 2, name: 'Jane Updated' },
]);
```
