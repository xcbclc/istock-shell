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

<IStockShellUiExample src="./example/RadioDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioDisabled.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioCustomColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioLabel.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioChange.svelte" layout="column"></IStockShellUiExample>

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
