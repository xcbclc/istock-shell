---
title: Textarea 多行文本框
description: 多行文本框（Textarea）组件支持自适应高度、表单验证、最大长度限制等功能，适用于长文本输入场景如评论、描述等。提供8种主题色和5种尺寸配置。
keywords: [ 多行文本框,Svelte文本框,表单输入,文本输入框,Textarea API ]
aside: false
editLink: false
outline: [ 2, 3 ]
---

## Textarea 多行文本框组件

**多行文本框（Textarea）用于接收用户的长文本输入。支持自动高度调整、实时字数统计和丰富的验证状态反馈。**

## 使用场景

- 需要用户输入多行文本内容时
- 表单中的描述/备注字段输入

## 功能特性

- 支持自动高度调整（autosize）
- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配
- 禁用状态

## 示例演示
<IStockShellUiExample src="./example/TextareaDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextareaChange.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明
除了支持原生textarea属性以外，还支持以下属性：

| 属性名           | 说明                                  | 类型                                                                                               | 默认值 |
|---------------|-------------------------------------|--------------------------------------------------------------------------------------------------|-----|
| value         | 选中的值（双向绑定）                          | `any`                                                                                            |     |
| color         | 主题颜色                                | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |     |
| size          | 尺寸配置                                | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |     |
| variant       | 样式变体                                | `ghot`                                                                                           |     |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string`) => void                                                                       |     |
