[@istock/iswork](../README.md) / [Exports](../modules.md) / Observable

# Class: Observable\<V\>

## Type parameters

| Name | Type      |
| :--- | :-------- |
| `V`  | `unknown` |

## Table of contents

### Constructors

- [constructor](Observable.md#constructor)

### Properties

- [#subscribeCallback](Observable.md##subscribecallback)

### Methods

- [subscribe](Observable.md#subscribe)
- [create](Observable.md#create)

## Constructors

### constructor

• **new Observable**\<`V`\>(`subscribeCallback`): [`Observable`](Observable.md)\<`V`\>

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `V`  | `unknown` |

#### Parameters

| Name                | Type                                                            |
| :------------------ | :-------------------------------------------------------------- |
| `subscribeCallback` | [`TSubscribeCallback`](../modules.md#tsubscribecallback)\<`V`\> |

#### Returns

[`Observable`](Observable.md)\<`V`\>

#### Defined in

src/packages/iswork/src/message/message-observable.ts:13

## Properties

### #subscribeCallback

• `Private` `Readonly` **#subscribeCallback**: [`TSubscribeCallback`](../modules.md#tsubscribecallback)\<`V`\>

#### Defined in

src/packages/iswork/src/message/message-observable.ts:11

## Methods

### subscribe

▸ **subscribe**(`observer`): [`TUnSubscribe`](../modules.md#tunsubscribe)

#### Parameters

| Name       | Type                                             |
| :--------- | :----------------------------------------------- |
| `observer` | [`IObserver`](../interfaces/IObserver.md)\<`V`\> |

#### Returns

[`TUnSubscribe`](../modules.md#tunsubscribe)

#### Defined in

src/packages/iswork/src/message/message-observable.ts:17

---

### create

▸ **create**\<`V`\>(`subscribeCallback`): [`Observable`](Observable.md)\<`V`\>

#### Type parameters

| Name |
| :--- |
| `V`  |

#### Parameters

| Name                | Type                                                            |
| :------------------ | :-------------------------------------------------------------- |
| `subscribeCallback` | [`TSubscribeCallback`](../modules.md#tsubscribecallback)\<`V`\> |

#### Returns

[`Observable`](Observable.md)\<`V`\>

#### Defined in

src/packages/iswork/src/message/message-observable.ts:21
