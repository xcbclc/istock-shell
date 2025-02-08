---
title: Fieldset
description: 用于对表单中的控制元素进行分组。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Fieldset 字段集

**用于对相关表单元素进行分组的容器。它包括作为标题的字段集图例和作为描述的字段集标签。。**

## 何时使用
需要对表单元素进行分组时使用。

## 用法演示
<IStockShellUiExample src="./example/FieldSetDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetStyle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetMultiple.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetLogin.svelte"></IStockShellUiExample>

## API
### Fieldset属性说明
| 属性名           | 说明    | 类型        | 默认值                  |
|---------------|-------|-----------|-----------------------------|
| title       | 字段集标题 | `string`  |               ''           |

### Field属性说明
| 属性名   | 说明         | 类型                                      | 默认值                  |
|-------|------------|-----------------------------------------|---------------------------|
| label | 字段标签名或标签配置 | `string` \| [`FieldLabel`](#fieldlabel) |                         |

### FieldLabel
```typescript
export type FieldLabel = {
    title?: string;
    position?: 'before' | 'after';
  };
```