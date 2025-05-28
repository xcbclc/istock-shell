[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isConstructorStr

# Function: isConstructorStr()

> **isConstructorStr**(`val`): `val is "constructor"`

Defined in: src/packages/util/src/is.ts:367

判断一个值是否为字符串 'constructor'
用于防止原型污染攻击，检查属性名是否为危险的 'constructor' 字符串

## Parameters

### val

`any`

要检测的值

## Returns

`val is "constructor"`

如果值严格等于字符串 'constructor' 则返回 true，否则返回 false

## Example

```typescript
isConstructorStr('constructor'); // true
isConstructorStr('Constructor'); // false
isConstructorStr('prototype'); // false
```
