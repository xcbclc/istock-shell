[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Payload

# Variable: Payload()

> `const` **Payload**: () => (`target`, `propertyKey`, `parameterIndex`) => `void`

Defined in: decorators/index.ts:161

负载装饰器

装饰器处理函数

## Returns

参数装饰器函数

> (`target`, `propertyKey`, `parameterIndex`): `void`

### Parameters

#### target

`object`

#### propertyKey

`undefined` | `string` | `symbol`

#### parameterIndex

`number`

### Returns

`void`

## Description

创建负载参数装饰器，用于标记需要注入完整负载数据的参数

## Throws

当无法找到属性键时抛出错误

## Example

```typescript
// 注入完整的 payload 数据
method(@Payload() data: any) {}
```

## Description

用于定义控制器方法的负载数据处理
