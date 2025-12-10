[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ModelCreateNoId

# Type Alias: ModelCreateNoId\<Model\>

> **ModelCreateNoId**\<`Model`\> = `Omit`\<`Model`, `"id"` \| [`ModelMethod`](ModelMethod.md)\>

Defined in: orm/types/model.ts:34

创建模型类型（不包含 ID）

## Type Parameters

### Model

`Model` _extends_ [`BaseModel`](../classes/BaseModel.md)

继承自 BaseModel 的模型类型

## Description

定义创建新模型时的数据结构，排除 ID 和方法
