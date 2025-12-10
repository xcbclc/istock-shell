[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageSSE

# Class: MessageSSE

Defined in: message/message-sse.ts:78

Server-Sent Events 消息适配器

## Description

基于 SSE 技术实现的消息通信适配器，支持服务器向客户端推送实时消息和异步消息迭代

## Implements

## Example

```typescript
// 创建 SSE 适配器
const sse = new MessageSSE({
  sendUrl: '/api/stream',
  sendHandler: async (message) => {
    await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
});

// 打开连接
await sse.open();

// 监听消息
sse.onMessage(async (event) => {
  console.log('收到 SSE 消息:', event.data);
});

// 发送消息
await sse.send({ type: 'ping', data: 'hello' });
```

## Implements

- `AbstractMessage`\<`EventSource`\>

## Constructors

### Constructor

> **new MessageSSE**(`options`): `MessageSSE`

Defined in: message/message-sse.ts:103

SSE 消息适配器构造函数

#### Parameters

##### options

[`MessageSSEOptions`](../type-aliases/MessageSSEOptions.md)

SSE 配置选项

#### Returns

`MessageSSE`

#### Description

初始化 SSE 消息适配器，设置连接配置

#### Example

```typescript
const sse = new MessageSSE({
  sendUrl: '/api/events',
  prefixUrl: 'https://api.example.com',
  sendHandler: async (msg) => {
    console.log('发送消息:', msg);
  },
});
```

## Properties

### instance

> **instance**: `EventSource`

Defined in: message/message-sse.ts:80

EventSource 实例

#### Implementation of

`AbstractMessage.instance`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: message/message-sse.ts:135

关闭 SSE 连接

#### Returns

`Promise`\<`void`\>

Promise<void> 连接关闭完成的 Promise

#### Description

关闭与服务器的 SSE 连接，移除事件监听器

#### Example

```typescript
await sse.close();
console.log('SSE 连接已关闭');
```

#### Implementation of

`AbstractMessage.close`

---

### onClose()

> **onClose**(): `Promise`\<`void`\>

Defined in: message/message-sse.ts:212

设置连接关闭监听

#### Returns

`Promise`\<`void`\>

#### Description

监听 SSE 连接关闭事件，自动清理资源

#### Example

```typescript
sse.onClose();
```

---

### onError()

> **onError**(`callback`): `Promise`\<`void`\>

Defined in: message/message-sse.ts:195

设置错误监听回调

#### Parameters

##### callback

(`error`, `event`) => `Promise`\<`void`\>

错误处理回调函数

#### Returns

`Promise`\<`void`\>

#### Description

注册错误处理回调函数，当 SSE 连接出现错误时触发

#### Example

```typescript
sse.onError(async (error, event) => {
  console.error('SSE 连接错误:', error.message);
  console.error('错误事件:', event);
});
```

#### Implementation of

`AbstractMessage.onError`

---

### onMessage()

> **onMessage**(`callback`): `Promise`\<`void`\>

Defined in: message/message-sse.ts:174

设置消息监听回调

#### Parameters

##### callback

(`message`) => `Promise`\<`void`\>

消息处理回调函数

#### Returns

`Promise`\<`void`\>

#### Description

注册消息接收回调函数，当收到 SSE 消息时触发

#### Example

```typescript
sse.onMessage(async (event) => {
  const data = JSON.parse(event.data);
  console.log('收到 SSE 消息:', data);
});
```

#### Implementation of

`AbstractMessage.onMessage`

---

### open()

> **open**(): `Promise`\<`void`\>

Defined in: message/message-sse.ts:118

打开 SSE 连接

#### Returns

`Promise`\<`void`\>

Promise<void> 连接建立完成的 Promise

#### Description

建立与服务器的 SSE 连接

#### Example

```typescript
await sse.open();
console.log('SSE 连接已建立');
```

#### Implementation of

`AbstractMessage.open`

---

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: message/message-sse.ts:155

发送消息

#### Parameters

##### message

`any`

要发送的消息内容

#### Returns

`Promise`\<`void`\>

Promise<void> 消息发送完成的 Promise

#### Description

通过配置的发送处理函数发送消息

#### Throws

当未配置发送处理函数时抛出错误

#### Example

```typescript
await sse.send({
  type: 'chat',
  content: 'Hello World',
  timestamp: Date.now(),
});
```

#### Implementation of

`AbstractMessage.send`

---

### create()

> `static` **create**(`options`): `Promise`\<`AsyncIterator`\<[`MessageSSEIteratorData`](../type-aliases/MessageSSEIteratorData.md), `void`, `unknown`\>\>

Defined in: message/message-sse.ts:267

创建 SSE 消息迭代器

#### Parameters

##### options

[`MessageSSEOptions`](../type-aliases/MessageSSEOptions.md)

SSE 消息配置选项

#### Returns

`Promise`\<`AsyncIterator`\<[`MessageSSEIteratorData`](../type-aliases/MessageSSEIteratorData.md), `void`, `unknown`\>\>

Promise<AsyncIterator<MessageSSEIteratorData, void, unknown>> SSE 异步消息迭代器

#### Description

静态工厂方法，创建一个新的 SSE 消息迭代器实例

#### Example

```typescript
const iterator = await MessageSSE.create({
  sendUrl: '/api/stream',
  prefixUrl: 'https://api.example.com',
});

// 遍历 SSE 消息
for await (const message of iterator) {
  console.log('收到 SSE 消息:', message);
}
```
