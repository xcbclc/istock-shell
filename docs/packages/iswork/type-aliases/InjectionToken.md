[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / InjectionToken

# Type Alias: InjectionToken\<Type\>

> **InjectionToken**\<`Type`\> = [`AnyClass`](../interfaces/AnyClass.md)\<`Type`\> \| `string` \| `symbol`

Defined in: types/token.ts:24

依赖注入令牌类型

## Type Parameters

### Type

`Type` = `unknown`

令牌对应的类型，默认为 unknown

## Description

用于标识依赖注入容器中的服务或值的令牌类型

## Example

```typescript
// 使用类作为令牌
const classToken: InjectionToken<MyService> = MyService;

// 使用字符串作为令牌
const stringToken: InjectionToken<string> = 'CONFIG_VALUE';

// 使用符号作为令牌
const symbolToken: InjectionToken<number> = Symbol('PORT');
```
