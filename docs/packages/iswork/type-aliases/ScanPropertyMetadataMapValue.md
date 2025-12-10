[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ScanPropertyMetadataMapValue

# Type Alias: ScanPropertyMetadataMapValue\<Value\>

> **ScanPropertyMetadataMapValue**\<`Value`\> = `object`

Defined in: types/metadata-scanner.ts:25

属性元数据映射值类型

## Description

用于存储属性元数据的映射值，包含信息记录和列表

## Type Parameters

### Value

`Value` = `unknown`

元数据值的类型，默认为 unknown

## Properties

### info

> **info**: `Record`\<`string` \| `symbol`, `Value`\>

Defined in: types/metadata-scanner.ts:27

属性元数据信息记录

---

### list

> **list**: \[`string` \| `symbol`, `Value`\][]

Defined in: types/metadata-scanner.ts:29

属性元数据列表
