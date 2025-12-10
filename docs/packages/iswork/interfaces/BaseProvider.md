[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / BaseProvider

# Interface: BaseProvider\<Type\>

Defined in: interfaces/provider.ts:14

提供者基类接口

## Description

所有提供者类型的基础接口，定义了提供者的基本结构

## Extended by

- [`ClassProvider`](ClassProvider.md)
- [`FactoryProvider`](FactoryProvider.md)
- [`ValueProvider`](ValueProvider.md)

## Type Parameters

### Type

`Type` = `unknown`

提供者提供的类型，默认为 unknown

## Properties

### provide

> **provide**: [`InjectionToken`](../type-aliases/InjectionToken.md)\<`Type`\>

Defined in: interfaces/provider.ts:16

注入令牌，用于标识要注入的依赖
