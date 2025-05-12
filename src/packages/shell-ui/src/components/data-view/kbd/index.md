---
title: Kbd 键盘样式组件
description: 用于显示键盘按键样式的UI组件，支持多尺寸配置、组合键展示和文本内嵌，适用于快捷键提示、操作指引等场景。
keywords: [键盘组件, Svelte键盘组件, 快捷键展示, 组合键UI, Kbd API]
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

<IStockShellUiExample src="./example/KbdDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdText.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdCombination.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 参数 | 说明     | 类型                                 | 默认值 |
| ---- | -------- | ------------------------------------ | ------ |
| size | 按键尺寸 | `xs` \| `sm` \| `md` \| `lg` \| `xl` | md     |
| text | 显示文本 | `string`                             | -      |

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
