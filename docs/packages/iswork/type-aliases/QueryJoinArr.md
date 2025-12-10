[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / QueryJoinArr

# Type Alias: QueryJoinArr

> **QueryJoinArr** = \[`string`, [`QueryFields`](QueryFields.md)?\]

Defined in: orm/types/query-builder.ts:115

联表查询数组类型

## Description

定义联表查询的数组表示形式

## Example

```typescript
const joinArr: QueryJoinArr = ['user_id', ['id', 'name']];
```
