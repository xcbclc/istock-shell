[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / SearchFields

# Type Alias: SearchFields

> **SearchFields** = `object`

Defined in: orm/types/query-builder.ts:294

多字段搜索类型

## Description

定义多个字段的搜索条件，支持复杂的逻辑组合

## Example

```typescript
const searchFields: SearchFields = {
  name: 'John',
  age: { $gt: 18 },
  $or: [{ status: 'active' }, { role: 'admin' }],
};
```

## Indexable

\[`key`: `string`\]: `undefined` \| [`SearchField`](SearchField.md) \| (`SearchFields` \| [`ConditionAND`](ConditionAND.md))[]

动态字段搜索条件

## Properties

### $and?

> `optional` **$and**: `never`

Defined in: orm/types/query-builder.ts:300

与条件操作符（禁用）

---

### $or?

> `optional` **$or**: (`SearchFields` \| [`ConditionAND`](ConditionAND.md))[]

Defined in: orm/types/query-builder.ts:298

或条件操作符
