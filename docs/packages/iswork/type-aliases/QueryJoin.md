[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QueryJoin

# Type Alias: QueryJoin

> **QueryJoin** = `object`

Defined in: orm/types/query-builder.ts:100

联表查询对象类型

## Description

定义联表查询的对象表示形式

## Example

```typescript
const join: QueryJoin = {
  field: 'user_id',
  select: ['id', 'name'],
};
```

## Properties

### field

> **field**: `string`

Defined in: orm/types/query-builder.ts:102

联表字段名

---

### select?

> `optional` **select**: [`QueryFields`](QueryFields.md)

Defined in: orm/types/query-builder.ts:104

选择的字段列表
