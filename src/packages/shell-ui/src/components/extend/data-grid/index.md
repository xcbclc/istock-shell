---
title: DataGrid 数据网格组件
description: 用于组合展示统计指标、可视化图表、数据项，支持自动布局管理和响应式更新，适用于仪表盘、数据看板等场景。
keywords: [数据网格组件,数据看板,仪表盘布局,DataGrid API,Svelte数据展示]
aside: false
editLink: false
outline: [2, 3]
---

## DataGrid 数据网格组件 <Badge type="tip">shell</Badge>
**标准化的数据展示容器，提供灵活的布局管理和组件组合能力。**

## 使用场景
- 需要组合展示统计指标和图表时
- 构建复杂的数据看板
- 需要自动布局管理的仪表盘

## 功能特性
- 统计指标自动排列
- 图表与数据项组合展示
- 响应式网格布局
- 动态内容更新
- 组件自由组合

## 示例演示
<IStockShellUiExample src="./example/DataGridDefault.svelte"></IStockShellUiExample>

## API 参考
### 属性说明
| 参数    | 说明         | 类型                | 默认值   |
|-------|------------|-------------------|-------|
| stats | 统计指标列表     | (`StatItemProps`)(../data-view/stat/#statitem属性说明)[] | []    |
| items | 数据项列表，接受Svelte组件      | [`DataGridItem`](#datagriditem)[]  | []    |


### DataGridItem
```typescript
import type { SvelteComponent } from 'svelte';

export interface DataGridItem {
component: typeof SvelteComponent;
[key: string]: any;
}
```