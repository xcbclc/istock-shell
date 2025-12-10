[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSourceMemoryDBOptions

# Type Alias: DataSourceMemoryDBOptions

> **DataSourceMemoryDBOptions** = `object` & [`DataSourceCommonOptions`](DataSourceCommonOptions.md)

Defined in: orm/types/data-source.ts:95

内存数据库数据源配置选项类型

## Type declaration

### dbName

> **dbName**: `string`

数据库名称

## Description

定义内存数据库数据源的配置选项

## Example

```typescript
const memoryOptions: DataSourceMemoryDBOptions = {
  name: 'memory',
  type: 'memoryDB',
  entities: [UserModel],
  dbName: 'testDB',
};
```
