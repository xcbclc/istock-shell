[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DriverConnectStatus

# Enumeration: DriverConnectStatus

Defined in: orm/enums/index.ts:17

驱动器连接状态枚举

## Description

定义数据库驱动器的连接状态

## Example

```typescript
if (driver.status === DriverConnectStatus.connected) {
  console.log('数据库已连接');
}
```

## Enumeration Members

### connected

> **connected**: `2`

Defined in: orm/enums/index.ts:23

已连接状态 - 数据库连接已建立

---

### connecting

> **connecting**: `1`

Defined in: orm/enums/index.ts:21

连接中状态 - 正在建立数据库连接

---

### disconnected

> **disconnected**: `3`

Defined in: orm/enums/index.ts:25

已断开状态 - 数据库连接已断开

---

### ready

> **ready**: `0`

Defined in: orm/enums/index.ts:19

就绪状态 - 驱动器已初始化但未连接
