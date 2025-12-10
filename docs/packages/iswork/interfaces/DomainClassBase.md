[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DomainClassBase

# Interface: DomainClassBase\<T\>

Defined in: interfaces/domain.ts:30

领域类基础接口

## Description

定义领域类的基础结构，允许任意属性的动态扩展

## Example

```typescript
// 实现领域类基础接口
class UserDomain implements DomainClassBase {
  id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // 可以添加任意其他属性
  [key: string]: any;
}
```

## Extends

- [`AnyClass`](AnyClass.md)\<`T`\>

## Type Parameters

### T

`T` = `any`

## Indexable

\[`key`: `string`\]: `any`

允许任意字符串键的动态属性

\[`k`: `symbol`\]: `any`

## Constructors

### Constructor

> **new DomainClassBase**(...`args`): `T`

Defined in: interfaces/domain.ts:30

类构造器，接受任意参数并返回类型 T 的实例

#### Parameters

##### args

...`any`[]

#### Returns

`T`

#### Inherited from

[`AnyClass`](AnyClass.md).[`constructor`](AnyClass.md#constructor)
