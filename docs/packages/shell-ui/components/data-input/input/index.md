---
title: Input 输入框组件
description: 输入框（Input）组件提供多种类型输入支持，包含文本、密码、数字等12种类型，支持表单验证、前缀后缀插槽、尺寸定制和无障碍访问，适用于各类表单输入场景。
keywords: [输入框组件, Svelte输入框, 表单验证, 输入框样式, Input API]
aside: false
editLink: false
outline: [2, 3]
---

## Input 输入框组件

**输入框（Input）是表单交互的核心元素，用于捕获用户输入数据。支持实时验证、多种输入类型和丰富的扩展能力。**

## 使用场景

- 需要用户输入文本/数字等数据时
- 表单字段需要即时验证反馈时
- 需要带图标说明的输入场景
- 实现搜索框等特殊输入样式时

## 功能特性

- 支持12种输入类型（text/password/number等）
- 提供实时输入验证状态反馈
- 5种预设尺寸（xs-xl）和响应式适配
- 前缀/后缀插槽支持图标和按钮
- 幽灵模式（无边框背景）适配复杂布局

## 示例演示

### 基础输入框配置

必需参数说明：

- `bind:value` 实现双向数据绑定
- 默认类型为`text`


::: raw
<IStockShellUiExample src="./data-input/input/example/InputDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 插槽扩展功能

通过渲染属性实现：

- `prefixRender`: 前置内容
- `suffixRender`: 后置内容
- 支持组合表单控件


::: raw
<IStockShellUiExample src="./data-input/input/example/InputSlot.svelte" layout="column"></IStockShellUiExample>
:::

### 无背景样式

通过`variant="ghost"`实现：

- 透明背景效果
- 适用于沉浸式输入场景
- 保持焦点状态可见性


::: raw
<IStockShellUiExample src="./data-input/input/example/InputGhost.svelte"></IStockShellUiExample>
:::

### 字段集中的输入框集成

与`ShFieldSet`、`ShField`组件配合使用：

- 实现表单分组语义化
- 支持组合表单验证
- 保持样式继承一致性


::: raw
<IStockShellUiExample src="./data-input/input/example/InputFieldset.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`/`secondary`/`accent`
- **状态指示**：`info`/`success`/`warning`/`error`
- **中性色**：`neutral`（默认）


::: raw
<IStockShellUiExample src="./data-input/input/example/InputColor.svelte" layout="column"></IStockShellUiExample>
:::

### 尺寸规格设置

五级尺寸标准：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大


::: raw
<IStockShellUiExample src="./data-input/input/example/InputSize.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

设置`disabled`属性实现禁用模式。


::: raw
<IStockShellUiExample src="./data-input/input/example/InputDisabled.svelte"></IStockShellUiExample>
:::

### 输入类型支持

覆盖HTML5输入类型：

- **基础类型**：text/password/email
- **专用类型**：tel/url/search
- **数据输入**：number/date/time


::: raw
<IStockShellUiExample src="./data-input/input/example/InputType.svelte" layout="column"></IStockShellUiExample>
:::

### 图标集成方案

使用`prefixRender`属性：

- 支持SVG/自定义组件
- 适配不同输入类型
- 保持图标交互一致性


::: raw
<IStockShellUiExample src="./data-input/input/example/InputIcon.svelte" layout="column"></IStockShellUiExample>
:::

### 验证机制集成

支持验证类型：

- HTML5原生验证（required/pattern）
- 自定义验证规则


::: raw
<IStockShellUiExample src="./data-input/input/example/InputValidator.svelte" layout="column"></IStockShellUiExample>
:::

### 值变化事件处理

通过`onChangeValue`回调实现：

- 实时获取输入值变化
- 适用于表单即时验证场景


::: raw
<IStockShellUiExample src="./data-input/input/example/InputChange.svelte" layout="column"></IStockShellUiExample>
:::


## API 参考

### 属性说明

除了支持原生input属性以外，还支持以下属性：

| 属性名        | 说明                                                   | 类型                                                                                                                 | 默认值   |
| ------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------- | --- |
| value         | 输入的值（双向绑定）                                   | `string`                                                                                                             | `number` |     |
| type          | 输入类型                                               | [`InputType`](#inputtype)                                                                                            | 'text'   |
| color         | 主题颜色                                               | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error`                     |          |
| size          | 尺寸配置                                               | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                                                 |          |
| variant       | 样式变体                                               | `ghot`                                                                                                               |          |
| validator     | 验证状态                                               | `boolean`                                                                                                            | true     |
| prefixRender  | 前缀插槽渲染函数                                       | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>> |          |
| suffixRender  | 后缀插槽渲染函数                                       | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>> |          |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string` \| `number`) => void                                                                               |          |

### InputType

```typescript
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'week'
  | 'month'
  | 'tel'
  | 'url'
  | 'search'
  | 'time';
```

### InputRenderOption

```typescript
export interface InputRenderOption {
  color?: InputColor; // 颜色主题
  size?: InputSize; // 尺寸配置
  variant?: InputVariant; // 样式变体
}
```

> **数据绑定**：推荐使用 `bind:value` 实现双向数据绑定
