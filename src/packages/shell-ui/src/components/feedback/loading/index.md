---
title: Loading 加载指示器组件 | IStock Shell UI
description: Loading加载指示器组件提供丰富的加载状态反馈功能，支持8种动画形状、5种尺寸规格、多种颜色主题、自定义文本内容等特性，基于Tailwind CSS构建，适用于页面加载、表单提交、异步操作等各种等待状态场景。
keywords:
  [
    Loading加载指示器,
    加载动画组件,
    Svelte加载器,
    状态反馈组件,
    加载状态,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式加载器,
    异步操作反馈,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Loading 加载指示器组件

加载指示器是用户界面中重要的状态反馈组件，用于在数据加载、表单提交、异步操作等场景中向用户提供清晰的等待状态提示。IStock Shell UI 的 Loading 组件基于 Tailwind CSS 构建，提供了丰富的动画样式和灵活的配置选项，满足各种加载状态展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShLoading } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的加载指示器用法，适用于大多数场景：

```svelte
<script>
  import { ShLoading } from '@istock-shell/ui';
</script>

<ShLoading />
```

## 组件特性

- 🎨 **丰富动画**：8种预设动画形状（spinner、dots、ring、pulse、ball、bars、infinity等）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🎭 **颜色主题**：支持多种颜色主题（primary、secondary、accent、neutral、info、success、warning、error）
- 📝 **文本支持**：支持自定义加载文本和子内容插槽
- 🔧 **灵活配置**：支持纯加载器和带文本的加载器两种模式
- ♿ **无障碍友好**：基于原生 span 元素，支持屏幕阅读器和键盘导航

## 使用场景

| 场景       | 推荐配置                            | 说明                                 |
| ---------- | ----------------------------------- | ------------------------------------ |
| 页面加载   | `shape="spinner"` + `size="lg"`     | 页面初始化或路由切换时的主要加载状态 |
| 表单提交   | `shape="dots"` + `text="提交中..."` | 表单提交等待服务器响应               |
| 数据加载   | `shape="ring"` + `color="info"`     | 列表、表格等数据异步加载             |
| 按钮加载   | `size="sm"` + `shape="spinner"`     | 按钮内嵌加载状态，配合按钮组件使用   |
| 模块加载   | `shape="pulse"` + 自定义文本        | 组件或模块异步加载占位提示           |
| 文件上传   | `shape="bars"` + `color="success"`  | 文件上传进度反馈                     |
| 搜索等待   | `shape="dots"` + `size="sm"`        | 搜索框实时搜索的加载反馈             |
| 骨架屏配合 | `shape="pulse"` + 淡色主题          | 配合骨架屏实现渐进式加载体验         |

## 示例演示

<IStockShellUiExample src="./example/LoadingStyle.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingText.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名  | 类型                            | 默认值      | 说明                           |
| ------- | ------------------------------- | ----------- | ------------------------------ |
| `shape` | [`LoadingShape`](#loadingshape) | `'spinner'` | 加载器的动画形状样式           |
| `size`  | [`LoadingSize`](#loadingsize)   | `'md'`      | 加载器的尺寸大小               |
| `color` | [`LoadingColor`](#loadingcolor) | -           | 加载器的颜色主题               |
| `text`  | `string`                        | -           | 加载提示文本，显示在加载器旁边 |
| `class` | `string`                        | -           | 自定义CSS类名                  |

### 代码片段插入位置

- `children`：

```svelte
<div class="inline-flex items-center justify-center">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 事件

`Loading`继承所有原生 HTML span 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### LoadingShape

```typescript
// 加载器形状类型
type LoadingShape = 'spinner' | 'dots' | 'ring' | 'pulse' | 'ball' | 'bars' | 'infinity';
```

#### LoadingSize

```typescript
// 加载器尺寸类型
type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### LoadingColor

```typescript
// 加载器颜色类型
type LoadingColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

## 设计指南

### 形状选择建议

- **Spinner（旋转器）**：最常用的加载动画，适用于大多数场景
- **Dots（点状）**：轻量级加载提示，适用于表单提交、搜索等场景
- **Ring（环形）**：现代感强的加载动画，适用于数据加载
- **Pulse（脉冲）**：柔和的加载提示，适用于内容加载占位
- **Ball（球形）**：动感的加载动画，适用于游戏或娱乐应用
- **Bars（条形）**：类似进度条的加载动画，适用于文件处理
- **Infinity（无限）**：连续循环的加载动画，适用于长时间操作

### 尺寸选择建议

- **xs**：按钮内嵌、表格单元格内的微型加载器
- **sm**：卡片内、列表项内的小型加载器
- **md**：默认尺寸，适用于大多数内容区域
- **lg**：页面主要内容区域的大型加载器
- **xl**：全屏或大区域的超大型加载器

### 颜色使用建议

- **Primary（主要）**：页面主要加载状态
- **Secondary（次要）**：辅助内容的加载状态
- **Info（信息）**：数据查询、信息获取的加载状态
- **Success（成功）**：成功操作后的确认加载
- **Warning（警告）**：需要注意的操作加载状态
- **Error（错误）**：错误恢复、重试操作的加载状态
- **Neutral（中性）**：普通加载状态，无特殊语义
- **Accent（强调）**：需要突出显示的特殊加载状态

### 文本使用建议

- **简洁明了**：使用简短、清晰的提示文本
- **动态更新**：根据加载进度动态更新文本内容
- **国际化支持**：考虑多语言环境下的文本长度
- **语义化表达**：使用有意义的动词和状态描述

### 无障碍支持

- 基于原生 span 元素，支持屏幕阅读器
- 提供适当的 `aria-label` 属性描述加载状态
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持键盘导航和焦点管理
- 为长时间加载提供进度信息或取消选项

## 最佳实践

### 性能优化

1. **合理使用**：避免在页面中同时显示过多加载器
2. **及时移除**：加载完成后及时隐藏或移除加载器
3. **防抖处理**：对于频繁触发的操作使用防抖避免闪烁
4. **预加载策略**：合理使用预加载减少用户等待时间

### 用户体验

1. **即时反馈**：操作触发后立即显示加载状态
2. **进度提示**：对于长时间操作提供进度信息
3. **错误处理**：加载失败时提供重试选项
4. **取消机制**：为长时间操作提供取消功能

### 视觉设计

1. **一致性**：在同一应用中保持加载器样式的一致性
2. **层次感**：根据内容重要性选择合适的尺寸和颜色
3. **动画流畅**：确保动画播放流畅，避免卡顿
4. **适配性**：在不同设备和屏幕上保持良好的视觉效果

### 状态管理

1. **状态同步**：确保加载状态与实际操作状态同步
2. **嵌套处理**：合理处理嵌套组件的加载状态
3. **全局状态**：对于全局操作使用全局加载状态管理
4. **错误边界**：设置错误边界防止加载状态异常

## 常见问题

### Q: 如何自定义加载器的动画速度？

A: 可以通过CSS变量或自定义类名覆盖默认的动画时长：

```css
.custom-loading {
  animation-duration: 2s; /* 自定义动画时长 */
}
```

### Q: 如何实现带进度的加载器？

A: Loading组件主要用于状态反馈，如需进度显示建议使用Progress组件或自定义实现：

```svelte
<script>
  let progress = $state(0);

  // 模拟进度更新
  setInterval(() => {
    if (progress < 100) progress += 10;
  }, 500);
</script>

<div class="flex items-center gap-2">
  <ShLoading size="sm" />
  <span>加载中... {progress}%</span>
</div>
```

### Q: 如何在按钮中嵌入加载器？

A: 可以结合Button组件的loading属性或手动组合：

```svelte
<script>
  let loading = $state(false);

  async function handleSubmit() {
    loading = true;
    try {
      await submitForm();
    } finally {
      loading = false;
    }
  }
</script>

<ShButton onclick={handleSubmit} disabled={loading}>
  {#if loading}
    <ShLoading size="sm" class="mr-2" />
  {/if}
  提交表单
</ShButton>
```

### Q: 如何实现全屏加载遮罩？

A: 可以结合CSS定位和背景遮罩实现：

```svelte
<script>
  let showLoading = $state(true);
</script>

{#if showLoading}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg">
      <ShLoading size="lg" text="页面加载中..." />
    </div>
  </div>
{/if}
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
