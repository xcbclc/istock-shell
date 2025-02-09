---
title: Toggle 开关组件
description: Toggle开关组件用于两种状态之间的切换操作，支持8种主题色、5种尺寸和丰富的交互样式，适用于设置开关、功能启用等场景。
keywords: [开关组件,Svelte开关,状态切换,表单控件,Toggle API]
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

## 用法演示
<IStockShellUiExample src="./example/ToggleDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleIndeterminate.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleIcon.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleChange.svelte" layout="column"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明           | 类型                                                                                            | 默认值                           |
|---------------|--------------|-----------------------------------------------------------------------------------------------|-------------------------------|
| color         | 主题颜色        | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |                               |
| size          | 尺寸配置        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                          |                               |
| label          | 标签配置         | [`ToggleLabel`](#togglelabel)                                                                 |                               |
| onChangeValue | 当选项值变化时的回调函数 | (value?: `boolean`) => void                                                                   |    |

### ToggleLabel
```typescript
export type ToggleLabel = {
  position?: 'before' | 'after'; // 标签位置
  class?: string;               // 自定义类名
};
```