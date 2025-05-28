[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isBlob

# Function: isBlob()

> **isBlob**(`val`): `val is Blob`

Defined in: src/packages/util/src/is.ts:241

判断一个值是否为 Blob 对象

## Parameters

### val

`any`

要检测的值

## Returns

`val is Blob`

如果值是 Blob 对象则返回 true，否则返回 false

## Example

```typescript
isBlob(new Blob(['content'])); // true
isBlob(new File(['content'], 'test.txt')); // true (File 继承自 Blob)
isBlob('content'); // false
```
