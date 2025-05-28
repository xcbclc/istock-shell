[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isNil

# Function: isNil()

> **isNil**(`val`): val is undefined \| null

Defined in: src/packages/util/src/is.ts:384

判断一个值是否为 null 或 undefined
这是一个便捷函数，用于检查值是否为空值

## Parameters

### val

`any`

要检测的值

## Returns

val is undefined \| null

如果值是 null 或 undefined 则返回 true，否则返回 false

## Example

```typescript
isNil(null); // true
isNil(undefined); // true
isNil(0); // false
isNil(''); // false
isNil(false); // false
```
