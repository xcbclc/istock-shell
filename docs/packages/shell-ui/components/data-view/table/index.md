---
title: Table 表格组件 | IStock Shell UI
description: Table表格组件提供强大的数据展示和交互功能，支持自定义表头配置、行操作按钮、悬停效果、斑马纹样式、固定行列、5种尺寸规格、多种主题样式，基于原生HTML table元素构建，适用于数据列表、报表展示、管理后台、数据分析等复杂表格场景。
keywords:
  [
    Table表格组件,
    Svelte表格,
    数据展示,
    表格样式,
    数据列表,
    UI组件库,
    数据表格,
    Web组件,
    用户界面,
    UX设计,
    响应式表格,
    表格交互,
    数据管理,
    表格操作,
    表格布局,
    固定列表格,
    斑马纹表格,
    表格排序,
    表格筛选,
    数据网格,
    表格组件库,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Table 表格组件

表格是数据展示的核心组件，用于结构化呈现和管理大量信息。IStock Shell UI 的 Table 组件基于原生 HTML table
元素构建，提供丰富的数据展示功能、灵活的交互能力和专业的样式配置，满足从简单列表到复杂数据网格的各种需求。

## 快速开始

### 安装

```bash
npm install @istock-shell/ui
```

### 基础用法

```svelte
<script>
  import { ShTable } from '@istock-shell/ui';

  const tbody = [
    { name: '张三', age: 25, city: '北京', status: '在职' },
    { name: '李四', age: 30, city: '上海', status: '离职' },
    { name: '王五', age: 28, city: '广州', status: '在职' },
  ];

  const headers = [
    { value: '姓名', dataKey: 'name' },
    { value: '年龄', dataKey: 'age' },
    { value: '城市', dataKey: 'city' },
    { value: '状态', dataKey: 'status' },
  ];
</script>

<!-- 基础表格 -->
<ShTable {tbody} thead={headers} />

<!-- 带交互效果的表格 -->
<ShTable {tbody} thead={headers} zebra hover size="lg" class="shadow-lg" />
```

## 组件特性

- 🎯 **多格式数据**：支持对象数组、嵌套数据结构和自定义数据格式的灵活展示
- 🎨 **丰富样式**：5种尺寸规格、斑马纹效果、悬停高亮、多种主题样式和响应式适配
- ✅ **交互增强**：内置行选择、操作按钮、事件回调和键盘导航支持
- 🔧 **灵活定制**：自定义表头配置、单元格渲染、按钮组件和插槽扩展
- 📌 **固定布局**：支持固定表头、固定列和固定行的复杂布局需求
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持屏幕阅读器和键盘操作

## 使用场景

| 场景         | 推荐配置                        | 说明                             |
| ------------ | ------------------------------- | -------------------------------- |
| 数据列表     | `zebra` + `hover`               | 用户列表、产品目录等基础数据展示 |
| 管理后台     | `size="lg"` + 操作按钮          | 后台管理、数据管理等复杂表格场景 |
| 数据分析     | `size="sm"` + `zebra`           | 数据对比、趋势分析等紧凑型表格   |
| 移动端适配   | `size="xs"` + 响应式类名        | 手机端数据展示、移动应用表格     |
| 交互表格     | 行选择 + 事件回调               | 批量操作、数据筛选等交互式表格   |
| 自定义单元格 | `ShTableTd` + 自定义内容        | 图片展示、状态标签、进度条等     |
| 操作按钮     | `ShTableTd` + `ShTableTrButton` | 编辑、删除、查看等行级操作       |

## 示例演示

### 基础表格展示

通过 `thead` 和 `tbody` 属性配置表格数据，实现标准的数据表格展示。支持对象数组和二维数组两种数据格式，自动渲染表头和表体内容，提供清晰的数据结构化展示。适用于数据列表展示、报表显示、信息汇总等需要结构化数据展示的场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableDefault.svelte"></IStockShellUiExample>
:::

### 表格样式控制

通过 Tailwind CSS 类名和自定义样式控制表格的外观设计，提供丰富的样式定制能力。支持边框样式、背景颜色、文字颜色、间距调整等多种样式配置，可与设计系统和主题无缝集成。提供响应式样式支持和暗色模式适配。适用于品牌定制化需求、主题切换、特殊设计要求、与整体界面风格保持一致等样式定制场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableStyle.svelte"></IStockShellUiExample>
:::

### 行激活状态

通过 `active` 属性控制表格行的激活状态，实现行选中和高亮显示功能。支持单行和多行激活模式，可通过行索引或数据值进行控制，提供清晰的视觉反馈和状态管理。适用于数据选择界面、需要突出显示特定行的场景、表格行选中状态管理、与其他组件联动的数据展示等应用。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableActive.svelte"></IStockShellUiExample>
:::

### 悬停高亮交互

通过 `hover` 属性控制表格行的悬停高亮效果，提供良好的用户交互反馈。当鼠标悬停在表格行上时，自动应用高亮样式，增强用户体验和可操作性提示。支持自定义悬停样式和颜色配置，可与主题系统无缝集成。适用于需要交互反馈的数据表格、可点击的行操作、提升用户体验的界面设计等场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableHover.svelte"></IStockShellUiExample>
:::

### 斑马纹样式表格

通过 `zebra` 属性开启表格的斑马纹样式，为奇偶行应用不同的背景颜色以提高数据可读性。自动为表格行添加交替的背景色，帮助用户更好地区分和跟踪不同行的数据内容。支持自定义斑马纹颜色和透明度配置，可与主题系统协调工作。适用于大数据量表格、需要提高数据可读性的场景、长表格的视觉引导、减少用户阅读疲劳等应用需求。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableZebra.svelte"></IStockShellUiExample>
:::

### 自定义表格内容

通过插槽和子组件（ShTableRow、ShTableTd、ShTableTh）实现完全自定义的表格内容，支持复杂的单元格布局、自定义渲染和交互功能。可以在单元格中嵌入任意组件，如图片、按钮、表单元素等，提供最大的灵活性。适用于需要复杂单元格内容的场景，如用户头像展示、状态标签、进度条、评分组件等高度定制化的表格需求。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableCustom.svelte"></IStockShellUiExample>
:::

### 多尺寸表格

通过 `size` 属性配置表格的尺寸大小，提供多种预设尺寸选项以适应不同的界面需求。支持紧凑型（sm）、标准型（md）、宽松型（lg）等尺寸规格，自动调整行高、内边距、字体大小等样式属性。确保在不同屏幕尺寸和使用场景下的最佳显示效果。适用于移动端紧凑布局、桌面端标准展示、大屏幕宽松显示等多种界面适配需求。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableSize.svelte"></IStockShellUiExample>
:::

### 固定行列

通过 `pinRows` 和 `pinCols` 属性实现表格行列的固定显示功能，在滚动时保持关键信息始终可见。支持固定表头行、首列、尾列等多种固定模式，结合CSS样式实现粘性定位效果。提供流畅的滚动体验和清晰的数据对照关系。适用于大数据量表格、宽表格横向滚动、需要保持标题可见的报表展示、数据对比分析等场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TablePinned.svelte" demoStyle="max-height:unset"></IStockShellUiExample>
:::

### 表格事件处理

演示表格的各种事件处理功能，包括行点击、行选中、单元格点击等交互事件。提供完整的事件回调机制，可获取事件相关的行数据、索引、DOM元素等信息，支持事件冒泡控制和自定义事件处理逻辑。适用于需要丰富交互功能的表格场景，如数据详情查看、行选择操作、快捷编辑、上下文菜单等交互需求。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableEvent.svelte"></IStockShellUiExample>
:::

### 行操作按钮

通过 `buttons` 属性为表格行添加操作按钮，支持编辑、删除、查看等常见行级操作。提供丰富的按钮配置选项，包括样式、尺寸、颜色等，并支持带参数的事件回调函数，可获取当前行数据和索引。适用于数据管理界面、后台管理系统、列表页面等需要对单行数据进行操作的场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableButton.svelte"></IStockShellUiExample>
:::

## API 参考

### Table API

#### Table 属性

除了支持原生 table 元素的所有属性外，还扩展了以下特有属性：

| 属性名             | 类型                                                                                            | 默认值  | 说明                                               |
| ------------------ | ----------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------- |
| `caption`          | `string`                                                                                        | -       | 表格标题，显示在表格顶部的caption元素中            |
| `thead`            | [`TableThead`](#tablethead)                                                                     | `[]`    | 表头配置，支持简写格式或完整的行配置对象           |
| `tbody`            | [`TableDataList`](#tabledatalist)                                                               | `[]`    | 表格主体数据，支持对象数组、行配置数组等多种格式   |
| `tfoot`            | [`TableDataList`](#tabledatalist)                                                               | `[]`    | 表格脚注数据，格式与tbody相同，显示在表格底部      |
| `cols`             | [`TableCol[]`](#tablecol)                                                                       | `[]`    | 列配置数组，用于定义表格列的宽度和样式             |
| `size`             | [`TableSize`](#tablesize)                                                                       | `'md'`  | 表格尺寸规格，影响整体大小和间距                   |
| `pinRows`          | `boolean`                                                                                       | `false` | 是否固定行，需要配合CSS样式实现粘性定位效果        |
| `pinCols`          | `boolean`                                                                                       | `false` | 是否固定列，需要配合CSS样式实现粘性定位效果        |
| `zebra`            | `boolean`                                                                                       | `false` | 是否启用斑马纹样式，交替显示不同背景色的行         |
| `hover`            | `boolean`                                                                                       | `false` | 是否启用悬停高亮效果，鼠标悬停时高亮显示当前行     |
| `buttons`          | [`TableTrButton[]`](#tabletrbutton)                                                             | `[]`    | 行操作按钮配置数组，在每行末尾显示操作按钮         |
| `buttonConfig`     | [`TableTrButtonConfig`](#tabletrbuttonconfig)                                                   | `{}`    | 按钮列的全局配置，包括列标题和单元格类型           |
| `selection`        | `boolean`                                                                                       | `false` | 是否启用行选择功能，显示复选框支持单选和多选       |
| `selected`         | `unknown[]`                                                                                     | `[]`    | 已选中的行数据数组，支持双向绑定                   |
| `rowKey`           | `string \| ((record: Record<string, any>) => string)`                                           | -       | 行唯一标识键名或函数，用于确定行的唯一性和选择状态 |
| `onRender`         | `(node: HTMLElement, index: number) => void`                                                    | -       | 行渲染完成后的回调函数，接收DOM节点和行索引        |
| `onRowSelect`      | `<T = any>(index: number, checked: boolean, selected: T[], rawSelected: TableDataList) => void` | -       | 行选择状态变更回调函数，提供详细的选择信息         |
| `onRowSelectAll`   | `(checked: boolean) => void`                                                                    | -       | 全选状态变更回调函数，当全选复选框状态改变时触发   |
| `onRowClick`       | `(data: TableDataList['0'], index: number) => void`                                             | -       | 行点击事件回调函数，接收行数据和索引               |
| `onSyncAreaHeight` | `(area: TableArea, height: number) => void`                                                     | -       | 表格区域高度变化监听回调，用于实现固定布局等功能   |
| `class`            | `string`                                                                                        | -       | 自定义CSS类名                                      |

#### Table 代码片段插入位置

- `children`：

```svelte
<table>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</table>
```

#### Table 事件

组件继承原生 `table` 元素的所有事件，并扩展了以下特有事件：

- `onRowClick` - 行点击时触发。
- `onRowSelect` - 行选择状态变化时触发。
- `onRowSelectAll` - 全选状态变化时触发。

### TableRow API

#### TableRow 属性

表格行组件，用于自定义行结构和内容。除了支持原生 tr 元素的所有属性外，还扩展了以下特有属性：

| 属性名              | 类型                                                          | 默认值    | 说明                                             |
| ------------------- | ------------------------------------------------------------- | --------- | ------------------------------------------------ |
| `tag`               | `'th' \| 'td'`                                                | -         | 默认单元格类型，当单元格未指定类型时使用         |
| `type`              | `'thead' \| 'tbody' \| 'tfoot'`                               | `'tbody'` | 行所属的表格区域，影响渲染逻辑和样式             |
| `list`              | [`TableTrItem[]`](#tabletritem)                               | `[]`      | 单元格配置列表，定义行中每个单元格的属性和内容   |
| `hover`             | `boolean`                                                     | `false`   | 是否启用悬停效果，鼠标悬停时高亮显示             |
| `dataIndex`         | `number`                                                      | -         | 行在数据源中的索引位置                           |
| `selection`         | `boolean`                                                     | `false`   | 是否显示行选择复选框                             |
| `selected`          | `unknown[]`                                                   | `[]`      | 已选中的行数据数组，支持双向绑定                 |
| `rowKey`            | `string \| ((record: Record<string, any>) => string)`         | -         | 行唯一标识键名或函数，用于确定行的唯一性         |
| `rowValue`          | `Record<string, any> \| TableTrProps['list'] \| TableTrProps` | -         | 行数据值，支持多种数据格式                       |
| `buttons`           | [`TableTrButton[]`](#tabletrbutton)                           | `[]`      | 操作按钮配置数组，在行末尾显示操作按钮           |
| `buttonConfig`      | [`TableTrButtonConfig`](#tabletrbuttonconfig)                 | `{}`      | 按钮列的全局配置选项                             |
| `selectionRender`   | `() => ReturnType<Snippet<[]>>`                               | -         | 自定义选择框渲染函数，用于完全自定义选择列的内容 |
| `onRender`          | `(node: HTMLElement) => void`                                 | -         | 行渲染完成后的回调函数，接收 DOM 节点            |
| `onRowSelectChange` | `(checked: boolean) => void`                                  | -         | 行选择状态变更回调函数，当行的选择状态改变时触发 |
| `class`             | `string`                                                      | -         | 自定义CSS类名                                    |

#### TableRow 代码片段插入位置

- `children`：

```svelte
<tr>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</tr>
```

- `selectionRender`：

```svelte
<tr>
  {#if children}
    {@render children()}
  {:else}
    <!-- 选择列渲染 -->
    {#if selection}
      {#if selectionRender}
        {@render selectionRender()}
        <!-- ...code -->
      {/if}
    {/if}
    <!-- ...code -->
  {/if}
</tr>
```

#### TableRow 事件

组件继承原生 `tr` 元素的所有事件，并扩展了以下特有事件：

- `onRowSelectChange` - 行选择状态变化时触发。
- `onRender` - 行渲染完成时触发。

### TableTh API

#### TableTh 属性

表格表头单元格组件，用于自定义表头内容。

| 属性名    | 类型                                  | 默认值 | 说明               |
| --------- | ------------------------------------- | ------ | ------------------ |
| `value`   | `any`                                 | -      | 表头显示文本       |
| `dataKey` | `string`                              | -      | 对应的数据字段键名 |
| `unit`    | [`TableTrItem['unit']`](#tabletritem) | -      | 单位配置对象       |

#### TableTh 代码片段插入位置

- `children`：

```svelte
<th>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</th>
```

### TableTd API

#### TableTd 属性

表格数据单元格组件，用于自定义单元格内容。

| 属性名    | 类型                                  | 默认值 | 说明               |
| --------- | ------------------------------------- | ------ | ------------------ |
| `value`   | `any`                                 | -      | 单元格显示值       |
| `dataKey` | `string`                              | -      | 对应的数据字段键名 |
| `unit`    | [`TableTrItem['unit']`](#tabletritem) | -      | 单位配置对象       |

#### TableTd 代码片段插入位置

- `children`：

```svelte
<td>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</td>
```

### 类型定义

#### TableCol

```typescript
/**
 * 表格列配置接口
 */
export interface TableCol extends HTMLColAttributes {}
```

#### TableDataList

```typescript
/**
 * 表格数据列表类型，支持多种数据格式
 */
export type TableDataList = Array<
  | Record<string, any> // 对象数组格式
  | TableTrProps['list'] // 行配置格式
  | TableTrProps // 完整行属性格式
>;
```

#### TableThead

```typescript
/**
 * 表头单元格配置类型
 */
export type TableTrTh = TableThProps & {
  /** 单元格标签类型 */
  tag?: 'th' | 'td';
};

/**
 * 表头行配置接口
 */
export interface TableTheadTr extends HTMLAttributes<HTMLTableRowElement> {
  /** 表头单元格列表 */
  list: TableTrTh[];
}
```

#### TableTrButton

```typescript
/**
 * 表格行操作按钮配置类型
 */
export type TableTrButton = ButtonProps<'button' | 'a'> & {
  /** 带值的点击回调函数 */
  onClickValue?: (value: any, index: number) => void;
};
```

#### TableTrItem

```typescript
/**
 * 表格行数据项配置接口
 */
export interface TableTrItem {
  /** 单元格显示值 */
  value?: any;
  /** 对应的数据字段键名 */
  dataKey?: string;
  /** 单元格HTML标签类型 */
  tag?: 'th' | 'td';
  /** 单位显示配置 */
  unit?: {
    /** 单位文本内容 */
    text: string;
    /** 是否显示单位 */
    show: boolean;
  };
}
```

#### TableTrButtonConfig

```typescript
/**
 * 表格行按钮列全局配置接口
 */
export interface TableTrButtonConfig {
  /** 按钮列单元格标签类型 */
  tag?: 'th' | 'td';
  /** 按钮列的标题文本 */
  columnTitle?: string;
}
```

#### TableSize

```typescript
/**
 * 表格尺寸类型
 */
export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### TableArea

```typescript
/**
 * 表格区域类型
 */
export type TableArea = 'thead' | 'tbody' | 'tfoot';
```

## 设计指南

### 尺寸选择建议

- **xs**：移动端表格、紧凑型数据展示
- **sm**：侧边栏表格、卡片内嵌表格
- **md**：默认尺寸，适用于大多数桌面端场景
- **lg**：重要数据展示、管理后台主表格
- **xl**：大屏展示、数据分析仪表板

### 样式配置建议

- **zebra**：长列表数据，提高行间区分度
- **hover**：交互式表格，增强用户体验
- **pinned**：大数据量表格，保持关键信息可见
- **selection**：批量操作场景，支持多选功能

### 无障碍设计

- 为表格提供清晰的 `caption` 或 `aria-label`
- 使用语义化的表头结构，确保屏幕阅读器正确解析
- 提供键盘导航支持，支持 Tab 键和方向键操作
- 确保足够的颜色对比度，特别是选中和悬停状态
- 为操作按钮提供明确的 `aria-label`

## 最佳实践

### 数据结构设计

```svelte
<!-- 推荐：使用一致的数据结构 -->
<script>
  const userData = [
    { id: 1, name: '张三', email: 'zhang@example.com', status: 'active' },
    { id: 2, name: '李四', email: 'li@example.com', status: 'inactive' },
  ];

  const userHeaders = [
    { value: 'ID', dataKey: 'id' },
    { value: '姓名', dataKey: 'name' },
    { value: '邮箱', dataKey: 'email' },
    { value: '状态', dataKey: 'status' },
  ];
</script>

<ShTable tbody={userData} thead={userHeaders} zebra hover />
```

### 性能优化

- 大数据量时使用虚拟滚动或分页加载
- 避免在表格渲染过程中进行复杂计算
- 使用 `rowKey` 优化行更新性能
- 合理使用 `pinned` 功能，避免过多固定列影响性能

### 用户体验

- 提供清晰的加载状态和空数据状态
- 为长表格提供搜索和筛选功能
- 在移动端优化触摸体验和响应式布局
- 提供数据导出功能，满足用户数据管理需求

## 常见问题

### 1. 如何实现表格行选择功能？

表格组件支持单选和多选功能，通过 `selection` 属性启用，使用 `selected` 进行双向绑定：

```svelte
<script>
  import { ShTable } from '@istock-shell/ui';

  let selectedRows = [];

  const tableData = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
  ];

  const headers = [
    { value: 'ID', dataKey: 'id' },
    { value: '姓名', dataKey: 'name' },
    { value: '年龄', dataKey: 'age' },
  ];

  function handleRowSelect(index, checked, selected) {
    console.log('选择状态变化:', { index, checked, selected });
  }
</script>

<ShTable
  tbody={tableData}
  thead={headers}
  selection={true}
  bind:selected={selectedRows}
  rowKey="id"
  onRowSelect={handleRowSelect}
/>
```

**注意事项：**

- 必须设置 `rowKey` 属性来唯一标识每一行
- `selected` 数组包含被选中行的完整数据对象
- 可以通过 `onRowSelect` 和 `onRowSelectAll` 监听选择状态变化

### 2. 如何在表格中添加操作按钮？

表格支持在每行末尾添加操作按钮，通过 `buttons` 和 `buttonConfig` 属性配置：

```svelte
<script>
  import { ShTable } from '@istock-shell/ui';

  const tableData = [
    { id: 1, name: '张三', status: '在职' },
    { id: 2, name: '李四', status: '离职' },
  ];

  const actionButtons = [
    {
      text: '编辑',
      color: 'primary',
      size: 'sm',
      onClickValue: (rowData, index) => {
        console.log('编辑行:', rowData, '索引:', index);
      },
    },
    {
      text: '删除',
      color: 'error',
      size: 'sm',
      onClickValue: (rowData, index) => {
        console.log('删除行:', rowData, '索引:', index);
      },
    },
  ];

  const buttonConfig = {
    columnTitle: '操作',
    tag: 'td',
  };
</script>

<ShTable tbody={tableData} thead={headers} buttons={actionButtons} {buttonConfig} />
```

**配置说明：**

- `buttons` 数组中每个按钮支持所有 Button 组件的属性
- `onClickValue` 回调函数会接收当前行数据和行索引
- `buttonConfig.columnTitle` 设置操作列的表头标题
- `buttonConfig.tag` 可选择使用 'th' 或 'td' 作为按钮列单元格类型

### 3. 如何自定义表格单元格内容？

表格支持通过自定义组件完全控制单元格的渲染内容：

```svelte
<script>
  import { ShTable, ShTableRow, ShTableTh, ShTableTd } from '@istock-shell/ui';

  const userData = [
    { id: 1, name: '张三', status: 'active', avatar: '/avatar1.jpg' },
    { id: 2, name: '李四', status: 'inactive', avatar: '/avatar2.jpg' },
  ];
</script>

<!-- 使用自定义行和单元格 -->
<table class="table">
  <thead>
    <ShTableRow type="thead">
      <ShTableTh>头像</ShTableTh>
      <ShTableTh>姓名</ShTableTh>
      <ShTableTh>状态</ShTableTh>
    </ShTableRow>
  </thead>
  <tbody>
    {#each userData as user, index}
      <ShTableRow type="tbody" hover>
        <!-- 自定义头像单元格 -->
        <ShTableTd>
          <div class="avatar">
            <div class="w-8 rounded-full">
              <img src={user.avatar} alt={user.name} />
            </div>
          </div>
        </ShTableTd>

        <!-- 普通文本单元格 -->
        <ShTableTd value={user.name} />

        <!-- 自定义状态单元格 -->
        <ShTableTd>
          <span class="badge {user.status === 'active' ? 'badge-success' : 'badge-error'}">
            {user.status === 'active' ? '在职' : '离职'}
          </span>
        </ShTableTd>
      </ShTableRow>
    {/each}
  </tbody>
</table>
```

**自定义要点：**

- 使用 `ShTableRow`、`ShTableTh`、`ShTableTd` 组件构建自定义表格结构
- 在单元格组件内部可以放置任意 HTML 内容和 Svelte 组件
- `value` 属性用于简单文本显示，省略时可完全自定义内容
- 保持表格的语义化结构，正确使用 thead、tbody、tfoot 区域

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
