---
title: Kbd 键盘按键组件 | IStock Shell UI
description: Kbd键盘按键组件提供标准化的键盘按键样式展示，支持5种尺寸规格、组合键展示、文本混排、自定义内容等特性，基于原生kbd元素构建，适用于快捷键提示、操作指引、技术文档等各种展示场景。
keywords:
  [
    Kbd键盘按键组件,
    Svelte键盘组件,
    快捷键展示,
    组合键UI,
    键盘样式,
    UI组件库,
    按键提示,
    操作指引,
    Web组件,
    用户界面,
    UX设计,
    响应式组件,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Kbd 键盘按键组件

键盘按键组件用于在界面中展示键盘按键样式，模拟真实键盘按键的视觉效果。IStock Shell UI 的 Kbd 组件基于原生 HTML kbd 元素构建，提供标准化的按键展示方案，支持多种尺寸和组合方式，完美适配快捷键提示、操作指引等场景。

## 快速开始

### 安装

```bash
npm install @istock-shell/ui
```

### 基础用法

```svelte
<script>
  import { ShKbd } from '@istock-shell/ui';
</script>

<!-- 基础按键展示 -->
<ShKbd>Enter</ShKbd>

<!-- 带尺寸的按键 -->
<ShKbd size="lg">Ctrl</ShKbd>

<!-- 自定义内容的按键 -->
<ShKbd>
  <Icon name="command" class="w-4 h-4" />
</ShKbd>
```

## 组件特性

- 🎨 **标准样式**：模拟真实键盘按键的视觉效果，提供专业的UI展示
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）满足不同场景需求
- 🔗 **组合键支持**：完美支持多键位组合展示，清晰展示复杂快捷键
- 📝 **文本混排**：支持与文本内容的行内级混合排版，自然融入文档
- 🎯 **语义化标签**：基于原生 `<kbd>` 元素，符合HTML5语义化标准
- 🔧 **内容灵活**：支持文本内容和自定义子内容，可渲染图标等复杂内容
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持屏幕阅读器和键盘导航

## 使用场景

| 场景       | 推荐配置             | 说明                           |
| ---------- | -------------------- | ------------------------------ |
| 应用快捷键 | `size="md"`          | 应用界面中的快捷键操作提示     |
| 技术文档   | `size="sm"`          | 文档、教程中的键位标识         |
| 游戏控制   | `size="lg"`          | 游戏界面中的控制键位展示       |
| 移动端展示 | `size="xs"`          | 移动设备上的紧凑键位展示       |
| 重要提示   | `size="xl"`          | 重要快捷键的突出展示           |
| 组合键操作 | 多个组件 + 连接符    | 复杂快捷键组合的清晰展示       |
| 行内混排   | 默认配置             | 与文本内容的自然混合排版       |
| 图标按键   | 自定义子内容         | 带图标的按键内容展示           |
| 帮助说明   | `size="sm"` + 组合键 | 操作指引和帮助文档中的键位说明 |

## 示例演示

<IStockShellUiExample src="./example/KbdDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdText.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/KbdCombination.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

除了支持原生 `kbd` 元素的所有属性外，还扩展了以下特有属性：

| 属性名  | 类型                  | 默认值 | 说明               |
| ------- | --------------------- | ------ | ------------------ |
| `size`  | [`KbdSize`](#kbdsize) | `'md'` | 键盘按键的尺寸大小 |
| `text`  | `string`              | -      | 按键显示的文本内容 |
| `class` | `string`              | -      | 自定义CSS类名      |

### 代码片段插入位置

- `children`：

```svelte
<kbd>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</kbd>
```

### 事件

组件继承原生 `kbd` 元素的所有事件，包括但不限于：

- `click` - 点击事件
- `keydown` - 键盘按下事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

## 类型定义

### KbdSize

```typescript
export type KbdSize =
  | 'xs' // 超小尺寸
  | 'sm' // 小尺寸
  | 'md' // 中等尺寸（默认）
  | 'lg' // 大尺寸
  | 'xl'; // 超大尺寸
```

## 设计指南

### 尺寸选择建议

- **xs**：表格内按键、紧凑布局场景
- **sm**：移动端界面、技术文档中的键位标识
- **md**：默认尺寸，适用于大多数桌面端场景
- **lg**：重要快捷键提示、游戏控制界面
- **xl**：标题级展示、特别强调的键位

### 视觉层次

1. **主要快捷键**：使用 `lg` 或 `xl` 尺寸突出显示
2. **次要快捷键**：使用 `md` 尺寸保持平衡
3. **辅助说明**：使用 `sm` 或 `xs` 尺寸降低视觉权重

### 组合键规范

- **连接符号**：使用 `+` 符号连接多个按键
- **按键顺序**：遵循 Ctrl → Shift → Alt → 功能键 → 字母/数字 的顺序
- **间距控制**：保持组合元素间的一致间距
- **容器包裹**：将组合键包裹在同一容器中，确保语义完整性

### 无障碍设计

- 基于原生 `<kbd>` 元素，符合 HTML5 语义化标准
- 自动提供正确的角色和属性，支持屏幕阅读器识别
- 遵循 WCAG 2.0 AA 级别的无障碍标准
- 支持键盘导航和屏幕阅读器正确解析

## 最佳实践

### 内容编写

- 使用标准按键名称（如 `Ctrl`、`Shift`、`Enter`）
- 避免使用非标准或模糊的名称（如 `control`、`shift key`）
- 保持按键名称的一致性和准确性

### 尺寸搭配

- 根据重要性和层次选择合适的尺寸
- 主要快捷键使用较大尺寸突出显示
- 次要操作使用默认尺寸保持简洁
- 避免所有按键使用相同的大尺寸

### 组合键展示

- 使用清晰的分隔符（如 `+`）连接组合键
- 保持组合键之间的适当间距
- 避免紧密连接的混乱布局
- 考虑使用容器包装复杂的组合键结构

### 无障碍实践

1. **语义化使用**：确保按键内容准确描述实际键位
2. **组合键顺序**：遵循标准的修饰键顺序（Ctrl、Alt、Shift等）
3. **颜色对比度**：确保按键与背景有足够的对比度
4. **键盘可访问**：当按键作为交互元素时，确保可通过键盘访问

## 常见问题

### Q: 如何自定义按键的颜色和样式？

A: 可以通过 `class` 属性添加自定义 CSS 类名：

```svelte
<ShKbd class="bg-blue-500 text-white">Custom</ShKbd>
```

### Q: 如何在按键中显示图标？

A: 使用子插槽可以插入任意内容，包括图标：

```svelte
<ShKbd>
  <Icon name="command" class="w-4 h-4" />
</ShKbd>
```

---

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
