[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isStrRegExp

# Function: isStrRegExp()

> **isStrRegExp**(`val`): `val is string`

Defined in: src/packages/util/src/is.ts:52

判断一个字符串是否表示正则表达式
通过动态执行字符串来检测其是否为正则表达式字面量

## Parameters

### val

`any`

要检测的值

## Returns

`val is string`

如果字符串表示正则表达式则返回 true，否则返回 false

## Example

```typescript
isStrRegExp('/abc/g'); // true
isStrRegExp('new RegExp("abc")'); // true
isStrRegExp('abc'); // false
```
