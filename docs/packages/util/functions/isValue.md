[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isValue

# Function: isValue()

> **isValue**(`val`): `boolean`

Defined in: src/packages/util/src/is.ts:403

判断一个值是否为有效的普通值
普通值包括：非空字符串、数字、布尔值或 Date 对象

## Parameters

### val

`any`

要检测的值

## Returns

`boolean`

如果值是有效的普通值则返回 true，否则返回 false

## Example

```typescript
isValue('hello'); // true
isValue(123); // true
isValue(true); // true
isValue(new Date()); // true
isValue(''); // false (空字符串)
isValue(null); // false
isValue({}); // false
```
