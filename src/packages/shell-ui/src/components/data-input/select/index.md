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

<IStockShellUiExample src="./example/SelectDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectDisabled.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectChange.svelte" layout="column"></IStockShellUiExample>

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
