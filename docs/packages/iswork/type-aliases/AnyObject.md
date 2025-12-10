[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / AnyObject

# Type Alias: AnyObject\<T\>

> **AnyObject**\<`T`\> = `Record`\<`string` \| `symbol`, `T`\>

Defined in: types/any-object.ts:27

通用对象类型

## Type Parameters

### T

`T` = `any`

对象值的类型，默认为 any

## Description

定义一个可以包含任意键值对的对象类型，键可以是字符串或符号

## Example

```typescript
// 使用 AnyObject 类型
const config: AnyObject<string> = {
  host: 'localhost',
  port: '3000',
  [Symbol.for('secret')]: 'hidden-value',
};

// 动态属性访问
const userPrefs: AnyObject = {
  theme: 'dark',
  language: 'en',
  notifications: true,
};
```
