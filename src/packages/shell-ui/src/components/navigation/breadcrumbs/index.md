---
title: Breadcrumbs 面包屑导航组件
description: 面包屑导航（Breadcrumbs）组件帮助用户了解当前页面在网站层次结构中的位置，支持图标、链接、自定义分隔符、最大宽度限制等功能，适用于多层级导航场景。
keywords: [面包屑导航, Svelte面包屑, 导航组件, 层级导航, Breadcrumbs API]
aside: false
editLink: false
outline: [2, 3]
---

## Breadcrumbs 面包屑导航组件

**面包屑导航（Breadcrumbs）是一个层次化导航组件，帮助用户了解当前页面在网站结构中的位置，提供快速返回上级页面的能力。支持图标展示、链接跳转、自定义渲染和响应式布局。**

## 使用场景

- 多层级页面的导航指引
- 帮助用户理解当前页面位置
- 提供快速返回上级页面的途径
- 网站结构层次的可视化展示
- 移动端的页面路径指示
- 文档系统的章节导航

## 功能特性

- 支持5种尺寸规格（xs/sm/md/lg/xl）
- 支持最大宽度限制防止内容溢出
- 支持图标与文本的组合展示
- 支持当前页面状态的特殊样式
- 支持禁用状态和点击事件处理
- 支持自定义图标渲染和插槽内容

## 示例演示

<IStockShellUiExample src="./example/BreadcrumbsDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsSizes.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsMaxWidth.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsEvent.svelte"></IStockShellUiExample>

## API 参考

### Breadcrumbs属性说明

| 属性名      | 说明                 | 类型                                                 | 默认值 |
| ----------- | -------------------- | ---------------------------------------------------- | ------ |
| items       | 面包屑项列表         | [`BreadcrumbItemProps`](#breadcrumbitem属性说明)[]   | `[]`   |
| size        | 面包屑尺寸           | [`BreadcrumbsSize`](#breadcrumbssize)                | `'md'` |
| maxWidth    | 最大宽度限制         | [`BreadcrumbsMaxWidth`](#breadcrumbsmaxwidth)        | -      |
| onItemClick | 面包屑项点击回调函数 | `(item: BreadcrumbItemProps, index: number) => void` | -      |

### BreadcrumbItem属性说明

| 属性名      | 说明                   | 类型                                  | 默认值  |
| ----------- | ---------------------- | ------------------------------------- | ------- |
| text        | 面包屑项显示文本       | `string`                              | -       |
| href        | 链接地址               | `string`                              | -       |
| size        | 面包屑项尺寸           | [`BreadcrumbsSize`](#breadcrumbssize) | `'md'`  |
| disabled    | 是否禁用状态           | `boolean`                             | `false` |
| current     | 是否为当前页面         | `boolean`                             | `false` |
| linkAttr    | 内部链接元素的HTML属性 | `HTMLAnchorAttributes`                | -       |
| iconName    | 图标名称               | `string`                              | -       |
| onItemClick | 点击事件回调           | `(item: BreadcrumbItemProps) => void` | -       |
| iconRender  | 自定义图标渲染函数     | `() => ReturnType<Snippet<[]>>`       | -       |

### BreadcrumbsSize

```typescript
export type BreadcrumbsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### BreadcrumbsMaxWidth

```typescript
export type BreadcrumbsMaxWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';
```
