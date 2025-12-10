---
title: Textarea 多行文本框组件 | IStock Shell UI
description: Textarea多行文本框组件提供丰富的文本输入功能，支持8种主题色彩、5种尺寸规格、幽灵样式变体、值变化监听等特性，适用于评论输入、描述填写、表单文本域等各种长文本输入场景。
keywords:
  [
    Textarea多行文本框,
    Svelte文本框,
    UI组件库,
    文本输入组件,
    表单组件,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式文本框,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Textarea 多行文本框组件

多行文本框是表单中用于接收用户长文本输入的重要组件，适用于评论、描述、备注等需要多行文本输入的场景。IStock Shell UI 的 Textarea 组件提供了丰富的样式配置和功能特性，满足各种文本输入需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShTextarea } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的多行文本框用法，支持双向数据绑定：

```svelte
<script>
  import { ShTextarea } from '@istock-shell/ui';
  let value = '';
</script>

<ShTextarea bind:value placeholder="请输入内容" />
```

## 组件特性

- 🎨 **丰富色彩**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🎭 **样式变体**：幽灵（ghost）样式，适用于特殊背景场景
- 🔧 **灵活配置**：支持禁用状态、值变化监听、表单集成
- 📝 **双向绑定**：完整的数据双向绑定支持
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景     | 推荐配置          | 说明                         |
| -------- | ----------------- | ---------------------------- |
| 评论输入 | `color="primary"` | 用户评论、反馈等文本输入     |
| 描述填写 | `color="neutral"` | 产品描述、个人简介等信息填写 |
| 表单备注 | `size="sm"`       | 表单中的备注、说明字段       |
| 错误提示 | `color="error"`   | 显示错误状态的文本输入框     |
| 成功确认 | `color="success"` | 操作成功后的文本输入         |
| 信息提示 | `color="info"`    | 提示信息相关的文本输入       |
| 警告提醒 | `color="warning"` | 需要用户注意的文本输入       |
| 表单集成 | 配合 `ShFieldSet` | 与表单组件集成使用           |

## 示例演示

### 基础多行文本框

最基础的多行文本框使用方式，通过 `bind:value` 实现双向数据绑定，支持用户输入多行文本内容。适用于评论输入、描述填写等常见文本输入场景。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 幽灵样式变体

通过设置 `variant="ghost"` 可以启用幽灵样式，呈现透明背景效果。这种样式特别适用于沉浸式编辑场景，如覆盖在图片或复杂背景上的文本输入，同时保持焦点状态下的高亮显示效果。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaGhost.svelte"></IStockShellUiExample>
:::

#### 字段集中的文本框集成

多行文本框可以与 `ShFieldSet` 和 `ShField` 组件完美配合使用，实现表单的分组和语义化布局。通过这种组合方式，可以保持整个表单的样式一致性，提供更好的用户体验和无障碍访问支持。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaFieldset.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

多行文本框支持八种语义化颜色主题，通过 `color` 属性设置。包括系统色系（`primary` 主色、`secondary` 辅色、`accent` 强调色）、状态指示色（`info` 信息、`success` 成功、`warning` 警告、`error` 错误）以及中性色（`neutral` 默认），满足不同场景下的视觉需求和语义表达。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaColor.svelte" layout="column"></IStockShellUiExample>
:::

### 尺寸规格设置

多行文本框提供五种标准尺寸规格，通过 `size` 属性控制。从 `xs`（超小）到 `xl`（超大），默认为 `md`（中等）尺寸。不同尺寸适用于不同的界面布局和使用场景，支持响应式设计需求。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaSize.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

通过设置 `disabled` 属性可以禁用多行文本框，禁用后用户无法进行输入操作，文本框呈现灰色状态。适用于表单提交中、数据加载中或权限不足等场景。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaDisabled.svelte"></IStockShellUiExample>
:::

### 值变化事件处理

通过 `onChangeValue` 回调函数可以实时监听和处理文本内容的变化。该回调会在用户输入时触发，传递当前的文本值，适用于实时验证、字数统计、自动保存等需要响应用户输入的场景。

::: raw
<IStockShellUiExample src="./data-input/textarea/example/TextareaChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名          | 类型                                  | 默认值 | 说明                   |
| --------------- | ------------------------------------- | ------ | ---------------------- |
| `value`         | `string`                              | -      | 文本框的值（双向绑定） |
| `color`         | [`TextareaColor`](#textareacolor)     | -      | 文本框的主题颜色       |
| `size`          | [`TextareaSize`](#textareasize)       | `'md'` | 文本框的尺寸大小       |
| `variant`       | [`TextareaVariant`](#textareavariant) | -      | 文本框的样式变体       |
| `onChangeValue` | `(value?: string) => void`            | -      | 值变化时的回调函数     |
| `class`         | `string`                              | -      | 自定义CSS类名          |

### 事件

继承所有原生HTML textarea元素事件，如：

- `input` - 输入事件
- `change` - 值变化事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘抬起事件

### 类型定义

#### TextareaColor

```typescript
// 文本框颜色类型
type TextareaColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### TextareaSize

```typescript
// 文本框尺寸类型
type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### TextareaVariant

```typescript
// 文本框样式变体类型
type TextareaVariant = 'ghost';
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：重要的文本输入，如主要表单字段
- **Secondary（次要）**：辅助性的文本输入
- **Success（成功）**：成功状态的文本输入
- **Warning（警告）**：需要用户注意的文本输入
- **Error（错误）**：错误状态的文本输入
- **Info（信息）**：信息提示相关的文本输入
- **Neutral（中性）**：普通文本输入，无特殊语义
- **Accent（强调）**：需要突出显示的文本输入

### 尺寸选择建议

- **xs**：紧凑布局中的小型文本输入
- **sm**：卡片内、表格内的文本输入
- **md**：默认尺寸，适用于大多数场景
- **lg**：重要表单、主要内容输入
- **xl**：大型表单、突出显示的文本输入

### 无障碍支持

- 所有文本框都支持键盘导航（Tab、Enter、方向键）
- 提供适当的 `aria-label` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 禁用状态下自动添加 `aria-disabled` 属性
- 支持屏幕阅读器的内容朗读

### 最佳实践

1. **语义化使用**：根据输入内容的重要性和语义选择合适的颜色
2. **一致性**：在同一个应用中保持文本框样式的一致性
3. **响应式**：在不同设备上使用合适的尺寸
4. **占位符**：提供清晰的占位符文本指导用户输入
5. **验证反馈**：及时提供输入验证的视觉反馈
6. **字数限制**：对于有长度限制的输入提供字数统计

## 常见问题

### Q: 如何自定义文本框样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用CSS变量覆盖默认样式。

### Q: 文本框支持哪些HTML属性？

A: 组件支持所有标准HTML textarea元素的原生属性（如 `placeholder`、`rows`、`cols`、`maxlength` 等），这些属性将直接透传到最终渲染的DOM元素。

### Q: 如何实现自动高度调整？

A: 可以通过CSS样式或第三方库实现自动高度调整功能。

### Q: 如何监听值变化？

A: 使用 `onChangeValue` 回调函数或者监听原生的 `input`、`change` 事件。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
