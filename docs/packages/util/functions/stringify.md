[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / stringify

# Function: stringify()

> **stringify**(`v`): `string`

Defined in: src/packages/util/src/json.ts:11

将对象序列化为 JSON 字符串，支持函数类型转字符串。

## Parameters

### v

`unknown`

需要序列化的对象

## Returns

`string`

JSON 字符串

## Example

```ts
stringify({ fn: () => 1 }); // '{"fn":"() => 1"}'
```
