[@istock/iswork](../README.md) / [Exports](../modules.md) / DataSource

# Class: DataSource\<Type\>

## Type parameters

| Name   | Type                                                       |
| :----- | :--------------------------------------------------------- |
| `Type` | extends [`TDataSourceType`](../modules.md#tdatasourcetype) |

## Table of contents

### Constructors

- [constructor](DataSource.md#constructor)

### Properties

- [#driver](DataSource.md##driver)
- [#isInitialized](DataSource.md##isinitialized)
- [#name](DataSource.md##name)
- [#options](DataSource.md##options)
- [#repositoryManager](DataSource.md##repositorymanager)

### Accessors

- [driver](DataSource.md#driver)
- [name](DataSource.md#name)
- [options](DataSource.md#options)

### Methods

- [connect](DataSource.md#connect)
- [disconnect](DataSource.md#disconnect)
- [getRepository](DataSource.md#getrepository)
- [initialize](DataSource.md#initialize)
- [reconnect](DataSource.md#reconnect)

## Constructors

### constructor

• **new DataSource**\<`Type`\>(`options`): [`DataSource`](DataSource.md)\<`Type`\>

#### Type parameters

| Name   | Type                                                       |
| :----- | :--------------------------------------------------------- |
| `Type` | extends [`TDataSourceType`](../modules.md#tdatasourcetype) |

#### Parameters

| Name      | Type                                                                   |
| :-------- | :--------------------------------------------------------------------- |
| `options` | [`TDataSourceAllOptions`](../modules.md#tdatasourcealloptions)[`Type`] |

#### Returns

[`DataSource`](DataSource.md)\<`Type`\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:24

## Properties

### #driver

• `Private` **#driver**: `AbstractDriver`

#### Defined in

src/packages/iswork/src/orm/data-source.ts:10

---

### #isInitialized

• `Private` **#isInitialized**: `boolean` = `false`

#### Defined in

src/packages/iswork/src/orm/data-source.ts:8

---

### #name

• `Private` `Readonly` **#name**: `string`

#### Defined in

src/packages/iswork/src/orm/data-source.ts:7

---

### #options

• `Private` `Readonly` **#options**: [`TDataSourceAllOptions`](../modules.md#tdatasourcealloptions)[`Type`]

#### Defined in

src/packages/iswork/src/orm/data-source.ts:9

---

### #repositoryManager

• `Private` **#repositoryManager**: [`RepositoryManager`](RepositoryManager.md)

#### Defined in

src/packages/iswork/src/orm/data-source.ts:11

## Accessors

### driver

• `get` **driver**(): `AbstractDriver`

#### Returns

`AbstractDriver`

#### Defined in

src/packages/iswork/src/orm/data-source.ts:20

---

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

src/packages/iswork/src/orm/data-source.ts:12

---

### options

• `get` **options**(): [`TDataSourceAllOptions`](../modules.md#tdatasourcealloptions)[`Type`]

#### Returns

[`TDataSourceAllOptions`](../modules.md#tdatasourcealloptions)[`Type`]

#### Defined in

src/packages/iswork/src/orm/data-source.ts:16

## Methods

### connect

▸ **connect**(): `Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Returns

`Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:68

---

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:80

---

### getRepository

▸ **getRepository**(`model`): `Promise`\<[`Repository`](Repository.md)\>

暴露给基础模型使用的方法

#### Parameters

| Name    | Type                               |
| :------ | :--------------------------------- |
| `model` | typeof [`BaseModel`](BaseModel.md) |

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:34

---

### initialize

▸ **initialize**(): `Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Returns

`Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:51

---

### reconnect

▸ **reconnect**(): `Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Returns

`Promise`\<[`DataSource`](DataSource.md)\<`Type`\>\>

#### Defined in

src/packages/iswork/src/orm/data-source.ts:73
