[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / FetchSSEMessage

# Type Alias: FetchSSEMessage

> **FetchSSEMessage** = `object`

Defined in: orm/types/driver.ts:19

Fetch SSE 消息类型

## Description

定义 Server-Sent Events (SSE) 消息的结构

## Example

```typescript
const sseMessage: FetchSSEMessage = {
  id: 1,
  data: '{"message": "Hello World"}',
  event: 'update',
  retry: 3000,
};
```

## Properties

### data

> **data**: `string`

Defined in: orm/types/driver.ts:23

消息数据内容

---

### event?

> `optional` **event**: `string`

Defined in: orm/types/driver.ts:25

事件类型（可选）

---

### id

> **id**: `number`

Defined in: orm/types/driver.ts:21

消息唯一标识符

---

### retry?

> `optional` **retry**: `number`

Defined in: orm/types/driver.ts:27

重试间隔时间（毫秒，可选）
