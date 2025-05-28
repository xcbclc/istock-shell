[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ApplicationContext

# Class: ApplicationContext

Defined in: src/packages/iswork/src/application/context.ts:8

iswork的上下文对象

## Constructors

### Constructor

> **new ApplicationContext**(`app`, `message`, `options`): `ApplicationContext`

Defined in: src/packages/iswork/src/application/context.ts:22

#### Parameters

##### app

[`Application`](Application.md)

##### message

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### options

[`TApplicationContextOptions`](../type-aliases/TApplicationContextOptions.md) = `{}`

#### Returns

`ApplicationContext`

## Properties

### cmdp

> **cmdp**: [`Cmdp`](Cmdp.md)

Defined in: src/packages/iswork/src/application/context.ts:11

---

### message

> **message**: [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/application/context.ts:12

## Accessors

### app

#### Get Signature

> **get** **app**(): [`Application`](Application.md)

Defined in: src/packages/iswork/src/application/context.ts:18

##### Returns

[`Application`](Application.md)

---

### options

#### Get Signature

> **get** **options**(): [`TApplicationContextOptions`](../type-aliases/TApplicationContextOptions.md)

Defined in: src/packages/iswork/src/application/context.ts:14

##### Returns

[`TApplicationContextOptions`](../type-aliases/TApplicationContextOptions.md)

## Methods

### create()

> `static` **create**(`app`, `message`, `options`): `ApplicationContext`

Defined in: src/packages/iswork/src/application/context.ts:31

#### Parameters

##### app

[`Application`](Application.md)

##### message

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### options

[`TApplicationContextOptions`](../type-aliases/TApplicationContextOptions.md) = `{}`

#### Returns

`ApplicationContext`
