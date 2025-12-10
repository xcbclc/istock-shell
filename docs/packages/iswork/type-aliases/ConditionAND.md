[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ConditionAND

# Type Alias: ConditionAND

> **ConditionAND** = `object`

Defined in: orm/types/query-builder.ts:316

AND 条件类型

## Description

定义 AND 逻辑条件的结构

## Example

```typescript
const andCondition: ConditionAND = {
  $and: [{ name: 'John' }, { age: { $gt: 18 } }],
};
```

## Properties

### $and?

> `optional` **$and**: ([`SearchFields`](SearchFields.md) \| `ConditionAND`)[]

Defined in: orm/types/query-builder.ts:318

与条件操作符

---

### $or?

> `optional` **$or**: `never`

Defined in: orm/types/query-builder.ts:320

或条件操作符（禁用）
