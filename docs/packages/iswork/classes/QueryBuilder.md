[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / QueryBuilder

# Class: QueryBuilder

Defined in: src/packages/iswork/src/orm/query-builder.ts:82

## Constructors

### Constructor

> **new QueryBuilder**(`params?`): `QueryBuilder`

Defined in: src/packages/iswork/src/orm/query-builder.ts:147

#### Parameters

##### params?

查询字符串

`string` | [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md)

#### Returns

`QueryBuilder`

## Accessors

### options

#### Get Signature

> **get** **options**(): [`TQueryBuilderOptions`](../type-aliases/TQueryBuilderOptions.md)

Defined in: src/packages/iswork/src/orm/query-builder.ts:140

获取参数

##### Returns

[`TQueryBuilderOptions`](../type-aliases/TQueryBuilderOptions.md)

## Methods

### getQueryData()

> **getQueryData**(): `Partial`\<[`IParsedRequestParams`](../interfaces/IParsedRequestParams.md)\>

Defined in: src/packages/iswork/src/orm/query-builder.ts:172

获取查询对象数据

#### Returns

`Partial`\<[`IParsedRequestParams`](../interfaces/IParsedRequestParams.md)\>

***

### query()

> **query**(`encode`): `string`

Defined in: src/packages/iswork/src/orm/query-builder.ts:160

获取query查询字符串

#### Parameters

##### encode

`boolean` = `true`

是否编码

#### Returns

`string`

***

### resetCache()

> **resetCache**(): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:285

重置cache功能

#### Returns

`this`

***

### search()

> **search**(`s`): `QueryBuilder`

Defined in: src/packages/iswork/src/orm/query-builder.ts:194

设置搜索条件

#### Parameters

##### s

[`TSCondition`](../type-aliases/TSCondition.md)

#### Returns

`QueryBuilder`

***

### select()

> **select**(`fields`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:180

选择字段

#### Parameters

##### fields

[`TQueryFields`](../type-aliases/TQueryFields.md)

数组字段名

#### Returns

`this`

***

### setFilter()

> **setFilter**(`f`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:205

设置过滤

#### Parameters

##### f

过滤条件

[`TQueryFilter`](../type-aliases/TQueryFilter.md) | [`TQueryFilterArr`](../type-aliases/TQueryFilterArr.md) | ([`TQueryFilter`](../type-aliases/TQueryFilter.md) \| [`TQueryFilterArr`](../type-aliases/TQueryFilterArr.md))[]

#### Returns

`this`

***

### setIncludeDeleted()

> **setIncludeDeleted**(`n`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:290

#### Parameters

##### n

`number`

#### Returns

`this`

***

### setJoin()

> **setJoin**(`j`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:223

设置联表查询

#### Parameters

##### j

联表查询选项

[`TQueryJoin`](../type-aliases/TQueryJoin.md) | [`TQueryJoinArr`](../type-aliases/TQueryJoinArr.md) | ([`TQueryJoin`](../type-aliases/TQueryJoin.md) \| [`TQueryJoinArr`](../type-aliases/TQueryJoinArr.md))[]

#### Returns

`this`

***

### setLimit()

> **setLimit**(`n`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:259

设置数据数量限制

#### Parameters

##### n

`number`

#### Returns

`this`

***

### setOffset()

> **setOffset**(`n`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:268

设置数据起始位置

#### Parameters

##### n

`number`

#### Returns

`this`

***

### setOr()

> **setOr**(`f`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:214

设置或逻辑

#### Parameters

##### f

过滤条件

[`TQueryFilter`](../type-aliases/TQueryFilter.md) | [`TQueryFilterArr`](../type-aliases/TQueryFilterArr.md) | ([`TQueryFilter`](../type-aliases/TQueryFilter.md) \| [`TQueryFilterArr`](../type-aliases/TQueryFilterArr.md))[]

#### Returns

`this`

***

### setPage()

> **setPage**(`n`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:277

设置页码

#### Parameters

##### n

`number`

#### Returns

`this`

***

### sortBy()

> **sortBy**(`s`): `this`

Defined in: src/packages/iswork/src/orm/query-builder.ts:241

设置排序

#### Parameters

##### s

排序参数条件

[`TQuerySort`](../type-aliases/TQuerySort.md) | [`TQuerySortArr`](../type-aliases/TQuerySortArr.md) | ([`TQuerySort`](../type-aliases/TQuerySort.md) \| [`TQuerySortArr`](../type-aliases/TQuerySortArr.md))[]

#### Returns

`this`

***

### create()

> `static` **create**(`params?`): `QueryBuilder`

Defined in: src/packages/iswork/src/orm/query-builder.ts:128

QueryBuilder工厂方法，创建一个QueryBuilder实例

#### Parameters

##### params?

查询参数选项

`string` | [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md)

#### Returns

`QueryBuilder`

***

### getOptions()

> `static` **getOptions**(): [`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md)

Defined in: src/packages/iswork/src/orm/query-builder.ts:120

获取参数

#### Returns

[`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md)

IPartialQueryBuilderOptions QueryBuilder选项

***

### setOptions()

> `static` **setOptions**(`options`): `void`

Defined in: src/packages/iswork/src/orm/query-builder.ts:105

设置参数

#### Parameters

##### options

[`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md)

QueryBuilder选项

#### Returns

`void`
