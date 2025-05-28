[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isStream

# Function: isStream()

> **isStream**(`val`): `boolean`

Defined in: src/packages/util/src/is.ts:276

判断一个值是否为流对象（Stream）
通过检查对象是否具有 pipe 方法来判断

## Parameters

### val

`any`

要检测的值

## Returns

`boolean`

如果值是流对象则返回 true，否则返回 false

## Example

```typescript
const stream = { pipe: () => {} };
isStream(stream); // true
isStream({}); // false
```
