[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Index

# Function: Index()

索引装饰器实现

## Description

索引装饰器的具体实现，支持多种参数形式

## Param

索引名称或配置选项

## Param

可选的配置选项

## Call Signature

> **Index**(`options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/Index.ts:27

索引装饰器

### Parameters

#### options?

[`DecoratorIndexOptions`](../type-aliases/DecoratorIndexOptions.md)

索引配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库索引，并设置索引的配置选项

### Example

```typescript
class User {
  @Index({ unique: true })
  email: string;

  @Index({ type: 'btree' })
  name: string;
}
```

## Call Signature

> **Index**(`name`, `options?`): `PropertyDecorator`

Defined in: orm/decorators/columns/Index.ts:46

索引装饰器（带名称）

### Parameters

#### name

`string`

索引名称

#### options?

[`DecoratorIndexOptions`](../type-aliases/DecoratorIndexOptions.md)

索引配置选项

### Returns

`PropertyDecorator`

属性装饰器函数

### Description

用于标记属性为数据库索引，并指定索引名称和配置选项

### Example

```typescript
class User {
  @Index('idx_user_email', { unique: true })
  email: string;

  @Index('idx_user_name')
  name: string;
}
```
