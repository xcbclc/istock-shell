[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageChannelAdapter

# Class: MessageChannelAdapter

Defined in: message/message-channel.ts:27

消息通道适配器

## Description

基于浏览器 MessageChannel API 的消息通信适配器，实现双向消息传递

## Implements

## Example

```typescript
// 创建消息通道适配器
const adapter = new MessageChannelAdapter();

// 设置消息监听
adapter.onMessage(async (message) => {
  console.log('收到消息:', message);
});

// 发送消息
await adapter.send({ type: 'greeting', data: 'Hello' });
```

## Implements

- `AbstractMessage`\<`MessageChannel`\>

## Constructors

### Constructor

> **new MessageChannelAdapter**(`options?`): `MessageChannelAdapter`

Defined in: message/message-channel.ts:60

消息通道适配器构造函数

#### Parameters

##### options?

`StructuredSerializeOptions`

结构化序列化选项，用于控制消息传递时的序列化行为

#### Returns

`MessageChannelAdapter`

#### Description

初始化消息通道适配器，可选择性配置序列化选项

#### Example

```typescript
// 创建基本适配器
const adapter = new MessageChannelAdapter();

// 创建带序列化选项的适配器
const adapter = new MessageChannelAdapter({
  transfer: [arrayBuffer],
});
```

## Properties

### instance

> `readonly` **instance**: `MessageChannel`

Defined in: message/message-channel.ts:29

MessageChannel 实例

#### Implementation of

`AbstractMessage.instance`

---

### options

> `readonly` **options**: `undefined` \| `StructuredSerializeOptions`

Defined in: message/message-channel.ts:31

结构化序列化选项

## Accessors

### hasOnMessageCallback

#### Get Signature

> **get** **hasOnMessageCallback**(): `boolean`

Defined in: message/message-channel.ts:41

检查是否已设置消息回调

##### Returns

`boolean`

是否存在消息回调函数

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: message/message-channel.ts:86

关闭消息通道

#### Returns

`Promise`\<`void`\>

Promise<void>

#### Description

移除事件监听器并关闭消息通道连接

#### Example

```typescript
await adapter.close();
```

#### Implementation of

`AbstractMessage.close`

---

### onError()

> **onError**(`callback`): `void`

Defined in: message/message-channel.ts:144

设置错误监听回调

#### Parameters

##### callback

(`error`, `event`) => `Promise`\<`void`\>

错误处理回调函数

#### Returns

`void`

#### Description

注册错误处理回调函数，当消息传递出错时触发

#### Example

```typescript
adapter.onError(async (error, event) => {
  console.error('消息传递错误:', error.message);
  console.error('错误事件:', event);
});
```

#### Implementation of

`AbstractMessage.onError`

---

### onMessage()

> **onMessage**(`callback`): `void`

Defined in: message/message-channel.ts:122

设置消息监听回调

#### Parameters

##### callback

(`message`) => `Promise`\<`void`\>

消息处理回调函数

#### Returns

`void`

#### Description

注册消息接收回调函数，当收到消息时触发

#### Example

```typescript
adapter.onMessage(async (message) => {
  console.log('收到消息:', message.data);
  // 处理消息逻辑
});
```

#### Implementation of

`AbstractMessage.onMessage`

---

### open()

> **open**(): `Promise`\<`void`\>

Defined in: message/message-channel.ts:73

打开消息通道

#### Returns

`Promise`\<`void`\>

Promise<void>

#### Description

异步打开消息通道连接

#### Example

```typescript
await adapter.open();
```

#### Implementation of

`AbstractMessage.open`

---

### send()

> **send**(`message`): `Promise`\<`void`\>

Defined in: message/message-channel.ts:105

发送消息

#### Parameters

##### message

`any`

要发送的消息内容

#### Returns

`Promise`\<`void`\>

Promise<void>

#### Description

通过消息通道发送消息到另一端

#### Example

```typescript
await adapter.send({
  type: 'command',
  payload: { action: 'execute', data: 'ls -la' },
});
```

#### Implementation of

`AbstractMessage.send`
