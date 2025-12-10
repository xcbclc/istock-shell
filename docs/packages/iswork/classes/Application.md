[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Application

# Class: Application

Defined in: application/application.ts:32

应用框架入口类

## Description

继承自 ApplicationEvent，提供完整的应用程序生命周期管理

## Example

```typescript
const app = new Application({
  domainPath: 'my-app',
  middlewares: [loggerMiddleware],
});

app.listen(MyDomainClass);
```

## Extends

- `ApplicationEvent`

## Constructors

### Constructor

> **new Application**(`options`): `Application`

Defined in: application/application.ts:118

应用程序构造函数

#### Parameters

##### options

`Partial`\<[`ApplicationOptions`](../type-aliases/ApplicationOptions.md)\> = `{}`

应用程序配置选项，可选

#### Returns

`Application`

#### Description

初始化应用程序实例，设置配置选项和核心组件

#### Example

```typescript
const app = new Application({
  domainPath: 'my-app',
  middlewares: [authMiddleware, loggerMiddleware],
  emit: (message) => {
    // 自定义消息发送逻辑
    postMessage(message);
  },
});
```

#### Overrides

`ApplicationEvent.constructor`

## Properties

### options

> **options**: [`ApplicationEventOptions`](../type-aliases/ApplicationEventOptions.md)

Defined in: application/application-event.ts:27

应用事件配置选项

#### Inherited from

`ApplicationEvent.options`

## Accessors

### allDomain

#### Get Signature

> **get** **allDomain**(): `Domain`\<[`DomainClassBase`](../interfaces/DomainClassBase.md)\<`any`\>\>[]

Defined in: application/application.ts:62

获取所有已注册的域

##### Returns

`Domain`\<[`DomainClassBase`](../interfaces/DomainClassBase.md)\<`any`\>\>[]

域映射表

---

### emit

#### Get Signature

> **get** **emit**(): (`message`, `options?`) => `void`

Defined in: application/application-event.ts:34

获取消息发送函数

##### Description

返回当前配置的消息发送函数

##### Returns

消息发送函数

> (`message`, `options?`): `void`

###### Parameters

###### message

`unknown`

###### options?

###### targetOrigin?

`string`

###### transfer?

`Transferable`[]

###### Returns

`void`

#### Inherited from

`ApplicationEvent.emit`

---

### globalMiddleware

#### Get Signature

> **get** **globalMiddleware**(): [`Middleware`](../type-aliases/Middleware.md)[]

Defined in: application/application.ts:54

获取全局中间件列表

##### Returns

[`Middleware`](../type-aliases/Middleware.md)[]

全局中间件数组

---

### messageChannelManager

#### Get Signature

> **get** **messageChannelManager**(): `MessageChannelManager`

Defined in: application/application.ts:70

获取消息通道管理器

##### Returns

`MessageChannelManager`

消息通道管理器实例

---

### pipeFlowExecute

#### Get Signature

> **get** **pipeFlowExecute**(): (`pipes`) => `unknown`

Defined in: application/application.ts:79

获取管道流执行函数

##### Description

批量执行pipe方法的绑定函数

##### Returns

绑定了上下文的管道流执行函数

> (`pipes`): `unknown`

流式执行管道函数

###### Parameters

###### pipes

`object`[]

管道配置数组，每个配置包含管道键和可选的额外参数

###### Returns

`unknown`

最后一个管道函数的执行结果

###### Description

按顺序执行多个管道函数，前一个管道的结果作为后一个管道的第一个参数

###### Example

```typescript
const result = pipeManager.flowExecute([
  { key: 'trim', args: ['  hello  '] },
  { key: 'uppercase' },
  { key: 'addPrefix', args: ['Mr. '] },
]);
// 执行流程: trim('  hello  ') -> uppercase('hello') -> addPrefix('HELLO', 'Mr. ')
// 结果: 'Mr. HELLO'
```

## Methods

### close()

> **close**(): `void`

Defined in: application/application.ts:151

关闭应用程序

#### Returns

`void`

#### Description

停止应用程序运行，清理资源

---

### closed()

> `protected` **closed**(): `void`

Defined in: application/application-event.ts:127

应用程序关闭监听事件

#### Returns

`void`

#### Description

在应用程序停止监听消息后触发此事件

#### Inherited from

`ApplicationEvent.closed`

---

### getDomain()

> **getDomain**\<`T`\>(`name`): `undefined` \| `Domain`\<`T`\>

Defined in: application/application.ts:332

获取指定名称的域

#### Type Parameters

##### T

`T` _extends_ [`DomainClassBase`](../interfaces/DomainClassBase.md)\<`any`\>

域类类型

#### Parameters

##### name

`string`

域名称

#### Returns

`undefined` \| `Domain`\<`T`\>

域实例，如果不存在则返回 undefined

#### Description

根据域名称获取已注册的域实例

#### Example

```typescript
const userDomain = app.getDomain<UserDomain>('user');
```

---

### getPipe()

> **getPipe**\<`Fn`\>(`key`): `Fn`

Defined in: application/application.ts:364

获取管道函数

#### Type Parameters

##### Fn

`Fn` _extends_ `Function`

函数类型

#### Parameters

##### key

`TPipeKey`

管道函数的键名

#### Returns

`Fn`

管道函数，如果不存在则返回 undefined

#### Description

根据键名获取已注册的管道函数

#### Example

```typescript
const validator = app.getPipe<(data: any) => any>('validation');
```

---

### getPipeRecord()

> **getPipeRecord**(): `Record`\<`string` \| `symbol`, `Function`\>

Defined in: application/application.ts:373

获取所有管道函数记录

#### Returns

`Record`\<`string` \| `symbol`, `Function`\>

管道函数记录映射表

#### Description

获取管道管理器中所有已注册的管道函数记录

---

### initialized()

> `protected` **initialized**(): `void`

Defined in: application/application-event.ts:91

应用程序初始化完成事件

#### Returns

`void`

#### Description

在应用程序初始化完成后触发此事件

#### Inherited from

`ApplicationEvent.initialized`

---

### listen()

> **listen**(`domainClass`): (`event`) => `Promise`\<`void`\>

Defined in: application/application.ts:139

启动应用程序监听

#### Parameters

##### domainClass

[`DomainClassBase`](../interfaces/DomainClassBase.md)

要监听的域类

#### Returns

消息处理回调函数

> (`event`): `Promise`\<`void`\>

消息回调函数

##### Parameters

###### event

`MessageEvent`\<[`CmdpMessage`](../type-aliases/CmdpMessage.md)\<`any`\>\>

##### Returns

`Promise`\<`void`\>

#### Description

通过指定的域类启动应用程序，扫描域并返回消息处理函数

#### Example

```typescript
const messageHandler = app.listen(MyDomainClass);
// 在 Web Worker 中使用
self.addEventListener('message', messageHandler);
```

---

### listened()

> `protected` **listened**(): `void`

Defined in: application/application-event.ts:100

应用程序开始监听事件

#### Returns

`void`

#### Description

在应用程序开始监听消息后触发此事件

#### Inherited from

`ApplicationEvent.listened`

---

### listenInput()

> `protected` **listenInput**(): `void`

Defined in: application/application-event.ts:109

应用程序接收输入事件

#### Returns

`void`

#### Description

在应用程序接收到输入消息时触发此事件

#### Inherited from

`ApplicationEvent.listenInput`

---

### listenOutput()

> `protected` **listenOutput**(): `void`

Defined in: application/application-event.ts:118

应用程序产生输出事件

#### Returns

`void`

#### Description

在应用程序产生输出消息时触发此事件

#### Inherited from

`ApplicationEvent.listenOutput`

---

### sendAppMessage()

> `protected` **sendAppMessage**(`controller`, `method`, `payload`): `void`

Defined in: application/application-event.ts:73

发送应用程序级别消息

#### Parameters

##### controller

`string`

控制器名称，标识消息的处理模块

##### method

`string`

方法名称，标识具体的事件类型

##### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md) = `true`

消息载荷，默认为 true

#### Returns

`void`

#### Description

创建并发送应用程序内部事件消息，用于生命周期事件通知

#### Example

```typescript
// 发送初始化完成事件
this.sendAppMessage('lifecycle', 'initialized');
// 发送自定义事件
this.sendAppMessage('custom', 'userAction', { action: 'click' });
```

#### Inherited from

`ApplicationEvent.sendAppMessage`

---

### useDomain()

> **useDomain**(`domainClass`): `void`

Defined in: application/application.ts:317

添加域

#### Parameters

##### domainClass

[`DomainClassBase`](../interfaces/DomainClassBase.md)

要添加的域类

#### Returns

`void`

#### Description

向应用程序添加域类，扫描并注册域中的控制器和服务

#### Example

```typescript
app.useDomain(UserDomain);
```

---

### useMiddleware()

> **useMiddleware**(`fn`): `Application`

Defined in: application/application.ts:300

添加中间件

#### Parameters

##### fn

[`Middleware`](../type-aliases/Middleware.md)

中间件函数

#### Returns

`Application`

返回应用程序实例，支持链式调用

#### Description

向应用程序添加中间件函数，中间件将在消息处理过程中执行

#### Throws

当传入的参数不是函数时抛出错误

#### Example

```typescript
app.useMiddleware(async (ctx, next) => {
  console.log('Before processing');
  await next();
  console.log('After processing');
});
```

---

### usePipe()

> **usePipe**(`key`, `fn`): `void`

Defined in: application/application.ts:349

添加管道函数

#### Parameters

##### key

`TPipeKey`

管道函数的键名

##### fn

`Function`

管道函数

#### Returns

`void`

#### Description

向管道管理器添加一个管道函数

#### Example

```typescript
app.usePipe('validation', (data) => {
  // 验证逻辑
  return validatedData;
});
```
