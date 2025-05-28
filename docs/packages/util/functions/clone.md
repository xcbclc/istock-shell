[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / clone

# Function: clone()

> **clone**\<`T`\>(`v`): `T`

Defined in: src/packages/util/src/json.ts:35

深拷贝对象，基于 JSON 序列化。

## Type Parameters

### T

`T`

## Parameters

### v

`T`

需要拷贝的对象

## Returns

`T`

拷贝后的新对象

## Example

```ts
clone({ a: 1, b: { c: 2 } }); // { a: 1, b: { c: 2 } }
```
