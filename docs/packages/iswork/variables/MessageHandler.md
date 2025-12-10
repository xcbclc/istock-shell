[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / MessageHandler

# Variable: MessageHandler()

> `const` **MessageHandler**: () => (`target`, `propertyKey`, `parameterIndex`) => `void`

Defined in: decorators/index.ts:179

消息处理器装饰器

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

创建参数装饰器，用于标记需要注入消息处理器的参数

## Throws

当未找到 propertyKey 时抛出错误

## Description

用于定义控制器方法的消息处理逻辑
