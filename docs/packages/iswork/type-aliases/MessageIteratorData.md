[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageIteratorData

# Type Alias: MessageIteratorData

> **MessageIteratorData** = `Record`\<`string`, `any`\> & `object`

Defined in: message/message-iterator.ts:23

消息迭代器数据类型

## Type declaration

### meta?

> `optional` **meta**: `object`

#### meta.status?

> `optional` **status**: [`MessageStatus`](../enumerations/MessageStatus.md)

## Description

消息迭代器传递的数据结构，包含任意属性和可选的元数据

## Example

```typescript
const data: MessageIteratorData = {
  content: 'Hello World',
  timestamp: Date.now(),
  meta: {
    status: MessageStatus.COMPLETE,
  },
};
```
