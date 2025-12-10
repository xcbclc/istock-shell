[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Meta

# Variable: Meta()

> `const` **Meta**: (`field`) => (`target`, `propertyKey`, `parameterIndex`) => `void`

Defined in: decorators/index.ts:131

元数据装饰器

装饰器处理函数

## Parameters

### field

`string`

要提取的元数据字段名

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

返回用于标记参数从命令元数据中提取指定字段值的装饰器函数

## Throws

当未找到 propertyKey 时抛出错误

## Example

```typescript
// 提取 userId 字段
@Meta('userId') userId: string

// 提取 timestamp 字段
@Meta('timestamp') timestamp: number
```

## Description

用于为控制器或方法添加元数据信息
