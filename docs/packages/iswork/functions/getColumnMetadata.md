[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getColumnMetadata

# Function: getColumnMetadata()

> **getColumnMetadata**(`target`): `undefined` \| [`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

Defined in: orm/decorators/columns/Column.ts:85

获取列元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

## Returns

`undefined` \| [`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

列元数据，如果不存在则返回 undefined

## Description

从指定类中获取列装饰器设置的元数据

## Example

```typescript
class User {
  @Column('varchar')
  name: string;
}

const metadata = getColumnMetadata(User);
console.log(metadata?.type); // 'varchar'
```
