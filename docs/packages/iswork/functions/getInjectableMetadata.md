[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / getInjectableMetadata

# Function: getInjectableMetadata()

> **getInjectableMetadata**(`target`): `undefined` \| `boolean`

Defined in: ioc/decorators/injectable.ts:49

获取可注入元数据

## Parameters

### target

[`AnyClass`](../interfaces/AnyClass.md)

目标类

## Returns

`undefined` \| `boolean`

是否可注入的布尔值，如果不存在则返回 undefined

## Description

从指定类中获取可注入装饰器设置的元数据

## Example

```typescript
@Injectable()
class UserService {}

const isInjectable = getInjectableMetadata(UserService);
console.log(isInjectable); // true
```
