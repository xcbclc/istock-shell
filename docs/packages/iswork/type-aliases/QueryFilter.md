[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QueryFilter

# Type Alias: QueryFilter

> **QueryFilter** = `object`

Defined in: orm/types/query-builder.ts:252

查询过滤条件对象类型

## Description

定义查询过滤条件的对象表示形式

## Example

```typescript
const filter: QueryFilter = {
  field: 'age',
  operator: '$gt',
  value: 18,
};
```

## Properties

### field

> **field**: `string`

Defined in: orm/types/query-builder.ts:254

字段名

---

### operator

> **operator**: [`ComparisonOperator`](ComparisonOperator.md)

Defined in: orm/types/query-builder.ts:256

操作符

---

### value?

> `optional` **value**: `any`

Defined in: orm/types/query-builder.ts:258

比较值
