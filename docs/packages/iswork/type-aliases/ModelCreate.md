[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ModelCreate

# Type Alias: ModelCreate\<Model\>

> **ModelCreate**\<`Model`\> = `Omit`\<`Model`, [`ModelMethod`](ModelMethod.md)\> & [`ModelOnlyId`](ModelOnlyId.md)

Defined in: orm/types/model.ts:41

创建模型类型（包含 ID）

## Type Parameters

### Model

`Model` _extends_ [`BaseModel`](../classes/BaseModel.md)

继承自 BaseModel 的模型类型

## Description

定义创建模型时的数据结构，必须包含 ID
