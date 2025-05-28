[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isObject

# Function: isObject()

> **isObject**(`val`): `val is object`

Defined in: src/packages/util/src/is.ts:175

判断一个值是否为对象（排除 null）

## Parameters

### val

`any`

要检测的值

## Returns

`val is object`

如果值是对象且不为 null 则返回 true，否则返回 false

## Example

```typescript
isObject({}); // true
isObject([]); // true
isObject(null); // false
isObject('hello'); // false
```
