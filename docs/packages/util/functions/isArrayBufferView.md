[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isArrayBufferView

# Function: isArrayBufferView()

> **isArrayBufferView**(`val`): `val is ArrayBuffer`

Defined in: src/packages/util/src/is.ts:344

判断一个值是否为 ArrayBuffer 的视图
ArrayBuffer 视图包括 TypedArray（如 Uint8Array、Int32Array 等）和 DataView

## Parameters

### val

`any`

要检测的值

## Returns

`val is ArrayBuffer`

如果值是 ArrayBuffer 视图则返回 true，否则返回 false

## Example

```typescript
isArrayBufferView(new Uint8Array(8)); // true
isArrayBufferView(new DataView(new ArrayBuffer(8))); // true
isArrayBufferView(new ArrayBuffer(8)); // false
isArrayBufferView([]); // false
```
