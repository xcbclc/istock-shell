---
title: List 列表组件
description: 高度可定制的列表组件，支持图片、描述、操作按钮、自定义渲染等功能，适用于应用列表、音乐列表、消息列表、商品列表等场景。
keywords: [列表组件, Svelte列表, 数据展示, 行操作, List API]
aside: false
editLink: false
outline: [2, 3]
---

## List 列表组件

**提供标准化的列表数据展示方案，支持丰富的自定义能力和交互操作。**

## 使用场景

- 需要展示同类数据集合时
- 需要对列表项进行操作时
- 需要展示复杂的行内容时
- 需要支持行点击和操作按钮时
- 需要自定义列表项渲染时

## 功能特性

- 支持图片/图标展示
- 灵活的行内操作按钮配置
- 自定义前后缀渲染能力
- 完整的事件处理机制
- 可定制的行内容渲染

## 示例演示

### 基础列表配置

通过`list`属性驱动的数据展示：

- 支持`text`/`description`文本配置
- 内置`picture`图片/头像展示
- 集成`actions`快捷操作按钮
- 适用于标准数据列表场景

::: raw
<IStockShellUiExample src="./data-view/list/example/ListDefault.svelte"></IStockShellUiExample>
:::

### 自定义行渲染方案

使用`ShListRow`组件实现：

- 支持序号/图片/文本自由组合
- 通过`list-col-grow`控制列宽
- 灵活的按钮操作配置
- 适用于复杂布局定制场景

::: raw
<IStockShellUiExample src="./data-view/list/example/ListRow.svelte"></IStockShellUiExample>
:::

### 多列布局展示

使用`list-col-wrap`实现：

- 支持多列内容自动换行
- 内容区域自适应伸缩
- 保持操作按钮固定位置
- 适用于详细信息展示场景

::: raw
<IStockShellUiExample src="./data-view/list/example/ListColWrap.svelte"></IStockShellUiExample>
:::

### 交互事件处理

两种事件配置方式：

- 数据驱动：通过`onClickValue`/`onActionClickValue`回调
- 组件驱动：使用`onclick`事件处理
- 支持行点击和按钮点击事件隔离
- 适用于复杂交互场景

::: raw
<IStockShellUiExample src="./data-view/list/example/ListRowEvent.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### ShList属性说明

除了支持原生ul属性以外，还支持以下属性：

| 参数         | 说明             | 类型                              | 默认值 |
| ------------ | ---------------- | --------------------------------- | ------ |
| list         | 列表数据         | [`ListRowProps`](#listrowprops)[] | []     |
| prefixRender | 前缀内容渲染函数 | `() => Snippet`                   | -      |
| suffixRender | 后缀内容渲染函数 | `() => Snippet`                   | -      |

### ShListRow属性说明

除了支持原生li属性以外，还支持以下属性：

| 参数          | 说明           | 类型                                                          | 默认值 |
| ------------- | -------------- | ------------------------------------------------------------- | ------ |
| text          | 主要文本       | `string`                                                      | -      |
| description   | 描述文本       | `string`                                                      | -      |
| picture       | 图片/图标配置  | [`ListRowPicture`](#listrowpicture)                           | -      |
| actions       | 操作按钮配置   | [`ListRowAction[]`](#listrowaction)                           | []     |
| onClickValue  | 行点击回调     | (row: [`ListRowProps`](#listrowprops), index: number) => void | -      |
| actionRender  | 自定义操作渲染 | [`ListRowActionRender`](#listrowactionrender)                 | -      |
| contentRender | 自定义内容渲染 | [`ListRowContentRender`](#listrowcontentrender)               | -      |

### ListRowPicture

```typescript
// 图片属性接口（继承img元素属性）
interface ListRowImg extends HTMLImgAttributes {}

// 图标属性接口（继承Icon组件属性）
interface ListRowIcon extends IconProps {}

// 图片/图标配置接口
type ListRowPicture = {
  img?: ListRowImg; // 图片配置
  icon?: ListRowIcon; // 图标配置
};
```

### ListRowAction

```typescript
interface ListRowAction extends ButtonProps<'button'> {
  text?: string; // 按钮文本
  icon?: ListRowIcon; // 按钮图标
  onClickValue?: (name?: string, action?: ListRowAction) => void; // 点击回调
}
```

### ListRowContentRender

```typescript
type ListRowContentRender = () => ReturnType<Snippet<[]>>; // 内容渲染
```

### ListRowActionRender

```typescript
type ListRowActionRender = (action: ListRowAction) => ReturnType<Snippet<[ListRowAction]>>; // 操作渲染
```

### ListRowProps

```typescript
// 列表项属性接口（继承li元素属性）
interface ListRowProps extends HTMLLiAttributes {
  text?: string; // 主要文本
  description?: string; // 描述文本
  actions?: ListRowAction[]; // 操作按钮列表
  actionRender?: ListRowActionRender; // 自定义操作渲染
  contentRender?: ListRowContentRender; // 自定义内容渲染
  picture?: ListRowPicture; // 图片/图标配置
  onClickValue?: (row: ListRowProps, index: number) => void; // 点击回调
}
```

> **提示**：复杂布局推荐使用`ShListRow`自定义渲染
