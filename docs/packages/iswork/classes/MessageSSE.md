[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageSSE

# Class: MessageSSE

Defined in: src/packages/iswork/src/message/message-sse.ts:14

异步消息函数遍历处理机制

## Implements

- `AbstractMessage`\<`EventSource`\>

## Constructors

### Constructor

> **new MessageSSE**(`options`): `MessageSSE`

Defined in: src/packages/iswork/src/message/message-sse.ts:19

#### Parameters

##### options

[`TMessageSSEOptions`](../type-aliases/TMessageSSEOptions.md)

#### Returns

`MessageSSE`

## Properties

### instance

> **instance**: `EventSource`

Defined in: src/packages/iswork/src/message/message-sse.ts:15

#### Implementation of

`AbstractMessage.instance`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:31

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.close`

---

### onClose()

> **onClose**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:61

#### Returns

`Promise`\<`void`\>

---

### onError()

> **onError**(`callback`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:52

#### Parameters

##### callback

(`error`, `event`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.onError`

---

### onMessage()

> **onMessage**(`callback`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:43

#### Parameters

##### callback

(`message`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.onMessage`

---

### open()

> **open**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:24

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.open`

---

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-sse.ts:36

#### Parameters

##### message

`any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.send`

---

### create()

> `static` **create**(`optoins`): `Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../type-aliases/TMessageSSEIteratorData.md), `void`, `unknown`\>\>

Defined in: src/packages/iswork/src/message/message-sse.ts:99

创建一个Generator异步消息函数

#### Parameters

##### optoins

[`TMessageSSEOptions`](../type-aliases/TMessageSSEOptions.md)

#### Returns

`Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../type-aliases/TMessageSSEIteratorData.md), `void`, `unknown`\>\>
