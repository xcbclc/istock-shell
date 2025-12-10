[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DecoratorAllColumnMetadata

# Type Alias: DecoratorAllColumnMetadata

> **DecoratorAllColumnMetadata** = [`DecoratorColumnMetadata`](DecoratorColumnMetadata.md) & [`DecoratorPrimaryColumnMetadata`](DecoratorPrimaryColumnMetadata.md) & [`DecoratorIndexMetadata`](DecoratorIndexMetadata.md)

Defined in: orm/types/decorator.ts:105

所有列装饰器元数据类型

## Description

合并所有列相关装饰器的元数据类型

## Example

```typescript
const metadata: DecoratorAllColumnMetadata = {
  name: 'id',
  type: 'int',
  primary: true,
  autoIncrement: true,
  indexName: 'idx_primary',
};
```
