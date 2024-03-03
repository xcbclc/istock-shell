[@istock/iswork](../README.md) / [Exports](../modules.md) / QueryBuilder

# Class: QueryBuilder

## Table of contents

### Constructors

- [constructor](QueryBuilder.md#constructor)

### Properties

- [#queryObject](QueryBuilder.md##queryobject)
- [#queryString](QueryBuilder.md##querystring)
- [#options](QueryBuilder.md##options)

### Accessors

- [options](QueryBuilder.md#options)

### Methods

- [#assertNestCond](QueryBuilder.md##assertnestcond)
- [#cond](QueryBuilder.md##cond)
- [#createFromParams](QueryBuilder.md##createfromparams)
- [#parseJoin](QueryBuilder.md##parsejoin)
- [#parseSortBy](QueryBuilder.md##parsesortby)
- [#setCondition](QueryBuilder.md##setcondition)
- [#setNumeric](QueryBuilder.md##setnumeric)
- [getQueryData](QueryBuilder.md#getquerydata)
- [query](QueryBuilder.md#query)
- [resetCache](QueryBuilder.md#resetcache)
- [search](QueryBuilder.md#search)
- [select](QueryBuilder.md#select)
- [setFilter](QueryBuilder.md#setfilter)
- [setIncludeDeleted](QueryBuilder.md#setincludedeleted)
- [setJoin](QueryBuilder.md#setjoin)
- [setLimit](QueryBuilder.md#setlimit)
- [setOffset](QueryBuilder.md#setoffset)
- [setOr](QueryBuilder.md#setor)
- [setPage](QueryBuilder.md#setpage)
- [sortBy](QueryBuilder.md#sortby)
- [create](QueryBuilder.md#create)
- [getOptions](QueryBuilder.md#getoptions)
- [setOptions](QueryBuilder.md#setoptions)

## Constructors

### constructor

• **new QueryBuilder**(`params?`): [`QueryBuilder`](QueryBuilder.md)

#### Parameters

| Name      | Type                                                                      | Description |
| :-------- | :------------------------------------------------------------------------ | :---------- |
| `params?` | `string` \| [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md) | 查询字符串  |

#### Returns

[`QueryBuilder`](QueryBuilder.md)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:147

## Properties

### #queryObject

• `Private` **#queryObject**: `Partial`\<[`IParsedRequestParams`](../interfaces/IParsedRequestParams.md)\> = `{}`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:135

---

### #queryString

• `Private` **#queryString**: `string` = `''`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:133

---

### #options

▪ `Static` `Private` **#options**: [`TQueryBuilderOptions`](../modules.md#tquerybuilderoptions)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:83

## Accessors

### options

• `get` **options**(): [`TQueryBuilderOptions`](../modules.md#tquerybuilderoptions)

获取参数

#### Returns

[`TQueryBuilderOptions`](../modules.md#tquerybuilderoptions)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:140

## Methods

### #assertNestCond

▸ **#assertNestCond**\<`Type`\>(`v`): v is Type

判断是否是嵌套条件

#### Type parameters

| Name   | Type      |
| :----- | :-------- |
| `Type` | `unknown` |

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `v`  | `unknown` |

#### Returns

v is Type

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:412

---

### #cond

▸ **#cond**(`f`, `_cond?`): [`TQueryFilter`](../modules.md#tqueryfilter)

添加查询条件及校验

#### Parameters

| Name    | Type                                                                                               | Default value |
| :------ | :------------------------------------------------------------------------------------------------- | :------------ |
| `f`     | [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) | `undefined`   |
| `_cond` | `"search"` \| `"filter"` \| `"or"`                                                                 | `'search'`    |

#### Returns

[`TQueryFilter`](../modules.md#tqueryfilter)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:323

---

### #createFromParams

▸ **#createFromParams**(`params`): `this`

根据参数对象设置对象值

#### Parameters

| Name     | Type                                                          |
| :------- | :------------------------------------------------------------ |
| `params` | [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md) |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:300

---

### #parseJoin

▸ **#parseJoin**(`j`): [`TQueryJoin`](../modules.md#tqueryjoin)

解析联表查询条件及校验

#### Parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `j`  | [`TQueryJoin`](../modules.md#tqueryjoin) \| [`TQueryJoinArr`](../modules.md#tqueryjoinarr) |

#### Returns

[`TQueryJoin`](../modules.md#tqueryjoin)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:343

---

### #parseSortBy

▸ **#parseSortBy**(`s`): [`TQuerySort`](../modules.md#tquerysort)

添加排序及校验

#### Parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `s`  | [`TQuerySort`](../modules.md#tquerysort) \| [`TQuerySortArr`](../modules.md#tquerysortarr) |

#### Returns

[`TQuerySort`](../modules.md#tquerysort)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:359

---

### #setCondition

▸ **#setCondition**(`f`, `cond`): `void`

设置条件方法

#### Parameters

| Name   | Type                                                                                                                                                                                                         |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `f`    | [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) \| ([`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr))[] |
| `cond` | `"filter"` \| `"or"`                                                                                                                                                                                         |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:376

---

### #setNumeric

▸ **#setNumeric**(`n`, `cond`): `void`

设置数字方法及校验

#### Parameters

| Name   | Type                                                                   |
| :----- | :--------------------------------------------------------------------- |
| `n`    | `number`                                                               |
| `cond` | `"limit"` \| `"offset"` \| `"page"` \| `"cache"` \| `"includeDeleted"` |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:398

---

### getQueryData

▸ **getQueryData**(): `Partial`\<[`IParsedRequestParams`](../interfaces/IParsedRequestParams.md)\>

获取查询对象数据

#### Returns

`Partial`\<[`IParsedRequestParams`](../interfaces/IParsedRequestParams.md)\>

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:172

---

### query

▸ **query**(`encode?`): `string`

获取query查询字符串

#### Parameters

| Name     | Type      | Default value | Description |
| :------- | :-------- | :------------ | :---------- |
| `encode` | `boolean` | `true`        | 是否编码    |

#### Returns

`string`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:160

---

### resetCache

▸ **resetCache**(): `this`

重置cache功能

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:285

---

### search

▸ **search**(`s`): [`QueryBuilder`](QueryBuilder.md)

设置搜索条件

#### Parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `s`  | [`TSCondition`](../modules.md#tscondition) |

#### Returns

[`QueryBuilder`](QueryBuilder.md)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:194

---

### select

▸ **select**(`fields`): `this`

选择字段

#### Parameters

| Name     | Type                                         | Description |
| :------- | :------------------------------------------- | :---------- |
| `fields` | [`TQueryFields`](../modules.md#tqueryfields) | 数组字段名  |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:180

---

### setFilter

▸ **setFilter**(`f`): `this`

设置过滤

#### Parameters

| Name | Type                                                                                                                                                                                                         | Description |
| :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `f`  | [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) \| ([`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr))[] | 过滤条件    |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:205

---

### setIncludeDeleted

▸ **setIncludeDeleted**(`n`): `this`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:290

---

### setJoin

▸ **setJoin**(`j`): `this`

设置联表查询

#### Parameters

| Name | Type                                                                                                                                                                                         | Description  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `j`  | [`TQueryJoin`](../modules.md#tqueryjoin) \| [`TQueryJoinArr`](../modules.md#tqueryjoinarr) \| ([`TQueryJoin`](../modules.md#tqueryjoin) \| [`TQueryJoinArr`](../modules.md#tqueryjoinarr))[] | 联表查询选项 |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:223

---

### setLimit

▸ **setLimit**(`n`): `this`

设置数据数量限制

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:259

---

### setOffset

▸ **setOffset**(`n`): `this`

设置数据起始位置

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:268

---

### setOr

▸ **setOr**(`f`): `this`

设置或逻辑

#### Parameters

| Name | Type                                                                                                                                                                                                         | Description |
| :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `f`  | [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) \| ([`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr))[] | 过滤条件    |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:214

---

### setPage

▸ **setPage**(`n`): `this`

设置页码

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:277

---

### sortBy

▸ **sortBy**(`s`): `this`

设置排序

#### Parameters

| Name | Type                                                                                                                                                                                         | Description  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `s`  | [`TQuerySort`](../modules.md#tquerysort) \| [`TQuerySortArr`](../modules.md#tquerysortarr) \| ([`TQuerySort`](../modules.md#tquerysort) \| [`TQuerySortArr`](../modules.md#tquerysortarr))[] | 排序参数条件 |

#### Returns

`this`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:241

---

### create

▸ **create**(`params?`): [`QueryBuilder`](QueryBuilder.md)

QueryBuilder工厂方法，创建一个QueryBuilder实例

#### Parameters

| Name      | Type                                                                      | Description  |
| :-------- | :------------------------------------------------------------------------ | :----------- |
| `params?` | `string` \| [`IQueryParamsOptions`](../interfaces/IQueryParamsOptions.md) | 查询参数选项 |

#### Returns

[`QueryBuilder`](QueryBuilder.md)

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:128

---

### getOptions

▸ **getOptions**(): [`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md)

获取参数

#### Returns

[`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md)

IPartialQueryBuilderOptions QueryBuilder选项

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:120

---

### setOptions

▸ **setOptions**(`options`): `void`

设置参数

#### Parameters

| Name      | Type                                                                          | Description      |
| :-------- | :---------------------------------------------------------------------------- | :--------------- |
| `options` | [`IPartialQueryBuilderOptions`](../interfaces/IPartialQueryBuilderOptions.md) | QueryBuilder选项 |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/orm/query-builder.ts:105
