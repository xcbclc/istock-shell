[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / getQueryParam

# Function: getQueryParam()

> **getQueryParam**(`name`): `null` \| `string`

Defined in: src/packages/util/src/url.ts:12

获取当前 URL 查询参数的值。

## Parameters

### name

`string`

查询参数名

## Returns

`null` \| `string`

查询参数值或 null

## Example

```ts
// 假设当前 URL 为 https://example.com?id=123&name=test
getQueryParam('id'); // '123'
getQueryParam('name'); // 'test'
getQueryParam('notexist'); // null
```
