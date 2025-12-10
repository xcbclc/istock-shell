[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / SearchField

# Type Alias: SearchField

> **SearchField** = [`PrimitivesVal`](PrimitivesVal.md) \| [`FieldOperator`](FieldOperator.md)

Defined in: orm/types/query-builder.ts:280

搜索字段类型

## Description

定义单个字段的搜索条件，可以是基本值或字段操作符

## Example

```typescript
const searchField1: SearchField = 'John';
const searchField2: SearchField = { $gt: 18 };
```
