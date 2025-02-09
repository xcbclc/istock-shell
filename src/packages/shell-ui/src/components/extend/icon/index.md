---
title: Icon
description: 语义化的svg图标。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Icon 图标 <Badge type="tip">shell</Badge>

**常用图标库。**

## 何时使用
需要使用图标时

## 用法演示
<IStockShellUiExample src="./example/IconDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/IconColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/IconSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/IconCustom.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名   | 说明                         | 类型                                                                                               | 默认值                           |
|-------|----------------------------|--------------------------------------------------------------------------------------------------|-------------------------------|
| name  | 图标名，请参考[`内置常用图标`](#内置常用图标) | `string`                                                                                         |                               |
| color | 图标的颜色                      | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |                               |
| size  | 图标的大小                      | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |                               |
