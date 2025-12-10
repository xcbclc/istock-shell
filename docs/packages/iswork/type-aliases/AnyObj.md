[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / AnyObj

# Type Alias: AnyObj\<T\>

> **AnyObj**\<`T`\> = `Record`\<`string` \| `symbol`, `T`\>

Defined in: orm/types/any-object.ts:33

任意对象类型

## Type Parameters

### T

`T` = `unknown`

值类型，默认为 unknown

## Description

用于表示任意键值对的对象

## Example

```typescript
const data: AnyObj<any> = {
  name: 'John',
  age: 30,
  active: true,
};
```
