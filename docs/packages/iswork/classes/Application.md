[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Application

# Class: Application

Defined in: src/packages/iswork/src/application/application.ts:17

应用框架入口

## Extends

- `ApplicationEvent`

## Constructors

### Constructor

> **new Application**(`options`): `Application`

Defined in: src/packages/iswork/src/application/application.ts:60

#### Parameters

##### options

`Partial`\<[`TApplicationOptions`](../type-aliases/TApplicationOptions.md)\> = `{}`

#### Returns

`Application`

#### Overrides

`ApplicationEvent.constructor`

## Properties

### options

> **options**: [`TApplicationEventOptions`](../type-aliases/TApplicationEventOptions.md)

Defined in: src/packages/iswork/src/application/application-event.ts:10

#### Inherited from

`ApplicationEvent.options`

## Accessors

### allDomain

#### Get Signature

> **get** **allDomain**(): `Domain`\<[`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\>\>[]

Defined in: src/packages/iswork/src/application/application.ts:31

##### Returns

`Domain`\<[`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\>\>[]

---

### emit

#### Get Signature

> **get** **emit**(): (`message`, `options?`) => `void`

Defined in: src/packages/iswork/src/application/application-event.ts:11

##### Returns

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

> **get** **globalMiddleware**(): [`TMiddleware`](../type-aliases/TMiddleware.md)[]

Defined in: src/packages/iswork/src/application/application.ts:27

##### Returns

[`TMiddleware`](../type-aliases/TMiddleware.md)[]

---

### messageChannelManager

#### Get Signature

> **get** **messageChannelManager**(): `MessageChannelManager`

Defined in: src/packages/iswork/src/application/application.ts:35

##### Returns

`MessageChannelManager`

---

### pipeFlowExecute

#### Get Signature

> **get** **pipeFlowExecute**(): (`pipes`) => `unknown`

Defined in: src/packages/iswork/src/application/application.ts:42

批量执行pipe方法

##### Returns

> (`pipes`): `unknown`

###### Parameters

###### pipes

`object`[]

###### Returns

`unknown`

## Methods

### close()

> **close**(): `void`

Defined in: src/packages/iswork/src/application/application.ts:84

关闭应用

#### Returns

`void`

---

### closed()

> `protected` **closed**(): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:59

#### Returns

`void`

#### Inherited from

`ApplicationEvent.closed`

---

### getDomain()

> **getDomain**\<`T`\>(`name`): `undefined` \| `Domain`\<`T`\>

Defined in: src/packages/iswork/src/application/application.ts:222

获取domain

#### Type Parameters

##### T

`T` _extends_ [`IDomainClass`](../interfaces/IDomainClass.md)\<`any`\>

#### Parameters

##### name

`string`

#### Returns

`undefined` \| `Domain`\<`T`\>

---

### getPipe()

> **getPipe**\<`Fn`\>(`key`): `Fn`

Defined in: src/packages/iswork/src/application/application.ts:239

获取管道函数

#### Type Parameters

##### Fn

`Fn` _extends_ `Function`

#### Parameters

##### key

`TPipeKey`

#### Returns

`Fn`

---

### getPipeRecord()

> **getPipeRecord**(): `Record`\<`string` \| `symbol`, `Function`\>

Defined in: src/packages/iswork/src/application/application.ts:246

获取全部管道函数记录

#### Returns

`Record`\<`string` \| `symbol`, `Function`\>

---

### initialized()

> `protected` **initialized**(): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:39

#### Returns

`void`

#### Inherited from

`ApplicationEvent.initialized`

---

### listen()

> **listen**(`domainClass`): (`event`) => `Promise`\<`void`\>

Defined in: src/packages/iswork/src/application/application.ts:73

通过domain获取消息处理函数

#### Parameters

##### domainClass

[`IDomainClass`](../interfaces/IDomainClass.md)

#### Returns

> (`event`): `Promise`\<`void`\>

##### Parameters

###### event

`MessageEvent`\<[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)\<`any`\>\>

##### Returns

`Promise`\<`void`\>

---

### listened()

> `protected` **listened**(): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:44

#### Returns

`void`

#### Inherited from

`ApplicationEvent.listened`

---

### listenInput()

> `protected` **listenInput**(): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:49

#### Returns

`void`

#### Inherited from

`ApplicationEvent.listenInput`

---

### listenOutput()

> `protected` **listenOutput**(): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:54

#### Returns

`void`

#### Inherited from

`ApplicationEvent.listenOutput`

---

### sendAppMessage()

> `protected` **sendAppMessage**(`controller`, `method`, `payload`): `void`

Defined in: src/packages/iswork/src/application/application-event.ts:25

发送应用级消息

#### Parameters

##### controller

`string`

##### method

`string`

##### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md) = `true`

#### Returns

`void`

#### Inherited from

`ApplicationEvent.sendAppMessage`

---

### useDomain()

> **useDomain**(`domainClass`): `void`

Defined in: src/packages/iswork/src/application/application.ts:214

新增domain

#### Parameters

##### domainClass

[`IDomainClass`](../interfaces/IDomainClass.md)

#### Returns

`void`

---

### useMiddleware()

> **useMiddleware**(`fn`): `Application`

Defined in: src/packages/iswork/src/application/application.ts:202

新增中间件

#### Parameters

##### fn

[`TMiddleware`](../type-aliases/TMiddleware.md)

#### Returns

`Application`

---

### usePipe()

> **usePipe**(`key`, `fn`): `void`

Defined in: src/packages/iswork/src/application/application.ts:231

新增管道函数

#### Parameters

##### key

`TPipeKey`

##### fn

`Function`

#### Returns

`void`
