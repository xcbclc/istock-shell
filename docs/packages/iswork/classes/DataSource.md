[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / DataSource

# Class: DataSource\<Type\>

Defined in: src/packages/iswork/src/orm/data-source.ts:6

## Type Parameters

### Type

`Type` *extends* [`TDataSourceType`](../type-aliases/TDataSourceType.md)

## Constructors

### Constructor

> **new DataSource**\<`Type`\>(`options`): `DataSource`\<`Type`\>

Defined in: src/packages/iswork/src/orm/data-source.ts:24

#### Parameters

##### options

[`TDataSourceAllOptions`](../type-aliases/TDataSourceAllOptions.md)\[`Type`\]

#### Returns

`DataSource`\<`Type`\>

## Accessors

### driver

#### Get Signature

> **get** **driver**(): `AbstractDriver`

Defined in: src/packages/iswork/src/orm/data-source.ts:20

##### Returns

`AbstractDriver`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: src/packages/iswork/src/orm/data-source.ts:12

##### Returns

`string`

***

### options

#### Get Signature

> **get** **options**(): [`TDataSourceAllOptions`](../type-aliases/TDataSourceAllOptions.md)\[`Type`\]

Defined in: src/packages/iswork/src/orm/data-source.ts:16

##### Returns

[`TDataSourceAllOptions`](../type-aliases/TDataSourceAllOptions.md)\[`Type`\]

## Methods

### connect()

> **connect**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: src/packages/iswork/src/orm/data-source.ts:68

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/orm/data-source.ts:80

#### Returns

`Promise`\<`void`\>

***

### getRepository()

> **getRepository**(`model`): `Promise`\<[`Repository`](Repository.md)\>

Defined in: src/packages/iswork/src/orm/data-source.ts:34

暴露给基础模型使用的方法

#### Parameters

##### model

*typeof* [`BaseModel`](BaseModel.md)

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

***

### initialize()

> **initialize**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: src/packages/iswork/src/orm/data-source.ts:51

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>

***

### reconnect()

> **reconnect**(): `Promise`\<`DataSource`\<`Type`\>\>

Defined in: src/packages/iswork/src/orm/data-source.ts:73

#### Returns

`Promise`\<`DataSource`\<`Type`\>\>
