# Shell UI 组件文档生成规范

请根据以下规范编写 Shell UI 组件的 `index.md` 文档。

## 1. 文档头部元数据 (Frontmatter)

文档必须以 YAML Frontmatter 开头，包含以下字段：

```yaml
---
title: {ComponentName} {中文名称} | IStock Shell UI
description: {一段简短的描述，概括组件的核心功能、关键特性（如支持的类型、样式、尺寸等）、技术基础（如基于原生 HTML 元素）以及适用场景。}
keywords:
  [
    {ComponentName}{中文名称},
    Svelte{中文名称},
    {相关关键词1},
    {相关关键词2},
    ...
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式{中文名称},
  ]
aside: false
editLink: false
outline: [2, 4]
---
```

## 2. 标题 (H1)

```markdown
# {ComponentName} {中文名称}
```

## 3. 简介

在标题下方，编写一段简短的介绍。

- 说明该组件在用户界面中的角色和作用。
- 提及 IStock Shell UI 的该组件基于什么构建（如原生 HTML 元素）。
- 概括其提供的丰富样式和功能特性。

## 4. 快速开始 (H2)

````markdown
## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```
````

```svelte
<script>
  import { Sh{ComponentName} } from '@istock-shell/ui';
</script>
```

### 基础用法

{简要说明基础用法}

```svelte
<script>
  import { Sh{ComponentName} } from '@istock-shell/ui';
</script>

<Sh{ComponentName} ... />
```

````

## 5. 组件特性 (H2)

列出组件的主要特性，使用 Emoji 列表项。
格式：`- {Emoji} **{特性名称}**：{详细描述}`

示例：
- 🎨 **丰富色彩**：8种预设主题色彩...
- 📏 **多种尺寸**：5种尺寸规格...
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准...

## 6. 使用场景 (H2)

使用 Markdown 表格列出常见的使用场景。

| 场景 | 推荐配置 | 说明 |
| --- | --- | --- |
| {场景名称} | `{配置代码}` | {说明文本} |

## 7. 示例演示 (H2)

列出组件的示例代码引用。使用 `<IStockShellUiExample>` 组件。
确保 `src` 路径指向正确的示例文件。

```html
<IStockShellUiExample src="./example/{ExampleFile}.svelte"></IStockShellUiExample>
<!-- 如果需要纵向布局 -->
<IStockShellUiExample src="./example/{ExampleFile}.svelte" layout="column"></IStockShellUiExample>
````

## 8. API 参考 (H2)

### 属性说明 (H3)

使用 Markdown 表格列出组件属性。

| 属性名     | 类型   | 默认值    | 说明   |
| ---------- | ------ | --------- | ------ |
| `propName` | `Type` | `Default` | {说明} |

- 类型列中的复杂类型应链接到下方的类型定义锚点，例如 [`InputType`](#inputtype)。

### 代码片段插入位置 (H3)

展示组件内部结构以及 `children` 或其他 Snippet 的渲染位置。

```svelte
<element>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</element>
```

### 事件 (H3)

列出组件支持的事件。如果继承自原生元素，请明确说明。

- `event-name` - {事件描述}

### 类型定义 (H3)

列出组件导出的 TypeScript 类型定义。

#### {TypeName} (H4)

```typescript
// {类型注释}
type {TypeName} = ...;
```

## 9. 设计指南 (H2) (可选)

如果适用，提供关于颜色、尺寸选择、无障碍支持等方面的建议。

## 10. 最佳实践 (H2) (可选)

提供关于内容编写、视觉设计、交互设计等方面的最佳实践建议。

## 11. 常见问题 (H2) (可选)

以 Q&A 形式列出常见问题。

---

**注意：**

- 保持语气专业、客观、简洁。
- 确保所有代码块语法正确（Svelte/Bash/TypeScript）。
- 严格遵循上述 Markdown 结构和格式。
