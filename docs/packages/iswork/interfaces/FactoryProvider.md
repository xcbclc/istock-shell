[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / FactoryProvider

# Interface: FactoryProvider\<Class\>

Defined in: interfaces/provider.ts:48

工厂提供者接口

## Description

使用工厂函数作为提供者的接口定义

## Example

```typescript
const factoryProvider: FactoryProvider<MyService> = {
  provide: MyService,
  useFactory: (dep1, dep2) => new MyService(dep1, dep2),
};
```

## Extends

- [`BaseProvider`](BaseProvider.md)\<`Class`\>

## Type Parameters

### Class

`Class` = `unknown`

工厂函数返回的类型，默认为 unknown

## Properties

### provide

> **provide**: [`InjectionToken`](../type-aliases/InjectionToken.md)\<`Class`\>

Defined in: interfaces/provider.ts:16

注入令牌，用于标识要注入的依赖

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`provide`](BaseProvider.md#provide)

---

### useFactory()

> **useFactory**: (...`arg`) => `Class`

Defined in: interfaces/provider.ts:50

工厂函数，用于创建实例

#### Parameters

##### arg

...`unknown`[]

#### Returns

`Class`
