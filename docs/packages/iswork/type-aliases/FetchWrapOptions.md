[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / FetchWrapOptions

# Type Alias: FetchWrapOptions

> **FetchWrapOptions** = `object`

Defined in: orm/types/driver.ts:44

Fetch 包装选项类型

## Description

定义 Fetch API 的包装配置选项

## Example

```typescript
const fetchOptions: FetchWrapOptions = {
  requestOptions: {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  },
  prefixUrl: 'https://api.example.com',
};
```

## Properties

### prefixUrl?

> `optional` **prefixUrl**: `string`

Defined in: orm/types/driver.ts:48

URL 前缀

---

### requestOptions?

> `optional` **requestOptions**: `RequestInit`

Defined in: orm/types/driver.ts:46

请求配置选项
