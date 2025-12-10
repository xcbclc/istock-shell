[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Observable

# Class: Observable\<V\>

Defined in: message/message-observable.ts:87

可观察对象类

## Description

实现观察者模式的核心类，支持订阅和消息推送机制

## Example

```typescript
// 创建可观察对象
const observable = new Observable<number>((observer) => {
  let count = 0;
  const interval = setInterval(() => {
    observer.next(++count);
    if (count >= 5) {
      observer.complete(count);
      clearInterval(interval);
    }
  }, 1000);

  return {
    unsubscribe: () => clearInterval(interval),
  };
});

// 订阅观察
const subscription = observable.subscribe({
  next: (value) => console.log('值:', value),
  error: (err) => console.error('错误:', err),
  complete: (value) => console.log('完成:', value),
});

// 取消订阅
subscription.unsubscribe();
```

## Type Parameters

### V

`V` = `unknown`

观察值的类型，默认为 unknown

## Constructors

### Constructor

> **new Observable**\<`V`\>(`subscribeCallback`): `Observable`\<`V`\>

Defined in: message/message-observable.ts:96

可观察对象构造函数

#### Parameters

##### subscribeCallback

[`SubscribeCallback`](../type-aliases/SubscribeCallback.md)\<`V`\>

订阅回调函数，定义订阅时的行为

#### Returns

`Observable`\<`V`\>

#### Description

创建一个新的可观察对象实例

## Methods

### subscribe()

> **subscribe**(`observer`): [`UnSubscribe`](../type-aliases/UnSubscribe.md)

Defined in: message/message-observable.ts:114

订阅观察者

#### Parameters

##### observer

[`ObserverBase`](../interfaces/ObserverBase.md)\<`V`\>

观察者实例

#### Returns

[`UnSubscribe`](../type-aliases/UnSubscribe.md)

UnSubscribe 取消订阅的对象

#### Description

注册一个观察者，开始接收推送的值

#### Example

```typescript
const subscription = observable.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('完成'),
});
```

---

### create()

> `static` **create**\<`V`\>(`subscribeCallback`): `Observable`\<`V`\>

Defined in: message/message-observable.ts:137

创建可观察对象

#### Type Parameters

##### V

`V`

观察值的类型

#### Parameters

##### subscribeCallback

[`SubscribeCallback`](../type-aliases/SubscribeCallback.md)\<`V`\>

订阅回调函数

#### Returns

`Observable`\<`V`\>

Observable<V> 新的可观察对象实例

#### Description

静态工厂方法，创建一个新的可观察对象实例

#### Example

```typescript
const observable = Observable.create<string>((observer) => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();

  return {
    unsubscribe: () => console.log('取消订阅'),
  };
});
```
