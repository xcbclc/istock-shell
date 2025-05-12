---
title: Stat 统计展示组件
description: 用于展示关键指标数据的统计组件，支持多种布局、图标配置和操作按钮，适用于仪表盘、数据看板等场景。
keywords: [统计组件, 数据展示, 指标卡片, Stat API, Svelte统计]
aside: false
editLink: false
outline: [2, 3]
---

## Stat 统计展示组件

**标准化的数据指标展示方案，提供灵活的布局配置和丰富的可视化支持。**

## 使用场景

- 仪表盘关键指标展示
- 数据看板实时监控
- 业务数据对比分析
- 需要快速操作的数据卡片
- 移动端数据概览

## 功能特性

- 支持水平/垂直布局切换
- 响应式设计适配多端
- 图标与数值组合展示
- 操作按钮快速交互
- 自定义内容渲染能力

## 示例演示

<IStockShellUiExample src="./example/StatDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatIconOrImage.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatCenter.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatVertical.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatButton.svelte"></IStockShellUiExample>

## API 参考

### Stat属性说明

| 参数     | 说明         | 类型                                   | 默认值 |
| -------- | ------------ | -------------------------------------- | ------ |
| list     | 统计项列表   | [`StatItemProps`](#statitem属性说明)[] | []     |
| center   | 是否居中显示 | `boolean`                              | false  |
| shadow   | 是否显示阴影 | `boolean`                              | true   |
| vertical | 是否垂直布局 | `boolean`                              | false  |

### StatItem属性说明

| 参数    | 说明          | 类型                                                | 默认值 |
| ------- | ------------- | --------------------------------------------------- | ------ |
| title   | 统计项标题    | `string` \| [`StatTitleProps`](#stattitle属性说明)  | -      |
| value   | 统计数值      | `string` \| [`StatValuecProps`](#statvalue属性说明) | -      |
| desc    | 描述文本      | `string` \| [`StatDescProps`](#statdesc属性说明)    | -      |
| figure  | 图标/图片配置 | [`StatFigureProps`](#statfigure属性说明)            | -      |
| actions | 操作按钮列表  | [`StatActionProps`](#stataction属性说明)[]          | []     |
| center  | 是否居中显示  | `boolean`                                           | false  |

### StatFigure属性说明

| 参数 | 说明                                                               | 类型                                       | 默认值 |
| ---- | ------------------------------------------------------------------ | ------------------------------------------ | ------ |
| icon | 图标配置，继承自图标[`IconProps`](../../extend/icon/#属性说明)属性 | [`IconProps`](../../extend/icon/#属性说明) | -      |

### StatTitle属性说明

StatTitle属性继承自文本[`TextBaseProps`](../../extend/text/#属性说明)属性。

### StatValue属性说明

StatValue属性继承自文本[`TextBaseProps`](../../extend/text/#属性说明)属性。

### StatDesc属性说明

StatDesc属性继承自文本[`TextBaseProps`](../../extend/text/#属性说明)属性。

### StatAction属性说明

StatAction属性继承自按钮[`ButtonProps`](../../action/button/#属性说明)属性。
