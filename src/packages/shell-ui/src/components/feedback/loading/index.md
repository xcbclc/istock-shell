---
title: Loading 加载指示器
description: 用于页面或内容的加载中状态，提供8种动画类型、5种尺寸配置和主题色定制，支持流畅过渡效果。
keywords: [加载组件, Svelte加载动画, 加载状态反馈, Loading API, 页面加载指示器]
aside: false
editLink: false
outline: [2, 3]
---

## Loading 加载指示器

**通过动态动画提供清晰的加载状态反馈，支持多种动画样式和自定义配置。**

## 使用场景

- 页面内容加载需要过渡指示时
- 表单提交等待服务器响应时
- 模块异步加载需要占位提示时
- 需要非阻塞式进度反馈时
- 配合骨架屏实现渐进式加载时

## 功能特性

- 8种预设加载动画类型（spinner/dots/ring等）
- 5种尺寸配置（xs-xl）及响应式适配
- 支持主题色定制和自定义颜色
- 内置流畅的过渡动画效果

## 示例演示

<IStockShellUiExample src="./example/LoadingStyle.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingText.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 参数  | 说明         | 类型                                                                                             | 默认值  |
| ----- | ------------ | ------------------------------------------------------------------------------------------------ | ------- |
| shape | 加载动画类型 | `spinner` \| `dots` \| `ring` \| `ball` \| `bars` \| `infinity`                                  | spinner |
| size  | 尺寸配置     | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             | md      |
| color | 主题颜色     | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |         |
| text  | 加载提示文本 | `string`                                                                                         |         |
