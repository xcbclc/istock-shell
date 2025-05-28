[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isPlainObject

# Function: isPlainObject()

> **isPlainObject**(`val`): val is Record\<string \| symbol, any\>

Defined in: src/packages/util/src/is.ts:193

判断一个值是否为纯对象（Plain Object）
纯对象是指通过对象字面量 {} 或 new Object() 创建的对象

## Parameters

### val

`any`

要检测的值

## Returns

val is Record\<string \| symbol, any\>

如果值是纯对象则返回 true，否则返回 false

## Example

```typescript
isPlainObject({}); // true
isPlainObject({ a: 1 }); // true
isPlainObject([]); // false
isPlainObject(new Date()); // false
```
