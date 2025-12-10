[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DeprecatedCondOperator

# Type Alias: ~~DeprecatedCondOperator~~

> **DeprecatedCondOperator** = `"eq"` \| `"ne"` \| `"gt"` \| `"lt"` \| `"gte"` \| `"lte"` \| `"starts"` \| `"ends"` \| `"cont"` \| `"excl"` \| `"in"` \| `"notin"` \| `"isnull"` \| `"notnull"` \| `"between"`

Defined in: orm/types/query-builder.ts:149

已弃用的条件操作符类型

## Description

定义旧版本的条件操作符，保持向后兼容性

## Deprecated

建议使用新的 FieldOperator 类型

## Example

```typescript
const operator: DeprecatedCondOperator = 'eq';
```
