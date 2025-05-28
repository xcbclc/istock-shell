---
title: VirtualTable 虚拟表格
description: 高性能虚拟表格，专为大数据量表格渲染设计，支持表头固定、可视区间渲染、自适应行高与懒加载，极大提升表格滚动与交互体验。
keywords: [虚拟表格组件, 大数据表格, 滚动优化, Svelte虚拟表格, VirtualTable API, 高性能表格, 表头固定, 懒加载]
aside: false
editLink: false
outline: [2, 3]
---

## VirtualTable 虚拟表格 <Badge type="tip">shell</Badge>

**高性能虚拟表格组件，结合虚拟列表与表格渲染，专为大数据量场景优化。**

### 使用场景

- 需要渲染成千上万行数据的表格
- 需要表头固定、滚动流畅的复杂表格
- 实时数据流、日志、监控等高频更新表格
- 移动端或低性能设备下的表格性能优化

### 功能特性

- 仅渲染可见区间行，极大减少DOM数量，提升性能
- 支持表头固定与高度自适应
- 支持自定义表格属性与行渲染模板
- 可监听可视区间变化，便于懒加载或联动
- 行尺寸自适应（通过 onRender 回调）
- 支持行唯一 id 自动生成

### 示例演示

### 虚拟化表格

该示例展示了如何使用虚拟化表格高效渲染上万行数据，保证滚动流畅且性能优异。

::: raw
<IStockShellUiExample src="./extend/virtual-table/example/VirtualTableDefault.svelte"></IStockShellUiExample>
:::

### API 参考

请参考[`ShTable属性说明`](../../data-view/table/#api-参考)
