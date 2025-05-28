[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isFunction

# Function: isFunction()

> **isFunction**(`val`): `val is Function`

Defined in: src/packages/util/src/is.ts:258

判断一个值是否为函数（包括异步函数）

## Parameters

### val

`any`

要检测的值

## Returns

`val is Function`

如果值是函数则返回 true，否则返回 false

## Example

```typescript
isFunction(() => {}); // true
isFunction(async () => {}); // true
isFunction(function () {}); // true
isFunction('function'); // false
```
