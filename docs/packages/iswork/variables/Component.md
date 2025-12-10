[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Component

# Variable: Component()

> `const` **Component**: \{(`name?`): `MethodDecorator`; (`options`): `MethodDecorator`; \}

Defined in: decorators/index.ts:143

组件装饰器

## Call Signature

> (`name?`): `MethodDecorator`

装饰器处理函数（组件名称）

### Parameters

#### name?

`string`

组件名称

### Returns

`MethodDecorator`

方法装饰器函数

### Description

创建一个带组件名称的方法装饰器

## Call Signature

> (`options`): `MethodDecorator`

装饰器处理函数（组件配置）

### Parameters

#### options

组件元数据配置，可以是单个配置或配置数组

[`ControllerMethodComponentMetadata`](../type-aliases/ControllerMethodComponentMetadata.md) | [`ControllerMethodComponentMetadata`](../type-aliases/ControllerMethodComponentMetadata.md)[]

### Returns

`MethodDecorator`

方法装饰器函数

### Description

创建一个带组件配置的方法装饰器

## Description

用于标记控制器的组件属性
