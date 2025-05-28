[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isArrayStrings

# Function: isArrayStrings()

> **isArrayStrings**(`val`): `val is string[]`

Defined in: src/packages/util/src/is.ts:490

判断一个值是否为字符串数组
检查值是否为数组，且数组中的每个元素都是非空字符串

## Parameters

### val

`any`

要检测的值

## Returns

`val is string[]`

如果值是字符串数组则返回 true，否则返回 false

## Example

```typescript
isArrayStrings(['hello', 'world']); // true
isArrayStrings(['hello', '']); // false (包含空字符串)
isArrayStrings(['hello', 123]); // false (包含非字符串)
isArrayStrings([]); // false (空数组)
isArrayStrings('hello'); // false (不是数组)
```
