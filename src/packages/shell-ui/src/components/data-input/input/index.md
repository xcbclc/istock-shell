---
title: Input 输入框组件
description:  输入框（Input）组件提供多种类型输入支持，包含文本、密码、数字等12种类型，支持表单验证、前缀后缀插槽、尺寸定制和无障碍访问，适用于各类表单输入场景。
keywords: [输入框组件,Svelte输入框,表单验证,输入框样式,Input API]
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
<IStockShellUiExample src="./example/InputDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputSlot.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputType.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputIcon.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputValidator.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputChange.svelte" layout="column"></IStockShellUiExample>

## API
### 属性说明
除了支持原生input属性以外，还支持以下属性：

| 属性名           | 说明                                  | 类型                                                                                                                                           | 默认值                           |
|---------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| type          | 输入类型                             | [`InputType`](#inputtype)                                                                                                                    |                               |
| color         | 主题颜色                              | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error`                                             |                               |
| size          | 尺寸配置                              | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                                                                         |                               |
| variant       | 样式变体                              | `ghot`                                                                                                                                       |                               |
| validator     | 验证状态                           | `boolean`                                                                                                                                    | true                          |
| prefixRender  | 前缀插槽渲染函数                         | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>>                         |                               |
| suffixRender  | 后缀插槽渲染函数                         | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>>                         |                               |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string`                                                                                                       \| `number`) => void |    |

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