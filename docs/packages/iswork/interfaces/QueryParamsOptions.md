[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QueryParamsOptions

# Interface: QueryParamsOptions

Defined in: orm/interfaces/query-builder.ts:145

查询参数选项接口

## Description

定义查询操作的参数选项

## Example

```typescript
const queryOptions: QueryParamsOptions = {
  fields: ['id', 'name', 'email'],
  filter: ['status', 'eq', 'active'],
  sort: ['createdAt', 'DESC'],
  limit: 20,
  page: 1,
};
```

## Properties

### cache?

> `optional` **cache**: `number`

Defined in: orm/interfaces/query-builder.ts:165

缓存设置

---

### fields?

> `optional` **fields**: [`QueryFields`](../type-aliases/QueryFields.md)

Defined in: orm/interfaces/query-builder.ts:147

查询字段

---

### filter?

> `optional` **filter**: [`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md) \| ([`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md))[]

Defined in: orm/interfaces/query-builder.ts:151

过滤条件

---

### includeDeleted?

> `optional` **includeDeleted**: `number`

Defined in: orm/interfaces/query-builder.ts:167

是否包含已删除记录

---

### join?

> `optional` **join**: [`QueryJoin`](../type-aliases/QueryJoin.md) \| [`QueryJoinArr`](../type-aliases/QueryJoinArr.md) \| ([`QueryJoin`](../type-aliases/QueryJoin.md) \| [`QueryJoinArr`](../type-aliases/QueryJoinArr.md))[]

Defined in: orm/interfaces/query-builder.ts:155

连接条件

---

### limit?

> `optional` **limit**: `number`

Defined in: orm/interfaces/query-builder.ts:159

限制数量

---

### offset?

> `optional` **offset**: `number`

Defined in: orm/interfaces/query-builder.ts:161

偏移量

---

### or?

> `optional` **or**: [`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md) \| ([`QueryFilter`](../type-aliases/QueryFilter.md) \| [`QueryFilterArr`](../type-aliases/QueryFilterArr.md))[]

Defined in: orm/interfaces/query-builder.ts:153

或条件

---

### page?

> `optional` **page**: `number`

Defined in: orm/interfaces/query-builder.ts:163

页码

---

### search?

> `optional` **search**: [`SearchCondition`](../type-aliases/SearchCondition.md)

Defined in: orm/interfaces/query-builder.ts:149

搜索条件

---

### sort?

> `optional` **sort**: [`QuerySort`](../type-aliases/QuerySort.md) \| [`QuerySortArr`](../type-aliases/QuerySortArr.md) \| ([`QuerySort`](../type-aliases/QuerySort.md) \| [`QuerySortArr`](../type-aliases/QuerySortArr.md))[]

Defined in: orm/interfaces/query-builder.ts:157

排序条件
