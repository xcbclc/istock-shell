---
title: Fieldset 字段集组件
description: 字段集（Fieldset）组件用于对表单控件进行逻辑分组，支持标题说明、多列布局、边框样式定制，适用于复杂表单的场景组织。提供无障碍访问支持和响应式适配。
keywords: [表单分组组件, 字段集布局, 表单结构优化, Fieldset API, 表单可访问性]
aside: false
editLink: false
outline: [2, 3]
---

## Fieldset 字段集组件

**字段集（Fieldset）是表单组织的基础容器，通过视觉分组提升表单可读性。包含标题说明、布局控制的支持。**

## 使用场景

- 需要将相关表单控件进行逻辑分组时
- 长表单需要分区块展示时
- 需要为表单区域添加说明性文本时
- 实现多列布局的表单结构时
- 需要符合WCAG 2.1的表单可访问性标准时

## 功能特性

- 支持标题(legend)和说明文本(label)双层级说明
- 内置表单验证状态提示

## 示例演示

### 基础字段集用法

核心配置要素：

- 使用`title`属性设置分组标题
- 配合`<legend>`元素增强语义化
- 支持与各类表单控件组合使用

::: raw
<IStockShellUiExample src="./data-input/field-set/example/FieldSetDefault.svelte"></IStockShellUiExample>
:::

### 样式定制方案

通过`class`属性应用TailwindCSS类实现：

- 添加背景色（bg-base-\*）
- 设置容器边框（border-\*）
- 调整圆角尺寸（rounded-\*）

::: raw
<IStockShellUiExample src="./data-input/field-set/example/FieldSetStyle.svelte"></IStockShellUiExample>
:::

### 复合表单分组

多控件组合应用：

- 适用于页面元数据管理场景
- 支持混合输入类型（文本框/文本域）
- 保持视觉样式统一性

::: raw
<IStockShellUiExample src="./data-input/field-set/example/FieldSetMultiple.svelte"></IStockShellUiExample>
:::

### 登录表单集成

典型登录场景实现：

- 包含邮箱/密码输入框
- 集成表单验证提示
- 搭配提交按钮使用

::: raw
<IStockShellUiExample src="./data-input/field-set/example/FieldSetLogin.svelte"></IStockShellUiExample>
:::

## API 参考

### Fieldset属性说明

| 属性名 | 说明       | 类型     | 默认值 |
| ------ | ---------- | -------- | ------ |
| title  | 字段集标题 | `string` | ''     |

### Field属性说明

| 属性名 | 说明         | 类型                                    | 默认值 |
| ------ | ------------ | --------------------------------------- | ------ |
| label  | 字段标签配置 | `string` \| [`FieldLabel`](#fieldlabel) |        |

### FieldLabel

```typescript
export type FieldLabel = {
  title?: string; // 标签文本内容
  position?: 'before' | 'after'; // 标签位置（内容前/后）
};
```
