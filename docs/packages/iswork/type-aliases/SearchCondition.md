[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / SearchCondition

# Type Alias: SearchCondition

> **SearchCondition** = [`SearchFields`](SearchFields.md) \| [`ConditionAND`](ConditionAND.md)

Defined in: orm/types/query-builder.ts:334

搜索条件类型

## Description

定义完整的搜索条件，可以是多字段搜索或 AND 条件

## Example

```typescript
const condition1: SearchCondition = { name: 'John', age: { $gt: 18 } };
const condition2: SearchCondition = {
  $and: [{ name: 'John' }, { age: { $gt: 18 } }],
};
```
