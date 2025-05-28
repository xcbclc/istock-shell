[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / mergeObjectDeep

# Function: mergeObjectDeep()

> **mergeObjectDeep**\<`T`\>(`target`, `source`): `T`

Defined in: src/packages/util/src/merge-object.ts:12

深度合并两个对象的属性，返回合并后的新对象。

## Type Parameters

### T

`T`

## Parameters

### target

`Record`\<`string`, `any`\>

目标对象

### source

`Record`\<`string`, `any`\>

源对象

## Returns

`T`

合并后的新对象

## Example

```ts
mergeObjectDeep({ a: 1, b: { c: 2 } }, { b: { d: 3 } }); // {a: 1, b: {c: 2, d: 3}}
```
