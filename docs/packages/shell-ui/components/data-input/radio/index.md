---
title: Radio 单选框组件
description: 单选框（Radio）组件用于在多个互斥选项中选择单个结果，支持垂直/水平布局、自定义颜色主题、禁用状态和无障碍访问，适用于表单、设置选项等场景。
keywords: [单选按钮, 表单单选, 选项组组件, Svelte单选框, Radio API]
aside: false
editLink: false
outline: [2, 3]
---

## Radio 单选框

**单选框（Radio）用于在多个互斥选项中选择唯一结果。提供8种主题色、5种尺寸和灵活的布局配置。**

## 使用场景

- 表单中需要从多个选项选择单个结果时
- 设置界面需要切换互斥的配置项时
- 需要适配移动端触控操作时
- 需要显示选项的禁用状态时

## 功能特性

- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配
- 支持选项组和独立单选框模式
- 自定义标签位置和样式能力

## 示例演示

### 基础用法示例

必需参数配置：

- `value`: 双向绑定的选中值
- `options`: 可选项配置数组
- 支持通过`bind:value`实现数据绑定


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioSize.svelte" layout="column"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioColor.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

两种禁用模式：

- 全局禁用：设置组件`disabled`属性
- 单项禁用：在options数组中设置`disabled: true`


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioDisabled.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义颜色方案

通过`class`属性应用TailwindCSS类：

- 自定义背景色（bg-\*）
- 自定义边框色（border-\*）
- 自定义选中状态样式（checked:\*）


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioCustomColor.svelte" layout="column"></IStockShellUiExample>
:::

### 标签配置

通过`label.position`配置方位：

- `before`: 标签在选框左侧
- `after`: 标签在选框右侧（默认）


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioLabel.svelte" layout="column"></IStockShellUiExample>
:::

### 值变化事件处理

通过`onChangeValue`回调实现：

- 实时获取选中值变化
- 同步接收选中的完整选项对象
- 适用于表单选项同步场景


::: raw
<IStockShellUiExample src="./data-input/radio/example/RadioChange.svelte" layout="column"></IStockShellUiExample>
:::


## API 参考

### Radio 属性说明

| 属性名        | 说明                     | 类型                                                                                             | 默认值 |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| value         | 选中的值（双向绑定）     | `any`                                                                                            |        |
| color         | 主题颜色                 | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置                 | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| options       | 选项配置数组             | [RadioItemOption](#radioitemoption)[]                                                            | []     |
| label         | 标签配置                 | [RadioLabel](#radiolabel)                                                                        |        |
| wrapClass     | 外层容器类名设置         | `string`                                                                                         |        |
| onChangeValue | 当选项值变化时的回调函数 | (value: T, option?: [RadioItemOption](#radioitemoption)\<T\>) => void                            |        |

#### RadioItemOption

```typescript
export type RadioItemOption<T = any> = {
  label?: string; // 显示文本
  value: T; // 实际值
  disabled?: boolean; // 禁用状态
};
```

#### RadioLabel

```typescript
export type RadioLabel = {
  type?: RadioLabelType; // 标签样式类型
  position?: 'before' | 'after'; // 标签位置
  class?: string; // 自定义类名
};
```

### RadioItem属性说明

除了支持原生input属性以外，还支持以下属性：

| 属性名     | 说明                 | 类型                                                                                             | 默认值 |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| color      | 颜色主题             | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size       | 尺寸配置             | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| groupValue | 组选中值（双向绑定） | `any`                                                                                            | []     |
| option     | 关联选项数据         | [RadioItemOption](#radioitemoption)                                                              |        |
