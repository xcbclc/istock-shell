---
title: Tooltip 文字提示组件 | IStock Shell UI
description: Tooltip文字提示组件提供精准的上下文帮助信息，支持8种颜色主题、4种位置配置、自定义内容渲染、显示状态控制等特性，基于Tailwind CSS构建，适用于操作说明、表单校验、功能引导、术语注解等各种信息提示场景。
keywords:
  [
    Tooltip文字提示,
    气泡提示组件,
    Svelte提示框,
    信息提示组件,
    悬浮提示,
    位置调整,
    交互提示,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式提示框,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Tooltip 文字提示组件

文字提示是用户界面中重要的信息反馈组件，用于在用户悬浮或点击时提供精准的上下文帮助信息。IStock Shell UI 的 Tooltip 组件基于 Tailwind CSS 构建，提供了丰富的颜色主题和位置配置，满足各种信息提示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShTooltip } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的文字提示用法，适用于大多数场景：

```svelte
<script>
  import { ShTooltip, ShButton } from '@istock-shell/ui';
</script>

<ShTooltip dataTip="这是一个提示信息">
  <ShButton>悬停查看提示</ShButton>
</ShTooltip>
```

## 组件特性

- 🎨 **丰富色彩**：8种预设颜色主题（primary、secondary、accent、neutral、info、success、warning、error）
- 📍 **灵活定位**：4种位置配置（top、bottom、left、right）支持精准定位
- 🎭 **自定义内容**：支持自定义提示内容渲染函数，可展示复杂内容
- 🔧 **状态控制**：支持手动控制显示状态和自动触发
- 📝 **文本支持**：支持简单文本提示和复杂HTML内容
- ♿ **无障碍友好**：基于原生 div 元素，支持屏幕阅读器和键盘导航

## 使用场景

| 场景         | 推荐配置                            | 说明                               |
| ------------ | ----------------------------------- | ---------------------------------- |
| 表单字段校验 | `color="error"` + `placement="top"` | 表单验证错误提示，红色主题突出错误 |
| 图标按钮说明 | `placement="bottom"` + 简短文本     | 图标功能说明，避免遮挡操作区域     |
| 数据截断提示 | `placement="top"` + 完整内容        | 表格单元格内容过长时的完整展示     |
| 操作流程引导 | `color="info"` + 详细说明           | 新手引导和操作步骤说明             |
| 禁用状态说明 | `color="warning"` + 原因解释        | 解释功能禁用的原因和解决方案       |
| 术语注解     | `color="neutral"` + 专业解释        | 专业术语的即时注解和详细说明       |
| 成功反馈     | `color="success"` + 确认信息        | 操作成功后的确认提示               |
| 帮助信息     | `color="info"` + 帮助内容           | 功能说明和使用帮助                 |

## 示例演示

### 基础提示配置

通过 `dataTip` 属性驱动的文本提示展示。Tooltip 组件支持悬停触发显示，内置自动定位功能，默认顶部显示位置，提供简洁直观的信息提示体验，特别适用于表单字段说明、功能按钮解释和界面元素补充信息等场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义内容渲染

通过 `tooltipRender` 插槽实现复杂内容的自定义渲染。Tooltip 组件支持 HTML/组件内容嵌入，内置动画效果配置能力，提供完全的样式类自定义控制，突破简单文本限制，实现富媒体提示展示，特别适用于图文混排提示、交互式帮助内容和需要特殊视觉效果的高级提示场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipCustomizeContent.svelte" layout="column"></IStockShellUiExample>
:::

### 控制显示状态

通过 `open` 属性实现显示状态的精确控制。Tooltip 组件支持默认展开状态配置，提供编程式的显示/隐藏控制能力，脱离悬停触发的限制，实现持续可见的提示效果，特别适用于新手引导、重要提示强调和需要持续展示的帮助信息等场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipOpen.svelte" layout="column"></IStockShellUiExample>
:::

### 提示位置设置

通过 `placement` 属性实现四方位精确定位配置。Tooltip 组件支持 top/right/bottom/left 四个基础方位设置，内置智能位置调整算法，根据视窗边界自动优化显示位置，确保提示内容完整可见，特别适用于复杂布局环境、边界元素提示和需要精确位置控制的界面场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipPosition.svelte" layout="column" gap="xl"></IStockShellUiExample>
:::

### 预定义颜色主题

通过 `color` 属性实现多种语义化颜色配置。Tooltip 组件支持八种预定义颜色主题，包括系统色系（primary/secondary/accent）、状态指示色（info/success/warning/error）和中性色（neutral），提供丰富的视觉层次和语义表达，特别适用于状态提示、等级区分和品牌风格统一的界面设计场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipColor.svelte" gap="xl" demoStyle="min-height:180px"></IStockShellUiExample>
:::

### 响应式布局适配

通过 `class` 属性结合 Tailwind CSS 响应式类实现跨设备适配。Tooltip 组件支持 `lg:tooltip` 等响应式类配置，能够根据屏幕尺寸动态调整显示行为，在大屏设备上启用提示功能，在小屏设备上禁用以避免触摸交互冲突，特别适用于跨平台应用、移动端优化和需要设备差异化体验的界面场景。

::: raw
<IStockShellUiExample src="./feedback/tooltip/example/TooltipResponsive.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名          | 类型                                    | 默认值  | 说明                                 |
| --------------- | --------------------------------------- | ------- | ------------------------------------ |
| `color`         | [`TooltipColor`](#tooltipcolor)         | -       | 提示框的颜色主题                     |
| `placement`     | [`TooltipPlacement`](#tooltipplacement) | `'top'` | 提示框相对于触发元素的显示位置       |
| `open`          | `boolean`                               | -       | 手动控制提示框的显示状态             |
| `dataTip`       | `string`                                | -       | 简单文本提示内容                     |
| `tooltipRender` | `() => ReturnType<Snippet<[]>>`         | -       | 自定义提示内容渲染函数，用于复杂内容 |
| `class`         | `string`                                | `''`    | 自定义CSS类名                        |

### 代码片段插入位置

- `children`：

```svelte
<div class="tooltip">
  <!-- ...code -->
  {@render children?.()}
  <!-- ...code -->
</div>
```

- `tooltipRender`：

```svelte
<div class="tooltip">
  <div class="tooltip-content">
    {@render tooltipRender()}
  </div>
  <!-- ...code -->
</div>
```

### 事件

`Tooltip`继承所有原生 HTML div 元素事件，如：

- `click` - 点击事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件

### 类型定义

#### TooltipColor

```typescript
// 提示框颜色类型
type TooltipColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### TooltipPlacement

```typescript
// 提示框位置类型
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
```

## 设计指南

### 位置选择建议

- **Top（顶部）**：默认位置，适用于大多数场景，不遮挡下方内容
- **Bottom（底部）**：适用于页面顶部元素，避免超出视窗范围
- **Left（左侧）**：适用于页面右侧元素，提供充足的显示空间
- **Right（右侧）**：适用于页面左侧元素，保持视觉平衡

### 颜色使用建议

- **Primary（主要）**：重要功能说明和主要信息提示
- **Secondary（次要）**：辅助信息和次要功能说明
- **Success（成功）**：成功状态提示和正面反馈信息
- **Warning（警告）**：注意事项和需要用户关注的信息
- **Error（错误）**：错误提示和验证失败信息
- **Info（信息）**：帮助信息和功能说明
- **Neutral（中性）**：普通提示信息，无特殊语义
- **Accent（强调）**：需要突出显示的特殊信息

### 内容设计原则

- **简洁明了**：使用简短、清晰的文本，避免冗长描述
- **语义准确**：确保提示内容与触发元素功能相关
- **及时性**：提供即时相关的上下文信息
- **一致性**：保持同类提示的格式和风格一致

### 无障碍支持

- 基于原生 div 元素，支持屏幕阅读器
- 提供适当的 `aria-label` 和 `role` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持键盘导航和焦点管理
- 为复杂内容提供替代文本描述

## 最佳实践

### 内容管理

1. **文本长度**：保持提示文本简洁，建议不超过50个字符
2. **多语言支持**：考虑不同语言下的文本长度差异
3. **动态内容**：根据上下文动态生成相关的提示内容
4. **格式一致**：统一提示文本的格式和语调

### 用户体验

1. **触发时机**：合理设置触发延迟，避免误触发
2. **显示时长**：为用户提供足够的阅读时间
3. **位置智能**：根据元素位置自动调整提示框位置
4. **层级管理**：确保提示框在合适的层级显示

### 性能优化

1. **按需渲染**：只在需要时渲染提示内容
2. **事件管理**：合理管理鼠标和键盘事件监听
3. **内存清理**：及时清理不需要的事件监听器
4. **批量更新**：避免频繁的DOM操作

### 视觉设计

1. **视觉层次**：通过颜色和大小建立清晰的信息层次
2. **动画效果**：使用适当的过渡动画提升用户体验
3. **响应式适配**：在不同设备上保持良好的显示效果
4. **主题一致**：与整体设计系统保持一致的视觉风格

## 常见问题

### Q: 如何控制提示框的显示时机？

A: 可以使用 `open` 属性手动控制显示状态：

```svelte
<script>
  let showTooltip = $state(false);

  function handleClick() {
    showTooltip = !showTooltip;
  }
</script>

<ShTooltip open={showTooltip} dataTip="手动控制的提示">
  <button onclick={handleClick}>点击切换提示</button>
</ShTooltip>
```

### Q: 如何实现复杂的提示内容？

A: 使用 `tooltipRender` 函数渲染复杂内容：

```svelte
<script>
  function customTooltipRender() {
    return `<div class="p-4">
      <h4 class="font-bold">详细信息</h4>
      <p>这里可以包含更复杂的内容</p>
      <ul>
        <li>列表项1</li>
        <li>列表项2</li>
      </ul>
    </div>`;
  }
</script>

<ShTooltip {tooltipRender}>
  <span>悬停查看详细信息</span>
</ShTooltip>
```

### Q: 如何在表格中使用提示框？

A: 可以为表格单元格添加提示框显示完整内容：

```svelte
<table>
  <tr>
    <td>
      <ShTooltip dataTip="完整的单元格内容在这里显示" placement="top">
        <span class="truncate">截断的文本...</span>
      </ShTooltip>
    </td>
  </tr>
</table>
```

### Q: 如何实现提示框的延迟显示？

A: 可以结合定时器实现延迟显示效果：

```svelte
<script>
  let showTooltip = $state(false);
  let timer;

  function handleMouseEnter() {
    timer = setTimeout(() => {
      showTooltip = true;
    }, 500); // 延迟500ms显示
  }

  function handleMouseLeave() {
    clearTimeout(timer);
    showTooltip = false;
  }
</script>

<ShTooltip open={showTooltip} dataTip="延迟显示的提示">
  <span onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave}> 悬停500ms后显示提示 </span>
</ShTooltip>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
