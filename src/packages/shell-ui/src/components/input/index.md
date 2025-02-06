---
title: Input
description: 通过鼠标或键盘输入内容，是最基础的表单域的包装。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Input 输入框

**文字输入框是简单的输入框。**

## 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 用法演示
<IStockShellUiExample src="./example/InputDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputSlot.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputType.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputValidator.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/InputChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明                                  | 类型                                                                                                                                           | 默认值                           |
|---------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| type          | 输入框的类型                              | [`TInputType`](#tinputtype)                                                                                                                  |                               |
| color         | 输入框的颜色                              | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error`                                             |                               |
| size          | 输入框的大小                              | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                                                                         |                               |
| variant       | 输入框的变种                              | `ghot`                                                                                                                                       |                               |
| validator     | 是否启用验证器样式                           | `boolean`                                                                                                                                    | true                          |
| prefixRender  | 输入框前置元素渲染函数                         | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>>                         |                               |
| suffixRender  | 输入框后置元素渲染函数                         | (opt: [`InputRenderOption`](#inputrenderoption)) => ReturnType<Snippet<[[`InputRenderOption`](#inputrenderoption)]>>                         |                               |
| onChangeValue | 当选项值变化时的回调函数，type是number时返回number类型 | (value?: `string`                                                                                                       \| `number`) => void |    |

### TInputType
```typescript
export type TInputType =
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
  color?: TInputColor;
  size?: TInputSize;
  variant?: TInputVariant;
}
```