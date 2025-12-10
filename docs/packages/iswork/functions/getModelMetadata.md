[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getModelMetadata

# Function: getModelMetadata()

> **getModelMetadata**(`target`): `undefined` \| [`DecoratorModelOptions`](../type-aliases/DecoratorModelOptions.md)

Defined in: orm/decorators/model/Model.ts:76

获取模型元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

## Returns

`undefined` \| [`DecoratorModelOptions`](../type-aliases/DecoratorModelOptions.md)

模型元数据，如果不存在则返回 undefined

## Description

从指定类中获取模型装饰器设置的元数据

## Example

```typescript
@Model('User')
class UserModel {}

const metadata = getModelMetadata(UserModel);
console.log(metadata?.name); // 'User'
```
