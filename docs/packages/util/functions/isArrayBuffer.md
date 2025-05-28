[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isArrayBuffer

# Function: isArrayBuffer()

> **isArrayBuffer**(`val`): `val is ArrayBuffer`

Defined in: src/packages/util/src/is.ts:76

判断一个值是否为 ArrayBuffer

## Parameters

### val

`any`

要检测的值

## Returns

`val is ArrayBuffer`

如果值是 ArrayBuffer 则返回 true，否则返回 false

## Example

```typescript
isArrayBuffer(new ArrayBuffer(8)); // true
isArrayBuffer(new Uint8Array(8)); // false
isArrayBuffer([]); // false
```
