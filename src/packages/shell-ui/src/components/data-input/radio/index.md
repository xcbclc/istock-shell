---
title: Radio 单选框组件 | IStock Shell UI
description: Radio单选框组件提供丰富的交互样式和功能，支持8种主题色彩、5种尺寸规格、灵活的标签布局、禁用状态控制等特性，适用于表单选择、设置配置、选项切换等各种单选场景。
keywords:
  [Radio单选框组件, Svelte单选框, UI组件库, 表单单选, 选项组件, 前端组件, Web组件, 用户界面, UX设计, 响应式单选框]
aside: false
editLink: false
outline: [2, 4]
---

# Radio 单选框组件

单选框是表单中用于在多个互斥选项中选择唯一结果的基础组件。IStock Shell UI 的 Radio 组件提供了丰富的样式变体和功能特性，支持灵活的标签布局和完整的状态管理。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShRadio } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的单选框用法，适用于大多数表单场景：

```svelte
<script>
  import { ShRadio } from '@istock-shell/ui';

  let value = $state();
  const options = [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
  ];
</script>

<ShRadio bind:value {options} />
```

## 组件特性

- 🎨 **丰富色彩**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🏷️ **灵活标签**：支持前置/后置标签位置，自定义标签样式
- 🔧 **状态控制**：支持全局禁用和单项禁用，完整的状态管理
- 📱 **响应式设计**：适配移动端触控操作，支持无障碍访问
- ⚡ **事件回调**：提供值变更回调，支持实时响应用户选择

## 使用场景

| 场景       | 推荐配置          | 说明                     |
| ---------- | ----------------- | ------------------------ |
| 表单选择   | `color="primary"` | 表单中的主要选择项       |
| 设置配置   | `color="neutral"` | 系统设置、偏好配置等     |
| 状态选择   | `color="info"`    | 状态切换、模式选择       |
| 确认选择   | `color="success"` | 确认类选择、同意条款等   |
| 警告选择   | `color="warning"` | 需要用户注意的选择项     |
| 危险选择   | `color="error"`   | 删除确认、危险操作确认等 |
| 紧凑布局   | `size="sm"`       | 表格内、卡片内的选择项   |
| 移动端适配 | `size="lg"`       | 移动设备上的触控友好尺寸 |

## 示例演示

<IStockShellUiExample src="./example/RadioDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioDisabled.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioCustomColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioLabel.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioChange.svelte" layout="column"></IStockShellUiExample>

## API 参考

### Radio API

#### Radio 属性

| 属性名          | 类型                                                 | 默认值  | 说明                    |
| --------------- | ---------------------------------------------------- | ------- | ----------------------- |
| `value`         | `any`                                                | -       | 选中的值（双向绑定）    |
| `color`         | [`RadioColor`](#radiocolor)                          | -       | 单选框的主题颜色        |
| `size`          | [`RadioSize`](#radiosize)                            | `'md'`  | 单选框的尺寸大小        |
| `options`       | [`RadioItemOption[]`](#radioitemoption)              | `[]`    | 选项配置数组            |
| `label`         | [`RadioLabel`](#radiolabel)                          | -       | 标签配置                |
| `disabled`      | `boolean`                                            | `false` | 是否禁用所有选项        |
| `wrapClass`     | `string`                                             | -       | 外层容器的自定义CSS类名 |
| `onChangeValue` | `<T>(value: T, option?: RadioItemOption<T>) => void` | -       | 值变更回调函数          |
| `class`         | `string`                                             | -       | 自定义CSS类名           |

#### Radio 代码片段插入位置

- `children`：

```svelte
<div class="radio-group">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### RadioItem API

#### RadioItem 属性

| 属性名       | 类型                                     | 默认值 | 说明                                       |
| ------------ | ---------------------------------------- | ------ | ------------------------------------------ |
| `color`      | [`RadioItemColor`](#radioitemcolor)      | -      | 颜色主题，支持多种预设颜色                 |
| `size`       | [`RadioItemSize`](#radioitemsize)        | -      | 尺寸配置，支持多种预设尺寸                 |
| `groupValue` | `T`                                      | -      | 组选中值，用于双向绑定当前选中的值         |
| `option`     | [`RadioItemOption<T>`](#radioitemoption) | -      | 关联选项数据，包含标签、值和禁用状态等信息 |
| `class`      | `string`                                 | -      | 自定义CSS类名                              |

**继承属性说明：**

`RadioItem` 组件继承了所有原生 HTML `input` 元素的属性（除了 `size` 属性被组件自定义使用），包括但不限于：

- `value` - 单选按钮的值
- `disabled` - 是否禁用该选项
- `name` - 单选按钮组名称
- `checked` - 是否选中
- `id` - 元素ID
- `required` - 是否为必填项
- `form` - 关联的表单ID
- `tabindex` - Tab键导航顺序
- `onclick` - 点击事件
- `onchange` - 值变更事件
- `onfocus` - 获得焦点事件
- `onblur` - 失去焦点事件
- 以及其他所有 `HTMLInputAttributes` 中定义的属性

#### RadioItem 事件

`RadioItem` 组件继承所有原生HTML input元素事件，如：

- `change` - 值变更事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `click` - 点击事件

### 类型定义

#### RadioColor

```typescript
// 单选框颜色类型
type RadioColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### RadioSize

```typescript
// 单选框尺寸类型
type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### RadioItemColor

```typescript
// 单选按钮项颜色类型
type RadioItemColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### RadioItemSize

```typescript
// 单选按钮项尺寸类型
type RadioItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### RadioItemOption

```typescript
// 单选项选项数据接口
export interface RadioItemOption<T = any> {
  /** 选项显示文本 */
  label?: string;
  /** 选项实际值，支持任意类型 */
  value: T;
  /** 选项禁用状态 @default false */
  disabled?: boolean;
}
```

#### RadioLabel

```typescript
// 标签配置接口
export interface RadioLabel {
  /** 标签样式类型，支持多种预设样式 */
  type?: RadioLabelType;
  /** 标签相对于单选框的位置 @default 'after' */
  placement?: 'before' | 'after';
  /** 自定义CSS类名，用于进一步定制标签样式 */
  class?: string;
}
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：表单中的主要选择项，重要的配置选项
- **Secondary（次要）**：辅助性选择项，次要配置
- **Success（成功）**：确认类选择、同意条款等正面选项
- **Warning（警告）**：需要用户注意但不危险的选择项
- **Error（错误）**：删除确认、危险操作确认等
- **Info（信息）**：状态切换、模式选择等信息类选项
- **Neutral（中性）**：普通选择项，无特殊语义
- **Accent（强调）**：需要突出显示的特殊选项

### 尺寸选择建议

- **xs**：表格内选择、紧凑布局场景
- **sm**：卡片内选择、次要功能区域
- **md**：默认尺寸，适用于大多数表单场景
- **lg**：重要选择项、移动端适配
- **xl**：主要配置项、大屏幕显示

### 无障碍支持

- 所有单选框都支持键盘导航（Tab、Arrow keys、Space）
- 提供适当的 `aria-label` 和 `aria-describedby` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 禁用状态下自动添加 `aria-disabled` 属性
- 支持屏幕阅读器正确识别选项组和选中状态

## 最佳实践

### 选项组织

1. **逻辑分组**：将相关选项组织在一起，使用清晰的标签
2. **选项数量**：建议单组选项不超过7个，过多时考虑分组或使用下拉选择
3. **默认选择**：为常用场景提供合理的默认选中项
4. **选项排序**：按照逻辑顺序、使用频率或重要性排列选项

### 标签设计

1. **简洁明确**：使用简短、清晰的标签文本
2. **一致性**：在同一应用中保持标签样式的一致性
3. **位置选择**：根据阅读习惯选择合适的标签位置
4. **响应式**：确保标签在不同设备上都能正确显示

### 状态管理

1. **实时反馈**：使用 `onChangeValue` 回调提供即时反馈
2. **验证提示**：结合表单验证提供清晰的错误提示
3. **禁用逻辑**：合理使用禁用状态，并提供禁用原因说明
4. **数据绑定**：正确使用双向绑定确保数据同步

### 性能优化

1. **选项缓存**：对于静态选项列表，避免重复创建对象
2. **事件节流**：对于频繁触发的回调函数考虑使用节流
3. **条件渲染**：对于大量选项考虑虚拟滚动或分页

## 常见问题

### Q: 如何实现单选框的实时验证？

A: 使用 `onChangeValue` 回调结合验证逻辑：

```svelte
<script>
  let value = $state();
  let error = $state('');

  const validateSelection = (newValue) => {
    if (!newValue) {
      error = '请选择一个选项';
    } else {
      error = '';
    }
  };
</script>

<ShRadio bind:value {options} onChangeValue={validateSelection} color={error ? 'error' : 'primary'} />
{#if error}
  <p class="text-error text-sm mt-1">{error}</p>
{/if}
```

### Q: 如何实现响应式布局？

A: 使用 `wrapClass` 属性配合响应式CSS类：

```svelte
<ShRadio {options} wrapClass="flex-col sm:flex-row gap-2 sm:gap-4" />
```

### Q: 单选框组和独立单选框有什么区别？

A: 单选框组（ShRadio）用于管理一组互斥选项，独立单选框（ShRadioItem）用于单个选择项。建议优先使用单选框组以获得更好的状态管理和用户体验。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
