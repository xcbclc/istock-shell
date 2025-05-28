[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / tuc

# Function: tuc()

> **tuc**(`className`, `prefix`): `string`

Defined in: src/packages/util/src/to-ui-class.ts:12

将样式名自动加上前缀，支持字符串或字符串数组。

## Parameters

### className

样式名字符串或字符串数组

`string` | `string`[]

### prefix

`string` = `''`

前缀字符串，默认空

## Returns

`string`

拼接后的样式名字符串

## Example

```ts
tuc('btn primary', 'fe-'); // 'fe-btn fe-primary'
tuc(['btn', 'primary'], 'fe-'); // 'fe-btn fe-primary'
```
