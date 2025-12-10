[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSourceAllOptions

# Type Alias: DataSourceAllOptions

> **DataSourceAllOptions** = `object`

Defined in: orm/types/data-source.ts:112

所有数据源配置选项类型

## Description

定义所有支持的数据源类型及其对应的配置选项

## Example

```typescript
const allOptions: DataSourceAllOptions = {
  indexedDB: indexedDBOptions,
  fetch: fetchOptions,
  memoryDB: memoryOptions,
};
```

## Properties

### fetch

> **fetch**: [`DataSourceFetchOptions`](DataSourceFetchOptions.md)

Defined in: orm/types/data-source.ts:116

Fetch 数据源配置

---

### indexedDB

> **indexedDB**: [`DataSourceIndexedDBOptions`](DataSourceIndexedDBOptions.md)

Defined in: orm/types/data-source.ts:114

IndexedDB 数据源配置

---

### memoryDB

> **memoryDB**: [`DataSourceMemoryDBOptions`](DataSourceMemoryDBOptions.md)

Defined in: orm/types/data-source.ts:118

内存数据库数据源配置
