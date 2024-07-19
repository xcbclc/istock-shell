[@istock/iswork](../README.md) / [Exports](../modules.md) / Repository

# Class: Repository

仓库，可扩展基本方法，添加默认查询条件

## Table of contents

### Constructors

- [constructor](Repository.md#constructor)

### Properties

- [#repositoryManager](Repository.md##repositorymanager)

### Methods

- [createMany](Repository.md#createmany)
- [createOne](Repository.md#createone)
- [deleteById](Repository.md#deletebyid)
- [deleteMany](Repository.md#deletemany)
- [findOneById](Repository.md#findonebyid)
- [query](Repository.md#query)
- [run](Repository.md#run)
- [updateById](Repository.md#updatebyid)
- [updateMany](Repository.md#updatemany)

## Constructors

### constructor

• **new Repository**(`repositoryManager`): [`Repository`](Repository.md)

#### Parameters

| Name                | Type                                        |
| :------------------ | :------------------------------------------ |
| `repositoryManager` | [`RepositoryManager`](RepositoryManager.md) |

#### Returns

[`Repository`](Repository.md)

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:10

## Properties

### #repositoryManager

• `Private` `Readonly` **#repositoryManager**: [`RepositoryManager`](RepositoryManager.md)

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:8

## Methods

### createMany

▸ **createMany**(`model`, `createDatas`): `Promise`\<(`string` \| `number`)[]\>

#### Parameters

| Name          | Type                                           |
| :------------ | :--------------------------------------------- |
| `model`       | typeof [`BaseModel`](BaseModel.md)             |
| `createDatas` | [`TIdAnyObject`](../modules.md#tidanyobject)[] |

#### Returns

`Promise`\<(`string` \| `number`)[]\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:27

---

### createOne

▸ **createOne**(`model`, `createData`): `Promise`\<`null` \| `string` \| `number`\>

#### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `model`      | typeof [`BaseModel`](BaseModel.md)           |
| `createData` | [`TIdAnyObject`](../modules.md#tidanyobject) |

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:22

---

### deleteById

▸ **deleteById**(`model`, `id`): `Promise`\<`boolean`\>

#### Parameters

| Name    | Type                               |
| :------ | :--------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md) |
| `id`    | `string` \| `number`               |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:45

---

### deleteMany

▸ **deleteMany**(`model`, `query`): `Promise`\<`boolean`\>

#### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md)     |
| `query` | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:41

---

### findOneById

▸ **findOneById**(`model`, `id`): `Promise`\<`unknown`\>

#### Parameters

| Name    | Type                               |
| :------ | :--------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md) |
| `id`    | `string` \| `number`               |

#### Returns

`Promise`\<`unknown`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:51

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

src/packages/iswork/src/orm/repository/repository.ts:18

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

src/packages/iswork/src/orm/repository/repository.ts:14

---

### updateById

▸ **updateById**(`model`, `id`, `updateData`): `Promise`\<`boolean`\>

#### Parameters

| Name         | Type                               |
| :----------- | :--------------------------------- |
| `model`      | typeof [`BaseModel`](BaseModel.md) |
| `id`         | `string` \| `number`               |
| `updateData` | [`TAnyObj`](../modules.md#tanyobj) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:35

---

### updateMany

▸ **updateMany**(`model`, `updateDataList`): `Promise`\<`boolean`\>

#### Parameters

| Name             | Type                                           |
| :--------------- | :--------------------------------------------- |
| `model`          | typeof [`BaseModel`](BaseModel.md)             |
| `updateDataList` | [`TIdAnyObject`](../modules.md#tidanyobject)[] |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/repository/repository.ts:31
