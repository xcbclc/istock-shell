---
title: Empty 空状态组件
description: 用于展示无数据、搜索无结果等空状态场景，支持自定义图标、文本和内容布局，提供友好的用户反馈。
keywords: [空状态组件,数据占位,无数据展示,Svelte Empty组件,Empty API]
aside: false
editLink: false
outline: [2, 3]
---

## Empty 空状态组件 <Badge type="tip">shell</Badge>
**标准化的空状态展示方案，提供灵活的自定义能力和友好的用户体验设计。**

## 使用场景
- 列表/表格暂无数据时
- 搜索/过滤无结果时
- 内容正在加载前的占位
- 网络错误的友好提示
- 需要引导用户开始操作时

## 功能特性
- 默认空状态图标和文案
- 支持自定义图标配置
- 完全自定义内容能力
- 语义化的HTML结构

## 示例演示
### 基础空状态展示
核心功能特性：
- 通过`<ShEmpty />`快速创建空状态
- 内置默认占位图标和文案


::: raw
<IStockShellUiExample src="./extend/empty/example/EmptyDefault.svelte" layout="auto"></IStockShellUiExample>
:::

### 自定义空状态配置
核心功能特性：
- 通过插槽自定义内容布局
- 支持`ShIcon`自定义图标
- 配合`ShText`定制文本样式
- 使用`class`控制主题颜色

::: raw
<IStockShellUiExample src="./extend/empty/example/EmptyCustomize.svelte" layout="auto"></IStockShellUiExample>
:::


## API 参考
### 属性说明
| 参数    | 说明        | 类型                | 默认值      |
|-------|-----------|-------------------|----------|
| name  | 图标名称      | `empty` \| `info` | 'empty'  |
| text  | 显示文本      | `string`          | '暂无数据'   |
