[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Field

# Variable: Field()

> `const` **Field**: (`field`) => (`target`, `propertyKey`, `parameterIndex`) => `void`

Defined in: decorators/index.ts:125

字段装饰器

装饰器处理函数

## Parameters

### field

`string`

要提取的字段名

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

创建字段参数装饰器，用于标记需要从负载中提取的字段名

## Throws

当无法找到属性键时抛出错误

## Example

```typescript
// 提取 payload.username 字段
method(@Field('username') username: string) {}
```

## Description

用于标记控制器类的字段属性
