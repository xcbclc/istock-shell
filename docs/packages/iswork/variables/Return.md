[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Return

# Variable: Return()

> `const` **Return**: \{(`pipeName`): `MethodDecorator`; (`options`): `MethodDecorator`; \}

Defined in: decorators/index.ts:152

返回值装饰器

## Call Signature

> (`pipeName`): `MethodDecorator`

装饰器处理函数重载 - 管道名称

### Parameters

#### pipeName

`string`

管道名称

### Returns

`MethodDecorator`

方法装饰器函数

## Call Signature

> (`options`): `MethodDecorator`

装饰器处理函数重载 - 配置选项

### Parameters

#### options

返回数据处理配置选项

[`ControllerMethodReturnMetadata`](../type-aliases/ControllerMethodReturnMetadata.md) | [`ControllerMethodReturnMetadata`](../type-aliases/ControllerMethodReturnMetadata.md)[]

### Returns

`MethodDecorator`

方法装饰器函数

## Description

用于定义控制器方法的返回值处理
