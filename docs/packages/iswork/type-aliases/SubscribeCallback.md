[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / SubscribeCallback

# Type Alias: SubscribeCallback()\<V\>

> **SubscribeCallback**\<`V`\> = (`observer`) => [`UnSubscribe`](UnSubscribe.md)

Defined in: message/message-observable.ts:46

订阅回调函数类型

## Type Parameters

### V

`V` = `unknown`

观察值的类型，默认为 unknown

## Parameters

### observer

[`ObserverBase`](../interfaces/ObserverBase.md)\<`V`\>

观察者实例

## Returns

[`UnSubscribe`](UnSubscribe.md)

UnSubscribe 取消订阅的对象

## Description

定义订阅时的回调函数签名
