[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isArray

# Function: isArray()

> **isArray**(`val`): `val is unknown[]`

Defined in: src/packages/util/src/is.ts:19

判断一个值是否为数组

## Parameters

### val

`any`

要检测的值

## Returns

`val is unknown[]`

如果值是数组则返回 true，否则返回 false

## Example

```typescript
isArray([1, 2, 3]); // true
isArray('hello'); // false
isArray(null); // false
```
