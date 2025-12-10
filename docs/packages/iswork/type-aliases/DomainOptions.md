[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DomainOptions

# Type Alias: DomainOptions

> **DomainOptions** = `object`

Defined in: types/domain.ts:67

域选项类型

## Description

定义域的配置选项

## Example

```typescript
const options: DomainOptions = {
  isGlobal: true,
  isRootDomain: false,
};
```

## Properties

### isGlobal?

> `optional` **isGlobal**: `boolean`

Defined in: types/domain.ts:69

是否为全局域

---

### isRootDomain?

> `optional` **isRootDomain**: `boolean`

Defined in: types/domain.ts:71

是否为根域

---

### parentDomain?

> `optional` **parentDomain**: `Domain`

Defined in: types/domain.ts:73

父域实例
