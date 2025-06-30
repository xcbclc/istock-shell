---
title: DataGrid 数据网格组件 | IStock Shell UI
description: DataGrid数据网格组件提供强大的数据展示和布局管理功能，支持统计指标展示、图表组件集成、响应式网格布局、异步组件加载等特性，基于Tailwind CSS构建，适用于仪表板、数据看板、管理后台等复杂数据展示场景。
keywords:
  [
    DataGrid数据网格,
    数据看板组件,
    仪表盘布局,
    Svelte数据网格,
    统计指标展示,
    图表集成,
    响应式布局,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    数据可视化,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# DataGrid 数据网格组件 <Badge type="tip">shell</Badge>

数据网格是现代数据展示界面中的核心组件，用于组合展示统计指标、可视化图表和各种数据项。IStock Shell UI 的 DataGrid 组件采用模块化设计，提供了灵活的布局管理和组件组合能力，支持异步组件加载和响应式布局，满足复杂数据展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShDataGrid } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的数据网格用法，组合统计指标和图表展示：

```svelte
<script>
  import { ShDataGrid, ShChart } from '@istock-shell/ui';

  const statsData = [
    { title: '总用户数', value: '1,234', trend: 'up' },
    { title: '活跃率', value: '89%', trend: 'down' },
    { title: '转化率', value: '12.5%', trend: 'up' },
  ];

  const chartItems = [
    {
      component: ShChart,
      options: {
        type: 'line',
        data: [
          { year: '2021', value: 3 },
          { year: '2022', value: 4 },
        ],
      },
    },
  ];
</script>

<ShDataGrid stats={statsData} items={chartItems} />
```

## 组件特性

- 🎯 **统计集成**：支持统计指标列表的配置和展示，与Stat组件无缝集成
- 📊 **图表支持**：内置图表组件动态加载，支持多种可视化图表类型
- 🎨 **响应式布局**：自动响应式网格布局管理，适配不同屏幕尺寸
- ⚡ **异步加载**：支持异步组件加载和错误处理，提升性能体验
- 🔧 **灵活配置**：可配置的列宽和布局参数，支持自定义内容插槽
- 🏗️ **组件组合**：支持多种组件类型的自由组合和动态渲染
- 🎭 **类型安全**：完整的TypeScript类型定义，提供开发时类型检查
- ♿ **无障碍友好**：基于语义化HTML结构，支持屏幕阅读器和键盘导航

## 使用场景

| 场景       | 推荐配置                         | 说明                           |
| ---------- | -------------------------------- | ------------------------------ |
| 数据仪表板 | `stats` + 多个图表组件           | 企业级数据仪表板，展示关键指标 |
| 管理后台   | 统计卡片 + 数据图表 + 自定义组件 | 后台管理系统的数据概览页面     |
| 数据看板   | 大屏展示 + `itemColWidth` 自定义 | 数据大屏、监控看板等场景       |
| 报表系统   | 多图表组合 + 响应式布局          | 业务报表、分析报告等数据展示   |
| 项目概览   | 项目统计 + 进度图表 + 状态展示   | 项目管理、任务跟踪等场景       |
| 销售分析   | 销售指标 + 趋势图表 + 排行榜     | 销售数据分析、业绩展示         |
| 用户画像   | 用户统计 + 行为图表 + 分布图     | 用户数据分析、画像展示         |
| 运营监控   | 实时指标 + 监控图表 + 告警状态   | 系统监控、运营数据实时展示     |

## 示例演示

<IStockShellUiExample src="./example/DataGridDefault.svelte"></IStockShellUiExample>

## API 参考

### 属性

| 属性名         | 类型                                | 默认值 | 说明                                                |
| -------------- | ----------------------------------- | ------ | --------------------------------------------------- |
| `stats`        | [`StatItemProps[]`](#statitemprops) | `[]`   | 统计指标配置列表，用于展示关键数据指标              |
| `items`        | [`DataGridItem[]`](#datagriditem)   | `[]`   | 数据项列表，包含图表和其他可视化组件的配置          |
| `itemColWidth` | `number \| string`                  | `480`  | 数据项列的宽度，支持数字（像素）或字符串（CSS单位） |
| `class`        | `string`                            | `''`   | 自定义CSS类名                                       |

### 代码片段插入位置

- `children`：

```svelte
<div class="gird-data">
  <!-- 统计指标展示区域 -->
  <div class="gird-stats">
    <ShStat list={stats} />
  </div>

  <!-- 数据项展示区域 -->
  <div class="gird-items">
    <!-- 动态渲染的组件项 -->
    {@render children()}
  </div>
</div>
```

### 事件

`DataGrid`继承所有原生HTML元素事件，主要包括：

- `click` - 点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### 类型定义

#### DataGridItem

数据网格项配置接口：

```typescript
interface DataGridItem {
  component: typeof SvelteComponent | DataGridItemComponentName; // 组件类型
  [key: string]: any; // 传递给组件的其他属性
}
```

#### DataGridItemComponentName

支持的数据网格项组件名称：

```typescript
type DataGridItemComponentName = 'ShChart'; // 目前支持图表组件
```

#### DataGridProps

数据网格组件属性接口：

```typescript
interface DataGridProps {
  stats?: StatItemProps[]; // 统计指标配置列表
  items?: DataGridItem[]; // 数据项列表
  itemColWidth?: number | string; // 数据项列宽
}
```

#### StatItemProps

统计指标属性接口（参考Stat组件文档）：

```typescript
interface StatItemProps {
  title?: string; // 指标标题
  value?: string | number; // 指标数值
  trend?: 'up' | 'down' | 'flat'; // 趋势方向
  description?: string; // 描述信息
  // ...更多属性请参考Stat组件文档
}
```

## 设计指南

### 布局原则

- **层次结构**：统计指标位于顶部，数据项采用网格布局展示
- **响应式设计**：根据容器宽度和配置的列宽自动调整列数
- **间距统一**：使用统一的间距系统，确保视觉协调
- **对齐规范**：统计指标居中对齐，数据项网格对齐

### 组件组合

- **统计优先**：重要的统计指标放在顶部显著位置
- **图表分组**：相关的图表组件可以通过列宽控制分组显示
- **内容平衡**：避免单个数据项内容过多影响整体布局
- **加载状态**：异步组件加载时显示骨架屏占位

### 性能优化

- **组件缓存**：异步加载的组件会被缓存，避免重复加载
- **懒加载**：支持组件的按需加载，提升初始加载性能
- **错误处理**：组件加载失败时显示友好的错误提示
- **内存管理**：合理管理组件实例，避免内存泄漏

### 无障碍支持

- 使用语义化的HTML结构（div容器 + 网格布局）
- 支持键盘导航和焦点管理
- 为统计指标和图表提供适当的标签和描述
- 确保颜色对比度符合WCAG 2.0 AA标准
- 支持屏幕阅读器的内容识别

## 最佳实践

### 数据组织

1. **指标选择**：选择最重要的3-6个关键指标作为统计展示
2. **图表类型**：根据数据特性选择合适的图表类型
3. **数据更新**：合理设置数据更新频率，避免过于频繁的刷新
4. **异常处理**：为数据异常情况提供友好的提示和降级方案

### 布局设计

1. **列宽配置**：根据内容复杂度合理设置`itemColWidth`
2. **响应式适配**：在不同设备上测试布局效果
3. **内容密度**：避免信息过于密集，保持适当的留白
4. **视觉层次**：通过大小、颜色、位置建立清晰的信息层次

### 性能考虑

1. **组件选择**：优先使用字符串形式的组件名，利用异步加载
2. **数据量控制**：避免在单个网格中展示过多的数据项
3. **更新策略**：使用合适的数据更新策略，避免不必要的重渲染
4. **错误边界**：设置错误边界防止单个组件错误影响整体

### 用户体验

1. **加载反馈**：为异步操作提供清晰的加载状态提示
2. **错误提示**：组件加载失败时提供有用的错误信息
3. **交互反馈**：为可交互的元素提供适当的视觉反馈
4. **一致性**：在整个应用中保持数据网格的样式一致性

## 常见问题

### Q: 如何自定义数据项的列宽？

A: 可以通过`itemColWidth`属性设置列宽，支持像素值和CSS单位：

```svelte
<!-- 固定像素宽度 -->
<ShDataGrid itemColWidth={600} />

<!-- CSS单位 -->
<ShDataGrid itemColWidth="50%" />
<ShDataGrid itemColWidth="20rem" />
```

### Q: 如何添加自定义组件到数据网格？

A: 可以直接传递Svelte组件类或使用字符串形式的组件名：

```svelte
<script>
  import CustomComponent from './CustomComponent.svelte';

  const items = [
    { component: CustomComponent, customProp: 'value' },
    { component: 'ShChart', options: chartOptions },
  ];
</script>

<ShDataGrid {items} />
```

### Q: 如何处理组件加载失败的情况？

A: 组件内置了错误处理机制，加载失败时会显示错误信息。你也可以通过监听错误事件进行自定义处理。

### Q: 数据网格支持哪些统计指标类型？

A: 支持Stat组件的所有统计指标类型，包括数值、趋势、描述等。详细配置请参考Stat组件文档。

### Q: 如何实现数据的实时更新？

A: 可以通过响应式数据绑定实现实时更新：

```svelte
<script>
  let stats = $state([]);
  let items = $state([]);

  // 定时更新数据
  setInterval(() => {
    stats = fetchLatestStats();
    items = fetchLatestItems();
  }, 30000);
</script>

<ShDataGrid {stats} {items} />
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
