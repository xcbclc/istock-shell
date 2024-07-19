[@istock/iswork](../README.md) / [Exports](../modules.md) / IObserver

# Interface: IObserver\<V\>

## Type parameters

| Name | Type      |
| :--- | :-------- |
| `V`  | `unknown` |

## Table of contents

### Properties

- [complete](IObserver.md#complete)
- [error](IObserver.md#error)
- [next](IObserver.md#next)

## Properties

### complete

• **complete**: (`value?`: `V`) => `void`

#### Type declaration

▸ (`value?`): `void`

##### Parameters

| Name     | Type |
| :------- | :--- |
| `value?` | `V`  |

##### Returns

`void`

#### Defined in

src/packages/iswork/src/message/message-observable.ts:4

---

### error

• **error**: (`err`: `any`) => `void`

#### Type declaration

▸ (`err`): `void`

##### Parameters

| Name  | Type  |
| :---- | :---- |
| `err` | `any` |

##### Returns

`void`

#### Defined in

src/packages/iswork/src/message/message-observable.ts:3

---

### next

• **next**: (`value`: `V`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `V`  |

##### Returns

`void`

#### Defined in

src/packages/iswork/src/message/message-observable.ts:2
