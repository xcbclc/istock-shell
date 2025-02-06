---
title: Textarea
description: 用于多行输入。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Textarea 多行文本框

**多行文本框允许用户在多行中输入文本。**

## 何时使用
需要用户输入表单域多行内容时。

## 用法演示
<IStockShellUiExample src="./example/TextareaDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明                                  | 类型                                                                                                                                           | 默认值                           |
|---------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| color         | 输入框的颜色                              | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error`                                             |                               |
| size          | 输入框的大小                              | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                                                                         |                               |
| variant       | 输入框的变种                              | `ghot`                                                                                                                                       |                               |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string`) => void |    |
