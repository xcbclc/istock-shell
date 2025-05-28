[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isRegExp

# Function: isRegExp()

> **isRegExp**(`val`): `val is RegExp`

Defined in: src/packages/util/src/is.ts:35

判断一个值是否为正则表达式

## Parameters

### val

`any`

要检测的值

## Returns

`val is RegExp`

如果值是正则表达式则返回 true，否则返回 false

## Example

```typescript
isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true
isRegExp('abc'); // false
```
