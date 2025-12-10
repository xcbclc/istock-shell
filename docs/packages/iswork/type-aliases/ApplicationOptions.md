[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ApplicationOptions

# Type Alias: ApplicationOptions

> **ApplicationOptions** = `object` & [`ApplicationEventOptions`](ApplicationEventOptions.md)

Defined in: types/application.ts:37

应用程序选项类型

## Type declaration

### domainPath

> **domainPath**: `string`

域路径

### middlewares

> **middlewares**: [`Middleware`](Middleware.md)[]

中间件数组

## Description

定义应用程序的完整配置选项，包括中间件、域路径和事件选项

## Example

```typescript
const appOptions: ApplicationOptions = {
  middlewares: [authMiddleware, loggerMiddleware],
  domainPath: '/api/v1',
  emit: (message) => console.log(message),
};
```
