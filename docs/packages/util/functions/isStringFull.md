[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isStringFull

# Function: isStringFull()

> **isStringFull**(`val`): `val is string`

Defined in: src/packages/util/src/is.ts:437

判断一个值是否为非空字符串
结合了字符串类型检查和长度检查

## Parameters

### val

`any`

要检测的值

## Returns

`val is string`

如果值是字符串且长度大于 0 则返回 true，否则返回 false

## Example

```typescript
isStringFull('hello'); // true
isStringFull(''); // false
isStringFull(' '); // true (空格也算有值)
isStringFull(123); // false
isStringFull(null); // false
```
