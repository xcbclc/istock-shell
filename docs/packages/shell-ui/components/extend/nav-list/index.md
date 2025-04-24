---
title: NavList 导航列表组件
description: 提供结构化导航列表组件，支持多级导航、自定义内容和响应式布局，适用于门户网站、网站导航等场景。
keywords: [导航列表,网站导航,Svelte导航列表,多级导航,NavList API]
aside: false
editLink: false
outline: [2, 3]
---

## NavList 导航列表组件<Badge type="tip">shell</Badge>
**标准化的导航列表解决方案，支持灵活配置和深度定制。**

## 使用场景
- **门户网站导航**：新闻/财经类网站顶部导航
- **帮助中心**：文档分类导航

## 功能特性
- 完全自定义内容能力
- 响应式布局适配

## 示例演示
### 基础导航列表
基础导航列表，一般适用于门户网站导航。


::: raw
<IStockShellUiExample src="./extend/nav-list/example/NavListDefault.svelte" layout="auto"></IStockShellUiExample>
:::


## API 参考
### NavList 属性说明
| 参数     | 说明         | 类型                                        | 默认值 |
|--------|------------|-------------------------------------------|-----|
| list   | 导航项配置列表    | [`NavListItemProps`](#navlistitemprops)[] | []  |

### NavListItem 属性说明
| 参数     | 说明         | 类型                                                    | 默认值 |
|--------|------------|-------------------------------------------------------|-----|
| title  | 分组标题       | `string`                                              | -   |
| items  | 导航项详情列表    | [`NavListItemDetailProps`](#navlistitemdetailprops)[] | []  |

### NavListItemDetail 属性说明
| 参数     | 说明         | 类型                                                | 默认值      |
|--------|------------|---------------------------------------------------|----------|
| text   | 显示文本       | `string`                                          | -        |
| href   | 链接地址       | `string`                                          | -        |
| target | 链接打开方式     | `string`                                          | '_blank' |
| link | 链接配置     | [`NavListItemDetailLink`](#navlistitemdetaillink) | {}       |

### NavListItemProps
```typescript
import type { HTMLAttributes } from 'svelte/elements';
import { ShNavListItemDetail, type NavListItemDetailProps } from '@istock/shell-ui';

// 导航项属性接口
export interface NavListItemProps extends HTMLAttributes<HTMLDListElement> {
title?: string; // 分组标题
items?: NavListItemDetailProps[]; // 导航项详情列表
}
```

### NavListItemDetailProps
```typescript
// 导航项详情属性接口
export interface NavListItemDetailProps extends HTMLAttributes<HTMLElement> {
  link?: NavListItemDetailLink; // 链接配置
  text?: string; // 显示文本
  target?: TextTarget; // 链接打开方式
  href?: string; // 链接地址
}
```

### NavListItemDetailLink
```typescript
import type { TextProps, TextTarget } from '@istock/shell-ui';

export type NavListItemDetailLink = Omit<TextProps, 'tag'>;
```