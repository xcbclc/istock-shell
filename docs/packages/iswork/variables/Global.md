[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Global

# Variable: Global()

> `const` **Global**: () => (`target`) => `void`

Defined in: decorators/index.ts:80

全局领域装饰器

装饰器处理函数

## Returns

类装饰器函数

> (`target`): `void`

### Parameters

#### target

`Function`

### Returns

`void`

## Description

返回用于标记类为全局域的装饰器函数

## Example

```typescript
const decorator = new GlobalDomainDecorator();
const classDecorator = decorator.handler();

@classDecorator
class MyDomain {}
```

## Description

用于标记全局领域类的装饰器
