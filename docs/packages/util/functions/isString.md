[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isString

# Function: isString()

> **isString**(`val`): `val is string`

Defined in: src/packages/util/src/is.ts:108

判断一个值是否为字符串

## Parameters

### val

`any`

要检测的值

## Returns

`val is string`

如果值是字符串则返回 true，否则返回 false

## Example

```typescript
isString('hello'); // true
isString(new String('hello')); // false (对象形式的字符串)
isString(123); // false
```
