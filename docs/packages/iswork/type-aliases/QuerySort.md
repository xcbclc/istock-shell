[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QuerySort

# Type Alias: QuerySort

> **QuerySort** = `object`

Defined in: orm/types/query-builder.ts:62

字段排序对象类型

## Description

定义字段排序的对象表示形式

## Example

```typescript
const sort: QuerySort = {
  field: 'created_at',
  order: 'DESC',
};
```

## Properties

### field

> **field**: `string`

Defined in: orm/types/query-builder.ts:64

排序字段名

---

### order

> **order**: [`QuerySortOperator`](QuerySortOperator.md)

Defined in: orm/types/query-builder.ts:66

排序方向
