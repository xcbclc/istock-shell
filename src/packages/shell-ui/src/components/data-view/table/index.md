---
title: Table 表格组件
description: 功能强大的数据表格组件，支持多种交互模式和样式配置，提供行选择、固定列、斑马纹、悬停高亮等特性，适用于数据展示、分析报表等场景。
keywords: [ 表格组件,Svelte表格,数据展示,行选择,固定列,Table API ]
editLink: false
outline: [ 2, 3 ]
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

<IStockShellUiExample src="./example/TableDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableStyle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableActive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableHover.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableZebra.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TablePinned.svelte" demoStyle="max-height:unset"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableEvent.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TableButton.svelte"></IStockShellUiExample>

## API 参考

### ShTable属性说明

| 参数             | 说明         | 类型                                                                     | 默认值   |
|----------------|------------|------------------------------------------------------------------------|-------|
| caption        | 表格标题       | `string`                                                                 | -     |
| cols           | 列配置        | [`TableCol`](#tablecol)[]                                              | -     |
| size           | 表格尺寸       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                   | `md`  |
| zebra          | 斑马纹样式      | `boolean`                                                              | false |
| hover          | 悬停高亮       | `boolean`                                                              | false |
| pinRows        | 固定行        | `boolean`                                                              | false |
| pinCols        | 固定列        | `boolean`                                                              | false |
| selection      | 启用行选择      | `boolean`                                                              | false |
| selected       | 已选中的行数据    | `any[]`                                                                | []    |
| thead          | 表头配置       | [`TableThead`](#tablethead)                                            | []    |
| tbody          | 表格主体数据     | [`TableDataList`](#tabledatalist)                                      | []    |
| tfoot          | 表格底部数据     | [`TableDataList`](#tabledatalist)                                      | []    |
| buttons        | 行操作按钮配置    | [`TableTrButton[]`](#tabletrbutton)                                    | []    |
| buttonConfig   | 按钮全局配置     | [`TableTrButtonConfig`](#tabletrbuttonconfig)                          | {}    |
| rowKey         | 行唯一标识取值key | `string` \| `((record: Record<string, any>) => string)`                | -     |
| onRowClick     | 行渲染回调      | `(node: HTMLElement, index: number) => void`                           | -     |
| onRowClick     | 行点击回调      | `(data: any, index: number) => void`                                   | -     |
| onRowSelect    | 行选择回调      | (data: [`TableDataList`](#tabledatalist)['0'], index: number) => void | -     |
| onRowSelectAll | 全选回调       | `(checked: boolean) => void`                                           | -     |

### TableRow 行组件

| 参数                | 说明            | 类型                                                                                                  | 默认值     |
|-------------------|---------------|-----------------------------------------------------------------------------------------------------|---------|
| tag               | 默认单元格类型       | `'th' \| 'td'`                                                                                      | 'td'    |
| type              | 行类型（表头/表体/表脚） | `'thead' \| 'tbody' \| 'tfoot'`                                                                     | 'tbody' |
| list              | 行数据项列表        | [`TableTrItem[]`](#tabletritem)                                                                     | []      |
| hover             | 启用悬停高亮        | `boolean`                                                                                           | false   |
| dataIndex         | 行索引位置         | `number`                                                                                            | -       |
| selection         | 显示选择框         | `boolean`                                                                                           | false   |
| selected          | 已选中的值         | `any[]`                                                                                             | []      |
| rowKey            | 行唯一标识键        | `string` \| `((record: Record<string, any>) => string)`                                             | -       |
| rowValue          | 行数据值          | `Record<string, any>` \| [`TableTrProps`](#tablerow 行组件)['list'] \| [`TableTrProps`](#tablerow 行组件) | -       |
| buttons           | 操作按钮配置        | [`TableTrButton[]`](#tabletrbutton)                                                                 | []      |
| buttonConfig      | 按钮列全局配置       | [`TableTrButtonConfig`](#tabletrbuttonconfig)                                                       | {}      |
| selectionRender   | 自定义选择框渲染      | `() => ReturnType<Snippet<[]>>`                                                                     | -       |
| onRender          | 行渲染回调         | `(node: HTMLElement) => void`                                                                       | -       |
| onRowSelectChange | 行选择状态变更回调     | `(checked: boolean) => void`                                                                        | -       |

### TableTd 数据单元格

| 参数      | 说明    | 类型                              | 默认值 |
|---------|-------|---------------------------------|-----|
| value   | 显示值   | `any`                           | -   |
| dataKey | 数据字段键 | `string`                        | -   |
| unit    | 单位配置  | `{text: string, show: boolean}` | -   |

### TableTh 表头单元格

| 参数      | 说明    | 类型                              | 默认值    |
|---------|-------|---------------------------------|--------|
| value   | 表头文本  | `string`                        | ''     |
| dataKey | 关联数据字段键名 | `string`                        | -      |
| unit    | 单位配置  | `{text: string, show: boolean}` | -   |

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
}
```

### TableTrItem

```typescript
interface TableTrItem {
  value?: any;         // 显示值
  dataKey?: string;    // 数据字段键
  tag?: 'th' | 'td';  // 单元格类型
  unit?: {             // 单位配置
    text: string;      // 单位文本
    show: boolean;     // 是否显示
  };
}
```

### TableTrButtonConfig

```typescript
interface TableTrButtonConfig {
  tag?: 'th' | 'td';     // 按钮列单元格类型
  columnTitle?: string;   // 按钮列标题文本
}
```