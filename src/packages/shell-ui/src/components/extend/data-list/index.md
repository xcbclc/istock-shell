---
title: DataList 数据列表组件 - 输入建议指南
description: 为input元素提供预设选项列表的增强组件，支持自定义选项内容、标签配置，提供灵活的数据输入建议功能。
keywords: [数据列表组件,输入建议,预设选项,Svelte DataList,DataList API]
aside: false
editLink: false
outline: [2, 3]
---

## DataList 数据列表组件 <Badge type="tip">shell</Badge>
**为输入框提供标准化的选项建议方案，支持预设数据和自定义渲染。**

## 使用场景
- 需要为输入框提供预设选项时
- 实现带建议的搜索输入框
- 需要自定义选项展示内容时
- 表单中的快速选择场景
- 需要支持自由输入和选择的混合场景

## 功能特性
- 原生datalist实现，性能优异
- 支持预设选项列表配置
- 灵活的选项自定义能力
- 完全可访问的键盘操作
- 支持动态更新选项
- 与任意input元素配合使用

## 示例演示
<IStockShellUiExample src="./example/DataListDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/DataListCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/DataListDynamic.svelte"></IStockShellUiExample>

## API 参考
### DataList属性说明
| 参数      | 说明       | 类型                                              | 默认值 |
|---------|----------|-------------------------------------------------|-----|
| id      | 列表唯一标识   | `string`                                        | -   |
| options | 预设选项列表   | [`DataListOptionProps`](#datalistoptionprops)[] | []  |

### DataListOption属性说明
| 参数    | 说明     | 类型       | 默认值 |
|-------|--------|----------|-----|
| label | 选项标签文本 | `string` | -   |
| value | 选项值    | `string` | -   |

### DataListOptionProps
```typescript
export interface DataListOptionProps<V = any> extends HTMLAttributes<HTMLOptionElement> {
  label?: string; // 选项标签文本
  value?: V;
}
```

## 使用建议
   - 设置合适的选项数量（建议不超过10个）
   - 选项值保持简洁明确
   - 动态选项使用防抖更新

> **注意**：必须为DataList设置唯一id，与input的list属性对应