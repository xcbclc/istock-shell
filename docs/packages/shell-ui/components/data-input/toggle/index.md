---
title: Toggle 开关组件
description: Toggle开关组件用于两种状态之间的切换操作，支持8种主题色、5种尺寸和丰富的交互样式，适用于设置开关、功能启用等场景。
keywords: [开关组件, Svelte开关, 状态切换, 表单控件, Toggle API]
aside: false
editLink: false
outline: [2, 3]
---

## Toggle 开关组件

**开关组件（Toggle）用于两种状态之间的视觉化切换。**

## 使用场景

- 需要即时生效的开关操作（如功能开关）
- 移动端设置项的启用/禁用切换
- 需要明显视觉反馈的二元状态切换
- 需要与复选框区分交互模式的场景

## 功能特性

- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配
- 支持不确定状态（indeterminate）
- 自定义开关图标和轨道样式

## 示例演示

### 基础开关配置

必需参数说明：

- `bind:value` 实现双向数据绑定
- 默认尺寸为`md`（中）
- 支持即时状态反馈

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleDefault.svelte" layout="column"></IStockShellUiExample>
:::

#### 字段集集成方案

与`<fieldset>`配合使用：

- 实现表单分组语义化
- 支持组合表单验证
- 保持样式继承一致性

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleFieldset.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleColor.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleSize.svelte"></IStockShellUiExample>
:::

### 禁用状态控制

设置`disabled`属性启用禁用状态。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleDisabled.svelte"></IStockShellUiExample>
:::

### 半选状态实现

`indeterminate`属性的应用，表示部分选中状态。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleIndeterminate.svelte"></IStockShellUiExample>
:::

### 自定义图标集成

支持两种图标配置方式：

- 内置`<ShIcon>`组件
- 自定义SVG/组件
- 保持图标交互一致性

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleIcon.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义颜色方案

通过`class`属性应用TailwindCSS类：

- 自定义背景色（bg-\*）
- 自定义边框色（border-\*）
- 自定义选中状态样式（checked:\*）

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleCustom.svelte"></IStockShellUiExample>
:::

### 值变化事件处理

通过`onChangeValue`回调实现：

- 实时获取开关状态变化
- 支持状态同步到父组件

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名        | 说明                     | 类型                                                                                             | 默认值 |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| color         | 主题颜色                 | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置                 | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| label         | 标签配置                 | [`ToggleLabel`](#togglelabel)                                                                    |        |
| onChangeValue | 当选项值变化时的回调函数 | (value?: `boolean`) => void                                                                      |        |

### ToggleLabel

```typescript
export type ToggleLabel = {
  position?: 'before' | 'after'; // 标签位置
  class?: string; // 自定义类名
};
```
