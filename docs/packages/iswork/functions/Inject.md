[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Inject

# Function: Inject()

> **Inject**(`token`): (`target`, `propertyKey`, `index`) => [`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

Defined in: ioc/decorators/inject.ts:25

注入装饰器

## Parameters

### token

[`InjectionToken`](../type-aliases/InjectionToken.md)

注入令牌，用于标识要注入的依赖

## Returns

参数装饰器函数

> (`target`, `propertyKey`, `index`): [`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

### Parameters

#### target

[`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

#### propertyKey

`string` | `symbol`

#### index

`number`

### Returns

[`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

## Description

用于标记构造函数参数需要注入的依赖，指定注入令牌

## Example

```typescript
class UserService {
  constructor(
    @Inject('CONFIG') private config: Config,
    @Inject(DatabaseService) private db: DatabaseService
  ) {}
}
```
