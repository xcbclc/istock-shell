[@istock/iswork](../README.md) / [Exports](../modules.md) / IMessageHandler

# Interface: IMessageHandler

## Table of contents

### Properties

- [cmdAppend](IMessageHandler.md#cmdappend)
- [cmdReplace](IMessageHandler.md#cmdreplace)
- [complete](IMessageHandler.md#complete)
- [createMessageIterator](IMessageHandler.md#createmessageiterator)
- [createMessageSSE](IMessageHandler.md#createmessagesse)
- [createObservable](IMessageHandler.md#createobservable)

## Properties

### cmdAppend

• **cmdAppend**: (`payload`: [`TCmdpPayload`](../modules.md#tcmdppayload)) => [`TCmdpPayload`](../modules.md#tcmdppayload)

#### Type declaration

▸ (`payload`): [`TCmdpPayload`](../modules.md#tcmdppayload)

##### Parameters

| Name      | Type                                         |
| :-------- | :------------------------------------------- |
| `payload` | [`TCmdpPayload`](../modules.md#tcmdppayload) |

##### Returns

[`TCmdpPayload`](../modules.md#tcmdppayload)

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:17

---

### cmdReplace

• **cmdReplace**: (`payload`: [`TCmdpPayload`](../modules.md#tcmdppayload)) => [`TCmdpPayload`](../modules.md#tcmdppayload)

#### Type declaration

▸ (`payload`): [`TCmdpPayload`](../modules.md#tcmdppayload)

##### Parameters

| Name      | Type                                         |
| :-------- | :------------------------------------------- |
| `payload` | [`TCmdpPayload`](../modules.md#tcmdppayload) |

##### Returns

[`TCmdpPayload`](../modules.md#tcmdppayload)

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:18

---

### complete

• **complete**: (`payload?`: [`TCmdpPayload`](../modules.md#tcmdppayload)) => [`TCmdpPayload`](../modules.md#tcmdppayload)

#### Type declaration

▸ (`payload?`): [`TCmdpPayload`](../modules.md#tcmdppayload)

##### Parameters

| Name       | Type                                         |
| :--------- | :------------------------------------------- |
| `payload?` | [`TCmdpPayload`](../modules.md#tcmdppayload) |

##### Returns

[`TCmdpPayload`](../modules.md#tcmdppayload)

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:16

---

### createMessageIterator

• **createMessageIterator**: (`callback`: (`messageIterator`: [`MessageIterator`](../classes/MessageIterator.md)) => `void`) => `AsyncIterator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

#### Type declaration

▸ (`callback`): `AsyncIterator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

创建一个Generator异步消息函数

##### Parameters

| Name       | Type                                                                              |
| :--------- | :-------------------------------------------------------------------------------- |
| `callback` | (`messageIterator`: [`MessageIterator`](../classes/MessageIterator.md)) => `void` |

##### Returns

`AsyncIterator`\<[`TMessageIteratorData`](../modules.md#tmessageiteratordata), `void`, `unknown`\>

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:20

---

### createMessageSSE

• **createMessageSSE**: (`optoins`: [`TMessageSSEOptions`](../modules.md#tmessagesseoptions)) => `Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>\>

#### Type declaration

▸ (`optoins`): `Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>\>

创建一个Generator异步消息函数

##### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `optoins` | [`TMessageSSEOptions`](../modules.md#tmessagesseoptions) |

##### Returns

`Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../modules.md#tmessagesseiteratordata), `void`, `unknown`\>\>

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:21

---

### createObservable

• **createObservable**: \<V\>(`subscribeCallback`: [`TSubscribeCallback`](../modules.md#tsubscribecallback)\<`V`\>) => [`Observable`](../classes/Observable.md)\<`V`\>

#### Type declaration

▸ \<`V`\>(`subscribeCallback`): [`Observable`](../classes/Observable.md)\<`V`\>

##### Type parameters

| Name |
| :--- |
| `V`  |

##### Parameters

| Name                | Type                                                            |
| :------------------ | :-------------------------------------------------------------- |
| `subscribeCallback` | [`TSubscribeCallback`](../modules.md#tsubscribecallback)\<`V`\> |

##### Returns

[`Observable`](../classes/Observable.md)\<`V`\>

#### Defined in

src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:19
