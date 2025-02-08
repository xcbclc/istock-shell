---
title: ErrorInfo
description: 用于页面错误信息展示。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## ErrorInfo 错误信息<Badge type="tip">shell</Badge>

**主要用于页面上的错误信息展示。**

## 用法演示
<!-- prettier-ignore -->
<IStockShellUiExample src="./example/ErrorInfoDefault.svelte"></IStockShellUiExample>

## API
### 属性说明
| 参数       | 说明       | 类型                                                                                             | 默认值 |
|----------|----------|------------------------------------------------------------------------------------------------|-----|
| title    | 错误信息标题   | string |     |
| description | 错误信息描述   | string |     |
| stack    | 错误信息堆栈信息 | string[] | []  |
