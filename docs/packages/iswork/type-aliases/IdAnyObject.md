[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / IdAnyObject

# Type Alias: IdAnyObject\<T\>

> **IdAnyObject**\<`T`\> = `object` & `Record`\<`string` \| `symbol`, `T`\>

Defined in: orm/types/any-object.ts:48

带 ID 的任意对象类型

## Type declaration

### id

> **id**: `string` \| `number`

唯一标识符

## Type Parameters

### T

`T` = `unknown`

值类型，默认为 unknown

## Description

用于表示包含 id 字段的任意对象

## Example

```typescript
const user: IdAnyObject<string> = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
};
```
