---
title: Checkbox 复选框组件
description: 复选框（Checkbox）组件用于多选场景，支持不确定状态、禁用状态、自定义样式，适用于表单、配置选项等交互场景。提供组操作、尺寸定制和颜色主题配置。
keywords: [ 复选框组件,Svelte复选框,表单控件,多选组件,复选框样式,复选框API ]
editLink: false
outline: [ 2, 3 ]
---

## Checkbox 复选框

**复选框（Checkbox）是表单交互的核心元素，用于实现多选操作。支持三种状态（选中/未选/不确定）。**

## 使用场景

- 表单中需要多选操作的场景
- 配置项的开关状态切换
- 表格行数据的批量选择
- 树形结构的层级选择
- 需要显示部分选中（indeterminate）状态时
- 需要禁用用户交互的只读场景

## 功能特性

- 支持基础选中/未选状态切换
- 提供中间状态（indeterminate）显示
- 6种预设颜色主题配置
- 4种尺寸选择（xs-xl）及响应式适配
- 支持禁用状态和只读模式
- 内置标签定位（左右布局）支持

## 示例演示

<IStockShellUiExample src="./example/CheckboxDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckBoxFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxDisabled.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxIndeterminate.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxCustomColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxLabel.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxChange.svelte" layout="column"></IStockShellUiExample>

## API 参考

### Checkbox属性说明

| 属性名           | 说明          | 类型                                                                                               | 默认值 |
|---------------|-------------|--------------------------------------------------------------------------------------------------|-----|
| value         | 选中的值（双向绑定）  | `array`                                                                                          | []  |
| color         | 主题颜色        | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |     |
| size          | 尺寸配置        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |     |
| options       | 选项数组        | [CheckboxItemOption](#checkboxitemoption)[]                                                      | []  |
| label         | 标签相关配置      | [CheckboxLabel](#checkboxlabel)                                                                  |     |
| disabled      | 是否禁用        | `boolean`                                                                                        |     |
| wrapClass     | 外层容器类名设置    | `string`                                                                                         |     |
| onChangeValue | 当选项值变化时的回调函数 | (value: T[], option?: [CheckboxItemOption](#checkboxitemoption)\<T\>) => void                    |     |

#### CheckboxItemOption

```typescript
export type CheckboxItemOption<T = any> = {
  label?: string; // 显示文本
  value: T; // 实际值
  disabled?: boolean; // 禁用状态
};
```

#### CheckboxLabel

```typescript
export type CheckboxLabel = {
  type?: CheckboxLabelType; // 标签样式类型
  position?: 'before' | 'after'; // 标签位置（选项前/后）
  class?: string; // 自定义类名
};
```

### CheckboxItem属性说明
除了支持原生input属性以外，还支持以下属性：

| 属性名         | 说明           | 类型                                                                                               | 默认值 |
|-------------|--------------|--------------------------------------------------------------------------------------------------|-----|
| color       | 颜色主题         | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |     |
| size        | 尺寸配置         | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |     |
| groupValue  | 组选中值（双向绑定）  | `array`                                                                                          | []  |
| option      | 关联选项数据       | [CheckboxItemOption](#checkboxitemoption)                                                        |     |
| indeterminate | 不确定状态       | `boolean`                                                                                        |     |

## 最佳实践

1. **状态反馈**：批量选择时使用indeterminate状态表示部分选中
2. **颜色搭配**：主要操作使用品牌色，危险操作使用error红色
3. **表单验证**：必填项需配合required属性和验证提示