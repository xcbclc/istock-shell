[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Method

# Variable: Method()

> `const` **Method**: \{(`alias`): `MethodDecorator`; (`options`): `MethodDecorator`; \}

Defined in: decorators/index.ts:137

方法装饰器

## Call Signature

> (`alias`): `MethodDecorator`

装饰器处理函数（别名参数）

### Parameters

#### alias

方法别名，可以是字符串或字符串数组

`string` | `string`[]

### Returns

`MethodDecorator`

方法装饰器函数

### Description

创建一个带别名参数的方法装饰器

## Call Signature

> (`options`): `MethodDecorator`

装饰器处理函数（配置参数）

### Parameters

#### options

[`ControllerMethodMetadata`](../type-aliases/ControllerMethodMetadata.md)

方法元数据配置

### Returns

`MethodDecorator`

方法装饰器函数

### Description

创建一个带完整配置的方法装饰器

## Description

用于标记控制器的方法
