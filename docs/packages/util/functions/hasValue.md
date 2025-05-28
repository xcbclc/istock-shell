[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / hasValue

# Function: hasValue()

> **hasValue**(`val`): `boolean`

Defined in: src/packages/util/src/is.ts:473

判断一个值是否具有有效值
如果是数组，检查数组中的每个元素是否都是有效的普通值
如果不是数组，直接检查是否为有效的普通值

## Parameters

### val

`any`

要检测的值

## Returns

`boolean`

如果值具有有效值则返回 true，否则返回 false

## Example

```typescript
hasValue('hello'); // true
hasValue(123); // true
hasValue(['a', 'b']); // true
hasValue([1, 2, 3]); // true
hasValue(['', 'hello']); // false (包含空字符串)
hasValue([]); // false
hasValue(''); // false
```
