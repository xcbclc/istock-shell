[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / getMessageDataPK

# Function: getMessageDataPK()

> **getMessageDataPK**(`k`, `type`): `string`

Defined in: src/packages/util/src/message-data.ts:24

生成消息数据的主键。

## Parameters

### k

`string`

字段名

### type

字段类型

`string` | `number`

## Returns

`string`

主键字符串

## Example

```ts
getMessageDataPK('handler', EMessageDataFieldType.Function); // '__handler_0__'
```
