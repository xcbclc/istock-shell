[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isFile

# Function: isFile()

> **isFile**(`val`): `val is File`

Defined in: src/packages/util/src/is.ts:225

判断一个值是否为 File 对象

## Parameters

### val

`any`

要检测的值

## Returns

`val is File`

如果值是 File 对象则返回 true，否则返回 false

## Example

```typescript
const file = new File(['content'], 'test.txt');
isFile(file); // true
isFile(new Blob(['content'])); // false
```
