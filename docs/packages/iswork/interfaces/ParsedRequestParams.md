[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ParsedRequestParams

# Interface: ParsedRequestParams

Defined in: orm/interfaces/query-builder.ts:106

解析后的请求参数接口

## Description

解析后的标准化查询参数

## Example

```typescript
const params: ParsedRequestParams = {
  fields: ['id', 'name'],
  search: { name: 'john' },
  filter: [['status', 'eq', 'active']],
  or: [],
  join: [],
  sort: [['createdAt', 'DESC']],
  limit: 10,
  offset: 0,
  page: 1,
  cache: 0,
  includeDeleted: 0,
};
```

## Properties

### cache

> **cache**: `number`

Defined in: orm/interfaces/query-builder.ts:126

缓存设置

---

### fields

> **fields**: [`QueryFields`](../type-aliases/QueryFields.md)

Defined in: orm/interfaces/query-builder.ts:108

查询字段

---

### filter

> **filter**: [`QueryFilter`](../type-aliases/QueryFilter.md)[]

Defined in: orm/interfaces/query-builder.ts:112

过滤条件

---

### includeDeleted

> **includeDeleted**: `number`

Defined in: orm/interfaces/query-builder.ts:128

是否包含已删除记录

---

### join

> **join**: [`QueryJoin`](../type-aliases/QueryJoin.md)[]

Defined in: orm/interfaces/query-builder.ts:116

连接条件

---

### limit

> **limit**: `number`

Defined in: orm/interfaces/query-builder.ts:120

限制数量

---

### offset

> **offset**: `number`

Defined in: orm/interfaces/query-builder.ts:122

偏移量

---

### or

> **or**: [`QueryFilter`](../type-aliases/QueryFilter.md)[]

Defined in: orm/interfaces/query-builder.ts:114

或条件

---

### page

> **page**: `number`

Defined in: orm/interfaces/query-builder.ts:124

页码

---

### search

> **search**: [`SearchCondition`](../type-aliases/SearchCondition.md)

Defined in: orm/interfaces/query-builder.ts:110

搜索条件

---

### sort

> **sort**: [`QuerySort`](../type-aliases/QuerySort.md)[]

Defined in: orm/interfaces/query-builder.ts:118

排序条件
