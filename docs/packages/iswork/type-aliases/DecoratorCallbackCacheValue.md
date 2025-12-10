[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DecoratorCallbackCacheValue

# Type Alias: DecoratorCallbackCacheValue

> **DecoratorCallbackCacheValue** = `object`

Defined in: types/decorator-register.ts:21

装饰器回调缓存值类型

## Description

用于缓存装饰器回调信息的数据结构

## Example

```typescript
const cacheValue: DecoratorCallbackCacheValue = {
  key: 'myMethod',
  decoratorType: DecoratorType.Method,
  fn: myCallbackFunction,
  type: DecoratorCallbackType.MethodRequest,
};
```

## Properties

### decoratorType

> **decoratorType**: [`DecoratorType`](../enumerations/DecoratorType.md)

Defined in: types/decorator-register.ts:25

装饰器类型

---

### fn

> **fn**: `Function`

Defined in: types/decorator-register.ts:27

回调函数

---

### key

> **key**: `string` \| `symbol`

Defined in: types/decorator-register.ts:23

缓存键，可以是字符串或符号

---

### type

> **type**: [`DecoratorCallbackType`](../enumerations/DecoratorCallbackType.md)

Defined in: types/decorator-register.ts:29

回调类型
