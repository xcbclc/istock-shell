[@istock/iswork](../README.md) / [Exports](../modules.md) / IFactoryProvider

# Interface: IFactoryProvider\<Class\>

factory-provider

## Type parameters

| Name    | Type      |
| :------ | :-------- |
| `Class` | `unknown` |

## Hierarchy

- [`BaseProvider`](BaseProvider.md)\<`Class`\>

  ↳ **`IFactoryProvider`**

## Table of contents

### Properties

- [provide](IFactoryProvider.md#provide)
- [useFactory](IFactoryProvider.md#usefactory)

## Properties

### provide

• **provide**: [`TInjectionToken`](../modules.md#tinjectiontoken)\<`Class`\>

#### Inherited from

[BaseProvider](BaseProvider.md).[provide](BaseProvider.md#provide)

#### Defined in

src/packages/iswork/src/interfaces/provider.ts:6

---

### useFactory

• **useFactory**: (...`arg`: `unknown`[]) => `Class`

#### Type declaration

▸ (`...arg`): `Class`

##### Parameters

| Name     | Type        |
| :------- | :---------- |
| `...arg` | `unknown`[] |

##### Returns

`Class`

#### Defined in

src/packages/iswork/src/interfaces/provider.ts:20
