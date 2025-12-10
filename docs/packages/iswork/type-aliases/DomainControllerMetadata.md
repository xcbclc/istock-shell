[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DomainControllerMetadata

# Type Alias: DomainControllerMetadata

> **DomainControllerMetadata** = `object`

Defined in: types/domain.ts:87

域控制器元数据类型

## Description

定义域中控制器的元数据结构

## Example

```typescript
const controllerMetadata: DomainControllerMetadata = {
  class: new Map(),
  method: new Map(),
};
```

## Properties

### class

> **class**: [`ScanClassMetadata`](ScanClassMetadata.md)

Defined in: types/domain.ts:89

类级别的扫描元数据

---

### method

> **method**: [`ScanPropertyMetadataMap`](ScanPropertyMetadataMap.md)

Defined in: types/domain.ts:91

方法级别的扫描元数据映射
