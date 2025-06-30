---
title: Text 文本组件 | IStock Shell UI
description: Text文本组件提供强大的文本渲染功能，支持8种颜色主题、5种尺寸规格、多种字体粗细、文本对齐、语义化标签、批量文本渲染、链接功能等特性，基于Tailwind CSS构建，适用于内容展示、标题渲染、链接文本、多段落组合等各种文本展示场景。
keywords:
  [
    Text文本组件,
    Svelte文本,
    文本渲染组件,
    文字排版,
    文本样式,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式文本,
    语义化标签,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Text 文本组件 <Badge type="tip">shell</Badge>

文本组件是用户界面中最基础的内容展示元素，用于渲染各种文本内容、标题、链接等文字信息。IStock Shell UI 的 Text 组件基于 Tailwind CSS 构建，提供了丰富的样式配置和批量渲染功能，满足各种文本展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShText } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的文本用法，适用于大多数场景：

```svelte
<script>
  import { ShText } from '@istock-shell/ui';
</script>

<ShText texts={[{ text: '这是一段文本' }]} />
```

## 组件特性

- 🎨 **丰富色彩**：8种预设颜色主题（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🎭 **字体粗细**：4种字体粗细选择（light、medium、semibold、bold）
- 📝 **语义标签**：支持多种HTML标签（p、span、a、i、em、strong）
- 🔧 **批量渲染**：支持多文本项批量渲染，每个文本项可独立配置样式
- 🔗 **链接功能**：支持链接文本，可配置链接地址和打开方式
- ♿ **无障碍友好**：基于语义化HTML标签，支持屏幕阅读器和键盘导航

## 使用场景

| 场景       | 推荐配置                           | 说明                         |
| ---------- | ---------------------------------- | ---------------------------- |
| 标题文本   | `size="lg"` + `weight="bold"`      | 页面标题、章节标题、卡片标题 |
| 正文内容   | `size="md"` + 默认配置             | 文章正文、描述信息、说明文字 |
| 辅助文本   | `size="sm"` + `color="secondary"`  | 提示信息、备注说明、次要内容 |
| 链接文本   | `tag="a"` + `color="primary"`      | 导航链接、外部链接、操作链接 |
| 强调文本   | `weight="bold"` + `color="accent"` | 重要提示、关键信息、突出内容 |
| 状态文本   | 对应状态颜色主题                   | 成功提示、警告信息、错误提示 |
| 多段落组合 | `texts` 数组配置                   | 复杂文本布局、混合样式文本   |
| 响应式文本 | 响应式尺寸配置                     | 适配不同设备屏幕的文本显示   |

## 示例演示

<IStockShellUiExample src="./example/TextSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextWeight.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextTag.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextAlign.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextSelf.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名   | 类型                                | 默认值 | 说明                                     |
| -------- | ----------------------------------- | ------ | ---------------------------------------- |
| `color`  | [`TextColor`](#textcolor)           | -      | 文本的颜色主题                           |
| `size`   | [`TextSize`](#textsize)             | -      | 文本的尺寸大小                           |
| `align`  | [`TextAlign`](#textalign)           | -      | 文本的对齐方式                           |
| `tag`    | [`TextTag`](#texttag)               | `'p'`  | 渲染的HTML标签类型                       |
| `weight` | [`TextWeight`](#textweight)         | -      | 文本的字体粗细                           |
| `texts`  | [`TextItemProps[]`](#textitemprops) | `[]`   | 文本项配置数组，用于批量渲染多个文本元素 |
| `class`  | `string`                            | -      | 自定义CSS类名                            |

### 代码片段插入位置

- `children`：

```svelte
<svelte:element this={tag}>
  <!-- ...code -->
  {@render children?.()}
  <!-- ...code -->
</svelte:element>
```

### 事件

`Text`继承所有原生HTML元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### TextColor

```typescript
// 文本颜色类型
type TextColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
```

#### TextSize

```typescript
// 文本尺寸类型
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### TextAlign

```typescript
// 文本对齐方式类型
type TextAlign = 'left' | 'center' | 'right';
```

#### TextTag

```typescript
// 文本标签类型
type TextTag = 'p' | 'span' | 'a' | 'i' | 'em' | 'strong';
```

#### TextWeight

```typescript
// 文本字体粗细类型
type TextWeight = 'light' | 'medium' | 'semibold' | 'bold';
```

#### TextTarget

```typescript
// 链接打开方式类型
type TextTarget = '_self' | '_blank' | '_parent' | '_top';
```

#### TextBaseProps

```typescript
// 文本基础属性接口
interface TextBaseProps {
  color?: TextColor; // 文本颜色主题
  size?: TextSize; // 字体尺寸规格
  align?: TextAlign; // 文本对齐方式
  tag?: TextTag; // 使用的HTML标签类型
  weight?: TextWeight; // 字体粗细程度
}
```

#### TextItemProps

```typescript
// 单个文本项属性接口
interface TextItemProps extends TextBaseProps {
  text?: string; // 文本内容字符串
  href?: string; // 链接地址（当标签为a时生效）
  target?: TextTarget; // 链接打开方式
}
```

#### TextProps

```typescript
// 文本组件主属性接口
interface TextProps extends TextBaseProps {
  texts?: TextItemProps[]; // 多文本项配置数组
  class?: string; // 自定义CSS类名
}
```

## 设计指南

### 文本层级

- **标题文本**：使用 `size="xl"` 或 `size="lg"` 配合 `weight="bold"`
- **正文内容**：使用 `size="md"` 作为默认尺寸
- **辅助信息**：使用 `size="sm"` 或 `size="xs"` 配合 `color="secondary"`
- **强调文本**：使用 `weight="semibold"` 或 `color="primary"`

### 语义化标签

- **段落文本**：使用 `tag="p"`（默认）
- **行内文本**：使用 `tag="span"`
- **链接文本**：使用 `tag="a"` 配合 `href` 属性
- **强调文本**：使用 `tag="strong"` 或 `tag="em"`
- **斜体文本**：使用 `tag="i"`

### 无障碍支持

- 确保文本颜色与背景有足够的对比度
- 使用语义化的HTML标签提升屏幕阅读器体验
- 为链接文本提供明确的描述信息
- 避免仅通过颜色传达重要信息

### 最佳实践

1. **保持一致性**：在同一应用中使用统一的文本尺寸和颜色规范
2. **合理分层**：通过不同的尺寸和粗细建立清晰的信息层级
3. **适度使用**：避免在同一视图中使用过多不同的文本样式
4. **响应式设计**：考虑在不同屏幕尺寸下的文本可读性

## 基础用法

### 简单文本显示

```svelte
<script>
  import { ShText } from '@istock/shell-ui';
</script>

<!-- 基础段落文本 -->
<ShText>这是一段普通的文本内容</ShText>

<!-- 带颜色的文本 -->
<ShText color="primary">主要文本</ShText>
<ShText color="secondary">次要文本</ShText>
<ShText color="success">成功提示</ShText>
<ShText color="error">错误提示</ShText>
```

### 不同尺寸和粗细

```svelte
<!-- 不同尺寸 -->
<ShText size="xs">超小文本</ShText>
<ShText size="sm">小号文本</ShText>
<ShText size="md">中等文本</ShText>
<ShText size="lg">大号文本</ShText>
<ShText size="xl">超大文本</ShText>

<!-- 不同粗细 -->
<ShText weight="light">细体文本</ShText>
<ShText weight="medium">中等粗细</ShText>
<ShText weight="semibold">半粗体</ShText>
<ShText weight="bold">粗体文本</ShText>
```

### 语义化标签

```svelte
<!-- 段落文本 -->
<ShText tag="p">这是一个段落</ShText>

<!-- 行内文本 -->
<ShText tag="span">行内文本</ShText>

<!-- 链接文本 -->
<ShText tag="a" href="https://example.com" color="primary">点击访问链接</ShText>

<!-- 强调文本 -->
<ShText tag="strong" weight="bold">重要内容</ShText>
<ShText tag="em">强调内容</ShText>
```

### 批量渲染文本

```svelte
<script>
  const textItems = [
    { text: '第一项', color: 'primary' },
    { text: '第二项', color: 'secondary' },
    { text: '链接项', tag: 'a', href: '/link', color: 'info' },
  ];
</script>

<ShText texts={textItems} />
```

### 文本对齐

```svelte
<ShText align="left">左对齐文本</ShText>
<ShText align="center">居中对齐文本</ShText>
<ShText align="right">右对齐文本</ShText>
```

## 常见问题

### 如何自定义文本样式？

可以通过 `class` 属性添加自定义CSS类：

```svelte
<ShText class="custom-text">自定义样式文本</ShText>

<style>
  :global(.custom-text) {
    text-decoration: underline;
    letter-spacing: 0.1em;
  }
</style>
```

### 如何处理长文本截断？

组件本身不提供截断功能，可以通过CSS实现：

```svelte
<ShText class="truncate">这是一段很长的文本内容...</ShText>

<style>
  :global(.truncate) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }
</style>
```

### 如何实现响应式文本？

可以结合CSS媒体查询实现响应式文本：

```svelte
<ShText class="responsive-text">响应式文本</ShText>

<style>
  :global(.responsive-text) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    :global(.responsive-text) {
      font-size: 16px;
    }
  }
</style>
```

### 批量渲染时如何处理事件？

每个文本项都会渲染为独立的元素，可以通过事件委托处理：

```svelte
<script>
  function handleClick(event) {
    const text = event.target.textContent;
    console.log('点击了:', text);
  }
</script>

<div on:click={handleClick}>
  <ShText texts={textItems} />
</div>
```

## 更新日志

查看完整的更新历史，请访问 [GitHub Releases](https://github.com/your-org/shell-ui/releases)。
