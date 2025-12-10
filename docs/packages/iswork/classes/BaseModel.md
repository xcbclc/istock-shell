[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / BaseModel

# Class: BaseModel

Defined in: orm/model/base-model.ts:50

ORM 基础模型类

## Description

提供数据模型的基础功能，包括数据持久化、查询、更新、删除等操作

## Example

```typescript
class User extends BaseModel {
  name: string;
  email: string;
}

// 创建用户
const user = User.createModel({ id: '1', name: 'John', email: 'john@example.com' });
await user.save();

// 查询用户
const foundUser = await User.findOneById('1');
```

## Implements

- `IBaseModel`

## Constructors

### Constructor

> **new BaseModel**(): `BaseModel`

#### Returns

`BaseModel`

## Properties

### createQueryBuilder()

> `readonly` `static` **createQueryBuilder**: (`params?`) => [`QueryBuilder`](QueryBuilder.md)

Defined in: orm/model/base-model.ts:54

查询构建器创建函数

QueryBuilder工厂方法，创建一个QueryBuilder实例

#### Parameters

##### params?

查询参数选项

`string` | [`QueryParamsOptions`](../interfaces/QueryParamsOptions.md)

#### Returns

[`QueryBuilder`](QueryBuilder.md)

---

### dataSource

> `protected` `static` **dataSource**: [`DataSource`](DataSource.md)\<[`DataSourceType`](../type-aliases/DataSourceType.md)\>

Defined in: orm/model/base-model.ts:52

数据源实例，用于数据库操作

---

### generateId

> `readonly` `static` **generateId**: `FESnowflake`

Defined in: orm/model/base-model.ts:56

ID 生成器，使用雪花算法生成唯一 ID

## Methods

### save()

> **save**\<`This`\>(`this`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: orm/model/base-model.ts:71

保存当前模型数据

#### Type Parameters

##### This

`This` _extends_ `BaseModel`

当前模型类型

#### Parameters

##### this

`This`

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

保存操作的结果

#### Description

将模型实例保存到数据库，如果存在 ID 则更新，否则创建新记录

#### Example

```typescript
const user = new User();
user.name = 'John';
user.email = 'john@example.com';
const result = await user.save();
```

#### Implementation of

`IBaseModel.save`

---

### toObject()

> **toObject**\<`This`\>(`this`): [`ModelData`](../type-aliases/ModelData.md)\<`This`\>

Defined in: orm/model/base-model.ts:93

将模型实例转换为普通对象

#### Type Parameters

##### This

`This` _extends_ `BaseModel`

当前模型类型

#### Parameters

##### this

`This`

#### Returns

[`ModelData`](../type-aliases/ModelData.md)\<`This`\>

包含模型数据的普通对象

#### Description

将模型实例的所有属性转换为普通的 JavaScript 对象

#### Example

```typescript
const user = new User();
user.name = 'John';
const userData = user.toObject(); // { name: 'John' }
```

#### Implementation of

`IBaseModel.toObject`

---

### createMany()

> `static` **createMany**\<`Model`\>(`this`, `dataOrModels`): `Promise`\<(`string` \| `number`)[]\>

Defined in: orm/model/base-model.ts:235

批量创建记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### dataOrModels

要创建的数据数组或模型实例数组

[`ModelCreate`](../type-aliases/ModelCreate.md)\<`InstanceType`\<`Model`\>\>[] | [`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>[] | `InstanceType`\<`Model`\>[]

#### Returns

`Promise`\<(`string` \| `number`)[]\>

批量创建操作的结果

#### Description

在数据库中批量创建多条记录

#### Throws

当任何数据中缺少 id 字段时抛出错误

#### Example

```typescript
const result = await User.createMany([
  { id: '1', name: 'John', email: 'john@example.com' },
  { id: '2', name: 'Jane', email: 'jane@example.com' },
]);
```

---

### createModel()

> `static` **createModel**\<`Model`\>(`this`, `data`): `InstanceType`\<`Model`\>

Defined in: orm/model/base-model.ts:143

创建模型实例

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### data

[`ModelCreate`](../type-aliases/ModelCreate.md)\<`InstanceType`\<`Model`\>\>

模型数据

#### Returns

`InstanceType`\<`Model`\>

模型实例

#### Description

根据提供的数据创建模型实例

#### Example

```typescript
const user = User.createModel({
  id: '1',
  name: 'John',
  email: 'john@example.com',
});
```

---

### createOne()

> `static` **createOne**\<`Model`\>(`this`, `dataOrModel`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: orm/model/base-model.ts:203

创建单个记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### dataOrModel

要创建的数据或模型实例

`InstanceType`\<`Model`\> | [`ModelCreate`](../type-aliases/ModelCreate.md)\<`InstanceType`\<`Model`\>\> | [`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

创建操作的结果

#### Description

在数据库中创建一条新记录

#### Throws

当数据中缺少 id 字段时抛出错误

#### Example

```typescript
const result = await User.createOne({
  id: '1',
  name: 'John',
  email: 'john@example.com',
});
```

---

### deleteById()

> `static` **deleteById**\<`Model`\>(`this`, `id`): `Promise`\<`boolean`\>

Defined in: orm/model/base-model.ts:339

根据 ID 删除记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### id

要删除的记录 ID

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

删除操作的结果

#### Description

根据指定的 ID 删除数据库中的记录

#### Example

```typescript
const result = await User.deleteById('1');
```

---

### deleteMany()

> `static` **deleteMany**\<`Model`\>(`this`, `query`): `Promise`\<`boolean`\>

Defined in: orm/model/base-model.ts:323

批量删除记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### query

[`OrmQuery`](../type-aliases/OrmQuery.md)

删除条件

#### Returns

`Promise`\<`boolean`\>

删除操作的结果

#### Description

根据查询条件批量删除记录

#### Example

```typescript
const result = await User.deleteMany({
  where: { status: 'inactive' },
});
```

---

### findOneById()

> `static` **findOneById**\<`Model`\>(`this`, `id`): `Promise`\<[`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>\>

Defined in: orm/model/base-model.ts:356

根据 ID 查找单个记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### id

要查找的记录 ID

`string` | `number`

#### Returns

`Promise`\<[`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>\>

查找到的模型数据

#### Description

根据指定的 ID 查找数据库中的单条记录

#### Example

```typescript
const user = await User.findOneById('1');
console.log(user.name); // 'John'
```

---

### getRepository()

> `static` **getRepository**(): `Promise`\<[`Repository`](Repository.md)\>

Defined in: orm/model/base-model.ts:124

获取仓储实例

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

仓储实例

#### Description

获取当前模型对应的仓储实例，用于执行数据库操作

#### Example

```typescript
const repository = await User.getRepository();
```

---

### query()

> `static` **query**\<`Model`\>(`this`, `query`): `Promise`\<[`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>[]\>

Defined in: orm/model/base-model.ts:182

执行查询操作

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### query

[`OrmQuery`](../type-aliases/OrmQuery.md)

查询条件

#### Returns

`Promise`\<[`ModelData`](../type-aliases/ModelData.md)\<`InstanceType`\<`Model`\>\>[]\>

查询结果

#### Description

根据查询条件查询数据

#### Example

```typescript
const users = await User.query({
  where: { status: 'active' },
  limit: 10,
});
```

---

### run()

> `static` **run**\<`Result`\>(...`executeArgs`): `Promise`\<`Result`\>

Defined in: orm/model/base-model.ts:163

执行原始数据库操作

#### Type Parameters

##### Result

`Result` = `unknown`

返回结果类型

#### Parameters

##### executeArgs

...`unknown`[]

执行参数

#### Returns

`Promise`\<`Result`\>

执行结果

#### Description

直接调用底层仓储的原始执行方法

#### Example

```typescript
const result = await User.run('SELECT * FROM users WHERE id = ?', ['1']);
```

---

### updateById()

> `static` **updateById**\<`Model`\>(`this`, `id`, `dataOrModel`): `Promise`\<`boolean`\>

Defined in: orm/model/base-model.ts:273

根据 ID 更新记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### id

要更新的记录 ID

`string` | `number`

##### dataOrModel

更新数据或模型实例

`InstanceType`\<`Model`\> | [`ModelUpdate`](../type-aliases/ModelUpdate.md)\<`InstanceType`\<`Model`\>\>

#### Returns

`Promise`\<`boolean`\>

更新是否成功

#### Description

根据指定的 ID 更新数据库中的记录

#### Example

```typescript
const success = await User.updateById('1', {
  name: 'John Updated',
  email: 'john.updated@example.com',
});
```

---

### updateMany()

> `static` **updateMany**\<`Model`\>(`this`, `updateDataLists`): `Promise`\<`boolean`\>

Defined in: orm/model/base-model.ts:302

批量更新记录

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

模型类型

#### Parameters

##### this

`Model`

##### updateDataLists

[`ModelUpdate`](../type-aliases/ModelUpdate.md)\<`InstanceType`\<`Model`\>\>[]

更新数据列表

#### Returns

`Promise`\<`boolean`\>

批量更新操作的结果

#### Description

批量更新多条记录

#### Example

```typescript
const result = await User.updateMany([
  { id: '1', name: 'John Updated' },
  { id: '2', name: 'Jane Updated' },
]);
```

---

### useDataSource()

> `static` **useDataSource**(`dataSource`): `void`

Defined in: orm/model/base-model.ts:111

设置数据源

#### Parameters

##### dataSource

[`DataSource`](DataSource.md)\<[`DataSourceType`](../type-aliases/DataSourceType.md)\>

数据源实例

#### Returns

`void`

#### Description

为模型类设置数据源，用于后续的数据库操作

#### Example

```typescript
const dataSource = new DataSource(config);
BaseModel.useDataSource(dataSource);
```
