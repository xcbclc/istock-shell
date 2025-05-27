---
title: Tooltip 文字提示
description: Tooltip 是高效的交互提示组件，提供多种定位方式间和主题样式，适用于操作说明、表单校验等场景
keywords: ['tooltip', '文字提示', '气泡提示', '悬浮提示', '位置调整', '交互提示', 'UI组件', '信息提示框']
aside: false
editLink: false
outline: [2, 3]
---

## Tooltip 文字提示

**信息提示组件，通过悬浮或点击触发，提供精准的上下文帮助信息。**

## 使用场景

- 表单字段校验提示
- 图标按钮的功能说明
- 数据表格的内容截断提示
- 操作流程的步骤引导
- 禁用状态的解释说明
- 专业术语的即时注解

## 功能特性

- 支持上/下/左/右定位方式
- 主题颜色系统（8种预设配色方案）

## 示例演示

### 基础提示配置

通过`dataTip`属性指定内容：

- 支持文本提示内容
- 默认悬停触发显示
- 适用于简单信息提示场景


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义内容渲染

通过`tooltipRender`插槽实现：

- 支持HTML/组件内容
- 可添加动画效果
- 自定义样式类配置


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipCustomizeContent.svelte" layout="column"></IStockShellUiExample>
:::

### 控制显示状态

通过`open`属性实现：

- 支持默认展开状态
- 可编程控制显示/隐藏
- 适用于引导提示场景


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipOpen.svelte" layout="column"></IStockShellUiExample>
:::

### 提示位置设置

通过`placement`属性配置：

- 支持四个方位：`top`/`right`/`bottom`/`left`
- 自动调整显示位置


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipPosition.svelte" layout="column" gap="xl"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipColor.svelte" layout="column" gap="xl"></IStockShellUiExample>
:::

### 响应式布局适配

通过`class`属性使用Tailwind CSS的`lg:tooltip`等响应类完成响应式布局适配。


::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipResponsive.svelte" layout="column"></IStockShellUiExample>
:::


## API 参考

### 属性说明

| 属性名        | 说明           | 类型                                                                                             | 默认值 |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------ | ------ |
| position      | 提示框出现位置 | `top` \| `bottom` \| `left` \| `right`                                                           | top    |
| color         | 主题颜色       | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| open          | 提示框是否打开 | `boolean`                                                                                        |        |
| dataTip       | 提示文本       | `string`                                                                                         |        |
| tooltipRender | 提示内容渲染   | `() => ReturnType<Snippet<[]>>`                                                                  |        |
