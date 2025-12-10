[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdpResolveInfo

# Type Alias: CmdpResolveInfo

> **CmdpResolveInfo** = `object`

Defined in: types/cmdp.ts:31

CMDP 解析信息

## Description

从 CMDP 地址解析出的基本信息

## Example

```typescript
const resolveInfo: CmdpResolveInfo = {
  subDomain: 'user',
  controller: 'UserController',
  method: 'getUserInfo',
};
```

## Properties

### controller

> **controller**: `string`

Defined in: types/cmdp.ts:35

控制器名称

---

### method

> **method**: `string`

Defined in: types/cmdp.ts:37

方法名称

---

### subDomain

> **subDomain**: `string`

Defined in: types/cmdp.ts:33

子域名
