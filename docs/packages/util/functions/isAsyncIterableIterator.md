[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isAsyncIterableIterator

# Function: isAsyncIterableIterator()

> **isAsyncIterableIterator**\<`T`\>(`val`): `val is AsyncIterableIterator<T, any, any>`

Defined in: src/packages/util/src/is.ts:531

判断一个值是否为异步可迭代迭代器
通过检查对象是否具有 Symbol.asyncIterator 方法来判断

## Type Parameters

### T

`T` = `unknown`

## Parameters

### val

`any`

要检测的值

## Returns

`val is AsyncIterableIterator<T, any, any>`

如果值是异步可迭代迭代器则返回 true，否则返回 false

## Example

```typescript
async function* asyncGenerator() {
  yield 1;
  yield 2;
}

const asyncIter = asyncGenerator();
isAsyncIterableIterator(asyncIter); // true
isAsyncIterableIterator({}); // false
isAsyncIterableIterator([1, 2, 3]); // false
```
