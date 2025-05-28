---
title: Table 表格组件
description: 功能强大的数据表格组件，支持多种交互模式和样式配置，提供行选择、固定列、斑马纹、悬停高亮等特性，适用于数据展示、分析报表等场景。
keywords: [表格组件, Svelte表格, 数据展示, 行选择, 固定列, Table API]
aside: false
editLink: false
outline: [2, 3]
---

## Table 表格组件

**高度可配置的结构化数据展示解决方案，提供企业级表格交互体验。**

## 使用场景

- 需要展示结构化数据集合时
- 需要支持行选择/行操作时

## 功能特性

- 多种尺寸配置（sm/md/lg等）
- 固定行列与滚动容器
- 斑马纹与悬停高亮样式
- 行选择（单选/全选）
- 自定义操作按钮配置
- 空数据状态提示
- 完整的行事件处理

## 示例演示

### 基础表格展示

通过`thead`/`tbody`数据驱动，适用于常规数据展示场景。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableDefault.svelte"></IStockShellUiExample>
:::

### 表格样式控制

通过`Tailwind CSS`控制表格样式。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableStyle.svelte"></IStockShellUiExample>
:::

### 行激活状态管理

通过`active`属性实现：

- 当前选中行标记
- 支持多行同时激活
- 适用于需要行级交互的数据表格

::: raw
<IStockShellUiExample src="./data-view/table/example/TableActive.svelte"></IStockShellUiExample>
:::

### 悬停高亮交互

使用`hover`属性控制：

- 行悬停背景色变化
- 与激活状态样式协同
- 适用于需要增强交互体验的表格

::: raw
<IStockShellUiExample src="./data-view/table/example/TableHover.svelte"></IStockShellUiExample>
:::

### 斑马纹样式表格

使用`zebra`属性开启：

- 奇偶行交替背景色
- 颜色主题系统适配
- 增强长表格可读性
- 适用于金融数据展示场景

::: raw
<IStockShellUiExample src="./data-view/table/example/TableZebra.svelte"></IStockShellUiExample>
:::

### 自定义表格内容

通过`children`插槽和`ShTableRow`、` ShTableTh`、` ShTableTd`组件实现：

- 完全自定义表格结构
- 覆盖默认渲染逻辑
- 适用于复杂表格定制需求

::: raw
<IStockShellUiExample src="./data-view/table/example/TableCustom.svelte"></IStockShellUiExample>
:::

### 多尺寸表格

使用`size`属性配置：

- 支持xs/sm/md/lg/xl种尺寸
- 全局字体大小适配
- 适用于不同信息密度的场景

::: raw
<IStockShellUiExample src="./data-view/table/example/TableSize.svelte"></IStockShellUiExample>
:::

### 固定行列布局

通过`pinRows`/`pinCols`属性实现：

- 行列固定定位
- 滚动时保持可见
- 支持表头表尾双固定
- 适用于大数据量表格

::: raw
<IStockShellUiExample src="./data-view/table/example/TablePinned.svelte" demoStyle="max-height:unset"></IStockShellUiExample>
:::

### 表格事件处理

`onRowClick`、`onRowSelect`、`onRowSelectAll`的事件处理案例。

::: raw
<IStockShellUiExample src="./data-view/table/example/TableEvent.svelte"></IStockShellUiExample>
:::

### 行操作按钮集成

使用`buttons`属性配置：

- 支持行内操作按钮组
- 按钮点击回调携带行数据
- 自动适配表头操作列标题
- 支持按钮样式全局配置(buttonConfig)
- 适用于需要行级操作的业务场景

::: raw
<IStockShellUiExample src="./data-view/table/example/TableButton.svelte"></IStockShellUiExample>
:::

## API 参考

### ShTable属性说明

| 参数           | 说明              | 类型                                                                  | 默认值 |
| -------------- | ----------------- | --------------------------------------------------------------------- | ------ |
| caption        | 表格标题          | `string`                                                              | -      |
| cols           | 列配置            | [`TableCol`](#tablecol)[]                                             | -      |
| size           | 表格尺寸          | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                  | `md`   |
| zebra          | 斑马纹样式        | `boolean`                                                             | false  |
| hover          | 悬停高亮          | `boolean`                                                             | false  |
| pinRows        | 固定行            | `boolean`                                                             | false  |
| pinCols        | 固定列            | `boolean`                                                             | false  |
| selection      | 启用行选择        | `boolean`                                                             | false  |
| selected       | 已选中的行数据    | `any[]`                                                               | []     |
| thead          | 表头配置          | [`TableThead`](#tablethead)                                           | []     |
| tbody          | 表格主体数据      | [`TableDataList`](#tabledatalist)                                     | []     |
| tfoot          | 表格底部数据      | [`TableDataList`](#tabledatalist)                                     | []     |
| buttons        | 行操作按钮配置    | [`TableTrButton[]`](#tabletrbutton)                                   | []     |
| buttonConfig   | 按钮全局配置      | [`TableTrButtonConfig`](#tabletrbuttonconfig)                         | {}     |
| rowKey         | 行唯一标识取值key | `string` \| `((record: Record<string, any>) => string)`               | -      |
| onRowClick     | 行渲染回调        | `(node: HTMLElement, index: number) => void`                          | -      |
| onRowClick     | 行点击回调        | `(data: any, index: number) => void`                                  | -      |
| onRowSelect    | 行选择回调        | (data: [`TableDataList`](#tabledatalist)['0'], index: number) => void | -      |
| onRowSelectAll | 全选回调          | `(checked: boolean) => void`                                          | -      |

### TableRow 行组件

| 参数              | 说明                     | 类型                                                                                                      | 默认值  |
| ----------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- | ------- |
| tag               | 默认单元格类型           | `'th' \| 'td'`                                                                                            | 'td'    |
| type              | 行类型（表头/表体/表脚） | `'thead' \| 'tbody' \| 'tfoot'`                                                                           | 'tbody' |
| list              | 行数据项列表             | [`TableTrItem[]`](#tabletritem)                                                                           | []      |
| hover             | 启用悬停高亮             | `boolean`                                                                                                 | false   |
| dataIndex         | 行索引位置               | `number`                                                                                                  | -       |
| selection         | 显示选择框               | `boolean`                                                                                                 | false   |
| selected          | 已选中的值               | `any[]`                                                                                                   | []      |
| rowKey            | 行唯一标识键             | `string` \| `((record: Record<string, any>) => string)`                                                   | -       |
| rowValue          | 行数据值                 | `Record<string, any>` \| [`TableTrProps`](#tablerow 行组件)['list'] \| [`TableTrProps`](#tablerow 行组件) | -       |
| buttons           | 操作按钮配置             | [`TableTrButton[]`](#tabletrbutton)                                                                       | []      |
| buttonConfig      | 按钮列全局配置           | [`TableTrButtonConfig`](#tabletrbuttonconfig)                                                             | {}      |
| selectionRender   | 自定义选择框渲染         | `() => ReturnType<Snippet<[]>>`                                                                           | -       |
| onRender          | 行渲染回调               | `(node: HTMLElement) => void`                                                                             | -       |
| onRowSelectChange | 行选择状态变更回调       | `(checked: boolean) => void`                                                                              | -       |

### TableTd 数据单元格

| 参数    | 说明       | 类型                            | 默认值 |
| ------- | ---------- | ------------------------------- | ------ |
| value   | 显示值     | `any`                           | -      |
| dataKey | 数据字段键 | `string`                        | -      |
| unit    | 单位配置   | `{text: string, show: boolean}` | -      |

### TableTh 表头单元格

| 参数    | 说明             | 类型                            | 默认值 |
| ------- | ---------------- | ------------------------------- | ------ |
| value   | 表头文本         | `string`                        | ''     |
| dataKey | 关联数据字段键名 | `string`                        | -      |
| unit    | 单位配置         | `{text: string, show: boolean}` | -      |

### TableCol

```typescript
interface TableCol extends HTMLColAttributes {}
```

### TableThead

```typescript
type TableTrTh = TableThProps & { tag?: 'th' | 'td' };
interface TableTheadTr extends HTMLAttributes<HTMLTableRowElement> {
  list: TableTrTh[];
}
```

### TableDataList

```typescript
type TableDataList = Array<Record<string, any> | TableTrProps['list'] | TableTrProps>;
```

### TableTrButton

```typescript
type TableTrButton = ButtonProps<'button' | 'a'> & {
  onClickValue?: (value: any, index: number) => void; // 带值的点击回调
};
```

### TableTrItem

```typescript
interface TableTrItem {
  value?: any; // 显示值
  dataKey?: string; // 数据字段键
  tag?: 'th' | 'td'; // 单元格类型
  unit?: {
    // 单位配置
    text: string; // 单位文本
    show: boolean; // 是否显示
  };
}
```

### TableTrButtonConfig

```typescript
interface TableTrButtonConfig {
  tag?: 'th' | 'td'; // 按钮列单元格类型
  columnTitle?: string; // 按钮列标题文本
}
```
