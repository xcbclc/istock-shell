[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ObserverBase

# Interface: ObserverBase\<V\>

Defined in: message/message-observable.ts:19

观察者基础接口

## Description

定义观察者的基本方法，用于处理值推送、错误和完成事件

## Example

```typescript
const observer: ObserverBase<string> = {
  next: (value) => console.log('收到值:', value),
  error: (err) => console.error('发生错误:', err),
  complete: (value) => console.log('完成:', value),
};
```

## Type Parameters

### V

`V` = `unknown`

观察值的类型，默认为 unknown

## Properties

### complete()

> **complete**: (`value?`) => `void`

Defined in: message/message-observable.ts:36

处理完成事件

#### Parameters

##### value?

`V`

可选的完成值

#### Returns

`void`

---

### error()

> **error**: (`err`) => `void`

Defined in: message/message-observable.ts:30

处理错误

#### Parameters

##### err

`any`

发生的错误

#### Returns

`void`

---

### next()

> **next**: (`value`) => `void`

Defined in: message/message-observable.ts:24

处理下一个值

#### Parameters

##### value

`V`

推送的值

#### Returns

`void`
