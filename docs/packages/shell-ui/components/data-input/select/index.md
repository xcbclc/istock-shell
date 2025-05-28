---
title: Select 选择器组件
description: 下拉选择器（Select）组件提供单选/多选功能，支持搜索过滤、异步加载、分组选项等高级特性，适用于表单选择、数据筛选等场景。
keywords: [下拉选择器, 表单选择, 多选组件, Svelte选择器, Select API]
aside: false
editLink: false
outline: [2, 3]
---

## Select 选择器组件

**下拉选择器（Select）用于从选项集合中选取单个或多个值。提供8种主题色、5种尺寸和丰富的交互功能。**

## 使用场景

- 需要从超过5个选项中选择时
- 表单字段需要搜索过滤功能时
- 需要展示层级分类选项时

## 功能特性

- 支持单选/多选模式
- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配

## 示例演示

### 基础选择器配置

必需参数说明：

- `bind:value` 实现双向数据绑定
- `options` 设置可选项数组

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 无背景样式

通过`variant="ghost"`实现：

- 透明背景效果
- 适用于沉浸式选择场景
- 保持焦点状态可见性

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectGhost.svelte"></IStockShellUiExample>
:::

#### 字段集中的选择器集成

与`ShFieldSet`、`ShField`组件配合使用：

- 实现表单分组语义化
- 保持样式继承一致性

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectFieldset.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectSize.svelte" layout="column"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectColor.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

两种禁用模式：

- 全局禁用：设置`disabled`属性
- 单项禁用：在options数组中设置`disabled: true`

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectDisabled.svelte" layout="column"></IStockShellUiExample>
:::

### 值变化事件处理

通过`onChangeValue`回调实现：

- 实时获取选中值和完整选项对象
- 支持异步数据更新
- 适用于动态表单更新场景

::: raw
<IStockShellUiExample src="./data-input/select/example/SelectChange.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### Select属性说明

除了支持原生select属性以外，还支持以下属性：

| 属性名        | 说明                     | 类型                                                                                             | 默认值 |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| value         | 选中的值（双向绑定）     | `any`                                                                                            |        |
| color         | 主题颜色                 | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置                 | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| options       | 选项配置数组             | [SelectItemOption](#selectitemoption)[]                                                          | []     |
| variant       | 样式变体                 | `ghot`                                                                                           |        |
| onChangeValue | 当选项值变化时的回调函数 | (value: T, option?: [SelectItemOption](#selectitemoption)\<T\>) => void                          |        |

#### SelectItemOption

```typescript
export type SelectItemOption<T = any> = {
  label?: string; // 显示文本
  value: T; // 实际值
  disabled?: boolean; // 禁用状态
  children?: Array<SelectItemOption<T>>; // 子选项（支持分组）
};
```

### SelectItem属性说明

| 属性名   | 说明           | 类型                                  | 默认值 |
| -------- | -------------- | ------------------------------------- | ------ |
| options  | 选项配置       | [SelectItemOption](#selectitemoption) |        |
| selected | 选项是否被选中 | `boolean`                             |        |
