[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / Repository

# Class: Repository

Defined in: src/packages/iswork/src/orm/repository/repository.ts:7

仓库，可扩展基本方法，添加默认查询条件

## Constructors

### Constructor

> **new Repository**(`repositoryManager`): `Repository`

Defined in: src/packages/iswork/src/orm/repository/repository.ts:10

#### Parameters

##### repositoryManager

[`RepositoryManager`](RepositoryManager.md)

#### Returns

`Repository`

## Methods

### createMany()

> **createMany**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:27

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### createDatas

[`TIdAnyObject`](../type-aliases/TIdAnyObject.md)[]

#### Returns

`Promise`\<(`string` \| `number`)[]\>

***

### createOne()

> **createOne**(`model`, `createData`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:22

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### createData

[`TIdAnyObject`](../type-aliases/TIdAnyObject.md)

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

***

### deleteById()

> **deleteById**(`model`, `id`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:45

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### id

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

***

### deleteMany()

> **deleteMany**(`model`, `query`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:41

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<`boolean`\>

***

### findOneById()

> **findOneById**(`model`, `id`): `Promise`\<`unknown`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:51

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### id

`string` | `number`

#### Returns

`Promise`\<`unknown`\>

***

### query()

> **query**\<`Result`\>(`model`, `query`): `Promise`\<`Result`[]\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:18

#### Type Parameters

##### Result

`Result` = `unknown`

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<`Result`[]\>

***

### run()

> **run**\<`Result`\>(`model`, ...`executeArgs`): `Promise`\<`Result`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:14

#### Type Parameters

##### Result

`Result` = `unknown`

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### executeArgs

...`unknown`[]

#### Returns

`Promise`\<`Result`\>

***

### updateById()

> **updateById**(`model`, `id`, `updateData`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:35

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### id

`string` | `number`

##### updateData

[`TAnyObj`](../type-aliases/TAnyObj.md)

#### Returns

`Promise`\<`boolean`\>

***

### updateMany()

> **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository.ts:31

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### updateDataList

[`TIdAnyObject`](../type-aliases/TIdAnyObject.md)[]

#### Returns

`Promise`\<`boolean`\>
