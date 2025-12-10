[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / PrimaryColumn

# Function: PrimaryColumn()

主键列装饰器实现

## Description

主键列装饰器的具体实现，支持多种参数形式，默认设置 primary: true 和 autoIncrement: true

## Param

列类型或配置选项

## Param

可选的配置选项

## Call Signature

> **PrimaryColumn**(`options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/PrimaryColumn.ts:27

主键列装饰器

### Parameters

#### options?

[`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

主键列配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库主键列，默认启用自动递增

### Example

```typescript
class User {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn({ autoIncrement: false })
  uuid: string;
}
```

## Call Signature

> **PrimaryColumn**(`type`, `options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/PrimaryColumn.ts:46

主键列装饰器（带类型）

### Parameters

#### type

`string`

主键列数据类型

#### options?

[`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

主键列配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库主键列，并指定列类型和配置选项

### Example

```typescript
class User {
  @PrimaryColumn('int')
  id: number;

  @PrimaryColumn('varchar', { length: 36 })
  uuid: string;
}
```
