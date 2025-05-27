[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / IMessageHandler

# Interface: IMessageHandler

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:15

## Properties

### cmdAppend()

> **cmdAppend**: (`payload`) => [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:17

#### Parameters

##### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

#### Returns

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

***

### cmdReplace()

> **cmdReplace**: (`payload`) => [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:18

#### Parameters

##### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

#### Returns

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

***

### complete()

> **complete**: (`payload?`) => [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:16

#### Parameters

##### payload?

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

#### Returns

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

***

### createMessageIterator()

> **createMessageIterator**: (`callback`) => `AsyncIterator`\<[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md), `void`, `unknown`\>

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:20

创建一个Generator异步消息函数

#### Parameters

##### callback

(`messageIterator`) => `void`

#### Returns

`AsyncIterator`\<[`TMessageIteratorData`](../type-aliases/TMessageIteratorData.md), `void`, `unknown`\>

***

### createMessageSSE()

> **createMessageSSE**: (`optoins`) => `Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../type-aliases/TMessageSSEIteratorData.md), `void`, `unknown`\>\>

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:21

创建一个Generator异步消息函数

#### Parameters

##### optoins

[`TMessageSSEOptions`](../type-aliases/TMessageSSEOptions.md)

#### Returns

`Promise`\<`AsyncIterator`\<[`TMessageSSEIteratorData`](../type-aliases/TMessageSSEIteratorData.md), `void`, `unknown`\>\>

***

### createObservable()

> **createObservable**: \<`V`\>(`subscribeCallback`) => [`Observable`](../classes/Observable.md)\<`V`\>

Defined in: src/packages/iswork/src/decorators/controller/controller-method-message-handler.decorator.ts:19

#### Type Parameters

##### V

`V`

#### Parameters

##### subscribeCallback

[`TSubscribeCallback`](../type-aliases/TSubscribeCallback.md)\<`V`\>

#### Returns

[`Observable`](../classes/Observable.md)\<`V`\>
