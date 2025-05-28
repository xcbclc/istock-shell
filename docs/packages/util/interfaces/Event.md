[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / Event

# Interface: Event\<T\>

Defined in: src/packages/util/src/event/event-emitter.ts:17

事件对象接口定义
描述了事件的基本结构

## Type Parameters

### T

`T` = `unknown`

事件载荷的类型，默认为 unknown

## Properties

### handler

> **handler**: `EventHandler`\<`T`\>

Defined in: src/packages/util/src/event/event-emitter.ts:21

事件处理函数

---

### once?

> `optional` **once**: `boolean`

Defined in: src/packages/util/src/event/event-emitter.ts:23

是否只触发一次，可选属性

---

### type

> **type**: `string`

Defined in: src/packages/util/src/event/event-emitter.ts:19

事件类型名称
