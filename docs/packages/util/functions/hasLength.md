[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / hasLength

# Function: hasLength()

> **hasLength**(`val`): `boolean`

Defined in: src/packages/util/src/is.ts:420

判断一个值是否具有 length 属性且长度大于 0
适用于数组、字符串、类数组对象等具有 length 属性的对象

## Parameters

### val

`any`

要检测的值

## Returns

`boolean`

如果值具有 length 属性且大于 0 则返回 true，否则返回 false

## Example

```typescript
hasLength([1, 2, 3]); // true
hasLength('hello'); // true
hasLength([]); // false
hasLength(''); // false
hasLength({ length: 5 }); // true
```
