[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / BaseModel

# Class: BaseModel

Defined in: src/packages/iswork/src/orm/model/base-model.ts:23

基础模型

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

Defined in: src/packages/iswork/src/orm/model/base-model.ts:25

QueryBuilder工厂方法，创建一个QueryBuilder实例

#### Parameters

##### params?

查询参数选项

`string` | [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md)

#### Returns

[`QueryBuilder`](QueryBuilder.md)

---

### dataSource

> `protected` `static` **dataSource**: [`DataSource`](DataSource.md)\<[`TDataSourceType`](../type-aliases/TDataSourceType.md)\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:24

---

### generateId

> `readonly` `static` **generateId**: `FESnowflake`

Defined in: src/packages/iswork/src/orm/model/base-model.ts:26

## Methods

### save()

> **save**\<`This`\>(`this`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:31

保存当前模型数据

#### Type Parameters

##### This

`This` _extends_ `BaseModel`

#### Parameters

##### this

`This`

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

#### Implementation of

`IBaseModel.save`

---

### toObject()

> **toObject**\<`This`\>(`this`): [`TModelData`](../type-aliases/TModelData.md)\<`This`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:44

模型实例转换成数据

#### Type Parameters

##### This

`This` _extends_ `BaseModel`

#### Parameters

##### this

`This`

#### Returns

[`TModelData`](../type-aliases/TModelData.md)\<`This`\>

#### Implementation of

`IBaseModel.toObject`

---

### createMany()

> `static` **createMany**\<`Model`\>(`this`, `dataOrModels`): `Promise`\<(`string` \| `number`)[]\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:100

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### dataOrModels

[`TModelCreate`](../type-aliases/TModelCreate.md)\<`InstanceType`\<`Model`\>\>[] | [`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>[] | `InstanceType`\<`Model`\>[]

#### Returns

`Promise`\<(`string` \| `number`)[]\>

---

### createModel()

> `static` **createModel**\<`Model`\>(`this`, `data`): `InstanceType`\<`Model`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:60

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### data

[`TModelCreate`](../type-aliases/TModelCreate.md)\<`InstanceType`\<`Model`\>\>

#### Returns

`InstanceType`\<`Model`\>

---

### createOne()

> `static` **createOne**\<`Model`\>(`this`, `dataOrModel`): `Promise`\<`null` \| `string` \| `number`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:83

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### dataOrModel

`InstanceType`\<`Model`\> | [`TModelCreate`](../type-aliases/TModelCreate.md)\<`InstanceType`\<`Model`\>\> | [`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

---

### deleteById()

> `static` **deleteById**\<`Model`\>(`this`, `id`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:151

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### id

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

---

### deleteMany()

> `static` **deleteMany**\<`Model`\>(`this`, `query`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:146

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<`boolean`\>

---

### findOneById()

> `static` **findOneById**\<`Model`\>(`this`, `id`): `Promise`\<[`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:156

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### id

`string` | `number`

#### Returns

`Promise`\<[`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>\>

---

### getRepository()

> `static` **getRepository**(): `Promise`\<[`Repository`](Repository.md)\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:56

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

---

### query()

> `static` **query**\<`Model`\>(`this`, `query`): `Promise`\<[`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>[]\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:78

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### query

[`TOrmQuery`](../type-aliases/TOrmQuery.md)

#### Returns

`Promise`\<[`TModelData`](../type-aliases/TModelData.md)\<`InstanceType`\<`Model`\>\>[]\>

---

### run()

> `static` **run**\<`Result`\>(...`executeArgs`): `Promise`\<`Result`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:73

连接器原始执行操作

#### Type Parameters

##### Result

`Result` = `unknown`

#### Parameters

##### executeArgs

...`unknown`[]

#### Returns

`Promise`\<`Result`\>

---

### updateById()

> `static` **updateById**\<`Model`\>(`this`, `id`, `dataOrModel`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:123

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### id

`string` | `number`

##### dataOrModel

`InstanceType`\<`Model`\> | [`TModelUpdate`](../type-aliases/TModelUpdate.md)\<`InstanceType`\<`Model`\>\>

#### Returns

`Promise`\<`boolean`\>

---

### updateMany()

> `static` **updateMany**\<`Model`\>(`this`, `updateDataLists`): `Promise`\<`boolean`\>

Defined in: src/packages/iswork/src/orm/model/base-model.ts:138

#### Type Parameters

##### Model

`Model` _extends_ _typeof_ `BaseModel`

#### Parameters

##### this

`Model`

##### updateDataLists

[`TModelUpdate`](../type-aliases/TModelUpdate.md)\<`InstanceType`\<`Model`\>\>[]

#### Returns

`Promise`\<`boolean`\>

---

### useDataSource()

> `static` **useDataSource**(`dataSource`): `void`

Defined in: src/packages/iswork/src/orm/model/base-model.ts:52

#### Parameters

##### dataSource

[`DataSource`](DataSource.md)\<[`TDataSourceType`](../type-aliases/TDataSourceType.md)\>

#### Returns

`void`
