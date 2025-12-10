[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Model

# Function: Model()

模型装饰器实现

## Description

模型装饰器的具体实现，支持多种参数形式

## Param

模型名称或配置选项

## Param

可选的配置选项

## Call Signature

> **Model**(`options?`): `ClassDecorator`

Defined in: orm/decorators/model/Model.ts:25

模型装饰器

### Parameters

#### options?

[`DecoratorModelOptions`](../type-aliases/DecoratorModelOptions.md)

模型配置选项

### Returns

`ClassDecorator`

类装饰器函数

### Description

用于标记类为 ORM 模型，并设置模型的配置选项

### Example

```typescript
@Model({ tableName: 'users' })
class User {
  id: number;
  name: string;
}
```

## Call Signature

> **Model**(`name?`, `options?`): `ClassDecorator`

Defined in: orm/decorators/model/Model.ts:42

模型装饰器（带名称）

### Parameters

#### name?

`string`

模型名称

#### options?

[`DecoratorModelOptions`](../type-aliases/DecoratorModelOptions.md)

模型配置选项

### Returns

`ClassDecorator`

类装饰器函数

### Description

用于标记类为 ORM 模型，并指定模型名称和配置选项

### Example

```typescript
@Model('User', { tableName: 'users' })
class UserModel {
  id: number;
  name: string;
}
```
