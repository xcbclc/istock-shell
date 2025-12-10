[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / getNonOverlapStr

# Function: getNonOverlapStr()

> **getNonOverlapStr**(`str1`, `str2`): `string`

Defined in: src/packages/util/src/string.ts:36

获取参数2去除与参数1尾部重叠部分后的剩余字符串。

## Parameters

### str1

`string`

第一个字符串

### str2

`string`

第二个字符串

## Returns

`string`

参数2去除重叠部分后的剩余字符串

## Example

```ts
getNonOverlapStr('abc', 'cde'); // 'de'
getNonOverlapStr('hello', 'world'); // 'world'
getNonOverlapStr('test', 'testing'); // 'ing'
```
