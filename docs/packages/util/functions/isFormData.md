[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isFormData

# Function: isFormData()

> **isFormData**(`val`): `val is FormData`

Defined in: src/packages/util/src/is.ts:92

判断一个值是否为 FormData

## Parameters

### val

`any`

要检测的值

## Returns

`val is FormData`

如果值是 FormData 则返回 true，否则返回 false

## Example

```typescript
isFormData(new FormData()); // true
isFormData({}); // false
isFormData(null); // false
```
