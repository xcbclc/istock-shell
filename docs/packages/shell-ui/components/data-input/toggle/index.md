---
title: Toggle 开关组件 | IStock Shell UI
description: Toggle开关组件提供直观的二元状态切换功能，支持8种主题色彩、5种尺寸规格、标签配置、不确定状态等特性，适用于设置开关、功能启用、状态切换等各种交互场景。
keywords:
  [Toggle开关组件, Svelte开关, 状态切换, 表单控件, 二元开关, UI组件库, 交互组件, Web组件, 用户界面, UX设计, 响应式开关]
aside: false
editLink: false
outline: [2, 4]
---

# Toggle 开关组件

开关组件是用于控制二元状态（开/关、启用/禁用）的交互元素，提供直观的视觉反馈和即时的状态切换体验。IStock Shell UI 的 Toggle 组件提供了丰富的样式变体和功能特性，满足各种设计需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShToggle } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的开关用法，支持双向数据绑定：

```svelte
<script>
  import { ShToggle } from '@istock-shell/ui';
  let isEnabled = $state(false);
</script>

<ShToggle bind:value={isEnabled} />
```

## 组件特性

- 🎨 **丰富色彩**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🏷️ **标签支持**：可配置前置或后置标签，提升用户体验
- 🔄 **状态管理**：支持双向数据绑定和状态变更回调
- 🎭 **特殊状态**：支持不确定状态（indeterminate）和禁用状态
- 🎨 **自定义样式**：支持自定义图标和轨道样式
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景       | 推荐配置                   | 说明                             |
| ---------- | -------------------------- | -------------------------------- |
| 功能开关   | `color="primary"`          | 应用设置中的功能启用/禁用        |
| 状态切换   | `color="info"`             | 显示/隐藏内容、模式切换等        |
| 权限控制   | `color="warning"`          | 用户权限、访问控制等重要设置     |
| 危险操作   | `color="error"`            | 删除保护、危险功能的启用/禁用    |
| 成功确认   | `color="success"`          | 完成状态、启用状态等正面反馈     |
| 表单字段   | `size="sm"` + 标签配置     | 表单中的开关选项                 |
| 移动端设置 | `size="lg"`                | 移动设备上的设置项，便于触摸操作 |
| 列表项控制 | `size="xs"` 或 `size="sm"` | 列表项中的快速开关操作           |

## 示例演示

### 基础开关配置

最基础的开关组件使用方式，通过 `bind:value` 实现双向数据绑定。开关默认使用 `md` 尺寸，提供即时的状态反馈和视觉切换效果，适用于大多数应用场景。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleDefault.svelte" layout="column"></IStockShellUiExample>
:::

#### 表单字段集成

开关组件可以与 `ShFieldSet` 组件配合使用，实现表单分组的语义化布局。这种集成方式支持组合表单验证，保持样式继承的一致性，提升表单的可访问性和用户体验。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleFieldset.svelte"></IStockShellUiExample>
:::

### 颜色主题配置

开关组件支持八种语义化颜色主题，通过 `color` 属性进行配置。包括系统色系（`primary`、`secondary`、`accent`）用于品牌一致性，状态指示色（`info`、`success`、`warning`、`error`）用于不同场景的语义表达，以及中性色（`neutral`）用于通用场景。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleColor.svelte"></IStockShellUiExample>
:::

### 尺寸规格配置

开关组件提供五种标准尺寸规格，通过 `size` 属性进行配置。包括 `xs`（超小）、`sm`（小）、`md`（中等，默认）、`lg`（大）、`xl`（超大），可根据不同的使用场景和设计需求选择合适的尺寸。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleSize.svelte"></IStockShellUiExample>
:::

### 禁用状态配置

通过设置 `disabled` 属性可以禁用开关组件，禁用后开关将无法进行交互操作，并显示相应的禁用样式。适用于权限限制、条件不满足或临时不可用的场景。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleDisabled.svelte"></IStockShellUiExample>
:::

### 不确定状态配置

通过 `indeterminate` 属性可以设置开关的不确定状态，表示部分选中或中间状态。常用于父子级联选择场景，当子项部分选中时，父级开关显示为不确定状态，提供更清晰的状态指示。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleIndeterminate.svelte"></IStockShellUiExample>
:::

### 图标集成配置

开关组件支持多种图标集成方式，可以使用内置的 `<ShIcon>` 组件或自定义 SVG/组件。图标与开关状态保持同步，提供一致的交互体验和视觉反馈，增强用户界面的表达力。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleIcon.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义样式配置

通过 `class` 属性可以应用自定义的 Tailwind CSS 类来个性化开关样式。支持自定义背景色（`bg-*`）、边框色（`border-*`）、选中状态样式（`checked:*`）等，满足特定的设计需求和品牌要求。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleCustom.svelte"></IStockShellUiExample>
:::

### 值变化事件处理

通过 `onChangeValue` 回调函数可以实时监听开关状态的变化，支持将状态同步到父组件或触发其他业务逻辑。适用于需要实时响应状态变化的场景，如实时保存设置、联动其他组件等。

::: raw
<IStockShellUiExample src="./data-input/toggle/example/ToggleChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名          | 类型                          | 默认值  | 说明                     |
| --------------- | ----------------------------- | ------- | ------------------------ |
| `value`         | `boolean`                     | `false` | 开关状态值，支持双向绑定 |
| `color`         | [`ToggleColor`](#togglecolor) | -       | 开关的主题颜色           |
| `size`          | [`ToggleSize`](#togglesize)   | `'md'`  | 开关的尺寸大小           |
| `label`         | [`ToggleLabel`](#togglelabel) | -       | 标签配置                 |
| `disabled`      | `boolean`                     | `false` | 是否禁用开关             |
| `onChangeValue` | `(value: boolean) => void`    | -       | 状态变更时的回调函数     |

### 代码片段插入位置

- `children`并`label.placement`等于`before`：

```svelte
<label>
  <!-- ...code -->
  {@render children()}
  <input />
  <!-- ...code -->
</label>
```

- `children`其它情况：

```svelte
<label>
  <!-- ...code -->
  <input />
  {@render children()}
  <!-- ...code -->
</label>
```

### 事件

继承所有原生 input[type="checkbox"] 元素事件，如：

- `change` - 状态改变事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `click` - 点击事件

### 类型定义

#### ToggleColor

```typescript
// 开关颜色类型
type ToggleColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### ToggleSize

```typescript
// 开关尺寸类型
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### ToggleLabel

```typescript
// 标签配置类型
type ToggleLabel = {
  placement?: 'before' | 'after'; // 标签位置
  class?: string; // 自定义类名
};
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：重要的功能开关，如主要设置项
- **Secondary（次要）**：辅助功能的开关控制
- **Success（成功）**：启用状态、完成状态等正面操作
- **Warning（警告）**：需要用户注意的设置项
- **Error（错误）**：危险操作的开关，如删除保护
- **Info（信息）**：信息类设置，如显示/隐藏
- **Neutral（中性）**：普通设置项，无特殊语义
- **Accent（强调）**：需要突出显示的特殊设置

### 尺寸选择建议

- **xs**：密集布局、表格内开关
- **sm**：列表项、卡片内开关
- **md**：默认尺寸，适用于大多数场景
- **lg**：重要设置、移动端友好
- **xl**：主要功能开关、大屏显示

### 无障碍支持

- 所有开关都支持键盘导航（Tab、Space）
- 提供适当的 `aria-label` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 禁用状态下自动添加 `aria-disabled` 属性
- 支持屏幕阅读器识别开关状态

### 最佳实践

1. **语义化使用**：根据功能的重要性和语义选择合适的颜色
2. **一致性**：在同一个应用中保持开关样式的一致性
3. **即时反馈**：开关状态变化应该立即生效并提供视觉反馈
4. **标签说明**：为开关提供清晰的标签说明其功能
5. **响应式**：在不同设备上使用合适的尺寸
6. **状态管理**：合理使用双向绑定和回调函数管理状态

## 常见问题

### Q: 如何自定义开关样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用CSS变量覆盖默认样式。

### Q: 开关和复选框有什么区别？

A: 开关用于即时生效的状态切换，复选框用于表单提交前的选择。开关提供更直观的视觉反馈。

### Q: 如何实现不确定状态？

A: 可以通过CSS类或JavaScript控制开关的不确定状态显示。

### Q: 标签位置如何配置？

A: 通过 `label.placement` 属性设置为 `'before'` 或 `'after'` 来控制标签显示位置。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
