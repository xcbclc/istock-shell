---
title: Stat 统计展示组件 | IStock Shell UI
description: Stat统计展示组件提供强大的数据指标展示功能，支持多种布局模式、图标配置、操作按钮、响应式设计等特性，适用于仪表盘、数据看板、业务监控等各种数据可视化场景。
keywords:
  [
    Stat统计展示组件,
    Svelte统计组件,
    数据指标展示,
    统计卡片,
    仪表盘组件,
    数据可视化,
    UI组件库,
    Web组件,
    用户界面,
    UX设计,
    响应式统计,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Stat 统计展示组件

统计展示组件是数据可视化中的核心元素，用于清晰直观地展示关键业务指标和数据。IStock Shell UI 的 Stat
组件提供了灵活的布局配置、丰富的视觉样式和完整的交互功能，满足各种数据展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShStat } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的统计展示用法，适用于大多数数据展示场景：

```svelte
<script>
  import { ShStat } from '@istock-shell/ui';

  const statisticsData = [
    {
      title: '总用户数',
      value: '1,234',
      desc: '较上月增长 12%',
    },
    {
      title: '活跃用户',
      value: '567',
      desc: '在线用户数量',
    },
  ];
</script>

<ShStat list={statisticsData} />
```

## 组件特性

- 📊 **多种布局**：支持水平、垂直、居中等多种布局模式，适应不同设计需求
- 🎨 **丰富样式**：内置阴影效果、对齐方式等样式配置，提升视觉体验
- 🖼️ **图标支持**：支持图标和图片展示，增强数据的可视化表达
- 🔘 **操作按钮**：集成操作按钮功能，支持快速交互和数据操作
- 📱 **响应式设计**：自动适配不同屏幕尺寸，确保移动端体验
- 🎯 **灵活配置**：支持标题、数值、描述的独立样式配置
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持屏幕阅读器
- ⚡ **TypeScript**：完整的类型安全支持，开发体验优秀

## 使用场景

| 场景       | 推荐配置                      | 说明                         |
| ---------- | ----------------------------- | ---------------------------- |
| 仪表盘展示 | `shadow=true` + 图标配置      | 企业级仪表盘的核心指标展示   |
| 数据看板   | `vertical=false` + 响应式布局 | 实时数据监控和业务指标展示   |
| 移动端概览 | `vertical=true` + `center`    | 移动设备上的数据概览界面     |
| 卡片展示   | `center=true` + 阴影效果      | 突出显示重要数据指标         |
| 操作面板   | `actions` 配置                | 需要快速操作的数据管理界面   |
| 对比分析   | 多个 StatItem 组合            | 业务数据的对比分析展示       |
| 状态监控   | 图标 + 颜色配置               | 系统状态、服务状态等监控展示 |
| 报表展示   | 完整配置 + 描述信息           | 详细的数据报表和分析结果     |

## 示例演示

<IStockShellUiExample src="./example/StatDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatIconOrImage.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatCenter.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatVertical.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/StatButton.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

#### Stat 属性

| 属性名     | 类型                                | 默认值  | 说明                           |
| ---------- | ----------------------------------- | ------- | ------------------------------ |
| `list`     | [`StatItemProps`](#statitem-属性)[] | `[]`    | 统计项列表，用于批量渲染统计项 |
| `center`   | `boolean`                           | `false` | 是否居中显示统计项内容         |
| `shadow`   | `boolean`                           | `true`  | 是否显示卡片阴影效果           |
| `vertical` | `boolean`                           | `false` | 是否使用垂直布局模式           |
| `align`    | [`StatItemAlign`](#statitemalign)   | -       | 统计项的对齐方式               |
| `class`    | `string`                            | -       | 自定义CSS类名                  |

#### StatItem 属性

| 属性名    | 类型                                            | 默认值  | 说明           |
| --------- | ----------------------------------------------- | ------- | -------------- |
| `title`   | `string` \| [`StatTitleProps`](#stattitle-属性) | -       | 统计项标题配置 |
| `value`   | `string` \| [`StatValueProps`](#statvalue-属性) | -       | 统计数值配置   |
| `desc`    | `string` \| [`StatDescProps`](#statdesc-属性)   | -       | 描述文本配置   |
| `figure`  | [`StatFigureProps`](#statfigure-属性)           | -       | 图标/图片配置  |
| `actions` | [`StatActionProps`](#stataction-属性)[]         | `[]`    | 操作按钮列表   |
| `center`  | `boolean`                                       | `false` | 是否居中对齐   |
| `class`   | `string`                                        | -       | 自定义CSS类名  |

#### StatFigure 属性

| 属性名  | 类型                                       | 默认值 | 说明                             |
| ------- | ------------------------------------------ | ------ | -------------------------------- |
| `icon`  | [`IconProps`](../../extend/icon/#属性说明) | -      | 图标配置，继承图标组件的所有属性 |
| `class` | `string`                                   | -      | 自定义CSS类名                    |

#### StatTitle 属性

| 属性名   | 类型                                        | 默认值 | 说明          |
| -------- | ------------------------------------------- | ------ | ------------- |
| `text`   | `string`                                    | -      | 标题文本内容  |
| `color`  | [`TextBaseProps`](#textbaseprops)['color']  | -      | 文本颜色      |
| `size`   | [`TextBaseProps`](#textbaseprops)['size']   | -      | 文本尺寸      |
| `align`  | [`TextBaseProps`](#textbaseprops)['align']  | -      | 文本对齐方式  |
| `weight` | [`TextBaseProps`](#textbaseprops)['weight'] | -      | 文本粗细      |
| `class`  | `string`                                    | -      | 自定义CSS类名 |

#### StatValue 属性

| 属性名   | 类型                                        | 默认值 | 说明          |
| -------- | ------------------------------------------- | ------ | ------------- |
| `text`   | `string \| number`                          | -      | 数值文本内容  |
| `color`  | [`TextBaseProps`](#textbaseprops)['color']  | -      | 文本颜色      |
| `size`   | [`TextBaseProps`](#textbaseprops)['size']   | -      | 文本尺寸      |
| `align`  | [`TextBaseProps`](#textbaseprops)['align']  | -      | 文本对齐方式  |
| `weight` | [`TextBaseProps`](#textbaseprops)['weight'] | -      | 文本粗细      |
| `class`  | `string`                                    | -      | 自定义CSS类名 |

#### StatDesc 属性

| 属性名   | 类型                                                                          | 默认值 | 说明               |
| -------- | ----------------------------------------------------------------------------- | ------ | ------------------ |
| `text`   | `string \| Array<{title: string; value: string \| number; tooltip?: string}>` | -      | 描述文本或对象数组 |
| `color`  | [`TextBaseProps`](#textbaseprops)['color']                                    | -      | 文本颜色           |
| `size`   | [`TextBaseProps`](#textbaseprops)['size']                                     | -      | 文本尺寸           |
| `align`  | [`TextBaseProps`](#textbaseprops)['align']                                    | -      | 文本对齐方式       |
| `weight` | [`TextBaseProps`](#textbaseprops)['weight']                                   | -      | 文本粗细           |
| `class`  | `string`                                                                      | -      | 自定义CSS类名      |

#### StatAction 属性

继承自按钮组件 [`ButtonProps`](../../action/button/#属性说明) 的所有属性。

### 代码片段插入位置

- `Stat` 的 `children`：

```svelte
<div class="stats">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

- `StatItem` 的 `children`：

```svelte
<div class="stat">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

- `StatTitle` 的 `children`：

```svelte
<div>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

- `StatValue` 的 `children`：

```svelte
<div>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

- `StatDesc` 的 `children`：

```svelte
<div>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 类型定义

#### StatItemAlign

```typescript
// 统计项对齐方式类型
type StatItemAlign = 'start' | 'center' | 'end';
```

#### TextBaseProps

文本组件 [`TextBaseProps`](../../extend/text/#textitemprops)类型说明。

## 设计指南

### 布局选择建议

- **水平布局（默认）**：适用于桌面端宽屏显示，数据项较多的场景
- **垂直布局**：适用于移动端或空间受限的场景，提升可读性
- **居中对齐**：适用于突出显示核心数据，增强视觉焦点
- **响应式布局**：结合CSS媒体查询实现不同设备的最佳显示效果

### 数据展示原则

1. **层次清晰**：标题、数值、描述形成清晰的信息层次
2. **重点突出**：使用合适的字体大小和颜色突出关键数值
3. **信息完整**：提供必要的上下文信息和变化趋势
4. **视觉平衡**：保持各统计项之间的视觉平衡和一致性

### 交互设计

- **操作按钮**：为需要快速操作的数据提供便捷的交互入口
- **状态反馈**：通过颜色、图标等视觉元素传达数据状态
- **响应式交互**：确保在不同设备上都有良好的交互体验

### 无障碍支持

- 所有统计项都支持键盘导航和屏幕阅读器
- 提供适当的 `aria-label` 和语义化标签
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持高对比度模式和缩放功能

## 最佳实践

### 数据组织

1. **逻辑分组**：将相关的统计数据组织在一起
2. **优先级排序**：将最重要的指标放在显眼位置
3. **数据格式化**：使用合适的数字格式和单位显示
4. **趋势展示**：通过描述文本或图标显示数据变化趋势

### 性能优化

1. **数据缓存**：对于频繁更新的数据，合理使用缓存策略
2. **懒加载**：对于大量统计项，考虑使用懒加载技术
3. **虚拟滚动**：处理大数据集时使用虚拟滚动提升性能
4. **防抖更新**：对于实时数据，使用防抖机制避免频繁更新

### 响应式设计

1. **断点设计**：为不同屏幕尺寸设计合适的布局断点
2. **内容适配**：确保文本和数值在小屏幕上仍然清晰可读
3. **交互适配**：为触摸设备提供足够大的点击区域
4. **性能考虑**：在移动设备上优化渲染性能

## 常见问题

### Q: 如何实现数据的实时更新？

A: 使用响应式数据绑定和定时器：

```svelte
<script>
  import { ShStat } from '@istock-shell/ui';

  let statisticsData = $state([]);

  // 定时更新数据
  setInterval(async () => {
    const response = await fetch('/api/statistics');
    statisticsData = await response.json();
  }, 30000); // 每30秒更新一次
</script>

<ShStat list={statisticsData} />
```

### Q: 如何自定义统计项的样式？

A: 通过 `class` 属性和CSS变量自定义样式：

```svelte
<ShStat list={data} class="custom-stats" shadow={false} />

<style>
  :global(.custom-stats .stat) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
  }
</style>
```

### Q: 如何实现统计项的点击事件？

A: 使用操作按钮或自定义事件处理：

```svelte
<script>
  const data = [
    {
      title: '销售额',
      value: '¥128,000',
      desc: '本月销售总额',
      actions: [
        {
          text: '查看详情',
          color: 'primary',
          size: 'xs',
          onclick: () => handleViewDetails(),
        },
      ],
    },
  ];

  function handleViewDetails() {
    // 处理查看详情逻辑
    console.log('查看销售详情');
  }
</script>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
