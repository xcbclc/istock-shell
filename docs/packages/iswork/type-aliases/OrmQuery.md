[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / OrmQuery

# Type Alias: OrmQuery

> **OrmQuery** = `string` \| [`QueryParamsOptions`](../interfaces/QueryParamsOptions.md) \| [`QueryBuilder`](../classes/QueryBuilder.md)

Defined in: orm/types/query-builder.ts:29

ORM 查询参数类型

## Description

定义 ORM 查询可接受的参数类型，支持字符串、查询选项对象或查询构建器

## Example

```typescript
const query1: OrmQuery = 'SELECT * FROM users';
const query2: OrmQuery = { where: { name: 'John' } };
const query3: OrmQuery = new QueryBuilder().select('*').from('users');
```
