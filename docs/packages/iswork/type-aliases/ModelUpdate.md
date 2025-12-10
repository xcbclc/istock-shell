[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ModelUpdate

# Type Alias: ModelUpdate\<Model\>

> **ModelUpdate**\<`Model`\> = `Partial`\<`Omit`\<`Model`, [`ModelMethod`](ModelMethod.md)\>\> & [`ModelOnlyId`](ModelOnlyId.md)

Defined in: orm/types/model.ts:48

更新模型类型

## Type Parameters

### Model

`Model` _extends_ [`BaseModel`](../classes/BaseModel.md)

继承自 BaseModel 的模型类型

## Description

定义更新模型时的数据结构，必须包含 ID，其他字段可选
