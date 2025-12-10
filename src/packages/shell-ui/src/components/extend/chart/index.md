---
title: Chart 图表组件 | IStock Shell UI
description: Chart图表组件基于AntV G2构建，提供强大的数据可视化功能，支持多种图表类型、响应式更新、性能优化、自定义配置等特性，适用于数据分析、统计展示、实时监控、报表仪表盘等各种数据可视化场景。
keywords:
  [
    Chart图表组件,
    数据可视化,
    AntV G2,
    Svelte图表,
    图表库,
    数据分析,
    统计图表,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式图表,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Chart 图表组件 <Badge type="tip">shell</Badge>

图表组件是数据可视化的核心工具，用于将复杂的数据转换为直观易懂的视觉图形。IStock Shell UI 的 Chart 组件基于强大的 AntV G2 图形语法构建，提供了丰富的图表类型和灵活的配置选项，满足各种数据展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShChart } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的图表用法，通过配置选项快速创建图表：

```svelte
<script>
  import { ShChart } from '@istock-shell/ui';

  const chartOptions = {
    type: 'interval',
    data: [
      { category: 'A', value: 40 },
      { category: 'B', value: 21 },
      { category: 'C', value: 17 },
      { category: 'D', value: 13 },
      { category: 'E', value: 9 },
    ],
    encode: { x: 'category', y: 'value' },
  };
</script>

<ShChart options={chartOptions} />
```

## 组件特性

- 📊 **丰富图表**：支持 AntV G2 的所有图表类型（柱状图、折线图、饼图、散点图、热力图等）
- 🎯 **性能优化**：基于 IntersectionObserver 的懒加载和视口优化，提升页面性能
- 🔄 **响应式更新**：自动响应数据和配置变化，实时更新图表内容
- 🎛️ **灵活配置**：支持 G2 的完整配置体系，满足复杂定制需求
- 👁️ **显示控制**：支持图表显示/隐藏状态控制，便于交互式展示
- 🧹 **自动清理**：完整的生命周期管理，自动清理图表实例和事件监听器
- 🎨 **样式定制**：支持自定义容器样式和 CSS 类名
- ♿ **无障碍友好**：基于标准 div 容器，支持键盘导航和屏幕阅读器

## 使用场景

| 场景       | 推荐配置                   | 说明                             |
| ---------- | -------------------------- | -------------------------------- |
| 数据统计   | `type: 'interval'`         | 销售数据、用户统计、业绩分析     |
| 趋势分析   | `type: 'line'`             | 时间序列数据、增长趋势、变化曲线 |
| 占比展示   | `type: 'pie'`              | 市场份额、分类占比、构成分析     |
| 关系分析   | `type: 'point'`            | 相关性分析、分布情况、聚类展示   |
| 实时监控   | 动态数据 + `autoFit: true` | 系统监控、实时数据、动态仪表盘   |
| 报表展示   | 多图表组合                 | 数据报告、分析报表、综合展示     |
| 移动端适配 | `autoFit: true`            | 响应式图表、移动设备、自适应布局 |
| 交互探索   | 事件配置 + 动态更新        | 数据钻取、交互分析、动态筛选     |
| 大屏展示   | 大尺寸 + 自定义主题        | 数据大屏、展示中心、可视化大屏   |

## 示例演示

<IStockShellUiExample src="./example/ChartDefault.svelte"></IStockShellUiExample>

## API 参考

### 属性

| 属性名            | 类型                            | 默认值 | 说明                                  |
| ----------------- | ------------------------------- | ------ | ------------------------------------- |
| `options`         | [`ChartOptions`](#chartoptions) | `{}`   | G2 图表配置选项，支持所有 G2 配置参数 |
| `class`           | `string`                        | `''`   | 自定义容器 CSS 类名                   |
| `onContentLoaded` | `(success: Boolean) => void`    | -      | 内容加载完成回调                      |

### 代码片段插入位置

- `children`：

```svelte
<div class="chart-container">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 事件

`Chart`继承所有原生 HTML div 元素事件，如：

- `click` - 点击事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件

### 类型定义

#### ChartOptions

```typescript
// G2 图表配置选项类型
import type { ChartOptions } from '@antv/g2';
```

> **提示**：完整的配置选项请参考 [`AntV G2 官方文档`](https://g2.antv.antgroup.com/) 了解详细配置

## 设计指南

### 图表类型选择

- **柱状图（interval）**：适用于分类数据比较、数量对比
- **折线图（line）**：适用于趋势展示、时间序列数据
- **饼图（pie）**：适用于占比展示、构成分析
- **散点图（point）**：适用于相关性分析、分布展示
- **面积图（area）**：适用于累积数据、趋势强调
- **热力图（heatmap）**：适用于矩阵数据、密度展示

### 数据准备

- **数据格式**：使用标准的 JSON 数组格式，确保数据结构清晰
- **字段命名**：使用有意义的字段名，便于配置和维护
- **数据清洗**：确保数据完整性，处理缺失值和异常值
- **性能考虑**：大数据量时考虑分页、采样或聚合处理

### 配置优化

- **自适应布局**：使用 `autoFit: true` 实现响应式适配
- **主题定制**：通过 `theme` 配置统一视觉风格
- **交互增强**：合理配置 `interaction` 提升用户体验
- **动画效果**：适当使用 `animation` 增强视觉效果

### 性能优化

- **懒加载**：组件自动实现视口懒加载，无需额外配置
- **数据更新**：使用响应式数据，避免频繁重新创建图表
- **内存管理**：组件自动处理实例清理，防止内存泄漏
- **渲染优化**：大数据量时使用数据采样或虚拟化技术

### 无障碍支持

- 基于标准 div 容器，支持键盘导航
- 提供适当的 `aria-label` 和 `title` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 为复杂图表提供数据表格替代方案
- 支持屏幕阅读器的图表描述

## 最佳实践

### 数据可视化原则

1. **准确性**：确保数据的准确性和完整性
2. **清晰性**：选择最适合的图表类型表达数据
3. **简洁性**：避免过度装饰，突出数据本身
4. **一致性**：在同一应用中保持图表风格统一

### 交互设计

1. **渐进增强**：从基础展示到高级交互逐步增强
2. **即时反馈**：鼠标悬停、点击等操作提供即时反馈
3. **状态管理**：合理管理图表的加载、错误、空数据状态
4. **响应式设计**：在不同设备上提供合适的交互体验

### 性能考虑

1. **数据分页**：大数据集使用分页或虚拟滚动
2. **防抖处理**：频繁更新时使用防抖避免性能问题
3. **缓存策略**：合理缓存图表配置和数据
4. **异步加载**：大型图表使用异步加载和进度提示

### 错误处理

1. **数据验证**：在渲染前验证数据格式和完整性
2. **错误边界**：设置错误边界防止图表错误影响整个应用
3. **降级方案**：提供数据表格等降级展示方案
4. **用户提示**：清晰的错误信息和解决建议

## 常见问题

### Q: 如何实现图表的响应式布局？

A: 使用 `autoFit: true` 配置选项，图表会自动适应容器大小：

```svelte
<script>
  const options = {
    type: 'line',
    autoFit: true, // 启用自适应
    data: chartData,
    encode: { x: 'date', y: 'value' },
  };
</script>

<ShChart {options} style="width: 100%; height: 400px;" />
```

### Q: 如何动态更新图表数据？

A: 直接更新 `options` 中的 `data` 字段，组件会自动响应变化：

```svelte
<script>
  let chartData = $state([...]);
  
  const options = $derived({
    type: 'interval',
    data: chartData,
    encode: { x: 'category', y: 'value' }
  });
  
  function updateData() {
    chartData = [...newData]; // 更新数据
  }
</script>

<ShChart {options} />
```

### Q: 如何自定义图表主题和样式？

A: 通过 G2 的主题配置系统自定义样式：

```svelte
<script>
  const options = {
    type: 'line',
    data: chartData,
    theme: {
      color: ['#1f77b4', '#ff7f0e', '#2ca02c'], // 自定义颜色
    },
    style: {
      fill: '#1f77b4',
      stroke: '#1f77b4',
      lineWidth: 2,
    },
  };
</script>

<ShChart {options} class="custom-chart" />
```

### Q: 如何处理大数据量的图表性能问题？

A: 可以通过数据采样、分页加载等方式优化：

```svelte
<script>
  // 数据采样
  function sampleData(data, maxPoints = 1000) {
    if (data.length <= maxPoints) return data;
    const step = Math.ceil(data.length / maxPoints);
    return data.filter((_, index) => index % step === 0);
  }

  const options = {
    type: 'line',
    data: sampleData(largeDataset),
    encode: { x: 'time', y: 'value' },
  };
</script>

<ShChart {options} />
```

### Q: 如何实现图表的交互功能？

A: 通过 G2 的交互配置实现各种交互效果：

```svelte
<script>
  const options = {
    type: 'interval',
    data: chartData,
    encode: { x: 'category', y: 'value' },
    interaction: {
      tooltip: true,
      brushX: true, // 启用 X 轴刷选
      elementHighlight: true, // 启用元素高亮
    },
  };
</script>

<ShChart {options} />
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
