[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageSSEOptions

# Type Alias: MessageSSEOptions

> **MessageSSEOptions** = `object`

Defined in: message/message-sse.ts:40

SSE 消息配置选项

## Description

配置 SSE 连接的选项参数

## Example

```typescript
const options: MessageSSEOptions = {
  sendUrl: '/api/events',
  prefixUrl: 'https://api.example.com',
  sendHandler: async (message) => {
    await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
};
```

## Properties

### prefixUrl?

> `optional` **prefixUrl**: `string`

Defined in: message/message-sse.ts:44

可选的 URL 前缀，默认使用环境变量 VITE_ISTOCK_API

---

### sendHandler()?

> `optional` **sendHandler**: (`message`) => `Promise`\<`void`\>

Defined in: message/message-sse.ts:46

可选的消息发送处理函数

#### Parameters

##### message

`any`

#### Returns

`Promise`\<`void`\>

---

### sendUrl

> **sendUrl**: `string`

Defined in: message/message-sse.ts:42

SSE 连接的 URL 路径
