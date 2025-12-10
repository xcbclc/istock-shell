[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Domain

# Variable: Domain()

> `const` **Domain**: (`metadata`) => (`target`) => `void`

Defined in: decorators/index.ts:86

领域装饰器

装饰器处理函数

## Parameters

### metadata

[`DomainMetadata`](../type-aliases/DomainMetadata.md)

域元数据配置

## Returns

类装饰器函数

> (`target`): `void`

### Parameters

#### target

`Function`

### Returns

`void`

## Description

返回用于标记和配置域类的装饰器函数

## Example

```typescript
const decorator = new DomainDecorator();
const classDecorator = decorator.handler({ name: 'MyDomain' });

@classDecorator
class MyDomain {}
```

## Description

用于标记领域类的装饰器
