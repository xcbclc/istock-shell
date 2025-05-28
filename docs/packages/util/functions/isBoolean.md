[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isBoolean

# Function: isBoolean()

> **isBoolean**(`val`): `val is boolean`

Defined in: src/packages/util/src/is.ts:142

判断一个值是否为布尔值

## Parameters

### val

`any`

要检测的值

## Returns

`val is boolean`

如果值是布尔值则返回 true，否则返回 false

## Example

```typescript
isBoolean(true); // true
isBoolean(false); // true
isBoolean(1); // false
isBoolean('true'); // false
```
