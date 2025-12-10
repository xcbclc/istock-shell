[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ValueProvider

# Interface: ValueProvider\<Class\>

Defined in: interfaces/provider.ts:65

值提供者接口

## Description

使用预定义值作为提供者的接口定义

## Example

```typescript
const valueProvider: ValueProvider<string> = {
  provide: 'CONFIG_TOKEN',
  useValue: 'production',
};
```

## Extends

- [`BaseProvider`](BaseProvider.md)\<`Class`\>

## Type Parameters

### Class

`Class` = `unknown`

值的类型，默认为 unknown

## Properties

### provide

> **provide**: [`InjectionToken`](../type-aliases/InjectionToken.md)\<`Class`\>

Defined in: interfaces/provider.ts:16

注入令牌，用于标识要注入的依赖

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`provide`](BaseProvider.md#provide)

---

### useValue

> **useValue**: `Class`

Defined in: interfaces/provider.ts:67

要提供的值
