[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / IMessageHandler

# Interface: IMessageHandler

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:33

消息处理器接口

## Description

定义控制器方法中消息处理的标准接口，提供消息完成、命令操作和各种消息类型创建功能

## Example

```typescript
// 在控制器方法中使用
async handleMessage(@MessageHandler() handler: IMessageHandler) {
  // 创建可观察对象
  const observable = handler.createObservable((observer) => {
    observer.next({ data: 'message' });
    observer.complete();
  });

  // 完成消息处理
  return handler.complete({ result: 'success' });
}
```

## Properties

### cmdAppend()

> **cmdAppend**: (`payload`) => [`CmdpPayload`](../type-aliases/CmdpPayload.md)

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:37

追加命令到载荷

#### Parameters

##### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

#### Returns

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

---

### cmdReplace()

> **cmdReplace**: (`payload`) => [`CmdpPayload`](../type-aliases/CmdpPayload.md)

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:39

替换载荷中的命令

#### Parameters

##### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

#### Returns

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

---

### complete()

> **complete**: (`payload?`) => [`CmdpPayload`](../type-aliases/CmdpPayload.md)

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:35

完成消息处理并返回最终载荷

#### Parameters

##### payload?

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

#### Returns

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

---

### createMessageIterator()

> **createMessageIterator**: (`callback`) => `AsyncIterator`\<[`MessageIteratorData`](../type-aliases/MessageIteratorData.md), `void`, `unknown`\>

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:43

创建消息迭代器的工厂方法

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

---

### createMessageSSE()

> **createMessageSSE**: (`options`) => `Promise`\<`AsyncIterator`\<[`MessageSSEIteratorData`](../type-aliases/MessageSSEIteratorData.md), `void`, `unknown`\>\>

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:45

创建服务器发送事件的工厂方法

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

---

### createObservable()

> **createObservable**: \<`V`\>(`subscribeCallback`) => [`Observable`](../classes/Observable.md)\<`V`\>

Defined in: decorators/controller/controller-method-message-handler.decorator.ts:41

创建可观察对象的工厂方法

创建可观察对象

#### Type Parameters

##### V

`V`

观察值的类型

#### Parameters

##### subscribeCallback

[`SubscribeCallback`](../type-aliases/SubscribeCallback.md)\<`V`\>

订阅回调函数

#### Returns

[`Observable`](../classes/Observable.md)\<`V`\>

Observable<V> 新的可观察对象实例

#### Description

静态工厂方法，创建一个新的可观察对象实例

#### Example

```typescript
const observable = Observable.create<string>((observer) => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();

  return {
    unsubscribe: () => console.log('取消订阅'),
  };
});
```
