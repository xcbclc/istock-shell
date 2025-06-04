---
title: Menu 菜单
description: Menu是一个功能强大的导航菜单组件，支持多级嵌套、垂直/水平布局、多种尺寸和交互模式，适用于网站导航、侧边栏菜单等场景。
keywords: [菜单, Svelte Menu, 导航菜单, 多级菜单, 侧边栏菜单, 响应式菜单]
aside: false
editLink: false
outline: [2, 3]
---

## Menu 菜单组件 <Badge type="tip">shell</Badge>

**菜单（Menu）是一个功能强大的导航组件，支持多级嵌套、垂直/水平布局、多种尺寸和交互模式，提供完整的菜单功能包括激活状态管理、折叠展开、点击事件处理等。**

## 使用场景

- 网站主导航菜单
- 侧边栏导航菜单
- 管理后台的功能菜单
- 移动端的抽屉式菜单
- 多级分类导航
- 工具栏的操作菜单

## 功能特性

- 支持垂直和水平两种布局方向
- 支持多种尺寸规格（sm/md/lg等）
- 支持多级嵌套子菜单
- 支持两种子菜单展开模式（下拉菜单/详情展开）
- 支持图标、工具提示、激活状态
- 支持禁用状态和标题分组
- 高度可定制的外观样式

## 示例演示

<IStockShellUiExample src="./example/MenuDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuSizes.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuStates.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuWithTitle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/Submenu.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuEvent.svelte"></IStockShellUiExample>

## API 参考

### Menu属性说明

| 属性名          | 说明                 | 类型                                   | 默认值       |
| --------------- | -------------------- | -------------------------------------- | ------------ |
| isRoot          | 是否为根菜单         | `boolean`                              | `true`       |
| collapsed       | 菜单是否折叠状态     | `boolean`                              | `false`      |
| canToggle       | 是否允许切换折叠状态 | `boolean`                              | -            |
| items           | 菜单项列表           | [`MenuItemProps`](#menuitem属性说明)[] | `[]`         |
| layout          | 菜单布局方向         | [`MenuLayout`](#menulayout)            | `'vertical'` |
| size            | 菜单尺寸             | [`MenuSize`](#menusize)                | `'md'`       |
| toggleType      | 切换类型             | `1 \| 2`                               | `1 `         |
| onMenuItemClick | 菜单项点击回调函数   | `(item: MenuItemProps) => void`        | -            |

### MenuItem属性说明

| 属性名          | 说明                   | 类型                                                               | 默认值  |
| --------------- | ---------------------- | ------------------------------------------------------------------ | ------- |
| key             | 菜单项唯一标识         | `string`                                                           | -       |
| text            | 菜单项显示文本         | `string`                                                           | -       |
| isTitle         | 是否为标题项           | `boolean`                                                          | `false` |
| active          | 是否处于激活状态       | `boolean`                                                          | `false` |
| disabled        | 是否禁用状态           | `boolean`                                                          | `false` |
| focus           | 是否处于聚焦状态       | `boolean`                                                          | `false` |
| collapsed       | 子菜单是否折叠         | `boolean`                                                          | `false` |
| canToggle       | 是否允许切换折叠状态   | `boolean`                                                          | `true`  |
| itemAttr        | 内部链接元素的HTML属性 | `HTMLAnchorAttributes`                                             | -       |
| tooltip         | 工具提示配置           | `string \| TooltipProps`                                           | -       |
| toggleType      | 切换模式               | `1 \| 2`                                                           | `1`     |
| subItem         | 子菜单配置             | [`MenuProps`](#menu属性说明)                                       | -       |
| iconName        | 图标名称               | `string`                                                           | -       |
| onMenuItemClick | 点击事件回调           | `(item: MenuItemProps, key?: string, collapsed?: boolean) => void` | -       |
| iconRender      | 自定义图标渲染函数     | `() => ReturnType<Snippet<[]>>`                                    | -       |

### MenuSize

```typescript
type MenuSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### MenuLayout

```typescript
type MenuLayout = 'vertical' | 'horizontal';
```

### 切换模式说明

- **toggleType = 1**：下拉菜单模式，子菜单以下拉形式展示
- **toggleType = 2**：详情展开模式，使用HTML details元素实现折叠展开
