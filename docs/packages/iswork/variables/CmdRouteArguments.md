[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdRouteArguments

# Variable: CmdRouteArguments()

> `const` **CmdRouteArguments**: (`index?`) => (`target`, `propertyKey`, `parameterIndex`) => `void`

Defined in: decorators/index.ts:116

命令路由参数装饰器

装饰器处理函数

## Parameters

### index?

`number`

要提取的参数位置索引，可选

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

返回用于标记参数从命令参数中提取指定位置值的装饰器函数

## Throws

当未找到 propertyKey 时抛出错误

## Example

```typescript
// 提取第0个参数
@Arguments(0) id: string

// 提取所有参数
@Arguments() args: any[]
```

## Description

用于定义命令路由的参数配置
