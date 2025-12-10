[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / FiledValues

# Type Alias: FiledValues

> **FiledValues** = [`PrimitivesVal`](PrimitivesVal.md) \| [`PrimitivesVal`](PrimitivesVal.md)[]

Defined in: orm/types/query-builder.ts:138

查询字段值类型

## Description

定义查询字段可接受的值类型，支持单个值或值数组

## Example

```typescript
const singleValue: FiledValues = 'John';
const multipleValues: FiledValues = ['John', 'Jane', 'Bob'];
```
