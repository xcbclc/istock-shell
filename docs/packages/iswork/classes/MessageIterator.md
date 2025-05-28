[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageIterator

# Class: MessageIterator

Defined in: src/packages/iswork/src/message/message-iterator.ts:9

异步消息函数遍历处理机制

## Constructors

### Constructor

> **new MessageIterator**(): `MessageIterator`

#### Returns

`MessageIterator`

## Methods

### complete()

> **complete**(`message`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-iterator.ts:34

消息传递完成调用方法

#### Parameters

##### message

[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md) = `{}`

#### Returns

`Promise`\<`void`\>

---

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-iterator.ts:44

发送消息

#### Parameters

##### message

[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md) = `{}`

#### Returns

`Promise`\<`void`\>

---

### create()

> `static` **create**(`callback`): `AsyncIterator`\<[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md), `void`, `unknown`\>

Defined in: src/packages/iswork/src/message/message-iterator.ts:52

创建一个Generator异步消息函数

#### Parameters

##### callback

(`messageIterator`) => `void`

#### Returns

`AsyncIterator`\<[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md), `void`, `unknown`\>
