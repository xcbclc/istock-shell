---
title: Checkbox 复选框组件
description: 复选框（Checkbox）组件用于多选场景，支持不确定状态、禁用状态、自定义样式，适用于表单、配置选项等交互场景。提供组操作、尺寸定制和颜色主题配置。
keywords: [复选框组件, Svelte复选框, 表单控件, 多选组件, 复选框样式, 复选框API]
aside: false
editLink: false
outline: [2, 3]
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

### 基础用法示例

必需参数配置：

- `value`: 双向绑定的选中值数组
- `options`: 可选项配置数组
- 支持通过`bind:value`实现数据双向绑定


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxDefault.svelte" layout="column"></IStockShellUiExample>
:::

#### 字段集组合使用

在`ShFieldSet`组件中的集成示例：

- 适用于表单分组场景
- `ShFieldSet`可以添加分组标题
- 支持与其他表单元素组合使用


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckBoxFieldset.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

支持五种标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxSize.svelte" layout="column"></IStockShellUiExample>
:::

### 预定义颜色样式

支持八种标准颜色主题，通过`color`属性指定：

- **系统色系**：primary（主色）、secondary（辅色）、accent（强调色）
- **状态色系**：info（信息）、success（成功）、warning（警告）、error（错误）
- **中性色**：neutral（中性灰）


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxColor.svelte" layout="column"></IStockShellUiExample>
:::

### 禁用状态控制

禁用模式配置方式：

- 全局禁用：设置组件`disabled`属性
- 单项禁用：在options数组中设置`disabled: true`
- 禁用时保持样式可见性


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxDisabled.svelte" layout="column"></IStockShellUiExample>
:::

### 半选状态实现

`indeterminate`属性的典型应用：

- 实现「全选/全不选」功能
- 表示部分选中状态
- 需配合派生状态（derived state）使用


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxIndeterminate.svelte" layout="column"></IStockShellUiExample>
:::

### 自定义颜色方案

通过`class`属性应用TailwindCSS类实现：

- 自定义背景色（bg-\*）
- 自定义边框色（border-\*）
- 自定义选中状态样式（checked:\*）


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxCustomColor.svelte" layout="column"></IStockShellUiExample>
:::

### 标签配置

通过`label.position`配置标签方位：

- `before`: 标签在选框左侧
- `after`: 标签在选框右侧（默认）


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxLabel.svelte" layout="column"></IStockShellUiExample>
:::

#### 值变化事件处理

当多选框值发生变化时，使用`onChangeValue`回调函数可以：

- 获取最新选中值数组
- 获取对应的完整选项对象数组
- 适用于实时同步选中状态到父组件的场景


::: raw
<IStockShellUiExample src="./data-input/checkbox/example/CheckboxChange.svelte" layout="column"></IStockShellUiExample>
:::


## API 参考

### Checkbox属性说明

| 属性名        | 说明                     | 类型                                                                                             | 默认值 |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| value         | 选中的值（双向绑定）     | `array`                                                                                          | []     |
| color         | 主题颜色                 | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置                 | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| options       | 选项数组                 | [CheckboxItemOption](#checkboxitemoption)[]                                                      | []     |
| label         | 标签相关配置             | [CheckboxLabel](#checkboxlabel)                                                                  |        |
| disabled      | 是否禁用                 | `boolean`                                                                                        |        |
| wrapClass     | 外层容器类名设置         | `string`                                                                                         |        |
| onChangeValue | 当选项值变化时的回调函数 | (value: T[], option?: [CheckboxItemOption](#checkboxitemoption)\<T\>) => void                    |        |

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

| 属性名        | 说明                 | 类型                                                                                             | 默认值 |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| color         | 颜色主题             | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size          | 尺寸配置             | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| groupValue    | 组选中值（双向绑定） | `array`                                                                                          | []     |
| option        | 关联选项数据         | [CheckboxItemOption](#checkboxitemoption)                                                        |        |
| indeterminate | 不确定状态           | `boolean`                                                                                        |        |

## 最佳实践

1. **状态反馈**：批量选择时使用indeterminate状态表示部分选中
2. **颜色搭配**：主要操作使用品牌色，危险操作使用error红色
3. **表单验证**：必填项需配合required属性和验证提示
