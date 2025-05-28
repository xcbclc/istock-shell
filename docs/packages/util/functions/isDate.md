[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isDate

# Function: isDate()

> **isDate**(`val`): `val is Date`

Defined in: src/packages/util/src/is.ts:209

判断一个值是否为 Date 对象

## Parameters

### val

`any`

要检测的值

## Returns

`val is Date`

如果值是 Date 对象则返回 true，否则返回 false

## Example

```typescript
isDate(new Date()); // true
isDate('2023-01-01'); // false
isDate(1640995200000); // false
```
