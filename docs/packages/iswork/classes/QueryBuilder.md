[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QueryBuilder

# Class: QueryBuilder

Defined in: orm/query-builder.ts:115

查询构建器类

## Description

提供链式调用的查询构建功能，支持字段选择、过滤、排序、分页等操作

## Example

```typescript
const qb = QueryBuilder.create()
  .select(['id', 'name', 'email'])
  .where({ name: { $cont: 'john' } })
  .sort([{ field: 'createdAt', order: 'DESC' }])
  .limit(10)
  .offset(0);

const queryString = qb.query();
// 输出: fields=id,name,email&filter=name||$cont||john&sort=createdAt,DESC&limit=10&offset=0
```

## Constructors

### Constructor

> **new QueryBuilder**(`params?`): `QueryBuilder`

Defined in: orm/query-builder.ts:180

#### Parameters

##### params?

查询字符串

`string` | [`QueryParamsOptions`](../interfaces/QueryParamsOptions.md)

#### Returns

`QueryBuilder`

## Accessors

### options

#### Get Signature

> **get** **options**(): [`QueryBuilderOptions`](../type-aliases/QueryBuilderOptions.md)

Defined in: orm/query-builder.ts:173

获取参数

##### Returns

[`QueryBuilderOptions`](../type-aliases/QueryBuilderOptions.md)

## Methods

### getQueryData()

> **getQueryData**(): `Partial`\<[`ParsedRequestParams`](../interfaces/ParsedRequestParams.md)\>

Defined in: orm/query-builder.ts:205

获取查询对象数据

#### Returns

`Partial`\<[`ParsedRequestParams`](../interfaces/ParsedRequestParams.md)\>

---

### query()

> **query**(`encode`): `string`

Defined in: orm/query-builder.ts:193

获取query查询字符串

#### Parameters

##### encode

`boolean` = `true`

是否编码

#### Returns

`string`

---

### resetCache()

> **resetCache**(): `this`

Defined in: orm/query-builder.ts:318

重置cache功能

#### Returns

`this`

---

### search()

> **search**(`s`): `QueryBuilder`

Defined in: orm/query-builder.ts:227

设置搜索条件

#### Parameters

##### s

[`SearchCondition`](../type-aliases/SearchCondition.md)

#### Returns

`QueryBuilder`

---

### select()

> **select**(`fields`): `this`

Defined in: orm/query-builder.ts:213

选择字段

#### Parameters

##### fields

[`QueryFields`](../type-aliases/QueryFields.md)

数组字段名

#### Returns

`this`

---

### setFilter()

> **setFilter**(`f`): `this`

Defined in: orm/query-builder.ts:238

设置过滤

#### Parameters

##### f

过滤条件

[`QueryFilter`](../type-aliases/QueryFilter.md) | [`QueryFilterArr`](../type-aliases/QueryFilterArr.md) | ([`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md))[]

#### Returns

`this`

---

### setIncludeDeleted()

> **setIncludeDeleted**(`n`): `this`

Defined in: orm/query-builder.ts:323

#### Parameters

##### n

`number`

#### Returns

`this`

---

### setJoin()

> **setJoin**(`j`): `this`

Defined in: orm/query-builder.ts:256

设置联表查询

#### Parameters

##### j

联表查询选项

[`QueryJoin`](../type-aliases/QueryJoin.md) | [`QueryJoinArr`](../type-aliases/QueryJoinArr.md) | ([`QueryJoin`](../type-aliases/QueryJoin.md) \| [`QueryJoinArr`](../type-aliases/QueryJoinArr.md))[]

#### Returns

`this`

---

### setLimit()

> **setLimit**(`n`): `this`

Defined in: orm/query-builder.ts:292

设置数据数量限制

#### Parameters

##### n

`number`

#### Returns

`this`

---

### setOffset()

> **setOffset**(`n`): `this`

Defined in: orm/query-builder.ts:301

设置数据起始位置

#### Parameters

##### n

`number`

#### Returns

`this`

---

### setOr()

> **setOr**(`f`): `this`

Defined in: orm/query-builder.ts:247

设置或逻辑

#### Parameters

##### f

过滤条件

[`QueryFilter`](../type-aliases/QueryFilter.md) | [`QueryFilterArr`](../type-aliases/QueryFilterArr.md) | ([`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md))[]

#### Returns

`this`

---

### setPage()

> **setPage**(`n`): `this`

Defined in: orm/query-builder.ts:310

设置页码

#### Parameters

##### n

`number`

#### Returns

`this`

---

### sortBy()

> **sortBy**(`s`): `this`

Defined in: orm/query-builder.ts:274

设置排序

#### Parameters

##### s

排序参数条件

[`QuerySort`](../type-aliases/QuerySort.md) | [`QuerySortArr`](../type-aliases/QuerySortArr.md) | ([`QuerySort`](../type-aliases/QuerySort.md) \| [`QuerySortArr`](../type-aliases/QuerySortArr.md))[]

#### Returns

`this`

---

### create()

> `static` **create**(`params?`): `QueryBuilder`

Defined in: orm/query-builder.ts:161

QueryBuilder工厂方法，创建一个QueryBuilder实例

#### Parameters

##### params?

查询参数选项

`string` | [`QueryParamsOptions`](../interfaces/QueryParamsOptions.md)

#### Returns

`QueryBuilder`

---

### getOptions()

> `static` **getOptions**(): [`PartialQueryBuilderOptions`](../interfaces/PartialQueryBuilderOptions.md)

Defined in: orm/query-builder.ts:153

获取参数

#### Returns

[`PartialQueryBuilderOptions`](../interfaces/PartialQueryBuilderOptions.md)

PartialQueryBuilderOptions QueryBuilder选项

---

### setOptions()

> `static` **setOptions**(`options`): `void`

Defined in: orm/query-builder.ts:138

设置参数

#### Parameters

##### options

[`PartialQueryBuilderOptions`](../interfaces/PartialQueryBuilderOptions.md)

QueryBuilder选项

#### Returns

`void`
