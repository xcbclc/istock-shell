[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / findByKeyForValue

# Function: findByKeyForValue()

> **findByKeyForValue**\<`T`\>(`array`, `value`, `key`): `undefined` \| `T`

Defined in: src/packages/util/src/array.ts:11

根据指定 key 和 value 查找数组元素，返回第一个匹配的元素。

## Type Parameters

### T

`T`

## Parameters

### array

`T`[]

要查找的数组

### value

`T`\[keyof `T`\]

需要匹配的值

### key

keyof `T`

用于查找的 key

## Returns

`undefined` \| `T`

返回找到的元素或 undefined

## Example

```ts
findByKeyForValue([{ id: 1 }, { id: 2 }], 2, 'id'); // {id: 2}
```
