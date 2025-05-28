[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / toLocaleDateString

# Function: toLocaleDateString()

> **toLocaleDateString**(`date`, `format`): `string`

Defined in: src/packages/util/src/date.ts:10

按指定格式格式化日期为字符串。

## Parameters

### date

`Date`

需要格式化的日期对象

### format

`string`

格式字符串，如 'YYYY-MM-DD hh:mm:ss'

## Returns

`string`

格式化后的日期字符串

## Example

```ts
toLocaleDateString(new Date(), 'YYYY-MM-DD hh:mm:ss');
```
