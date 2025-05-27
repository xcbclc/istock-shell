[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / MessageChannelAdapter

# Class: MessageChannelAdapter

Defined in: src/packages/iswork/src/message/message-channel.ts:4

## Implements

- `AbstractMessage`\<`MessageChannel`\>

## Constructors

### Constructor

> **new MessageChannelAdapter**(`options?`): `MessageChannelAdapter`

Defined in: src/packages/iswork/src/message/message-channel.ts:14

#### Parameters

##### options?

`StructuredSerializeOptions`

#### Returns

`MessageChannelAdapter`

## Properties

### instance

> `readonly` **instance**: `MessageChannel`

Defined in: src/packages/iswork/src/message/message-channel.ts:5

#### Implementation of

`AbstractMessage.instance`

***

### options

> `readonly` **options**: `undefined` \| `StructuredSerializeOptions`

Defined in: src/packages/iswork/src/message/message-channel.ts:6

## Accessors

### hasOnMessageCallback

#### Get Signature

> **get** **hasOnMessageCallback**(): `boolean`

Defined in: src/packages/iswork/src/message/message-channel.ts:10

##### Returns

`boolean`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-channel.ts:22

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.close`

***

### onError()

> **onError**(`callback`): `void`

Defined in: src/packages/iswork/src/message/message-channel.ts:43

#### Parameters

##### callback

(`error`, `event`) => `Promise`\<`void`\>

#### Returns

`void`

#### Implementation of

`AbstractMessage.onError`

***

### onMessage()

> **onMessage**(`callback`): `void`

Defined in: src/packages/iswork/src/message/message-channel.ts:33

#### Parameters

##### callback

(`message`) => `Promise`\<`void`\>

#### Returns

`void`

#### Implementation of

`AbstractMessage.onMessage`

***

### open()

> **open**(): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-channel.ts:18

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.open`

***

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: src/packages/iswork/src/message/message-channel.ts:28

#### Parameters

##### message

`any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AbstractMessage.send`
