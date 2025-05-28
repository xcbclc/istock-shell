[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isNumber

# Function: isNumber()

> **isNumber**(`val`): `val is number`

Defined in: src/packages/util/src/is.ts:125

判断一个值是否为数字

## Parameters

### val

`any`

要检测的值

## Returns

`val is number`

如果值是数字则返回 true，否则返回 false

## Example

```typescript
isNumber(123); // true
isNumber(3.14); // true
isNumber(NaN); // true
isNumber('123'); // false
```
