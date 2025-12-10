[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageIterator

# Class: MessageIterator

Defined in: message/message-iterator.ts:45

消息迭代器类

## Description

实现异步消息迭代处理机制，基于事件驱动模式，支持消息的发送、完成状态管理和异步遍历

## Example

```typescript
// 创建消息迭代器
const iterator = MessageIterator.create((messageIterator) => {
  // 发送消息
  messageIterator.send({ data: 'message 1' });
  messageIterator.send({ data: 'message 2' });
  // 标记完成
  messageIterator.complete();
});

// 遍历消息
for await (const message of iterator) {
  console.log('收到消息:', message);
}
```

## Constructors

### Constructor

> **new MessageIterator**(): `MessageIterator`

#### Returns

`MessageIterator`

## Methods

### complete()

> **complete**(`message`): `Promise`\<`void`\>

Defined in: message/message-iterator.ts:87

标记消息传递完成

#### Parameters

##### message

[`MessageIteratorData`](../type-aliases/MessageIteratorData.md) = `{}`

可选的完成消息数据，默认为空对象

#### Returns

`Promise`\<`void`\>

Promise<void> 完成操作的 Promise

#### Description

发送完成状态的消息，结束消息迭代循环

#### Example

```typescript
// 标记完成，不带额外数据
await messageIterator.complete();

// 标记完成，带额外数据
await messageIterator.complete({
  result: 'success',
  totalCount: 100,
});
```

---

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: message/message-iterator.ts:111

发送消息

#### Parameters

##### message

[`MessageIteratorData`](../type-aliases/MessageIteratorData.md) = `{}`

要发送的消息数据，默认为空对象

#### Returns

`Promise`\<`void`\>

Promise<void> 发送操作的 Promise

#### Description

向消息流中发送一条消息

#### Example

```typescript
// 发送简单消息
await messageIterator.send({ content: 'Hello' });

// 发送复杂消息
await messageIterator.send({
  type: 'data',
  payload: { id: 1, name: 'test' },
  timestamp: Date.now(),
});
```

---

### create()

> `static` **create**(`callback`): `AsyncIterator`\<[`MessageIteratorData`](../type-aliases/MessageIteratorData.md), `void`, `unknown`\>

Defined in: message/message-iterator.ts:135

创建消息迭代器

#### Parameters

##### callback

(`messageIterator`) => `void`

回调函数，接收消息迭代器实例作为参数，用于发送消息

#### Returns

`AsyncIterator`\<[`MessageIteratorData`](../type-aliases/MessageIteratorData.md), `void`, `unknown`\>

AsyncIterator<MessageIteratorData, void, unknown> 异步消息迭代器

#### Description

静态工厂方法，创建一个新的消息迭代器实例

#### Example

```typescript
const iterator = MessageIterator.create((messageIterator) => {
  setTimeout(() => {
    messageIterator.send({ step: 1, data: 'first' });
    messageIterator.send({ step: 2, data: 'second' });
    messageIterator.complete({ summary: 'done' });
  }, 1000);
});

for await (const message of iterator) {
  console.log('处理消息:', message);
}
```
