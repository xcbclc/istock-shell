---
title: Textarea 多行文本框
description: 多行文本框（Textarea）组件支持自适应高度、表单验证、最大长度限制等功能，适用于长文本输入场景如评论、描述等。提供8种主题色和5种尺寸配置。
keywords: [多行文本框, Svelte文本框, 表单输入, 文本输入框, Textarea API]
aside: false
editLink: false
outline: [2, 3]
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

### 基础多行文本框

核心配置参数：

- `bind:value` 实现双向数据绑定

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 无背景样式

通过`variant="ghost"`实现：

- 透明背景效果
- 适用于沉浸式编辑场景
- 保持焦点状态高亮

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaGhost.svelte"></IStockShellUiExample>
:::

#### 字段集集成方案

与`ShFieldSet`、`ShField`组件配合使用：

- 实现表单分组语义化
- 保持样式继承一致性

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaFieldset.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaColor.svelte" layout="column"></IStockShellUiExample>
:::

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaSize.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

设置`disabled`属性启用禁用。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaDisabled.svelte"></IStockShellUiExample>
:::

### 值变化事件处理

通过`onChangeValue`回调实现实时获取输入内容变化。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

除了支持原生textarea属性以外，还支持以下属性：

| 属性名        | 说明                                                   | 类型                                                                                             | 默认值 |
| ------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| value         | 选中的值（双向绑定）                                   | `any`                                                                                            |        |
| color         | 主题颜色                                               | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置                                               | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| variant       | 样式变体                                               | `ghot`                                                                                           |        |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string`) => void                                                                       |        |
