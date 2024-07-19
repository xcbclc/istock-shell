[@istock/iswork](../README.md) / [Exports](../modules.md) / MessageSSE

# Class: MessageSSE

异步消息函数遍历处理机制

## Implements

- `AbstractMessage`\<`EventSource`\>

## Table of contents

### Constructors

- [constructor](MessageSSE.md#constructor)

### Properties

- [#onErrorCallback](MessageSSE.md##onerrorcallback)
- [#onMessageCallback](MessageSSE.md##onmessagecallback)
- [#options](MessageSSE.md##options)
- [instance](MessageSSE.md#instance)

### Methods

- [#messageAsyncGenerator](MessageSSE.md##messageasyncgenerator)
- [close](MessageSSE.md#close)
- [onClose](MessageSSE.md#onclose)
- [onError](MessageSSE.md#onerror)
- [onMessage](MessageSSE.md#onmessage)
- [open](MessageSSE.md#open)
- [send](MessageSSE.md#send)
- [create](MessageSSE.md#create)

## Constructors

### constructor

• **new MessageSSE**(`options`): [`MessageSSE`](MessageSSE.md)

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `options` | [`TMessageSSEOptions`](../modules.md#tmessagesseoptions) |

#### Returns

[`MessageSSE`](MessageSSE.md)

#### Defined in

src/packages/iswork/src/message/message-sse.ts:19

## Properties

### #onErrorCallback

• `Private` **#onErrorCallback**: (`event`: `MessageEvent`\<`any`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `event` | `MessageEvent`\<`any`\> |

##### Returns

`void`

#### Defined in

src/packages/iswork/src/message/message-sse.ts:18

---

### #onMessageCallback

• `Private` **#onMessageCallback**: (`event`: `MessageEvent`\<`any`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `event` | `MessageEvent`\<`any`\> |

##### Returns

`void`

#### Defined in

src/packages/iswork/src/message/message-sse.ts:17

---

### #options

• `Private` `Readonly` **#options**: [`TMessageSSEOptions`](../modules.md#tmessagesseoptions)

#### Defined in

src/packages/iswork/src/message/message-sse.ts:16

---

### instance

• **instance**: `EventSource`

#### Implementation of

AbstractMessage.instance

#### Defined in

src/packages/iswork/src/message/message-sse.ts:15

## Methods

### #messageAsyncGenerator

▸ **#messageAsyncGenerator**(): `AsyncGenerator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>

异步消息生成器函数

#### Returns

`AsyncGenerator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>

#### Defined in

src/packages/iswork/src/message/message-sse.ts:70

---

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.close

#### Defined in

src/packages/iswork/src/message/message-sse.ts:31

---

### onClose

▸ **onClose**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/message/message-sse.ts:61

---

### onError

▸ **onError**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name       | Type                                                                        |
| :--------- | :-------------------------------------------------------------------------- |
| `callback` | (`error`: `Error`, `event`: `MessageEvent`\<`any`\>) => `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.onError

#### Defined in

src/packages/iswork/src/message/message-sse.ts:52

---

### onMessage

▸ **onMessage**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name       | Type                                      |
| :--------- | :---------------------------------------- |
| `callback` | (`message`: `any`) => `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.onMessage

#### Defined in

src/packages/iswork/src/message/message-sse.ts:43

---

### open

▸ **open**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.open

#### Defined in

src/packages/iswork/src/message/message-sse.ts:24

---

### send

▸ **send**(`message`): `Promise`\<`void`\>

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `message` | `any` |

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.send

#### Defined in

src/packages/iswork/src/message/message-sse.ts:36

---

### create

▸ **create**(`optoins`): `Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>\>

创建一个Generator异步消息函数

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `optoins` | [`TMessageSSEOptions`](../modules.md#tmessagesseoptions) |

#### Returns

`Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>\>

#### Defined in

src/packages/iswork/src/message/message-sse.ts:99
