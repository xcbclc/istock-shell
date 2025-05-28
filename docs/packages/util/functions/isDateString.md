[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isDateString

# Function: isDateString()

> **isDateString**(`val`): `val is string`

Defined in: src/packages/util/src/is.ts:508

判断一个字符串是否为有效的 ISO 8601 日期时间格式
支持日期格式：YYYY-MM-DD
支持日期时间格式：YYYY-MM-DDTHH:mm:ss.sssZ 或带时区偏移

## Parameters

### val

`any`

要检测的值

## Returns

`val is string`

如果字符串符合 ISO 8601 日期时间格式则返回 true，否则返回 false

## Example

```typescript
isDateString('2023-01-01'); // true
isDateString('2023-01-01T12:00:00Z'); // true
isDateString('2023-01-01T12:00:00.123+08:00'); // true
isDateString('01/01/2023'); // false
isDateString('hello'); // false
```
