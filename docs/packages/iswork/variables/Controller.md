[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Controller

# Variable: Controller()

> `const` **Controller**: \{(): `ClassDecorator`; (`alias`): `ClassDecorator`; (`options`): `ClassDecorator`; \}

Defined in: decorators/index.ts:92

控制器装饰器

## Call Signature

> (): `ClassDecorator`

装饰器处理函数（无参数）

### Returns

`ClassDecorator`

类装饰器函数

### Description

创建一个不带参数的控制器装饰器

## Call Signature

> (`alias`): `ClassDecorator`

装饰器处理函数（别名参数）

### Parameters

#### alias

控制器别名，可以是字符串或字符串数组

`string` | `string`[]

### Returns

`ClassDecorator`

类装饰器函数

### Description

创建一个带别名参数的控制器装饰器

## Call Signature

> (`options`): `ClassDecorator`

装饰器处理函数（配置参数）

### Parameters

#### options

[`ControllerMetadata`](../type-aliases/ControllerMetadata.md)

控制器元数据配置

### Returns

`ClassDecorator`

类装饰器函数

### Description

创建一个带完整配置的控制器装饰器

## Description

用于标记控制器类的装饰器
