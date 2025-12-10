[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSourceFetchOptions

# Type Alias: DataSourceFetchOptions

> **DataSourceFetchOptions** = [`FetchWrapOptions`](FetchWrapOptions.md) & [`DataSourceCommonOptions`](DataSourceCommonOptions.md)

Defined in: orm/types/data-source.ts:80

Fetch 数据源配置选项类型

## Description

定义基于 Fetch API 的数据源配置选项

## Example

```typescript
const fetchOptions: DataSourceFetchOptions = {
  name: 'api',
  type: 'fetch',
  entities: [UserModel],
  prefixUrl: 'https://api.example.com',
  requestOptions: { headers: { Authorization: 'Bearer token' } },
};
```
