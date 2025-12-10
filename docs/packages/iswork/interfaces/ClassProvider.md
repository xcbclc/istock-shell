[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ClassProvider

# Interface: ClassProvider\<Class\>

Defined in: interfaces/provider.ts:31

类提供者接口

## Description

使用类构造函数作为提供者的接口定义

## Example

```typescript
const classProvider: ClassProvider<MyService> = {
  provide: MyService,
  useClass: MyService,
};
```

## Extends

- [`BaseProvider`](BaseProvider.md)\<`Class`\>

## Type Parameters

### Class

`Class` = `unknown`

类的实例类型，默认为 unknown

## Properties

### provide

> **provide**: [`InjectionToken`](../type-aliases/InjectionToken.md)\<`Class`\>

Defined in: interfaces/provider.ts:16

注入令牌，用于标识要注入的依赖

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`provide`](BaseProvider.md#provide)

---

### useClass

> **useClass**: [`AnyClass`](AnyClass.md)\<`Class`\>

Defined in: interfaces/provider.ts:33

要使用的类构造函数
