---
title: Dropdown 下拉菜单
description: Dropdown是一个灵活的上下文菜单组件，支持多种触发方式和定位方式，适用于导航菜单、操作列表等场景。
keywords: [下拉菜单, Svelte Dropdown, 上下文菜单, 操作菜单, 导航菜单]
aside: false
editLink: false
outline: [2, 3]
---

## Dropdown 下拉菜单组件

**下拉菜单（Dropdown）是一个灵活的上下文操作菜单组件，支持点击和悬停触发，提供多种定位方式，可完全自定义内容。**

## 使用场景

- 网站导航的多级菜单
- 表格行的快捷操作菜单
- 表单控件的选项列表
- 用户头像的个人菜单
- 工具栏的更多操作菜单

## 功能特性

- 支持12种精确定位方式
- 支持点击和悬停两种触发模式
- 支持强制保持打开状态
- 高度可定制的外观样式

## 示例演示

<IStockShellUiExample src="./example/DropdownDefault.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>

### 打开方式

<IStockShellUiExample src="./example/DropdownMethod1.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownMethod2.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownMethod3.svelte" demoStyle="padding: 100px 0" layout="column"></IStockShellUiExample>

### 位置

<IStockShellUiExample src="./example/DropdownStart.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTop.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTopCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTopEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottom.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottomCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottomEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeft.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeftCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeftEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRight.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRightEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRightCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>

<IStockShellUiExample src="./example/DropdownHover.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownOpen.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownCustomize.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>

## API 参考

### Dropdown属性说明

| 属性名               | 说明               | 类型                                                   | 默认值    |
| -------------------- | ------------------ | ------------------------------------------------------ | --------- |
| placement            | 弹出位置           | [`DropdownPlacement`](#dropdownplacement)              | -         |
| items                | 菜单项配置         | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[] | `[]`      |
| menu                 | 菜单配置           | [`DropdownMenuProps`](#dropdownmenu属性说明)           | -         |
| open                 | 是否强制展开       | `boolean`                                              | `false`   |
| trigger              | 触发方式           | `'click' \| 'hover'`                                   | `'click'` |
| triggerElement       | 触发器配置         | [`DropdownTriggerElement`](#dropdowntriggerelement)    | -         |
| triggerElementRender | 自定义触发元素渲染 | `() => ReturnType<Snippet<[]>>`                        | -         |
| tag                  | 默认使用div标签    | `'div' \| 'details'`                                   | `'div'`   |

### DropdownMenu属性说明

| 属性名 | 说明       | 类型                                                   | 默认值 |
| ------ | ---------- | ------------------------------------------------------ | ------ |
| items  | 菜单项文本 | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[] | `[]`   |

### DropdownMenuItem属性说明

| 属性名    | 说明            | 类型                   | 默认值 |
| --------- | --------------- | ---------------------- | ------ |
| text      | 触发器文本      | `string`               | -      |
| linkProps | 触发器a标签属性 | `HTMLAnchorAttributes` | -      |

### DropdownPlacement

```typescript
type DropdownPlacement =
  | 'start'
  | 'center'
  | 'end'
  | 'top'
  | 'topCenter'
  | 'topEnd'
  | 'bottom'
  | 'bottomCenter'
  | 'bottomEnd'
  | 'left'
  | 'leftCenter'
  | 'leftEnd'
  | 'right'
  | 'rightEnd'
  | 'rightCenter';
```

### DropdownTriggerElement

```typescript
export interface DropdownTriggerElement extends ButtonProps<'a'> {
  text?: string; // 触发器文本
}
```
