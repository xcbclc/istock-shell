---
title: Toast 轻提示组件
description: 轻提示（Toast）组件用于展示简短的反馈信息，支持多个位置布局（顶部、中部、底部）和不同类型（成功、警告、错误等），可用于操作反馈、消息通知等场景。
keywords: [轻提示,Svelte Toast,消息通知,反馈提示,Toast组件]
aside: false
editLink: false
outline: [2, 3]
---

## Toast 轻提示组件

**轻提示（Toast）是一个轻量级的反馈组件，可以在页面不同位置展示简短的提示信息。支持灵活的位置布局和多种提示类型。**

## 使用场景
- 需要在页面不同位置展示提示信息时
- 操作结果需要轻量级反馈时
- 系统消息需要非阻塞式提醒时
- 多条消息需要同时展示时

## 功能特性
- 支持9种位置布局（上中下 x 左中右）
- 提供4种语义化类型（info/success/warning/error）
- 支持多条消息同时展示
- 内置优雅的过渡动画效果
- 可自定义内容和样式

## 示例演示
<IStockShellUiExample src="./example/ToastDefault.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastTopStart.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastTopCenter.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastTopEnd.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastStartMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastCenterMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastEndMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastStartBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastCenterBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToastEndBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名 | 说明 | 类型                                    | 默认值 |
|-------|------|---------------------------------------|--------|
| horizontal | 水平位置 | `'start'` \| `'center'` \| `'end'`    | `'end'` |
| vertical | 垂直位置 | `'top'` \| `'middle'` \| `'bottom'`   | `'bottom'` |
| alerts | 提示消息数组 | `[ToastAlertItem](#toastalertitem)`[] | `[]` |

### ToastAlertItem 类型
```typescript
import type { AlertProps } from '@istock/shell-ui';
export interface ToastAlertItem extends AlertProps {
  message: string; // 提示消息
}
```

### 注意事项
1. Toast 组件默认使用 fixed 定位
2. 多条消息会按数组顺序依次展示
3. 可以通过 class 属性自定义样式
4. 建议消息内容简短明了，避免过长