[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Observable

# Class: Observable\<V\>

Defined in: src/packages/iswork/src/message/message-observable.ts:10

## Type Parameters

### V

`V` = `unknown`

## Constructors

### Constructor

> **new Observable**\<`V`\>(`subscribeCallback`): `Observable`\<`V`\>

Defined in: src/packages/iswork/src/message/message-observable.ts:13

#### Parameters

##### subscribeCallback

[`TSubscribeCallback`](../type-aliases/TSubscribeCallback.md)\<`V`\>

#### Returns

`Observable`\<`V`\>

## Methods

### subscribe()

> **subscribe**(`observer`): [`TUnSubscribe`](../type-aliases/TUnSubscribe.md)

Defined in: src/packages/iswork/src/message/message-observable.ts:17

#### Parameters

##### observer

[`IObserver`](../interfaces/IObserver.md)\<`V`\>

#### Returns

[`TUnSubscribe`](../type-aliases/TUnSubscribe.md)

---

### create()

> `static` **create**\<`V`\>(`subscribeCallback`): `Observable`\<`V`\>

Defined in: src/packages/iswork/src/message/message-observable.ts:21

#### Type Parameters

##### V

`V`

#### Parameters

##### subscribeCallback

[`TSubscribeCallback`](../type-aliases/TSubscribeCallback.md)\<`V`\>

#### Returns

`Observable`\<`V`\>
