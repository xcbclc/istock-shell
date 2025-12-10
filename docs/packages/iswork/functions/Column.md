[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Column

# Function: Column()

列装饰器实现

## Description

列装饰器的具体实现，支持多种参数形式

## Param

列类型或配置选项

## Param

可选的配置选项

## Call Signature

> **Column**(`options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/Column.ts:27

列装饰器

### Parameters

#### options?

[`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

列配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库列，并设置列的配置选项

### Example

```typescript
class User {
  @Column({ nullable: false })
  name: string;

  @Column({ default: 0 })
  age: number;
}
```

## Call Signature

> **Column**(`type`, `options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/Column.ts:46

列装饰器（带类型）

### Parameters

#### type

`string`

列数据类型

#### options?

[`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

列配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库列，并指定列类型和配置选项

### Example

```typescript
class User {
  @Column('varchar', { length: 100 })
  name: string;

  @Column('int', { default: 0 })
  age: number;
}
```
