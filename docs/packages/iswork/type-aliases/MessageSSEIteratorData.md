[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageSSEIteratorData

# Type Alias: MessageSSEIteratorData

> **MessageSSEIteratorData** = `Record`\<`string`, `any`\>

Defined in: message/message-sse.ts:21

SSE 消息迭代器数据类型

## Description

SSE 消息迭代器传递的数据结构

## Example

```typescript
const data: MessageSSEIteratorData = {
  type: 'notification',
  content: 'New message received',
  timestamp: Date.now(),
};
```
