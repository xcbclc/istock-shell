---
title: Button 按钮组件
description: 按钮（Button）组件提供多种交互样式，包括主要按钮、次要按钮、轮廓按钮、加载状态等，支持颜色定制、尺寸调整和禁用状态，适用于表单提交、操作触发等场景。
keywords: [按钮组件,Svelte按钮,UI组件,交互按钮,按钮样式,按钮API]
aside: false
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
### 默认按钮
基础按钮样式，不包含任何特殊样式参数。当不设置`color`属性时，默认采用中性色（neutral）作为主色调，适合作为其他按钮变体的基础模板。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonDefault.svelte"></IStockShellUiExample>
:::

### 尺寸规范
通过`size`属性控制按钮尺寸层级：

| 尺寸值 | 典型场景         |
|--------|-----------------|
| `xs`   |  表格操作列       |
| `sm`   |  密集布局        |
| `md`(默认) |  常规操作        |
| `lg`   | 重点操作       |
| `xl`   | 全屏弹窗操作    |

::: raw
<IStockShellUiExample src="./action/button/example/ButtonSize.svelte"></IStockShellUiExample>
:::

### 响应式适配
通过Tailwind断点系统实现自适应。


::: raw
<IStockShellUiExample src="./action/button/example/ButtonResponsive.svelte"></IStockShellUiExample>
:::

### 按钮颜色
按钮支持通过设置`color`属性，设置以下预定义颜色类型：

- `primary` - 主要操作
- `secondary` - 次要操作
- `success` - 成功状态
- `warning` - 警告提示
- `error` - 错误提示
- `accent` - 强调操作
- `neutral` - 中性操作
- `info` - 信息提示


::: raw
<IStockShellUiExample src="./action/button/example/ButtonColor.svelte"></IStockShellUiExample>
:::

### 柔和变体
通过`soft`布尔属性启用低饱和度背景，这样可以创建视觉层次结构，减少高对比度带来的视觉疲劳。


::: raw
<IStockShellUiExample src="./action/button/example/ButtonSoft.svelte"></IStockShellUiExample>
:::

### 线框按钮
通过`outline`布尔属性切换为线框样式，适用场景：
- 次级操作/避免视觉过载
- 深色背景环境
- 需要降低按钮视觉权重时

::: raw
<IStockShellUiExample src="./action/button/example/ButtonOutline.svelte"></IStockShellUiExample>
:::

### 虚线边框按钮
用于特殊场景的边框样式按钮，通过`dash`属性为`true`添加虚线边框样式。该属性为布尔类型，默认值为`false`。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonDash.svelte"></IStockShellUiExample>
:::

### 激活状态按钮
**通过`active`属性实现按钮的交互状态反馈**，用于表示当前选中或需要强提示的操作场景。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonActive.svelte"></IStockShellUiExample>
:::

### 幽灵、链接按钮
幽灵按钮和链接按钮分别使用`ghost`、`link`属性定义。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonTextAndLink.svelte"></IStockShellUiExample>
:::

### 宽按钮
比普通按钮稍微再宽一些的按钮，使用`wide`属性定义宽按钮。


::: raw
<IStockShellUiExample src="./action/button/example/ButtonWide.svelte"></IStockShellUiExample>
:::

### 自定义标签
使用`tag`属性可以灵活的自定义元素标签名，提供`a`、`button`、`input`、`div`标签的支持。


::: raw
<IStockShellUiExample src="./action/button/example/ButtonTag.svelte"></IStockShellUiExample>
:::

### 禁用状态按钮
用于不可交互场景的按钮样式，通过`disabled`布尔属性控制按钮禁用状态。该状态会触发以下行为：
- 视觉上降低透明度
- 阻止所有交互事件
- 保持原有布局占位

::: raw
<IStockShellUiExample src="./action/button/example/ButtonDisabled.svelte"></IStockShellUiExample>
:::

### 图标按钮
支持通过插槽嵌入SVG图标，可配合`ShIcon`组件使用。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonIcon.svelte"></IStockShellUiExample>
:::

### 块级按钮
块级按钮（Block Button）是表单和操作场景中的核心交互元素，通过`block`布尔属性控制按钮宽度，使其撑满父容器。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonBlock.svelte"></IStockShellUiExample>
:::

### 加载状态
通过`loading`布尔属性启用加载指示器。

::: raw
<IStockShellUiExample src="./action/button/example/ButtonLoading.svelte"></IStockShellUiExample>
:::

### 第三方登录按钮
通过Tailwind CSS定制的品牌登录按钮模板，示例：

| 品牌       | 类组合示例                      | 配色规范              |
|-----------|-------------------------------|---------------------|
| GitHub    | `bg-black text-white`         | #000000/#FFFFFF     |
| Google    | `bg-white border-[#e5e5e5]`   | #FFFFFF/#E5E5E5     |
| Facebook  | `bg-[#1A77F2] text-white`     | #1A77F2/#FFFFFF     |
| Apple     | `bg-black text-white`          | #000000/#FFFFFF     |

::: raw
<IStockShellUiExample src="./action/button/example/ButtonLogins.svelte"></IStockShellUiExample>
:::


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