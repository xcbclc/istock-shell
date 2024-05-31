[@istock/iswork](../README.md) / [Exports](../modules.md) / Application

# Class: Application

应用框架入口

## Hierarchy

- `ApplicationEvent`

  ↳ **`Application`**

## Table of contents

### Constructors

- [constructor](Application.md#constructor)

### Properties

- [#CmdpEvent](Application.md##cmdpevent)
- [#Context](Application.md##context)
- [#MessageHandler](Application.md##messagehandler)
- [#compose](Application.md##compose)
- [#domainHandler](Application.md##domainhandler)
- [#emit](Application.md##emit)
- [#messageCallback](Application.md##messagecallback)
- [#messageChannelManager](Application.md##messagechannelmanager)
- [#options](Application.md##options)
- [#pipeManager](Application.md##pipemanager)
- [options](Application.md#options)

### Accessors

- [allDomain](Application.md#alldomain)
- [emit](Application.md#emit)
- [globalMiddleware](Application.md#globalmiddleware)
- [messageChannelManager](Application.md#messagechannelmanager)
- [pipeFlowExecute](Application.md#pipeflowexecute)

### Methods

- [#callback](Application.md##callback)
- [#messageCallbackErrorHandler](Application.md##messagecallbackerrorhandler)
- [close](Application.md#close)
- [closed](Application.md#closed)
- [getDomain](Application.md#getdomain)
- [getPipe](Application.md#getpipe)
- [getPipeRecord](Application.md#getpiperecord)
- [initialized](Application.md#initialized)
- [listen](Application.md#listen)
- [listenInput](Application.md#listeninput)
- [listenOutput](Application.md#listenoutput)
- [listened](Application.md#listened)
- [sendAppMessage](Application.md#sendappmessage)
- [useDomain](Application.md#usedomain)
- [useMiddleware](Application.md#usemiddleware)
- [usePipe](Application.md#usepipe)
- [#mergeOptions](Application.md##mergeoptions)

## Constructors

### constructor

• **new Application**(`options?`): [`Application`](Application.md)

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | `Partial`\<[`TApplicationOptions`](../modules.md#tapplicationoptions)\> |

#### Returns

[`Application`](Application.md)

#### Overrides

ApplicationEvent.constructor

#### Defined in

src/packages/iswork/src/application/application.ts:60

## Properties

### #CmdpEvent

• `Private` `Readonly` **#CmdpEvent**: typeof `CmdpEvent` = `CmdpEvent`

#### Inherited from

ApplicationEvent.#CmdpEvent

#### Defined in

src/packages/iswork/src/application/application-event.ts:8

---

### #Context

• `Private` `Readonly` **#Context**: typeof [`ApplicationContext`](ApplicationContext.md) = `ApplicationContext`

#### Defined in

src/packages/iswork/src/application/application.ts:18

---

### #MessageHandler

• `Private` `Readonly` **#MessageHandler**: typeof `MessageHandler` = `MessageHandler`

#### Defined in

src/packages/iswork/src/application/application.ts:19

---

### #compose

• `Private` `Readonly` **#compose**: (`middleware`: `Function`[]) => (`context`: [`ApplicationContext`](ApplicationContext.md), `next?`: `Function`) => `Promise`\<`unknown`\> = `compose`

#### Type declaration

▸ (`middleware`): (`context`: [`ApplicationContext`](ApplicationContext.md), `next?`: `Function`) => `Promise`\<`unknown`\>

参考koa-compose
Compose `middleware` returning
a fully valid middleware comprised
of all those which are passed.

##### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `middleware` | `Function`[] |

##### Returns

`fn`

▸ (`context`, `next?`): `Promise`\<`unknown`\>

##### Parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `context` | [`ApplicationContext`](ApplicationContext.md) |
| `next?`   | `Function`                                    |

##### Returns

`Promise`\<`unknown`\>

**`Api`**

public

#### Defined in

src/packages/iswork/src/application/application.ts:20

---

### #domainHandler

• `Private` `Readonly` **#domainHandler**: `DomainHandler`

#### Defined in

src/packages/iswork/src/application/application.ts:22

---

### #emit

• `Private` `Readonly` **#emit**: (`message`: `unknown`, `options?`: \{ `targetOrigin?`: `string` ; `transfer?`: `Transferable`[] }) => `void`

#### Type declaration

▸ (`message`, `options?`): `void`

##### Parameters

| Name                    | Type             |
| :---------------------- | :--------------- |
| `message`               | `unknown`        |
| `options?`              | `Object`         |
| `options.targetOrigin?` | `string`         |
| `options.transfer?`     | `Transferable`[] |

##### Returns

`void`

#### Inherited from

ApplicationEvent.#emit

#### Defined in

src/packages/iswork/src/application/application-event.ts:9

---

### #messageCallback

• `Private` **#messageCallback**: (`event`: `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\>) => `Promise`\<`void`\>

#### Type declaration

▸ (`event`): `Promise`\<`void`\>

##### Parameters

| Name    | Type                                                                    |
| :------ | :---------------------------------------------------------------------- |
| `event` | `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\> |

##### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/application/application.ts:25

---

### #messageChannelManager

• `Private` `Readonly` **#messageChannelManager**: `MessageChannelManager`

#### Defined in

src/packages/iswork/src/application/application.ts:24

---

### #options

• `Private` `Readonly` **#options**: [`TApplicationOptions`](../modules.md#tapplicationoptions)

#### Defined in

src/packages/iswork/src/application/application.ts:21

---

### #pipeManager

• `Private` `Readonly` **#pipeManager**: `PipeManager`

#### Defined in

src/packages/iswork/src/application/application.ts:23

---

### options

• **options**: [`TApplicationEventOptions`](../modules.md#tapplicationeventoptions)

#### Inherited from

ApplicationEvent.options

#### Defined in

src/packages/iswork/src/application/application-event.ts:10

## Accessors

### allDomain

• `get` **allDomain**(): `Domain`\<[`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\>\>[]

#### Returns

`Domain`\<[`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\>\>[]

#### Defined in

src/packages/iswork/src/application/application.ts:31

---

### emit

• `get` **emit**(): (`message`: `unknown`, `options?`: \{ `targetOrigin?`: `string` ; `transfer?`: `Transferable`[] }) => `void`

#### Returns

`fn`

▸ (`message`, `options?`): `void`

##### Parameters

| Name                    | Type             |
| :---------------------- | :--------------- |
| `message`               | `unknown`        |
| `options?`              | `Object`         |
| `options.targetOrigin?` | `string`         |
| `options.transfer?`     | `Transferable`[] |

##### Returns

`void`

#### Inherited from

ApplicationEvent.emit

#### Defined in

src/packages/iswork/src/application/application-event.ts:11

---

### globalMiddleware

• `get` **globalMiddleware**(): [`TMiddleware`](../modules.md#tmiddleware)[]

#### Returns

[`TMiddleware`](../modules.md#tmiddleware)[]

#### Defined in

src/packages/iswork/src/application/application.ts:27

---

### messageChannelManager

• `get` **messageChannelManager**(): `MessageChannelManager`

#### Returns

`MessageChannelManager`

#### Defined in

src/packages/iswork/src/application/application.ts:35

---

### pipeFlowExecute

• `get` **pipeFlowExecute**(): (`pipes`: \{ `args?`: `unknown`[] ; `key`: `TPipeKey` }[]) => `unknown`

批量执行pipe方法

#### Returns

`fn`

▸ (`pipes`): `unknown`

##### Parameters

| Name    | Type                                            |
| :------ | :---------------------------------------------- |
| `pipes` | \{ `args?`: `unknown`[] ; `key`: `TPipeKey` }[] |

##### Returns

`unknown`

#### Defined in

src/packages/iswork/src/application/application.ts:42

## Methods

### #callback

▸ **#callback**(`_options?`): (`event`: `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\>) => `Promise`\<`void`\>

消息处理函数

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `_options?` | `unknown` |

#### Returns

`fn`

▸ (`event`): `Promise`\<`void`\>

##### Parameters

| Name    | Type                                                                    |
| :------ | :---------------------------------------------------------------------- |
| `event` | `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\> |

##### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/application/application.ts:91

---

### #messageCallbackErrorHandler

▸ **#messageCallbackErrorHandler**(`ctx`, `err`): `void`

#### Parameters

| Name  | Type                                          |
| :---- | :-------------------------------------------- |
| `ctx` | [`ApplicationContext`](ApplicationContext.md) |
| `err` | `any`                                         |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/application/application.ts:176

---

### close

▸ **close**(): `void`

关闭应用

#### Returns

`void`

#### Defined in

src/packages/iswork/src/application/application.ts:84

---

### closed

▸ **closed**(): `void`

#### Returns

`void`

#### Inherited from

ApplicationEvent.closed

#### Defined in

src/packages/iswork/src/application/application-event.ts:59

---

### getDomain

▸ **getDomain**\<`T`\>(`name`): `undefined` \| `Domain`\<`T`\>

获取domain

#### Type parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `T`  | extends [`IDomainClass`](../interfaces/IDomainClass.md)\<`any`\> |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`undefined` \| `Domain`\<`T`\>

#### Defined in

src/packages/iswork/src/application/application.ts:222

---

### getPipe

▸ **getPipe**\<`Fn`\>(`key`): `Fn`

获取管道函数

#### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `Fn` | extends `Function` |

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `key` | `TPipeKey` |

#### Returns

`Fn`

#### Defined in

src/packages/iswork/src/application/application.ts:239

---

### getPipeRecord

▸ **getPipeRecord**(): `Record`\<`string` \| `symbol`, `Function`\>

获取全部管道函数记录

#### Returns

`Record`\<`string` \| `symbol`, `Function`\>

#### Defined in

src/packages/iswork/src/application/application.ts:246

---

### initialized

▸ **initialized**(): `void`

#### Returns

`void`

#### Inherited from

ApplicationEvent.initialized

#### Defined in

src/packages/iswork/src/application/application-event.ts:39

---

### listen

▸ **listen**(`domainClass`): (`event`: `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\>) => `Promise`\<`void`\>

通过domain获取消息处理函数

#### Parameters

| Name          | Type                                                         |
| :------------ | :----------------------------------------------------------- |
| `domainClass` | [`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\> |

#### Returns

`fn`

▸ (`event`): `Promise`\<`void`\>

##### Parameters

| Name    | Type                                                                    |
| :------ | :---------------------------------------------------------------------- |
| `event` | `MessageEvent`\<[`TCmdpMessage`](../modules.md#tcmdpmessage)\<`any`\>\> |

##### Returns

`Promise`\<`void`\>

#### Defined in

src/packages/iswork/src/application/application.ts:73

---

### listenInput

▸ **listenInput**(): `void`

#### Returns

`void`

#### Inherited from

ApplicationEvent.listenInput

#### Defined in

src/packages/iswork/src/application/application-event.ts:49

---

### listenOutput

▸ **listenOutput**(): `void`

#### Returns

`void`

#### Inherited from

ApplicationEvent.listenOutput

#### Defined in

src/packages/iswork/src/application/application-event.ts:54

---

### listened

▸ **listened**(): `void`

#### Returns

`void`

#### Inherited from

ApplicationEvent.listened

#### Defined in

src/packages/iswork/src/application/application-event.ts:44

---

### sendAppMessage

▸ **sendAppMessage**(`controller`, `method`, `payload?`): `void`

发送应用级消息

#### Parameters

| Name         | Type                                         | Default value |
| :----------- | :------------------------------------------- | :------------ |
| `controller` | `string`                                     | `undefined`   |
| `method`     | `string`                                     | `undefined`   |
| `payload`    | [`TCmdpPayload`](../modules.md#tcmdppayload) | `true`        |

#### Returns

`void`

#### Inherited from

ApplicationEvent.sendAppMessage

#### Defined in

src/packages/iswork/src/application/application-event.ts:25

---

### useDomain

▸ **useDomain**(`domainClass`): `void`

新增domain

#### Parameters

| Name          | Type                                                         |
| :------------ | :----------------------------------------------------------- |
| `domainClass` | [`IDomainClass`](../interfaces/IDomainClass.md)\<`unknown`\> |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/application/application.ts:214

---

### useMiddleware

▸ **useMiddleware**(`fn`): [`Application`](Application.md)

新增中间件

#### Parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `fn` | [`TMiddleware`](../modules.md#tmiddleware) |

#### Returns

[`Application`](Application.md)

#### Defined in

src/packages/iswork/src/application/application.ts:202

---

### usePipe

▸ **usePipe**(`key`, `fn`): `void`

新增管道函数

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `key` | `TPipeKey` |
| `fn`  | `Function` |

#### Returns

`void`

#### Defined in

src/packages/iswork/src/application/application.ts:231

---

### #mergeOptions

▸ **#mergeOptions**(`options`): [`TApplicationOptions`](../modules.md#tapplicationoptions)

合并初始选项值

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | `Partial`\<[`TApplicationOptions`](../modules.md#tapplicationoptions)\> |

#### Returns

[`TApplicationOptions`](../modules.md#tapplicationoptions)

#### Defined in

src/packages/iswork/src/application/application.ts:51
