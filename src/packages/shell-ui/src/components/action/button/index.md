---
title: Button 按钮组件 | IStock Shell UI
description: Button按钮组件提供丰富的交互样式和功能，支持8种主题色彩、5种尺寸规格、多种视觉变体（柔和、轮廓、虚线）、图标嵌入、加载状态等特性，适用于表单提交、操作触发、导航跳转等各种交互场景。
keywords:
  [
    Button按钮组件,
    Svelte按钮,
    UI组件库,
    交互按钮,
    按钮样式,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式按钮,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Button 按钮组件

按钮是用户界面中最基础且重要的交互元素，用于触发操作、提交表单、导航跳转等用户行为。IStock Shell UI 的 Button 组件提供了丰富的样式变体和功能特性，满足各种设计需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShButton } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的按钮用法，适用于大多数场景：

```svelte
<script>
  import { ShButton } from '@istock-shell/ui';
</script>

<ShButton>默认按钮</ShButton>
```

## 组件特性

- 🎨 **丰富色彩**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🎭 **视觉变体**：柔和（soft）、轮廓（outline）、虚线（dash）、幽灵（ghost）、链接（link）等样式
- 🔧 **灵活配置**：支持图标嵌入、加载状态、禁用状态、块级布局
- 🏷️ **标签适配**：可渲染为 button、a、input、div 等不同HTML标签
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景     | 推荐配置                         | 说明                           |
| -------- | -------------------------------- | ------------------------------ |
| 主要操作 | `color="primary"`                | 页面中最重要的操作，如提交表单 |
| 次要操作 | `color="secondary"` 或 `outline` | 辅助操作，如取消、重置         |
| 危险操作 | `color="error"`                  | 删除、清空等不可逆操作         |
| 成功确认 | `color="success"`                | 保存成功、操作完成等正面反馈   |
| 信息提示 | `color="info"`                   | 查看详情、帮助说明等信息类操作 |
| 警告提醒 | `color="warning"`                | 需要用户注意的操作             |
| 导航链接 | `tag="a"` + `link`               | 页面跳转、外链访问             |
| 表格操作 | `size="sm"`                      | 表格行内的操作按钮             |

## 示例演示

<IStockShellUiExample src="./example/ButtonDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSoft.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonOutline.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDash.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonActive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTextAndLink.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonWide.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTag.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonBlock.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLoading.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLogins.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名     | 类型                          | 默认值     | 说明               |
| ---------- | ----------------------------- | ---------- | ------------------ |
| `color`    | [`ButtonColor`](#buttoncolor) | -          | 按钮的主题颜色     |
| `size`     | [`ButtonSize`](#buttonsize)   | `'md'`     | 按钮的尺寸大小     |
| `soft`     | `boolean`                     | `false`    | 是否使用柔和样式   |
| `outline`  | `boolean`                     | `false`    | 是否使用轮廓样式   |
| `dash`     | `boolean`                     | `false`    | 是否使用虚线边框   |
| `active`   | `boolean`                     | `false`    | 是否为激活状态     |
| `ghost`    | `boolean`                     | `false`    | 是否使用幽灵样式   |
| `link`     | `boolean`                     | `false`    | 是否使用链接样式   |
| `wide`     | `boolean`                     | `false`    | 是否使用加宽样式   |
| `tag`      | [`ButtonTag`](#buttontag)     | `'button'` | 渲染的HTML标签类型 |
| `disabled` | `boolean`                     | `false`    | 是否禁用按钮       |
| `shape`    | [`ButtonShape`](#buttonshape) | -          | 按钮的形状         |
| `block`    | `boolean`                     | `false`    | 是否为块级按钮     |
| `loading`  | `boolean`                     | `false`    | 是否显示加载状态   |
| `text`     | `string`                      | -          | 按钮文本内容       |
| `class`    | `string`                      | -          | 自定义CSS类名      |

### 代码片段插入位置

- `children`：

```svelte
<svelte:element this={tag}>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</svelte:element>
```

### 事件

继承所有原生HTML元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### ButtonColor

```typescript
// 按钮颜色类型
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
```

#### ButtonSize

```typescript
// 按钮尺寸类型
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### ButtonTag

```typescript
// 按钮标签类型
type ButtonTag = 'button' | 'a' | 'input' | 'div';
```

#### ButtonShape

```typescript
// 按钮形状类型
type ButtonShape = 'square' | 'circle';
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：页面中最重要的操作，建议每个页面只有一个
- **Secondary（次要）**：重要但非主要的操作
- **Success（成功）**：确认、保存、完成等正面操作
- **Warning（警告）**：需要用户注意但不危险的操作
- **Error（错误）**：删除、清空等危险操作
- **Info（信息）**：查看、帮助等信息类操作
- **Neutral（中性）**：普通操作，无特殊语义
- **Accent（强调）**：需要突出显示的特殊操作

### 尺寸选择建议

- **xs**：表格内操作、标签式按钮
- **sm**：卡片内操作、次要功能
- **md**：默认尺寸，适用于大多数场景
- **lg**：重要操作、表单提交
- **xl**：页面主要CTA按钮

### 无障碍支持

- 所有按钮都支持键盘导航（Tab、Enter、Space）
- 提供适当的 `aria-label` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 禁用状态下自动添加 `aria-disabled` 属性
- 加载状态下提供 `aria-busy` 属性

### 最佳实践

1. **语义化使用**：根据操作的重要性和语义选择合适的颜色
2. **一致性**：在同一个应用中保持按钮样式的一致性
3. **层次感**：通过不同的视觉变体建立操作的层次关系
4. **响应式**：在不同设备上使用合适的尺寸
5. **加载状态**：对于异步操作及时显示加载状态
6. **禁用状态**：对于不可用的操作及时禁用按钮

## 常见问题

### Q: 如何自定义按钮样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用CSS变量覆盖默认样式。

### Q: 按钮支持哪些HTML属性？

A: 组件支持所有标准HTML按钮/锚点/输入框元素的原生属性（如 `type`、`form`、`autofocus` 等），这些属性将直接透传到最终渲染的DOM元素。

### Q: 幽灵按钮什么时候使用？

A: 幽灵按钮建议仅在复杂背景（如图片、渐变）上使用，确保对比度符合WCAG 2.0标准。

### Q: 如何实现按钮组？

A: 可以使用[`daisyui Join`](https://daisyui.com/components/join/)样式类名。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
