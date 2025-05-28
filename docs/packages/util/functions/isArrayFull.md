[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isArrayFull

# Function: isArrayFull()

> **isArrayFull**(`val`): `val is unknown[]`

Defined in: src/packages/util/src/is.ts:453

判断一个值是否为非空数组
结合了数组类型检查和长度检查

## Parameters

### val

`any`

要检测的值

## Returns

`val is unknown[]`

如果值是数组且长度大于 0 则返回 true，否则返回 false

## Example

```typescript
isArrayFull([1, 2, 3]); // true
isArrayFull([]); // false
isArrayFull('hello'); // false
isArrayFull(null); // false
```
