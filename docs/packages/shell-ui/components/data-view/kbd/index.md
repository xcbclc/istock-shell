---
title: Kbd 键盘样式组件
description: 用于显示键盘按键样式的UI组件，支持多尺寸配置、组合键展示和文本内嵌，适用于快捷键提示、操作指引等场景。
keywords: [键盘组件,Svelte键盘组件,快捷键展示,组合键UI,Kbd API]
aside: false
editLink: false
outline: [2, 3]
---

## Kbd 键盘样式组件
**标准化的键盘按键展示方案，提供灵活的尺寸配置和组合键支持，符合现代UI设计规范。**

## 使用场景
- 应用程序的快捷键提示
- 操作指引文档中的键位说明
- 组合键操作的可视化展示
- 需要突出显示特定按键时
- 技术文档中的键盘操作说明

## 功能特性
- 5种标准尺寸配置（xs-xl）
- 响应式尺寸适配
- 组合键自动排版
- 支持自定义子内容
- 键盘样式语义化呈现

## 示例演示

### 基础键盘样式
核心配置要素：
- 默认尺寸为`md`（中）
- 支持直接文本内容输入
- 自动应用键盘样式
- 适用于快捷键提示场景


::: raw
<IStockShellUiExample src="./data-view/kbd/example/KbdDefault.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置
五级标准尺寸：
- `xs`: 超小
- `sm`: 小
- `md`: 中
- `lg`: 大
- `xl`: 超大


::: raw
<IStockShellUiExample src="./data-view/kbd/example/KbdSize.svelte"></IStockShellUiExample>
:::

### 文本内嵌集成
与文本混排方案：
- 支持行内级展示
- 自动保持垂直对齐
- 适用于操作指引文档
- 可结合说明文本使用


::: raw
<IStockShellUiExample src="./data-view/kbd/example/KbdText.svelte"></IStockShellUiExample>
:::

### 组合键展示方案
通过组件组合实现：
- 支持多键位组合展示
- 自动添加连接符号（+）
- 保持视觉样式一致性
- 适用于快捷键说明场景


::: raw
<IStockShellUiExample src="./data-view/kbd/example/KbdCombination.svelte"></IStockShellUiExample>
:::


## API 参考
### 属性说明
| 参数    | 说明                 | 类型                                      | 默认值    |
|-------|--------------------|-----------------------------------------|--------|
| size  | 按键尺寸             | `xs` \| `sm` \| `md` \| `lg` \| `xl`   | md     |
| text  | 显示文本             | `string`                                | -      |

## 最佳实践
1. **尺寸选择**：
   - 正文内容使用`md`尺寸
   - 标题/强调内容使用`lg`尺寸
   - 移动端优先使用`sm`尺寸

2. **组合键规范**：
   - 使用`+`符号连接多个Kbd组件
   - 组合顺序：Ctrl → Shift → Alt → 字母
   - 保持组合元素间距一致

> **注意**：组合键元素需包裹在相同容器
> **性能建议**：高频更新使用不可变数据
