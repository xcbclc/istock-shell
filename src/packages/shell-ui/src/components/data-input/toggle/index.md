---
title: Toggle
description: 使用开关切换两种状态之间。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Toggle 开关

**开关是为了看起来像开关按钮的样式的复选框。。**

## 何时使用
- 需要表示开关状态/两种状态之间的切换时；
- 和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。

## 用法演示
<IStockShellUiExample src="./example/ToggleDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleIndeterminate.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ToggleChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明           | 类型                                                                                              | 默认值                           |
|---------------|--------------|-------------------------------------------------------------------------------------------------|-------------------------------|
| color         | 开关的颜色        | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |                               |
| size          | 开关的大小        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                            |                               |
| label          | 标签配置         | [`ToggleLabel`](#`togglelabel`)                                                                 |                               |
| onChangeValue | 当选项值变化时的回调函数 | (value?: `boolean`) => void                                                                     |    |

### ToggleLabel
```typescript
 export type ToggleLabel = {
    position?: 'before' | 'after';
    class?: string;
  };
```