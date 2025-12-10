[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DecoratorColumnOptions

# Type Alias: DecoratorColumnOptions

> **DecoratorColumnOptions** = `object`

Defined in: orm/types/decorator.ts:60

列装饰器选项类型

## Description

定义

## Column

装饰器的配置选项

## Example

```typescript
const options: DecoratorColumnOptions = {
  name: 'user_name',
  type: 'varchar',
  unique: true,
};
```

## Properties

### autoIncrement?

> `optional` **autoIncrement**: `boolean`

Defined in: orm/types/decorator.ts:70

是否自增

---

### name?

> `optional` **name**: `string`

Defined in: orm/types/decorator.ts:62

字段名称

---

### primary?

> `optional` **primary**: `boolean`

Defined in: orm/types/decorator.ts:66

是否为主键

---

### type?

> `optional` **type**: `string`

Defined in: orm/types/decorator.ts:64

数据类型

---

### unique?

> `optional` **unique**: `boolean`

Defined in: orm/types/decorator.ts:68

是否数据唯一
