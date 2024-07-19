[@istock/iswork](../README.md) / [Exports](../modules.md) / MessageChannelAdapter

# Class: MessageChannelAdapter

## Implements

- `AbstractMessage`\<`MessageChannel`\>

## Table of contents

### Constructors

- [constructor](MessageChannelAdapter.md#constructor)

### Properties

- [#onErrorCallback](MessageChannelAdapter.md##onerrorcallback)
- [#onMessageCallback](MessageChannelAdapter.md##onmessagecallback)
- [instance](MessageChannelAdapter.md#instance)
- [options](MessageChannelAdapter.md#options)

### Accessors

- [hasOnMessageCallback](MessageChannelAdapter.md#hasonmessagecallback)

### Methods

- [close](MessageChannelAdapter.md#close)
- [onError](MessageChannelAdapter.md#onerror)
- [onMessage](MessageChannelAdapter.md#onmessage)
- [open](MessageChannelAdapter.md#open)
- [send](MessageChannelAdapter.md#send)

## Constructors

### constructor

• **new MessageChannelAdapter**(`options?`): [`MessageChannelAdapter`](MessageChannelAdapter.md)

#### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `options?` | `StructuredSerializeOptions` |

#### Returns

[`MessageChannelAdapter`](MessageChannelAdapter.md)

#### Defined in

src/packages/iswork/src/message/message-channel.ts:14

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

src/packages/iswork/src/message/message-channel.ts:8

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

src/packages/iswork/src/message/message-channel.ts:7

---

### instance

• `Readonly` **instance**: `MessageChannel`

#### Implementation of

AbstractMessage.instance

#### Defined in

src/packages/iswork/src/message/message-channel.ts:5

---

### options

• `Readonly` **options**: `undefined` \| `StructuredSerializeOptions`

#### Defined in

src/packages/iswork/src/message/message-channel.ts:6

## Accessors

### hasOnMessageCallback

• `get` **hasOnMessageCallback**(): `boolean`

#### Returns

`boolean`

#### Defined in

src/packages/iswork/src/message/message-channel.ts:10

## Methods

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.close

#### Defined in

src/packages/iswork/src/message/message-channel.ts:22

---

### onError

▸ **onError**(`callback`): `void`

#### Parameters

| Name       | Type                                                                        |
| :--------- | :-------------------------------------------------------------------------- |
| `callback` | (`error`: `Error`, `event`: `MessageEvent`\<`any`\>) => `Promise`\<`void`\> |

#### Returns

`void`

#### Implementation of

AbstractMessage.onError

#### Defined in

src/packages/iswork/src/message/message-channel.ts:43

---

### onMessage

▸ **onMessage**(`callback`): `void`

#### Parameters

| Name       | Type                                      |
| :--------- | :---------------------------------------- |
| `callback` | (`message`: `any`) => `Promise`\<`void`\> |

#### Returns

`void`

#### Implementation of

AbstractMessage.onMessage

#### Defined in

src/packages/iswork/src/message/message-channel.ts:33

---

### open

▸ **open**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

AbstractMessage.open

#### Defined in

src/packages/iswork/src/message/message-channel.ts:18

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

src/packages/iswork/src/message/message-channel.ts:28
