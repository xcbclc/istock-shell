[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DataSourceCommonOptions

# Type Alias: DataSourceCommonOptions

> **DataSourceCommonOptions** = `object`

Defined in: orm/types/data-source.ts:32

数据源通用配置选项类型

## Description

定义所有数据源类型共有的配置选项

## Example

```typescript
const commonOptions: DataSourceCommonOptions = {
  name: 'default',
  type: 'indexedDB',
  entities: [UserModel, PostModel],
  dbName: 'myApp',
  version: 1,
};
```

## Properties

### dbName?

> `optional` **dbName**: `string`

Defined in: orm/types/data-source.ts:40

数据库名称（可选）

---

### entities

> **entities**: [`ModelType`](ModelType.md)[]

Defined in: orm/types/data-source.ts:38

数据源模型列表

---

### name

> **name**: `string`

Defined in: orm/types/data-source.ts:34

数据源名称

---

### type

> **type**: [`DataSourceType`](DataSourceType.md)

Defined in: orm/types/data-source.ts:36

数据源类型

---

### version?

> `optional` **version**: `number` \| `string`

Defined in: orm/types/data-source.ts:42

数据源版本（可选）
