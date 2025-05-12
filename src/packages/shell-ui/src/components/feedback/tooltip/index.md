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

<IStockShellUiExample src="./example/TooltipDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TooltipCustomizeContent.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TooltipOpen.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TooltipPosition.svelte" layout="column" gap="xl"></IStockShellUiExample>
<IStockShellUiExample src="./example/TooltipColor.svelte" layout="column" gap="xl"></IStockShellUiExample>
<IStockShellUiExample src="./example/TooltipResponsive.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名        | 说明           | 类型                                                                                             | 默认值 |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------ | ------ |
| position      | 提示框出现位置 | `top` \| `bottom` \| `left` \| `right`                                                           | top    |
| color         | 主题颜色       | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| open          | 提示框是否打开 | `boolean`                                                                                        |        |
| dataTip       | 提示文本       | `string`                                                                                         |        |
| tooltipRender | 提示内容渲染   | `() => ReturnType<Snippet<[]>>`                                                                  |        |
