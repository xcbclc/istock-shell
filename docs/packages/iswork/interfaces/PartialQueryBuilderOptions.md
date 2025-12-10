[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / PartialQueryBuilderOptions

# Interface: PartialQueryBuilderOptions

Defined in: orm/interfaces/query-builder.ts:54

部分查询构建器选项接口

## Description

QueryBuilder 的部分配置选项，主要用于传参

## Example

```typescript
const options: PartialQueryBuilderOptions = {
  delim: '&',
  delimStr: ',',
  paramNamesMap: {
    fields: 'select',
    filter: 'where',
  },
};
```

## Properties

### delim?

> `optional` **delim**: `string`

Defined in: orm/interfaces/query-builder.ts:56

参数分隔符

---

### delimStr?

> `optional` **delimStr**: `string`

Defined in: orm/interfaces/query-builder.ts:58

字符串分隔符

---

### paramNamesMap?

> `optional` **paramNamesMap**: `object`

Defined in: orm/interfaces/query-builder.ts:60

参数名称映射

#### cache?

> `optional` **cache**: `string` \| `string`[]

缓存参数名

#### fields?

> `optional` **fields**: `string` \| `string`[]

字段参数名

#### filter?

> `optional` **filter**: `string` \| `string`[]

过滤参数名

#### includeDeleted?

> `optional` **includeDeleted**: `string` \| `string`[]

包含已删除参数名

#### join?

> `optional` **join**: `string` \| `string`[]

连接参数名

#### limit?

> `optional` **limit**: `string` \| `string`[]

限制参数名

#### offset?

> `optional` **offset**: `string` \| `string`[]

偏移参数名

#### or?

> `optional` **or**: `string` \| `string`[]

或条件参数名

#### page?

> `optional` **page**: `string` \| `string`[]

页码参数名

#### search?

> `optional` **search**: `string` \| `string`[]

搜索参数名

#### sort?

> `optional` **sort**: `string` \| `string`[]

排序参数名
