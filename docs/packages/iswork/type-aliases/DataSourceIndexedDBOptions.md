[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSourceIndexedDBOptions

# Type Alias: DataSourceIndexedDBOptions

> **DataSourceIndexedDBOptions** = `object` & [`DataSourceCommonOptions`](DataSourceCommonOptions.md)

Defined in: orm/types/data-source.ts:59

IndexedDB 数据源配置选项类型

## Type declaration

### dbName

> **dbName**: `string`

数据库名称

### version

> **version**: `number`

数据库版本

## Description

定义 IndexedDB 数据源的特定配置选项

## Example

```typescript
const indexedDBOptions: DataSourceIndexedDBOptions = {
  name: 'default',
  type: 'indexedDB',
  entities: [UserModel],
  dbName: 'myApp',
  version: 1,
};
```
