[@istock/iswork](../README.md) / [Exports](../modules.md) / ApplicationContext

# Class: ApplicationContext

iswork的上下文对象

## Table of contents

### Constructors

- [constructor](ApplicationContext.md#constructor)

### Properties

- [#app](ApplicationContext.md##app)
- [#options](ApplicationContext.md##options)
- [cmdp](ApplicationContext.md#cmdp)
- [message](ApplicationContext.md#message)

### Accessors

- [app](ApplicationContext.md#app)
- [options](ApplicationContext.md#options)

### Methods

- [create](ApplicationContext.md#create)

## Constructors

### constructor

• **new ApplicationContext**(`app`, `message`, `options?`): [`ApplicationContext`](ApplicationContext.md)

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `app`     | [`Application`](Application.md)                                          |
| `message` | [`TCmdpMessage`](../modules.md#tcmdpmessage)                             |
| `options` | [`TApplicationContextOptions`](../modules.md#tapplicationcontextoptions) |

#### Returns

[`ApplicationContext`](ApplicationContext.md)

#### Defined in

src/packages/iswork/src/application/context.ts:22

## Properties

### #app

• `Private` `Readonly` **#app**: [`Application`](Application.md)

#### Defined in

src/packages/iswork/src/application/context.ts:9

---

### #options

• `Private` `Readonly` **#options**: [`TApplicationContextOptions`](../modules.md#tapplicationcontextoptions)

#### Defined in

src/packages/iswork/src/application/context.ts:10

---

### cmdp

• **cmdp**: `Cmdp`

#### Defined in

src/packages/iswork/src/application/context.ts:11

---

### message

• **message**: [`TCmdpMessage`](../modules.md#tcmdpmessage)

#### Defined in

src/packages/iswork/src/application/context.ts:12

## Accessors

### app

• `get` **app**(): [`Application`](Application.md)

#### Returns

[`Application`](Application.md)

#### Defined in

src/packages/iswork/src/application/context.ts:18

---

### options

• `get` **options**(): [`TApplicationContextOptions`](../modules.md#tapplicationcontextoptions)

#### Returns

[`TApplicationContextOptions`](../modules.md#tapplicationcontextoptions)

#### Defined in

src/packages/iswork/src/application/context.ts:14

## Methods

### create

▸ **create**(`app`, `message`, `options?`): [`ApplicationContext`](ApplicationContext.md)

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `app`     | [`Application`](Application.md)                                          |
| `message` | [`TCmdpMessage`](../modules.md#tcmdpmessage)                             |
| `options` | [`TApplicationContextOptions`](../modules.md#tapplicationcontextoptions) |

#### Returns

[`ApplicationContext`](ApplicationContext.md)

#### Defined in

src/packages/iswork/src/application/context.ts:31
