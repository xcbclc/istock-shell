[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdRouteOptions

# Variable: CmdRouteOptions()

> `const` **CmdRouteOptions**: \{(`paramKey`): `ParameterDecorator`; (`paramKey`): `ParameterDecorator`; (`options`): `ParameterDecorator`; \}

Defined in: decorators/index.ts:107

命令路由选项装饰器

## Call Signature

> (`paramKey`): `ParameterDecorator`

装饰器处理函数重载 - 字符串参数

### Parameters

#### paramKey

`string`

选项字段名

### Returns

`ParameterDecorator`

参数装饰器函数

### Description

使用单个字段名提取选项值

## Call Signature

> (`paramKey`): `ParameterDecorator`

装饰器处理函数重载 - 字符串数组参数

### Parameters

#### paramKey

`string`[]

选项字段名数组

### Returns

`ParameterDecorator`

参数装饰器函数

### Description

使用多个字段名提取选项值（优先级顺序）

## Call Signature

> (`options`): `ParameterDecorator`

装饰器处理函数重载 - 选项配置对象

### Parameters

#### options

[`ControllerMethodCmdRouteOptions`](../type-aliases/ControllerMethodCmdRouteOptions.md)

选项配置对象

### Returns

`ParameterDecorator`

参数装饰器函数

### Description

使用完整的选项配置

## Description

用于配置命令路由的选项参数
