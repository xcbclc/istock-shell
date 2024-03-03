[@istock/iswork](../README.md) / [Exports](../modules.md) / RepositoryManager

# Class: RepositoryManager

仓库管理

## Table of contents

### Constructors

- [constructor](RepositoryManager.md#constructor)

### Properties

- [#dataSource](RepositoryManager.md##datasource)
- [#repositoryMap](RepositoryManager.md##repositorymap)

### Accessors

- [connector](RepositoryManager.md#connector)
- [runner](RepositoryManager.md#runner)

### Methods

- [create](RepositoryManager.md#create)
- [delete](RepositoryManager.md#delete)
- [getRepository](RepositoryManager.md#getrepository)
- [query](RepositoryManager.md#query)
- [run](RepositoryManager.md#run)
- [update](RepositoryManager.md#update)
- [updateMany](RepositoryManager.md#updatemany)

## Constructors

### constructor

• **new RepositoryManager**(`dataSource`): [`RepositoryManager`](RepositoryManager.md)

#### Parameters

| Name         | Type                                                                                |
| :----------- | :---------------------------------------------------------------------------------- |
| `dataSource` | [`DataSource`](DataSource.md)\<[`TDataSourceType`](../modules.md#tdatasourcetype)\> |

#### Returns

[`RepositoryManager`](RepositoryManager.md)

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:20

## Properties

### #dataSource

• `Private` `Readonly` **#dataSource**: [`DataSource`](DataSource.md)\<[`TDataSourceType`](../modules.md#tdatasourcetype)\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:10

---

### #repositoryMap

• `Private` `Readonly` **#repositoryMap**: `Map`\<typeof [`BaseModel`](BaseModel.md), [`Repository`](Repository.md)\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:9

## Accessors

### connector

• `get` **connector**(): `unknown`

#### Returns

`unknown`

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:11

---

### runner

• `get` **runner**(): `AbstractRunner`\<`unknown`\>

#### Returns

`AbstractRunner`\<`unknown`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:15

## Methods

### create

▸ **create**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

#### Parameters

| Name          | Type                                           |
| :------------ | :--------------------------------------------- |
| `model`       | typeof [`BaseModel`](BaseModel.md)             |
| `createDatas` | [`TIdAnyObject`](../modules.md#tidanyobject)[] |

#### Returns

`Promise`\<(`string` \| `number`)[]\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:45

---

### delete

▸ **delete**(`model`, `query`): `Promise`\<`boolean`\>

#### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md)     |
| `query` | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:57

---

### getRepository

▸ **getRepository**(`target`): [`Repository`](Repository.md)

根据模型获取仓库，给数据源使用，仓管管理和数据源一对一绑定

#### Parameters

| Name     | Type                               |
| :------- | :--------------------------------- |
| `target` | typeof [`BaseModel`](BaseModel.md) |

#### Returns

[`Repository`](Repository.md)

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:28

---

### query

▸ **query**\<`Result`\>(`model`, `query`): `Promise`\<`Result`[]\>

#### Type parameters

| Name     | Type      |
| :------- | :-------- |
| `Result` | `unknown` |

#### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md)     |
| `query` | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<`Result`[]\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:41

---

### run

▸ **run**\<`Result`\>(`model`, `...executeArgs`): `Promise`\<`Result`\>

#### Type parameters

| Name     | Type      |
| :------- | :-------- |
| `Result` | `unknown` |

#### Parameters

| Name             | Type                               |
| :--------------- | :--------------------------------- |
| `model`          | typeof [`BaseModel`](BaseModel.md) |
| `...executeArgs` | `unknown`[]                        |

#### Returns

`Promise`\<`Result`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:37

---

### update

▸ **update**(`model`, `updateData`, `query`): `Promise`\<`boolean`\>

#### Parameters

| Name         | Type                                   |
| :----------- | :------------------------------------- |
| `model`      | typeof [`BaseModel`](BaseModel.md)     |
| `updateData` | [`TAnyObj`](../modules.md#tanyobj)     |
| `query`      | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:49

---

### updateMany

▸ **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

#### Parameters

| Name             | Type                                 |
| :--------------- | :----------------------------------- |
| `model`          | typeof [`BaseModel`](BaseModel.md)   |
| `updateDataList` | [`TAnyObj`](../modules.md#tanyobj)[] |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository-manager.ts:53
