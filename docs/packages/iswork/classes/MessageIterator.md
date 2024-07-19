[@istock/iswork](../README.md) / [Exports](../modules.md) / MessageIterator

# Class: MessageIterator

异步消息函数遍历处理机制

## Table of contents

### Constructors

- [constructor](MessageIterator.md#constructor)

### Properties

- [#event](MessageIterator.md##event)

### Methods

- [#messageAsyncGenerator](MessageIterator.md##messageasyncgenerator)
- [complete](MessageIterator.md#complete)
- [send](MessageIterator.md#send)
- [create](MessageIterator.md#create)

## Constructors

### constructor

• **new MessageIterator**(): [`MessageIterator`](MessageIterator.md)

#### Returns

[`MessageIterator`](MessageIterator.md)

## Properties

### #event

• `Private` `Readonly` **#event**: `EventEmitter`

#### Defined in

src/packages/iswork/src/message/message-iterator.ts:10

## Methods

### #messageAsyncGenerator

▸ **#messageAsyncGenerator**(): `AsyncGenerator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

异步消息生成器函数

#### Returns

`AsyncGenerator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

#### Defined in

src/packages/iswork/src/message/message-iterator.ts:15

---

### complete

▸ **complete**(`message?`): `Promise`\<`void`\>

消息传递完成调用方法

#### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `message` | [`TMessageIteratorData`](../modules.md#tmessageiteratordata) |

#### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/message/message-iterator.ts:34

---

### send

▸ **send**(`message?`): `Promise`\<`void`\>

发送消息

#### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `message` | [`TMessageIteratorData`](../modules.md#tmessageiteratordata) |

#### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/message/message-iterator.ts:44

---

### create

▸ **create**(`callback`): `AsyncIterator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

创建一个Generator异步消息函数

#### Parameters

| Name       | Type                                                                   |
| :--------- | :--------------------------------------------------------------------- |
| `callback` | (`messageIterator`: [`MessageIterator`](MessageIterator.md)) => `void` |

#### Returns

`AsyncIterator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

#### Defined in

src/packages/iswork/src/message/message-iterator.ts:52
