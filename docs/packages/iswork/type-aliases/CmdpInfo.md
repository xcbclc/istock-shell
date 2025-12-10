[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdpInfo

# Type Alias: CmdpInfo

> **CmdpInfo** = `object` & [`CmdpAddressInfo`](CmdpAddressInfo.md)

Defined in: types/cmdp.ts:110

CMDP 完整信息类型

## Type declaration

### address

> **address**: `string`

完整地址

### meta?

> `optional` **meta**: [`CmdpMeta`](CmdpMeta.md)

请求元数据

### payload?

> `optional` **payload**: [`CmdpPayload`](CmdpPayload.md)

请求载荷

### protocol

> **protocol**: `string`

协议类型

### returnMeta?

> `optional` **returnMeta**: [`CmdpMeta`](CmdpMeta.md)

返回元数据

### returnPayload?

> `optional` **returnPayload**: [`CmdpPayload`](CmdpPayload.md)

返回载荷

## Description

包含 CMDP 协议的完整信息，包括协议、地址、元数据、载荷和返回数据

## Example

```typescript
const cmdpInfo: CmdpInfo = {
  protocol: 'cmdp',
  address: 'cmdp://user@domain:8080/controller/method',
  user: 'user',
  domains: ['domain'],
  port: '8080',
  controller: 'controller',
  method: 'method',
  meta: { status: 'pending' },
  payload: { data: 'example' },
  returnMeta: { status: 'success' },
  returnPayload: { result: 'completed' },
};
```
