[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isUndefined

# Function: isUndefined()

> **isUndefined**(`val`): `val is undefined`

Defined in: src/packages/util/src/is.ts:158

判断一个值是否为 undefined

## Parameters

### val

`any`

要检测的值

## Returns

`val is undefined`

如果值是 undefined 则返回 true，否则返回 false

## Example

```typescript
isUndefined(undefined); // true
isUndefined(null); // false
isUndefined(''); // false
```
