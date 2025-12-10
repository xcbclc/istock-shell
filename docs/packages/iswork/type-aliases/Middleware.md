[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Middleware

# Type Alias: Middleware()\<T\>

> **Middleware**\<`T`\> = (`ctx`, `next`) => `any`

Defined in: types/middleware.ts:24

中间件函数类型

## Type Parameters

### T

`T` = `any`

上下文对象的类型，默认为 any

## Parameters

### ctx

`T`

上下文对象，包含请求和响应相关信息

### next

() => `any`

下一个中间件函数，调用它将执行下一个中间件

## Returns

`any`

中间件处理结果

## Description

定义中间件函数的标准签名，用于处理请求和响应的中间逻辑

## Example

```typescript
// 定义一个日志中间件
const loggerMiddleware: Middleware<{ url: string }> = (ctx, next) => {
  console.log(`Request: ${ctx.url}`);
  const result = next();
  console.log('Response sent');
  return result;
};
```
