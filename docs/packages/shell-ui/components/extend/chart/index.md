---
title: Chart 图表组件
description: 基于AntV G2的图表组件，支持丰富的图表类型、自定义配置和响应式更新，适用于数据可视化、统计分析等场景。
keywords: [图表组件, 数据可视化, AntV G2, Svelte Chart, Chart API]
aside: false
editLink: false
outline: [2, 3]
---

## Chart 图表组件 <Badge type="tip">shell</Badge>

**基于[`@antv/g2`](https://g2.antv.antgroup.com/)的可视化解决方案，提供灵活的图表配置和响应式更新能力。**

## 使用场景

- 需要展示统计数据和趋势时
- 数据分析和可视化展示
- 实时数据监控面板
- 报表和仪表盘开发
- 需要交互式数据探索时

## 功能特性

- 支持多种图表类型（折线、柱状、饼图等）
- 响应式更新和自适应布局
- 完整的图表生命周期管理
- 灵活的配置项定制能力
- 支持显示/隐藏控制
- 自动清理图表实例

## 示例演示

### 简单柱形图

通过G2图表配置`type: 'interval'`及相关配置声明柱状图。


::: raw
<IStockShellUiExample src="./extend/chart/example/ChartDefault.svelte"></IStockShellUiExample>
:::


## API 参考

### 属性说明

| 参数    | 说明              | 类型                            | 默认值 |
| ------- | ----------------- | ------------------------------- | ------ |
| options | G2图表配置选项    | [`ChartOptions`](#chartoptions) | {}     |
| show    | 控制图表显示/隐藏 | `boolean`                       | true   |
| class   | 自定义容器类名    | `string`                        | -      |

### ChartOptions

```typescript
import type { ChartOptions } from '@antv/g2';
```

> **提示**：参考[`G2文档`](https://g2.antv.antgroup.com/)了解更多配置
