[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getPrimaryColumnMetadata

# Function: getPrimaryColumnMetadata()

> **getPrimaryColumnMetadata**(`target`): `undefined` \| [`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

Defined in: orm/decorators/columns/PrimaryColumn.ts:91

获取主键列元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

## Returns

`undefined` \| [`DecoratorColumnOptions`](../type-aliases/DecoratorColumnOptions.md)

主键列元数据，如果不存在则返回 undefined

## Description

从指定类中获取主键列装饰器设置的元数据

## Example

```typescript
class User {
  @PrimaryColumn('int')
  id: number;
}

const metadata = getPrimaryColumnMetadata(User);
console.log(metadata?.primary); // true
console.log(metadata?.autoIncrement); // true
```
