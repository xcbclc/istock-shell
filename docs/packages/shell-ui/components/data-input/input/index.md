---
title: Input 输入框组件 | IStock Shell UI
description: Input输入框组件提供12种输入类型支持，包含文本、密码、数字、日期等类型，支持实时表单验证、前缀后缀插槽、5种尺寸规格、多种颜色主题，基于原生HTML input元素构建，适用于各类表单输入、搜索框、数据录入等交互场景。
keywords:
  [
    Input输入框组件,
    Svelte输入框,
    表单验证,
    输入框样式,
    数据输入,
    UI组件库,
    表单控件,
    Web组件,
    用户界面,
    UX设计,
    响应式输入框,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Input 输入框组件

输入框是表单交互的核心元素，用于捕获用户输入数据。IStock Shell UI 的 Input 组件基于原生 HTML input 元素构建，提供丰富的输入类型支持、实时验证反馈和灵活的扩展能力。

## 快速开始

### 安装

```bash
npm install @istock-shell/ui
```

### 基础用法

```svelte
<script>
  import { ShInput } from '@istock-shell/ui';
  let value = '';
</script>

<!-- 基础文本输入框 -->
<ShInput type="text" bind:value placeholder="请输入文本" />

<!-- 带颜色主题的输入框 -->
<ShInput type="email" color="primary" bind:value placeholder="请输入邮箱" />
```

## 组件特性

- 🎯 **多种类型**：支持12种HTML5输入类型（text、password、email、number、date等）
- 🎨 **丰富样式**：8种预设主题色彩和5种尺寸规格支持响应式适配
- ✅ **实时验证**：内置验证状态指示，支持HTML5原生验证和自定义验证规则
- 🔧 **灵活扩展**：前缀/后缀插槽支持图标、按钮等自定义内容渲染
- 👻 **幽灵模式**：透明背景样式适配复杂布局和沉浸式设计
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景         | 推荐配置                              | 说明                             |
| ------------ | ------------------------------------- | -------------------------------- |
| 基础文本输入 | `type="text"`                         | 用户名、标题、描述等通用文本输入 |
| 密码输入     | `type="password"`                     | 登录、注册、修改密码等安全输入   |
| 邮箱输入     | `type="email"` + `color="primary"`    | 用户注册、联系方式等邮箱验证     |
| 数字输入     | `type="number"`                       | 年龄、数量、价格等数值输入       |
| 搜索框       | `type="search"` + `prefixRender`      | 站内搜索、筛选查询等搜索功能     |
| 电话输入     | `type="tel"`                          | 手机号码、座机号码等电话输入     |
| 日期选择     | `type="date"`                         | 生日、预约时间等日期选择         |
| 表单验证     | `validator={false}` + `color="error"` | 输入错误提示、实时验证反馈       |
| 沉浸式输入   | `variant="ghost"`                     | 卡片内输入、无边框设计场景       |
| 带图标输入   | `prefixRender` / `suffixRender`       | 搜索框、金额输入、单位显示       |

## 示例演示

### 基础输入框配置

展示输入框组件的基础用法，使用 `bind:value` 实现双向数据绑定，默认类型为 `text`。这是最简单的输入框配置，适用于用户名、标题、描述等通用文本输入场景，提供了清晰的输入提示和即时的数据同步功能。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 前后缀插槽配置

演示输入框组件的前后缀插槽功能，通过 `prefixRender` 和 `suffixRender` 渲染属性实现自定义前置和后置内容。支持添加图标、按钮、文本标签等各种组件，可以组合构建复杂的表单控件，如带搜索按钮的搜索框、带货币符号的金额输入框、带单位标识的数值输入框等，提供灵活的扩展能力以满足不同的业务需求。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputSlot.svelte" layout="column"></IStockShellUiExample>
:::

### 幽灵模式样式

展示输入框组件的幽灵模式样式，通过设置 `variant="ghost"` 实现透明背景效果。这种样式适用于沉浸式输入场景，如卡片内输入、复杂布局中的无边框设计等，在保持输入功能完整的同时减少视觉干扰，同时确保焦点状态的可见性，为用户提供更加简洁和现代的输入体验。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputGhost.svelte"></IStockShellUiExample>
:::

### 字段集中的输入框集成

展示输入框组件与 `ShFieldSet`、`ShField` 组件的配合使用，实现表单的语义化分组和结构化布局。通过字段集组件可以将相关的输入框进行逻辑分组，支持组合表单验证和统一的样式管理，保持输入框在不同分组中的样式继承一致性，适用于复杂表单的组织和管理，提升表单的可读性和用户体验。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputFieldset.svelte"></IStockShellUiExample>
:::

### 颜色主题配置

演示输入框组件的八种语义化颜色主题，包括系统色系（`primary`、`secondary`、`accent`）、状态指示色（`info`、`success`、`warning`、`error`）和中性色（`neutral`）。不同颜色主题适用于不同的使用场景，如主要输入区域使用 `primary`，验证成功使用 `success`，错误提示使用 `error`，帮助用户快速识别输入框的状态和重要性。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputColor.svelte" layout="column"></IStockShellUiExample>
:::

### 尺寸规格配置

展示输入框组件的五级尺寸标准，从超小（`xs`）到超大（`xl`），默认为中等尺寸（`md`）。不同尺寸适用于不同的布局场景：`xs` 适合表格内输入和紧凑布局，`sm` 适合卡片内输入，`md` 适用于大多数表单场景，`lg` 适合重要表单字段，`xl` 适合页面主要输入框和搜索框等，支持响应式适配以确保在各种设备上的最佳显示效果。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputSize.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态配置

演示输入框组件的禁用状态，通过设置 `disabled` 属性实现禁用模式。禁用状态下输入框将无法接收用户输入，同时显示特殊的视觉样式（如灰色背景、降低透明度等）来明确表示当前状态。适用于表单提交过程中的临时禁用、条件性字段控制、只读信息展示等场景，确保用户界面的状态反馈清晰明确。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputDisabled.svelte"></IStockShellUiExample>
:::

### 输入类型支持

演示输入框组件对12种HTML5输入类型的全面支持，包括基础类型（text、password、email）、专用类型（tel、url、search）和数据输入类型（number、date、time等）。每种输入类型都会触发相应的虚拟键盘和验证机制，如邮箱类型会显示@符号键盘，数字类型会显示数字键盘，日期类型会弹出日期选择器，确保用户在不同设备上都能获得最佳的输入体验。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputType.svelte" layout="column"></IStockShellUiExample>
:::

### 图标前缀集成

展示如何使用 `prefixRender` 属性为输入框添加图标前缀，支持SVG图标和自定义组件渲染。图标会根据不同的输入类型自动适配相应的语义，如用户名输入框显示用户图标，搜索框显示搜索图标，邮箱输入框显示邮件图标等，保持图标与输入类型的一致性，提升用户界面的直观性和易用性。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputIcon.svelte" layout="column"></IStockShellUiExample>
:::

### 验证机制集成

演示输入框组件的验证机制，支持HTML5原生验证（如required、pattern等属性）和自定义验证规则。通过 `validator` 属性控制验证状态的视觉反馈，结合颜色主题（如error、success）提供直观的验证结果显示，适用于表单即时验证、输入格式检查等场景，帮助用户及时发现和纠正输入错误。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputValidator.svelte" layout="column"></IStockShellUiExample>
:::

### 值变更回调处理

演示输入框组件的值变更回调功能，通过 `onChangeValue` 回调函数实时获取输入值的变化。该回调会在用户输入时触发，对于数字类型输入会自动进行类型转换，适用于表单即时验证、搜索建议、数据联动等需要实时响应用户输入的场景，帮助开发者构建更加智能和响应式的用户界面。

::: raw
<IStockShellUiExample src="./data-input/input/example/InputChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

除了支持原生 input 元素的所有属性外，还扩展了以下特有属性：

| 属性名          | 类型                                                                                                                 | 默认值   | 说明                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------- |
| `type`          | [`InputType`](#inputtype)                                                                                            | `'text'` | 输入框类型，支持12种HTML5输入类型 |
| `value`         | `any`                                                                                                                | -        | 输入框的值，支持双向绑定          |
| `color`         | [`InputColor`](#inputcolor)                                                                                          | -        | 输入框的主题颜色                  |
| `size`          | [`InputSize`](#inputsize)                                                                                            | `'md'`   | 输入框的尺寸大小                  |
| `variant`       | [`InputVariant`](#inputvariant)                                                                                      | -        | 输入框的样式变体                  |
| `validator`     | `boolean`                                                                                                            | `true`   | 是否启用验证状态样式              |
| `prefixRender`  | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>> | -        | 前缀内容渲染函数                  |
| `suffixRender`  | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>> | -        | 后缀内容渲染函数                  |
| `onChangeValue` | `(value?: any) => void`                                                                                              | -        | 值变更回调函数，数字类型自动转换  |
| `class`         | `string`                                                                                                             | -        | 自定义CSS类名                     |

### 代码片段插入位置

- `prefixRender`：

```svelte
<label>
  {@render prefixRender?.({ color, size, variant })}
  <input />
</label>
```

- `suffixRender`：

```svelte
<label>
  <input />
  {@render suffixRender?.({ color, size, variant })}
</label>
```

### 事件

组件继承原生 `input` 元素的所有事件，包括但不限于：

- `input` - 输入内容时触发
- `change` - 输入完成时触发
- `focus` - 获得焦点时触发
- `blur` - 失去焦点时触发
- `keydown` - 按键按下时触发
- `keyup` - 按键释放时触发

### 类型定义

#### InputType

```typescript
export type InputType =
  | 'text' // 文本输入
  | 'password' // 密码输入
  | 'email' // 邮箱输入
  | 'number' // 数字输入
  | 'date' // 日期选择
  | 'datetime-local' // 本地日期时间
  | 'week' // 周选择
  | 'month' // 月份选择
  | 'tel' // 电话号码
  | 'url' // URL地址
  | 'search' // 搜索输入
  | 'time'; // 时间选择
```

#### InputColor

```typescript
export type InputColor =
  | 'primary' // 主要色彩
  | 'secondary' // 次要色彩
  | 'accent' // 强调色彩
  | 'neutral' // 中性色彩
  | 'info' // 信息色彩
  | 'success' // 成功色彩
  | 'warning' // 警告色彩
  | 'error'; // 错误色彩
```

#### InputSize

```typescript
export type InputSize =
  | 'xs' // 超小尺寸
  | 'sm' // 小尺寸
  | 'md' // 中等尺寸（默认）
  | 'lg' // 大尺寸
  | 'xl'; // 超大尺寸
```

#### InputVariant

```typescript
export type InputVariant = 'ghost'; // 幽灵样式（透明背景）
```

#### InputRenderOption

```typescript
export interface InputRenderOption {
  /** 当前输入框的颜色主题 */
  color?: InputColor;
  /** 当前输入框的尺寸配置 */
  size?: InputSize;
  /** 当前输入框的样式变体 */
  variant?: InputVariant;
}
```

## 设计指南

### 颜色使用建议

- **primary**：重要表单字段、主要输入区域
- **secondary**：次要表单字段、辅助输入区域
- **success**：验证通过、输入正确的字段
- **warning**：需要注意、可能有问题的字段
- **error**：验证失败、输入错误的字段
- **info**：提示信息、帮助说明相关字段
- **neutral**：默认状态、通用输入字段

### 尺寸选择建议

- **xs**：表格内输入、紧凑布局场景
- **sm**：卡片内输入、次要表单字段
- **md**：默认尺寸，适用于大多数表单场景
- **lg**：重要表单字段、主要输入区域
- **xl**：页面主要输入框、搜索框等

### 无障碍设计

- 为输入框提供清晰的 `label` 或 `aria-label`
- 使用 `placeholder` 提供输入提示，但不能替代标签
- 错误状态时提供明确的错误信息
- 确保足够的颜色对比度
- 支持键盘导航和屏幕阅读器

## 最佳实践

### 表单组织

```svelte
<!-- 推荐：使用 FieldSet 组织相关输入框 -->
<ShFieldSet title="用户信息">
  <ShField label="用户名">
    <ShInput type="text" bind:value={username} required />
  </ShField>
  <ShField label="邮箱">
    <ShInput type="email" bind:value={email} color="primary" required />
  </ShField>
</ShFieldSet>
```

### 性能优化

- 对于频繁变化的输入，考虑使用防抖处理
- 大量输入框时，使用虚拟滚动或分页加载
- 避免在 `onChangeValue` 中执行重计算操作

### 用户体验

- 提供清晰的输入提示和错误信息
- 使用合适的输入类型触发正确的虚拟键盘
- 为长表单提供保存草稿功能
- 在移动端优化触摸体验

## 常见问题

### Q: 如何自定义前缀和后缀内容？

A: 使用 `prefixRender` 和 `suffixRender` 属性：

```svelte
<ShInput type="text" bind:value={amount} prefixRender={currencyRender} suffixRender={unitRender} />

{#snippet currencyRender({ color, size })}
  <span class="text-gray-500">¥</span>
{/snippet}

{#snippet unitRender({ color, size })}
  <span class="text-gray-500">元</span>
{/snippet}
```

### Q: 如何实现响应式输入框？

A: 使用 Tailwind CSS 的响应式类名：

```svelte
<ShInput type="text" bind:value={searchTerm} size="sm" class="sm:size-md lg:size-lg" placeholder="搜索内容" />
```

### Q: 幽灵模式适用于什么场景？

A: 幽灵模式适用于需要无边框、透明背景的设计场景：

```svelte
<!-- 卡片内的输入框 -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <ShInput type="text" variant="ghost" placeholder="在卡片中输入..." />
  </div>
</div>
```

---

> **数据绑定提示**：推荐使用 `bind:value` 实现双向数据绑定，确保数据同步的准确性。

[更新日志](/packages/shell-ui/CHANGELOG.md#input-输入框组件)
