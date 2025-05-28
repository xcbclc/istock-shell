[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / EventEmitter

# Class: EventEmitter

Defined in: src/packages/util/src/event/event-emitter.ts:44

事件发射器类
提供事件的注册、取消注册和触发功能
支持一次性事件和异步事件处理

## Example

```typescript
const emitter = new EventEmitter();

// 注册事件监听器
emitter.on('test', (data) => {
  console.log('收到数据:', data);
});

// 触发事件
emitter.emit('test', { message: 'Hello World' });
```

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

#### Returns

`EventEmitter`

## Accessors

### events

#### Get Signature

> **get** **events**(): [`Event`](../interfaces/Event.md)\<`any`\>[]

Defined in: src/packages/util/src/event/event-emitter.ts:56

获取所有已注册的事件列表

##### Returns

[`Event`](../interfaces/Event.md)\<`any`\>[]

事件数组的只读副本

## Methods

### emit()

> **emit**\<`T`\>(`type`, `payload?`): `Promise`\<`void`\>

Defined in: src/packages/util/src/event/event-emitter.ts:138

触发指定类型的事件
按注册顺序依次执行所有匹配的事件处理函数
支持异步处理函数，会等待每个处理函数完成后再执行下一个

#### Type Parameters

##### T

`T`

事件载荷的类型

#### Parameters

##### type

`string`

事件类型名称

##### payload?

`T`

可选，传递给事件处理函数的数据

#### Returns

`Promise`\<`void`\>

Promise<void> - 当所有事件处理函数执行完成后解析

#### Example

```typescript
// 触发事件并传递数据
await emitter.emit('dataUpdate', { id: 1, name: '新数据' });

// 触发无载荷事件
await emitter.emit('refresh');
```

---

### off()

> **off**\<`T`\>(`type`, `handler?`): `void`

Defined in: src/packages/util/src/event/event-emitter.ts:112

移除事件监听器
可以移除指定类型的所有监听器，或移除特定的处理函数

#### Type Parameters

##### T

`T`

事件载荷的类型

#### Parameters

##### type

`string`

事件类型名称

##### handler?

`EventHandler`\<`T`\>

可选，指定要移除的处理函数。如果不提供，则移除该类型的所有监听器

#### Returns

`void`

#### Example

```typescript
// 移除特定处理函数
emitter.off('userLogin', specificHandler);

// 移除所有 userLogin 事件监听器
emitter.off('userLogin');
```

---

### on()

> **on**\<`T`\>(`type`, `handler`): `void`

Defined in: src/packages/util/src/event/event-emitter.ts:74

注册事件监听器
每次触发指定类型的事件时都会执行处理函数

#### Type Parameters

##### T

`T`

事件载荷的类型

#### Parameters

##### type

`string`

事件类型名称

##### handler

`EventHandler`\<`T`\>

事件处理函数

#### Returns

`void`

#### Example

```typescript
emitter.on('userLogin', (user) => {
  console.log(`用户 ${user.name} 已登录`);
});
```

---

### once()

> **once**\<`T`\>(`type`, `handler`): `void`

Defined in: src/packages/util/src/event/event-emitter.ts:92

注册一次性事件监听器
只在第一次触发指定类型的事件时执行，执行后自动移除

#### Type Parameters

##### T

`T`

事件载荷的类型

#### Parameters

##### type

`string`

事件类型名称

##### handler

`EventHandler`\<`T`\>

事件处理函数

#### Returns

`void`

#### Example

```typescript
emitter.once('appReady', () => {
  console.log('应用已准备就绪');
});
```
