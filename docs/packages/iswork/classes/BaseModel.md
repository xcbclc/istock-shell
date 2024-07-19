[@istock/iswork](../README.md) / [Exports](../modules.md) / BaseModel

# Class: BaseModel

基础模型

## Implements

- `IBaseModel`

## Table of contents

### Constructors

- [constructor](BaseModel.md#constructor)

### Properties

- [createQueryBuilder](BaseModel.md#createquerybuilder)
- [dataSource](BaseModel.md#datasource)
- [generateId](BaseModel.md#generateid)

### Methods

- [save](BaseModel.md#save)
- [toObject](BaseModel.md#toobject)
- [createModel](BaseModel.md#createmodel)
- [createOne](BaseModel.md#createone)
- [deleteById](BaseModel.md#deletebyid)
- [deleteMany](BaseModel.md#deletemany)
- [findOneById](BaseModel.md#findonebyid)
- [getRepository](BaseModel.md#getrepository)
- [query](BaseModel.md#query)
- [run](BaseModel.md#run)
- [updateById](BaseModel.md#updatebyid)
- [updateMany](BaseModel.md#updatemany)
- [useDataSource](BaseModel.md#usedatasource)

## Constructors

### constructor

• **new BaseModel**(): [`BaseModel`](BaseModel.md)

#### Returns

[`BaseModel`](BaseModel.md)

## Properties

### createQueryBuilder

▪ `Static` `Readonly` **createQueryBuilder**: (`params?`: `string` \| [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md)) => [`QueryBuilder`](QueryBuilder.md)

#### Type declaration

▸ (`params?`): [`QueryBuilder`](QueryBuilder.md)

QueryBuilder工厂方法，创建一个QueryBuilder实例

##### Parameters

| Name      | Type                                                                      | Description  |
| :-------- | :------------------------------------------------------------------------ | :----------- |
| `params?` | `string` \| [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md) | 查询参数选项 |

##### Returns

[`QueryBuilder`](QueryBuilder.md)

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:25

---

### dataSource

▪ `Static` `Protected` **dataSource**: [`DataSource`](DataSource.md)\<[`TDataSourceType`](../modules.md#tdatasourcetype)\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:24

---

### generateId

▪ `Static` `Readonly` **generateId**: `FESnowflake`

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:26

## Methods

### save

▸ **save**\<`This`\>(`this`): `Promise`\<`null` \| `string` \| `number`\>

保存当前模型数据

#### Type parameters

| Name   | Type                                |
| :----- | :---------------------------------- |
| `This` | extends [`BaseModel`](BaseModel.md) |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `this` | `This` |

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

#### Implementation of

IBaseModel.save

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:31

---

### toObject

▸ **toObject**\<`This`\>(`this`): [`TModelData`](../modules.md#tmodeldata)\<`This`\>

模型实例转换成数据

#### Type parameters

| Name   | Type                                |
| :----- | :---------------------------------- |
| `This` | extends [`BaseModel`](BaseModel.md) |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `this` | `This` |

#### Returns

[`TModelData`](../modules.md#tmodeldata)\<`This`\>

#### Implementation of

IBaseModel.toObject

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:44

---

### createModel

▸ **createModel**\<`Model`\>(`this`, `data`): `InstanceType`\<`Model`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name   | Type                                                                      |
| :----- | :------------------------------------------------------------------------ |
| `this` | `Model`                                                                   |
| `data` | [`TModelCreate`](../modules.md#tmodelcreate)\<`InstanceType`\<`Model`\>\> |

#### Returns

`InstanceType`\<`Model`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:60

---

### createOne

▸ **createOne**\<`Model`\>(`this`, `dataOrModel`): `Promise`\<`null` \| `string` \| `number`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name          | Type                                                                                                                                                                            |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `this`        | `Model`                                                                                                                                                                         |
| `dataOrModel` | `InstanceType`\<`Model`\> \| [`TModelCreate`](../modules.md#tmodelcreate)\<`InstanceType`\<`Model`\>\> \| [`TModelData`](../modules.md#tmodeldata)\<`InstanceType`\<`Model`\>\> |

#### Returns

`Promise`\<`null` \| `string` \| `number`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:83

---

### deleteById

▸ **deleteById**\<`Model`\>(`this`, `id`): `Promise`\<`boolean`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `this` | `Model`              |
| `id`   | `string` \| `number` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:128

---

### deleteMany

▸ **deleteMany**\<`Model`\>(`this`, `query`): `Promise`\<`boolean`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `this`  | `Model`                                |
| `query` | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:123

---

### findOneById

▸ **findOneById**\<`Model`\>(`this`, `id`): `Promise`\<[`TModelData`](../modules.md#tmodeldata)\<`InstanceType`\<`Model`\>\>\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `this` | `Model`              |
| `id`   | `string` \| `number` |

#### Returns

`Promise`\<[`TModelData`](../modules.md#tmodeldata)\<`InstanceType`\<`Model`\>\>\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:133

---

### getRepository

▸ **getRepository**(): `Promise`\<[`Repository`](Repository.md)\>

#### Returns

`Promise`\<[`Repository`](Repository.md)\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:56

---

### query

▸ **query**\<`Model`\>(`this`, `query`): `Promise`\<[`TModelData`](../modules.md#tmodeldata)\<`InstanceType`\<`Model`\>\>[]\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name    | Type                                   |
| :------ | :------------------------------------- |
| `this`  | `Model`                                |
| `query` | [`TOrmQuery`](../modules.md#tormquery) |

#### Returns

`Promise`\<[`TModelData`](../modules.md#tmodeldata)\<`InstanceType`\<`Model`\>\>[]\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:78

---

### run

▸ **run**\<`Result`\>(`...executeArgs`): `Promise`\<`Result`\>

连接器原始执行操作

#### Type parameters

| Name     | Type      |
| :------- | :-------- |
| `Result` | `unknown` |

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `...executeArgs` | `unknown`[] |

#### Returns

`Promise`\<`Result`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:73

---

### updateById

▸ **updateById**\<`Model`\>(`this`, `id`, `dataOrModel`): `Promise`\<`boolean`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name          | Type                                                                                                   |
| :------------ | :----------------------------------------------------------------------------------------------------- |
| `this`        | `Model`                                                                                                |
| `id`          | `string` \| `number`                                                                                   |
| `dataOrModel` | `InstanceType`\<`Model`\> \| [`TModelUpdate`](../modules.md#tmodelupdate)\<`InstanceType`\<`Model`\>\> |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:100

---

### updateMany

▸ **updateMany**\<`Model`\>(`this`, `updateDataLists`): `Promise`\<`boolean`\>

#### Type parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `Model` | extends typeof [`BaseModel`](BaseModel.md) |

#### Parameters

| Name              | Type                                                                        |
| :---------------- | :-------------------------------------------------------------------------- |
| `this`            | `Model`                                                                     |
| `updateDataLists` | [`TModelUpdate`](../modules.md#tmodelupdate)\<`InstanceType`\<`Model`\>\>[] |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:115

---

### useDataSource

▸ **useDataSource**(`dataSource`): `void`

#### Parameters

| Name         | Type                                                                                |
| :----------- | :---------------------------------------------------------------------------------- |
| `dataSource` | [`DataSource`](DataSource.md)\<[`TDataSourceType`](../modules.md#tdatasourcetype)\> |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/orm/model/base-model.ts:52
