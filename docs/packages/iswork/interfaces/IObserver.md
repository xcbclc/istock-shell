[**@istock/iswork**](../README.md)

***

[@istock/iswork](../globals.md) / IObserver

# Interface: IObserver\<V\>

Defined in: src/packages/iswork/src/message/message-observable.ts:1

## Type Parameters

### V

`V` = `unknown`

## Properties

### complete()

> **complete**: (`value?`) => `void`

Defined in: src/packages/iswork/src/message/message-observable.ts:4

#### Parameters

##### value?

`V`

#### Returns

`void`

***

### error()

> **error**: (`err`) => `void`

Defined in: src/packages/iswork/src/message/message-observable.ts:3

#### Parameters

##### err

`any`

#### Returns

`void`

***

### next()

> **next**: (`value`) => `void`

Defined in: src/packages/iswork/src/message/message-observable.ts:2

#### Parameters

##### value

`V`

#### Returns

`void`
