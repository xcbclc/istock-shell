[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getInjectMetadata

# Function: getInjectMetadata()

> **getInjectMetadata**(`target`, `propertyKey`): `undefined` \| (`undefined` \| [`InjectionToken`](../type-aliases/InjectionToken.md))[]

Defined in: ioc/decorators/inject.ts:51

获取注入元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

### propertyKey

`string`

属性键（通常为构造函数名）

## Returns

`undefined` \| (`undefined` \| [`InjectionToken`](../type-aliases/InjectionToken.md))[]

注入令牌数组，如果不存在则返回 undefined

## Description

从指定类的构造函数中获取注入装饰器设置的元数据

## Example

```typescript
class UserService {
  constructor(@Inject('CONFIG') config: Config) {}
}

const metadata = getInjectMetadata(UserService, 'constructor');
console.log(metadata); // ['CONFIG']
```
