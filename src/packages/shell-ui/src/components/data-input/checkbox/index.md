---
title: Checkbox 复选框组件 | IStock Shell UI
description: Checkbox复选框组件提供强大的多选交互功能，支持8种主题色彩、5种尺寸规格、不确定状态、标签配置、批量操作等特性，基于Tailwind CSS构建，适用于表单选择、配置开关、数据筛选等各种交互场景。
keywords:
  [Checkbox复选框组件, Svelte复选框, 多选组件, 表单控件, 复选框样式, UI组件库, Web组件, 用户界面, UX设计, 响应式复选框]
aside: false
editLink: false
outline: [2, 4]
---

# Checkbox 复选框组件

复选框是用户界面中重要的表单控件，用于实现多选操作和状态切换。IStock Shell UI 的 Checkbox 组件基于 Tailwind CSS 和 DaisyUI 构建，提供了丰富的配置选项和优秀的用户体验。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShCheckbox } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的复选框用法，适用于大多数场景：

```svelte
<script>
  import { ShCheckbox } from '@istock-shell/ui';
  let selectedValues = $state([]);

  const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ];
</script>

<ShCheckbox bind:value={selectedValues} {options} />
```

## 组件特性

- 🎯 **多选支持**：支持单选和多选模式，灵活适应不同场景
- 🎨 **丰富主题**：提供8种预设颜色主题，满足不同设计需求
- 📏 **多种尺寸**：支持5种尺寸规格，从超小到超大全覆盖
- 🔄 **三态支持**：支持选中、未选中、不确定三种状态
- 🏷️ **标签配置**：灵活的标签位置和样式配置
- 🚫 **禁用控制**：支持全局和单项禁用状态
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持键盘导航
- ⚡ **TypeScript**：完整的类型安全支持，开发体验优秀

## 使用场景

| 场景       | 推荐配置                     | 说明                     |
| ---------- | ---------------------------- | ------------------------ |
| 表单多选   | `options` + `bind:value`     | 表单中的多项选择功能     |
| 配置开关   | `color="primary"` + 单项配置 | 系统设置、功能开关等     |
| 批量操作   | `indeterminate` + 全选功能   | 表格行选择、批量处理等   |
| 权限配置   | `disabled` + 层级结构        | 角色权限、功能权限配置   |
| 筛选条件   | `color="accent"` + 多项组合  | 搜索筛选、条件组合等     |
| 状态展示   | `indeterminate` + 只读模式   | 显示部分选中的状态       |
| 移动端适配 | `size="lg"` + 响应式配置     | 触摸友好的大尺寸复选框   |
| 表单验证   | `required` + 验证提示        | 必填项验证、错误状态显示 |

## 示例演示

<IStockShellUiExample src="./example/CheckboxDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckBoxFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxDisabled.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxIndeterminate.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxCustomColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxLabel.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxChange.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

#### Checkbox 组件属性

| 属性名          | 类型                                                      | 默认值  | 说明                     |
| --------------- | --------------------------------------------------------- | ------- | ------------------------ |
| `value`         | `T[]`                                                     | `[]`    | 选中值数组，支持双向绑定 |
| `color`         | [`CheckboxItemColor`](#checkboxitemcolor)                 | -       | 复选框颜色主题           |
| `size`          | [`CheckboxItemSize`](#checkboxitemsize)                   | -       | 复选框尺寸规格           |
| `options`       | [`CheckboxItemOption`](#checkboxitemoption)`[]`           | `[]`    | 选项数据源数组           |
| `label`         | [`CheckboxLabel`](#checkboxlabel)                         | -       | 标签配置对象             |
| `disabled`      | `boolean`                                                 | `false` | 是否禁用所有复选框       |
| `wrapClass`     | `string`                                                  | -       | 外层容器自定义CSS类名    |
| `onChangeValue` | `(value: T[], options?: CheckboxItemOption<T>[]) => void` | -       | 值变化时的回调函数       |
| `class`         | `string`                                                  | -       | 自定义CSS类名            |

#### CheckboxItem 组件属性

除了支持原生 `input` 元素的所有属性外，还支持以下扩展属性：

| 属性名          | 类型                                        | 默认值  | 说明                   |
| --------------- | ------------------------------------------- | ------- | ---------------------- |
| `color`         | [`CheckboxItemColor`](#checkboxitemcolor)   | -       | 复选框颜色主题         |
| `size`          | [`CheckboxItemSize`](#checkboxitemsize)     | -       | 复选框尺寸规格         |
| `groupValue`    | `T[]`                                       | `[]`    | 组选中值，支持双向绑定 |
| `option`        | [`CheckboxItemOption`](#checkboxitemoption) | -       | 关联的选项数据         |
| `indeterminate` | `boolean`                                   | `false` | 是否为不确定状态       |

### 代码片段插入位置

- `Checkbox`的`children`：

```svelte
<div>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 类型定义

#### CheckboxItemColor

```typescript
type CheckboxItemColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### CheckboxItemSize

```typescript
type CheckboxItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### CheckboxItemOption

```typescript
type CheckboxItemOption<T = any> = {
  /** 显示文本标签 */
  label?: string;
  /** 选项的实际值 */
  value: T;
  /** 是否禁用此选项 */
  disabled?: boolean;
};
```

#### CheckboxLabel

```typescript
type CheckboxLabel = {
  /** 标签样式类型 */
  type?: CheckboxLabelType;
  /** 标签相对于复选框的位置 */
  placement?: 'before' | 'after';
  /** 自定义CSS类名 */
  class?: string;
};
```

## 设计指南

### 颜色使用建议

- **主要操作**：使用 `primary` 色彩，突出重要选择
- **次要操作**：使用 `secondary` 或 `neutral` 色彩
- **状态指示**：使用 `success`、`warning`、`error` 表示不同状态
- **强调内容**：使用 `accent` 色彩吸引注意力

### 尺寸选择建议

- **默认尺寸（md）**：适用于大多数桌面端表单场景
- **大尺寸（lg/xl）**：适用于移动端或需要突出显示的场景
- **小尺寸（sm/xs）**：适用于紧凑布局或辅助信息选择

### 交互方式选择

- **标准复选框**：适用于独立的多选操作
- **不确定状态**：适用于表示部分选中的父级选项
- **禁用状态**：适用于条件不满足时的选项限制
- **标签配置**：根据内容长度选择合适的标签位置

### 无障碍支持

- 所有复选框都支持键盘导航（Tab、Space）
- 提供适当的 `aria-label` 和语义化标签
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持屏幕阅读器的状态播报

## 最佳实践

### 性能优化

1. **大数据量**：对于选项较多的场景，考虑使用虚拟滚动
2. **状态管理**：合理使用响应式状态，避免不必要的重渲染
3. **事件处理**：使用防抖处理频繁的值变化事件

### 用户体验

1. **状态反馈**：使用 `indeterminate` 状态清晰表示部分选中
2. **分组展示**：相关选项进行逻辑分组，提高可读性
3. **默认选择**：为常用选项提供合理的默认选中状态
4. **错误处理**：提供清晰的验证错误信息和恢复指导

### 表单集成

1. **验证规则**：配合表单验证库使用，提供实时验证反馈
2. **数据绑定**：正确使用双向绑定，确保数据同步
3. **重置功能**：提供表单重置时的状态恢复机制

## 常见问题

### Q: 如何实现全选/全不选功能？

A: 使用 `indeterminate` 状态配合计算属性：

```svelte
<script>
  import { ShCheckbox, ShCheckboxItem } from '@istock-shell/ui';

  let selectedValues = $state([]);
  const allOptions = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ];

  // 计算全选状态
  const isAllSelected = $derived(selectedValues.length === allOptions.length);
  const isIndeterminate = $derived(selectedValues.length > 0 && selectedValues.length < allOptions.length);

  function toggleAll() {
    selectedValues = isAllSelected ? [] : allOptions.map((opt) => opt.value);
  }
</script>

<ShCheckboxItem checked={isAllSelected} indeterminate={isIndeterminate} onchange={toggleAll}>全选</ShCheckboxItem>

<ShCheckbox bind:value={selectedValues} options={allOptions} />
```

### Q: 如何自定义复选框样式？

A: 通过 `class` 属性和 Tailwind CSS 类名：

```svelte
<ShCheckbox
  {options}
  bind:value={selectedValues}
  class="checkbox-primary"
  wrapClass="grid grid-cols-2 gap-4"
  label={{ class: 'text-blue-600 font-medium' }}
/>
```

### Q: 如何处理异步数据加载？

A: 使用响应式状态管理异步选项：

```svelte
<script>
  import { ShCheckbox } from '@istock-shell/ui';

  let options = $state([]);
  let selectedValues = $state([]);
  let loading = $state(true);

  // 异步加载选项数据
  async function loadOptions() {
    try {
      const response = await fetch('/api/options');
      options = await response.json();
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    loadOptions();
  });
</script>

{#if loading}
  <div class="loading loading-spinner"></div>
{:else}
  <ShCheckbox bind:value={selectedValues} {options} />
{/if}
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
