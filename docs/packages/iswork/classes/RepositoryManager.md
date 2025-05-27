[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / RepositoryManager

# Class: RepositoryManager

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:8

仓库管理

## Constructors

### Constructor

> **new RepositoryManager**(`dataSource`): `RepositoryManager`

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:20

#### Parameters

##### dataSource

[`DataSource`](DataSource.md)\<[`TDataSourceType`](../type-aliases/TDataSourceType.md)\>

#### Returns

`RepositoryManager`

## Accessors

### connector

#### Get Signature

> **get** **connector**(): `unknown`

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:11

##### Returns

`unknown`

***

### runner

#### Get Signature

> **get** **runner**(): `AbstractRunner`\<`unknown`\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:15

##### Returns

`AbstractRunner`\<`unknown`\>

## Methods

### create()

> **create**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:45

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### createDatas

[`TIdAnyObject`](../type-aliases/TIdAnyObject.md)[]

#### Returns

`Promise`\<(`string` \| `number`)[]\>

***

### delete()

> **delete**(`model`, `query`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:57

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<`boolean`\>

***

### getRepository()

> **getRepository**(`target`): [`Repository`](Repository.md)

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:28

根据模型获取仓库，给数据源使用，仓管管理和数据源一对一绑定

#### Parameters

##### target

*typeof* [`BaseModel`](BaseModel.md)

#### Returns

[`Repository`](Repository.md)

***

### query()

> **query**\<`Result`\>(`model`, `query`): `Promise`\<`Result`[]\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:41

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

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:37

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

### update()

> **update**(`model`, `updateData`, `query`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:49

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### updateData

[`TAnyObj`](../type-aliases/TAnyObj.md)

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<`boolean`\>

***

### updateMany()

> **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/repository/repository-manager.ts:53

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

##### updateDataList

[`TAnyObj`](../type-aliases/TAnyObj.md)[]

#### Returns

`Promise`\<`boolean`\>
