---
title: Alert 警告提示组件
description: 警告提示（Alert）组件用于展示重要的提示信息，支持多种样式变体（默认、柔和、轮廓、虚线）和不同语义类型（成功、警告、错误等），可用于系统通知、操作反馈等场景。
keywords: [警告提示,Svelte Alert,消息通知,提示框,Alert组件]
editLink: false
outline: [2, 3]
---

## Alert 警告提示组件

**警告提示（Alert）是一个用于展示重要信息的反馈组件，通过醒目的视觉效果传达不同程度的提示信息。支持多种样式变体和语义化的类型区分。**

## 使用场景
- 需要展示警告、错误、成功等状态信息时
- 系统运行状态或操作结果需要反馈时
- 页面需要突出显示提示信息时
- 需要用户关注的重要通知展示时

## 功能特性
- 支持8种语义化类型（primary/success/warning等）
- 提供4种样式变体（默认/柔和/轮廓/虚线）
- 支持标题和描述文本的分层展示
- 内置图标与文本的组合展示
- 响应式布局适配不同屏幕尺寸

## 示例演示

<IStockShellUiExample src="./example/AlertDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertType.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertSoft.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertOutline.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertDash.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/AlertTitleAndDescription.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|-------|------|------|--------|
| type | 警告提示的类型 |  `info` \| `success` \| `warning` \| `error` | `info` |
| title | 警告提示的标题 | `string` | - |
| description | 警告提示的详细描述 | `string` | - |
| soft | 是否使用柔和样式 | `boolean` | `false` |
| outline | 是否使用轮廓样式 | `boolean` | `false` |
| dash | 是否使用虚线边框样式 | `boolean` | `false` |

### 插槽
组件支持默认插槽，可以完全自定义内容：

```svelte
<Alert type="success">
  自定义内容
</Alert>
```

### 样式定制
Alert 组件样式基于 Tailwind CSS，可以通过以下方式进行样式覆盖：

```svelte
<Alert class="custom-class" />
```
