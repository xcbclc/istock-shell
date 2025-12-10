[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getIndexMetadata

# Function: getIndexMetadata()

> **getIndexMetadata**(`target`): `undefined` \| [`DecoratorIndexOptions`](../type-aliases/DecoratorIndexOptions.md)

Defined in: orm/decorators/columns/Index.ts:83

获取索引元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

## Returns

`undefined` \| [`DecoratorIndexOptions`](../type-aliases/DecoratorIndexOptions.md)

索引元数据，如果不存在则返回 undefined

## Description

从指定类中获取索引装饰器设置的元数据

## Example

```typescript
class User {
  @Index('idx_user_email', { unique: true })
  email: string;
}

const metadata = getIndexMetadata(User);
console.log(metadata?.indexName); // 'idx_user_email'
console.log(metadata?.unique); // true
```
