---
title: Select 选择器组件 | IStock Shell UI
description: Select选择器组件提供单选/多选功能，支持8种主题色彩、5种尺寸规格、分组选项、禁用状态、值变更回调等特性，适用于表单选择、数据筛选、层级数据展示等场景。
keywords:
  [
    Select选择器,
    下拉选择框,
    Svelte选择器,
    表单组件,
    数据选择,
    多选组件,
    分组选项,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式选择器,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Select 选择器组件

选择器是表单中用于从预定义选项中选择一个或多个值的重要组件。IStock Shell UI 的 Select 组件基于原生 HTML select
元素构建，提供了丰富的样式配置和功能特性，满足各种数据选择需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShSelect } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的选择器用法，适用于大多数场景：

```svelte
<script>
  import { ShSelect } from '@istock-shell/ui';

  let value = $state();
  const options = [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3 },
  ];
</script>

<ShSelect bind:value {options} placeholder="请选择" />
```

## 组件特性

- 🎯 **双向绑定**：支持单选和多选模式的双向数据绑定
- 🎨 **丰富色彩**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🗂️ **分组选项**：支持选项分组显示（optgroup）
- 🔧 **灵活配置**：支持占位符、禁用状态、值变更回调
- 🎭 **样式变体**：支持幽灵（ghost）样式变体
- ♿ **无障碍友好**：基于原生 select 元素，完整支持键盘导航和屏幕阅读器

## 使用场景

| 场景         | 推荐配置                   | 说明                               |
| ------------ | -------------------------- | ---------------------------------- |
| 基础表单选择 | 默认配置                   | 简单的单选或多选需求               |
| 状态筛选     | `color="info"`             | 数据列表的状态筛选                 |
| 分类选择     | 使用 `children` 分组       | 层级分类数据的选择                 |
| 紧凑布局     | `size="sm"` 或 `size="xs"` | 表格内或卡片内的选择器             |
| 重要选择     | `size="lg"` + 主题色       | 关键配置项或重要数据选择           |
| 沉浸式界面   | `variant="ghost"`          | 复杂背景上的选择器                 |
| 表单集成     | 与 `ShFieldSet` 组件配合   | 复杂表单中的字段分组               |
| 实时联动     | 使用 `onChangeValue` 回调  | 根据选择结果动态更新其他组件或数据 |

## 示例演示

### 基础选择器配置

基础选择器提供了直观的下拉选择功能，通过 `bind:value` 实现双向数据绑定，确保选中值与组件状态同步更新。`options` 属性用于设置可选项数组，每个选项包含 `label`（显示文本）和 `value`（实际值）属性。这种基础配置适用于大多数表单场景，为用户提供清晰简洁的选择界面，支持键盘导航和屏幕阅读器访问。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 无背景样式

通过`variant="ghost"`实现：

选择器组件通过设置 `variant="ghost"` 可以启用幽灵样式，这种样式具有透明背景，仅显示边框和文字，营造出轻量化的视觉效果。幽灵样式特别适用于深色背景、复杂界面或需要减少视觉干扰的场景，能够与周围环境更好地融合。这种设计在保持功能完整性的同时，提供了更加简洁优雅的用户界面体验。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectGhost.svelte"></IStockShellUiExample>
:::

#### 字段集中的选择器集成

ShSelect 组件与 ShFieldSet、ShField 组件的集成展示了完整的表单字段解决方案。通过与这些组件配合使用，可以实现表单的语义化分组和样式继承一致性，确保选择器在复杂表单中保持统一的视觉风格和交互行为。这种集成方式特别适用于需要多层级表单结构的场景，能够简化表单验证和数据管理的复杂度。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectFieldset.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

选择器组件通过 `size` 属性提供灵活的尺寸控制，支持 xs、sm、md、lg、xl 五种规格以适应不同的界面布局需求。xs 尺寸适用于表格内嵌选择和紧凑布局，sm 适合卡片内的次要功能，md 作为默认尺寸适用于大多数表单场景，lg 用于重要的表单字段，xl 则适合页面主要配置项和大屏幕显示。合理选择尺寸可以保持界面的视觉平衡和层次感。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectSize.svelte" layout="column"></IStockShellUiExample>
:::

### 预定义颜色主题

选择器组件通过 `color` 属性提供丰富的主题色彩选择，支持 primary、secondary、success、warning、error、info、neutral、accent 等多种预设颜色主题。不同颜色具有明确的语义表达：primary 用于重要选择，success 表示成功状态，warning 提示注意事项，error 标识错误状态，info 用于信息展示。合理使用颜色主题可以增强用户界面的视觉层次和交互反馈，提升用户体验。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectColor.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

选择器组件通过 `disabled` 属性提供禁用状态控制，当设置为 true 时，选择器将变为不可交互状态并显示为灰色样式，同时保持当前选中值的显示。这种禁用机制适用于条件不满足时临时限制用户操作，如表单验证失败、权限不足或依赖条件未满足等场景。禁用状态下组件会自动添加适当的无障碍属性，确保屏幕阅读器能够正确识别其状态。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectDisabled.svelte" layout="column"></IStockShellUiExample>
:::

### 值变化事件处理

选择器组件通过 `onChangeValue` 回调函数提供强大的值变化处理机制，当用户选择不同选项时会触发此回调并传递选中的值和完整的选项对象。这种设计支持实时数据获取和异步状态更新，使开发者能够根据用户选择立即响应并执行相应的业务逻辑。特别适用于动态表单更新、级联选择、条件筛选或表单验证等需要根据选择结果进行实时交互的复杂场景。

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### Select API

#### Select 属性

| 属性名          | 类型                                                                                      | 默认值  | 说明                               |
| --------------- | ----------------------------------------------------------------------------------------- | ------- | ---------------------------------- |
| `value`         | `any` \| `any[]`                                                                          | -       | 选中的值（双向绑定），多选时为数组 |
| `color`         | [`SelectColor`](#selectcolor)                                                             | -       | 选择器的主题颜色                   |
| `size`          | [`SelectSize`](#selectsize)                                                               | `'md'`  | 选择器的尺寸大小                   |
| `variant`       | [`SelectVariant`](#selectvariant)                                                         | -       | 选择器的样式变体                   |
| `options`       | [`SelectItemOption[]`](#selectitemoption)                                                 | `[]`    | 选项数据源，支持分组和嵌套结构     |
| `placeholder`   | `string`                                                                                  | -       | 占位符文本，在未选择时显示         |
| `multiple`      | `boolean`                                                                                 | `false` | 是否启用多选模式                   |
| `disabled`      | `boolean`                                                                                 | `false` | 是否禁用选择器                     |
| `onChangeValue` | `<T>(value: T \| T[], options?: Array<[SelectItemOption](#selectitemoption)<T>>) => void` | -       | 值变更时的回调函数，多选时值为数组 |

#### Select 代码片段插入位置

- `children`：

```svelte
<select>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</select>
```

#### Select 事件

`Select`继承所有原生 HTML select 元素事件，如：

- `change` - 值变更事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `click` - 点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### SelectItemOption API

#### SelectItemOption 属性

| 属性名     | 类型                         | 默认值  | 说明                                 |
| ---------- | ---------------------------- | ------- | ------------------------------------ |
| `label`    | `string`                     | -       | 显示给用户的文本标签                 |
| `value`    | `T`                          | -       | 选项的实际值，用于表单提交和数据绑定 |
| `disabled` | `boolean`                    | `false` | 是否禁用此选项                       |
| `children` | `Array<SelectItemOption<T>>` | -       | 子选项列表，用于支持分组选项功能     |

### 类型定义

#### SelectColor

```typescript
// 选择器颜色类型
type SelectColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### SelectSize

```typescript
// 选择器尺寸类型
type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### SelectVariant

```typescript
// 选择器样式变体类型
type SelectVariant = 'ghost';
```

#### SelectItemOption

```typescript
// 选择项选项数据类型
export type SelectItemOption<T = any> = {
  /** 显示给用户的文本标签 */
  label?: string;
  /** 选项的实际值，用于表单提交和数据绑定 */
  value: T;
  /** 是否禁用此选项 */
  disabled?: boolean;
  /** 子选项列表，用于支持分组选项功能 */
  children?: Array<SelectItemOption<T>>;
};
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：重要的数据选择，如主要配置项
- **Secondary（次要）**：辅助性的选择功能
- **Success（成功）**：状态筛选中的成功状态
- **Warning（警告）**：需要注意的选择项
- **Error（错误）**：错误状态或危险操作的选择
- **Info（信息）**：信息类筛选和查询
- **Neutral（中性）**：默认选择器，无特殊语义
- **Accent（强调）**：需要突出显示的特殊选择

### 尺寸选择建议

- **xs**：表格内选择、紧凑布局
- **sm**：卡片内选择、次要功能
- **md**：默认尺寸，适用于大多数表单场景
- **lg**：重要选择项、表单主要字段
- **xl**：页面主要配置项、大屏幕显示

### 无障碍支持

- 基于原生 select 元素，完整支持键盘导航
- 支持屏幕阅读器的标准语义
- 禁用状态下自动添加 `aria-disabled` 属性
- 多选模式下提供适当的 `aria-multiselectable` 属性
- 分组选项使用标准 `optgroup` 元素

## 最佳实践

### 选项组织

1. **逻辑分组**：使用 `children` 属性对相关选项进行分组
2. **选项排序**：按照使用频率或逻辑顺序排列选项
3. **选项数量**：单个分组建议不超过10个选项
4. **标签清晰**：使用简洁明了的标签文本

### 标签设计

1. **一致性**：保持同类选择器的标签格式一致
2. **简洁性**：避免过长的选项文本
3. **语义化**：使用有意义的标签而非代码或ID
4. **国际化**：考虑多语言环境下的文本长度

### 状态管理

1. **默认值**：为重要选择器设置合理的默认值
2. **验证反馈**：结合表单验证提供即时反馈
3. **加载状态**：异步数据加载时提供适当的占位符
4. **错误处理**：优雅处理数据加载失败的情况

### 性能优化

1. **数据懒加载**：大量选项时考虑分页或虚拟滚动
2. **防抖处理**：搜索功能使用防抖减少请求频率
3. **缓存策略**：合理缓存选项数据避免重复请求
4. **内存管理**：及时清理不需要的选项数据

## 常见问题

### Q: 如何实现选项的动态加载？

A: 可以通过使用响应式数据更新 `options` 属性：

```svelte
<script>
  let options = $state([]);

  async function loadOptions() {
    const response = await fetch('/api/options');
    options = await response.json();
  }

  onMount(loadOptions);
</script>

<ShSelect {options} placeholder="加载中..." />
```

### Q: 如何实现选项的搜索过滤？

A: 原生 select 元素不支持搜索，建议使用专门的搜索选择器组件或第三方库。

### Q: 多选模式下如何限制选择数量？

A: 可以在 `onChangeValue` 回调中进行数量限制：

```svelte
<script>
  function handleChange(values) {
    if (values.length <= 3) {
      selectedValues = values.slice(0, 3);
    }
  }
</script>

<ShSelect multiple bind:value={selectedValues} onChangeValue={handleChange} />
```

### Q: 如何自定义选择器样式？

A: 可以通过 `class` 属性添加自定义CSS类，或使用CSS变量覆盖默认样式。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
