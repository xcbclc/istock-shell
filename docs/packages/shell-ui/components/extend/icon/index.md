---
title: Icon 图标组件
description: 语义化的SVG图标组件库，提供200+常用图标、8种主题色和5种尺寸配置，支持自定义图标和动态交互。
keywords: [SVG图标, 图标库, 语义化图标, Svelte图标组件, Icon API]
aside: false
editLink: false
outline: [2, 3]
---

## Icon 图标组件 <Badge type="tip">shell</Badge>

**标准化的SVG图标解决方案，提供灵活的主题配置和响应式设计。**

## 使用场景

### 何时使用

- 需要保持视觉风格统一的图标系统
- 需要动态切换图标状态的交互场景

## 功能特性

- 内置常用图标（持续更新）
- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配
- 支持自定义SVG图标扩展

## 示例演示

### 内置图标调用

通过`name`属性使用预置图标：

- 基础图标：email/error/file/link等
- 交互图标：password/phone/question/right等
- 系统图标：search/user等
- 适用于导航栏/按钮等场景

::: raw
<IStockShellUiExample src="./extend/icon/example/IconDefault.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）

::: raw
<IStockShellUiExample src="./extend/icon/example/IconColor.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大

::: raw
<IStockShellUiExample src="./extend/icon/example/IconSize.svelte"></IStockShellUiExample>
:::

### 自定义图标集成

支持两种扩展方式：

- 通过插槽插入SVG代码
- 引用外部图标资源

::: raw
<IStockShellUiExample src="./extend/icon/example/IconCustom.svelte"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名 | 说明                                            | 类型                                                                                             | 默认值 |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| name   | 图标名称，请参考[`内置图标调用`](#内置图标调用) | `string`                                                                                         |        |
| color  | 图标颜色主题                                    | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size   | 图标尺寸                                        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
