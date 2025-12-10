[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / registerAndWrapHandler

# Function: registerAndWrapHandler()

> **registerAndWrapHandler**\<`Decorator`\>(`decoratorRegister`, `decorator`): `Decorator`\[`"handler"`\]

Defined in: decorators/index.ts:63

注册装饰器并包装处理函数

## Type Parameters

### Decorator

`Decorator` _extends_ `AbstractDecorator`

装饰器类型，必须继承自 AbstractDecorator

## Parameters

### decoratorRegister

`DecoratorRegister`

装饰器注册器实例

### decorator

(`key?`) => `Decorator`

装饰器构造函数

## Returns

`Decorator`\[`"handler"`\]

包装后的装饰器处理函数

## Description

将装饰器注册到装饰器注册器中，并返回包装后的处理函数

## Example

```typescript
const handler = registerAndWrapHandler(register, MyDecorator);
// 使用返回的处理函数作为装饰器
@handler('param')
class MyClass {}
```
