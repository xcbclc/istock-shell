---
title: Button 按钮组件 - 使用指南与API文档
description: 按钮（Button）组件提供多种交互样式，包括主要按钮、次要按钮、轮廓按钮、加载状态等，支持颜色定制、尺寸调整和禁用状态，适用于表单提交、操作触发等场景。
keywords: [按钮组件,Svelte按钮,UI组件,交互按钮,按钮样式,按钮API]
editLink: false
outline: [ 2, 3 ]
---

## Button 按钮组件
**按钮（Button）是用户界面中最基础的交互元素，用于触发即时操作或表单提交。**

## 使用场景
- 需要用户提交表单或确认操作时
- 在表格操作栏需要行内操作按钮时
- 页面需要主要操作（Primary Action）和次要操作（Secondary Action）时
- 需要引导用户进行导航跳转时
- 展示加载状态或禁用不可用操作时

## 功能特性
- 预设8种主题色系选择
- 支持5种尺寸（xs/xl）和响应式适配
- 提供柔和（soft）/轮廓（outline）/虚线（dash）三种变体
- 支持图标嵌入和加载状态
- 适配块级布局和自定义HTML标签
- 禁用状态支持

## 示例演示
<IStockShellUiExample src="./example/ButtonDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSoft.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonOutline.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDash.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonActive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTextAndLink.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonWide.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTag.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonBlock.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLoading.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLogins.svelte"></IStockShellUiExample>

## API 参考
### 属性说明
| 参数       | 说明        | 类型                                                                                             | 默认值 |
|----------|-----------|------------------------------------------------------------------------------------------------|---|
| color    | 按钮颜色设置     | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size     | 按钮大小设置     | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                           |  |
| soft     | 是否为柔和按钮   | boolean                                                                                        |  |
| outline  | 是否为边框按钮   | boolean                                                                                        |  |
| dash     | 是否为虚线按钮   | boolean                                                                                        |  |
| active   | 是否为激活状态按钮 | boolean                                                                                        |  |
| ghost    | 是否为幽灵按钮   | boolean                                                                                        |  |
| link     | 是否为链接按钮   | boolean                                                                                        |  |
| wide     | 是否为宽按钮    | boolean                                                                                        |  |
| tag      | 按钮的标签类型   | `a` \| `button` \| `input` \| `div` \| `button`                                                | button |
| disabled | 是否禁用按钮    | boolean                                                                                        |  |
| shape    | 按钮的形状     | `square` \| `circle`                                                                           |   |
| block    | 是否为块级按钮   | boolean                                                                                        |  |
| loading  | 显示加载状态和禁用交互  | boolean                                                                                        |  |

> **注意**：幽灵（ghost）按钮建议仅在复杂背景上使用，确保对比度符合WCAG 2.0标准。
> **属性透传**：组件支持所有标准HTML按钮/锚点/输入框元素的原生属性（如`type`、`form`、`autofocus`等），这些属性将直接透传到最终渲染的DOM元素。