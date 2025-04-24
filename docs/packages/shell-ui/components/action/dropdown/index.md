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
### 基础下拉菜单
展示最基本的下拉菜单用法：
- 点击按钮触发下拉菜单
- 默认向下弹出
- 支持文本菜单项


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownDefault.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

### 打开方式
#### 细节标签实现
展示使用 details 标签的实现方式：
- 使用原生 details 元素
- 语义化标记结构


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownMethod1.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### popover API实现
展示通过popover API和锚点定位结合的实现方式：
- 使用open属性控制状态
- 支持动态位置计算
- 可集成复杂交互逻辑
- 适用于高级定制场景


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownMethod2.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### CSS focus方式实现
当按钮聚焦时，内容会显示出来。

::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownMethod3.svelte" demoStyle="padding: 100px 0" layout="column"></IStockShellUiExample>
:::

### 位置
#### 起始对齐
展示起始对齐的下拉菜单：
- 弹出位置：start（起始位置）


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownStart.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 右侧对齐
展示右侧对齐的下拉菜单：
- 弹出位置：end（右侧）
- 菜单与触发元素右对齐
- 适合有限水平空间


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 居中弹出
展示居中弹出的下拉菜单：
- 弹出位置：center（居中）
- 完全居中于视口
- 适合重要操作提示
- 需要足够垂直空间


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 向上弹出
展示向上弹出的下拉菜单：
- 弹出位置：top（顶部）
- 适合底部触发场景


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownTop.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 顶部居中弹出
展示顶部居中弹出的下拉菜单：
- 弹出位置：topCenter（顶部居中）
- 菜单与触发元素中心对齐
- 适合导航栏下拉场景
- 保持对称视觉效果


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownTopCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 顶部右侧弹出
展示顶部右侧弹出的下拉菜单：
- 弹出位置：topEnd（顶部右侧）
- 菜单与触发元素右对齐
- 适合右上角操作菜单


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownTopEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 底部弹出
展示底部弹出的下拉菜单：
- 弹出位置：bottom（底部）
- 适合顶部触发场景


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownBottom.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 底部居中弹出
展示底部居中弹出的下拉菜单：
- 弹出位置：bottomCenter（底部居中）
- 菜单与触发元素中心对齐
- 适合对称布局需求
- 保持视觉平衡性


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownBottomCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 底部右侧弹出
展示底部右侧弹出的下拉菜单：
- 弹出位置：bottomEnd（底部右侧）
- 菜单与触发元素右对齐
- 适合有限水平空间


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownBottomEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 左侧弹出
展示左侧弹出的下拉菜单：
- 弹出位置：left（左侧）
- 适合侧边栏导航
- 与触发元素左对齐
- 需要足够水平空间


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownLeft.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 左侧居中弹出
展示左侧居中弹出的下拉菜单：
- 弹出位置：leftCenter（左侧居中）
- 垂直方向居中显示
- 适合侧边导航场景
- 保持菜单可见性


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownLeftCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 左侧底部弹出
展示左侧底部弹出的下拉菜单：
- 弹出位置：leftEnd（左侧底部）
- 菜单底部对齐触发器
- 适合长列表展示
- 防止顶部空间不足


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownLeftEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 右侧弹出
展示右侧弹出的下拉菜单：
- 弹出位置：right（右侧）
- 适合左侧空间不足场景
- 与触发元素右对齐


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownRight.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 右侧底部弹出
展示右侧底部弹出的下拉菜单：
- 弹出位置：rightEnd（右侧底部）
- 菜单底部对齐触发器
- 适合表格操作菜单


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownRightEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

#### 右侧居中弹出
展示右侧居中弹出的下拉菜单：
- 弹出位置：rightCenter（右侧居中）
- 垂直方向居中显示
- 适合长内容展示
- 保持视觉平衡性


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownRightCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::


### 悬停触发
展示悬停触发的下拉菜单：
- 鼠标悬停时自动展开
- 移出后自动关闭
- 适合导航菜单场景
- 保持菜单可见性控制


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownHover.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

### 强制打开状态
展示强制打开的下拉菜单：
- 通过open属性控制状态
- 初始即显示下拉内容
- 适用于教程/引导场景
- 可结合条件渲染使用


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownOpen.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::

### 自定义内容
展示完全自定义的下拉内容：
- 使用插槽自定义触发器
- 支持任意HTML内容
- 完全控制样式和交互


::: raw
<IStockShellUiExample src="./action/dropdown/example/DropdownCustomize.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
:::


## API 参考

### Dropdown属性说明

| 属性名 | 说明 | 类型                                                  | 默认值     |
|--------|------|-----------------------------------------------------|---------|
| placement | 弹出位置 | [`DropdownPlacement`](#dropdownplacement)           | - |
| items | 菜单项配置 | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[]  | `[]`    |
| menu | 菜单配置 | [`DropdownMenuProps`](#dropdownmenu属性说明)            | -       |
| open | 是否强制展开 | `boolean`                                           | `false` |
| trigger | 触发方式 | `'click' \| 'hover'`                                | `'click'` |
| triggerElement | 触发器配置 | [`DropdownTriggerElement`](#dropdowntriggerelement) | -       |
| triggerElementRender |  自定义触发元素渲染 | `() => ReturnType<Snippet<[]>>`                     | -       |
| tag | 默认使用div标签 | `'div' \| 'details'`                                | `'div'` |

### DropdownMenu属性说明

| 属性名 | 说明 | 类型                          | 默认值 |
|--------|------|-----------------------------|-----|
| items | 菜单项文本 | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[] | `[]`  |

### DropdownMenuItem属性说明

| 属性名 | 说明       | 类型 | 默认值 |
|--------|----------|------|---------|
| text | 触发器文本    | `string` | - |
| linkProps | 触发器a标签属性 | `HTMLAnchorAttributes` | - |

### DropdownPlacement
```typescript
type DropdownPlacement = 'start' | 'center' | 'end' | 'top' | 'topCenter' |
  'topEnd' | 'bottom' | 'bottomCenter' | 'bottomEnd' | 'left' | 
  'leftCenter' | 'leftEnd' | 'right' | 'rightEnd' | 'rightCenter'
```

### DropdownTriggerElement
```typescript
export interface DropdownTriggerElement extends ButtonProps<'a'> {
  text?: string; // 触发器文本
}
```