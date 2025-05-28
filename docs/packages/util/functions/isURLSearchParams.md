[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isURLSearchParams

# Function: isURLSearchParams()

> **isURLSearchParams**(`val`): `val is URLSearchParams`

Defined in: src/packages/util/src/is.ts:292

判断一个值是否为 URLSearchParams 对象

## Parameters

### val

`any`

要检测的值

## Returns

`val is URLSearchParams`

如果值是 URLSearchParams 对象则返回 true，否则返回 false

## Example

```typescript
isURLSearchParams(new URLSearchParams('a=1&b=2')); // true
isURLSearchParams('a=1&b=2'); // false
isURLSearchParams({}); // false
```
