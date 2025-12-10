[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / AnyMetadata

# Type Alias: AnyMetadata\<T\>

> **AnyMetadata**\<`T`\> = `Record`\<`string` \| `symbol`, `T`\>

Defined in: orm/types/any-object.ts:18

任意元数据对象类型

## Type Parameters

### T

`T` = `unknown`

值类型，默认为 unknown

## Description

用于表示任意键值对的元数据对象

## Example

```typescript
const metadata: AnyMetadata<string> = {
  tableName: 'users',
  primaryKey: 'id',
};
```
