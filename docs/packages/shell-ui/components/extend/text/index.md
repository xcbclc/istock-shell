---
title: Text 文本组件
description: 文本组件用于页面内容展示，支持多尺寸、颜色主题、排版对齐等样式配置，提供语义化标签支持。
keywords: [文本组件, Svelte文本, 文字排版, 文本样式, Text API]
aside: false
editLink: false
outline: [2, 3]
---

## Text 文本组件<Badge type="tip">shell</Badge>

**用于规范化的文本内容展示，支持丰富的排版样式配置和语义化标签。**

## 使用场景

- 需要统一管理文本样式时
- 实现多段不同样式的组合文本
- 需要语义化标签的文本内容
- 适配不同屏幕尺寸的响应式文本
- 需要高对比度的可访问性文本

## 功能特性

- 8种预设颜色主题配置
- 5种尺寸选择（xs-xl）及响应式适配
- 支持4种字体粗细调节
- 多文本段落组合支持
- 语义化HTML标签映射

## 示例演示

### 尺寸规格设置

五级标准尺寸：

- `xs`: 超小
- `sm`: 小
- `md`: 中 (默认)
- `lg`: 大
- `xl`: 超大

::: raw
<IStockShellUiExample src="./extend/text/example/TextSize.svelte" layout="column"></IStockShellUiExample>
:::

### 预定义颜色主题

支持八种语义化颜色：

- **系统色系**：`primary`（主色）/`secondary`（辅色）/`accent`（强调色）
- **状态指示**：`info`（信息）/`success`（成功）/`warning`（警告）/`error`（错误）
- **中性色**：`neutral`（默认）

::: raw
<IStockShellUiExample src="./extend/text/example/TextColor.svelte" layout="column"></IStockShellUiExample>
:::

### 字体粗细配置

权重值与实际值对应：
| 属性值 | font-weight | 适用场景 |
|------------|-------------|------------------|
| `light` | 300 | 次要文本 |
| `medium` | 500 | 强调文本 |
| `semibold` | 600 | 标题文本 |
| `bold` | 700 | 重要提示文本 |

::: raw
<IStockShellUiExample src="./extend/text/example/TextWeight.svelte" layout="column"></IStockShellUiExample>
:::

### 标签类型支持

支持的HTML标签：

- **基础标签**：`p`/`span`/`a`
- **语义标签**：`i`/`em`/`strong`
- 默认使用`p`标签

::: raw
<IStockShellUiExample src="./extend/text/example/TextTag.svelte" layout="column"></IStockShellUiExample>
:::

### 文本对齐方式

通过`align`属性配置：

- 支持`left`/`center`/`right`三种模式
- 仅对p标签生效
- 适用于表单标签对齐场景

> [!WARNING]
> 对齐属性需配合容器宽度使用

::: raw
<IStockShellUiExample src="./extend/text/example/TextAlign.svelte" layout="column"></IStockShellUiExample>
:::

### 精细化样式控制

通过自身属性实现：

- 支持单条文本独立样式
- 覆盖全局样式配置
- 适用于复杂排版场景

::: raw
<IStockShellUiExample src="./extend/text/example/TextSelf.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 参数   | 说明                      | 类型                                                                                             | 默认值 |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| color  | 文本的颜色                | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |        |
| size   | 文本的大小                | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |        |
| align  | 文本的对齐方式            | `left` \| `center` \| `right`                                                                    |        |
| tag    | 文本的标签类型            | `p` \| `span` \| `a` \| `i` \| `em` \| `strong`                                                  | p      |
| texts  | 文本数组，支持多个文本项  | [`TextItemProps[]`](#textitemprops)                                                              | []     |
| weight | 文本的粗细                | `light` \| `medium` \| `semibold` \| `bold`                                                      |        |
| href   | 链接地址（当tag=a时有效） | string                                                                                           |        |

#### TextItemProps

```typescript
export interface TextBaseProps {
  color?: TextColor; // 文本颜色
  size?: TextSize; // 字体尺寸
  align?: TextAlign; // 对齐方式
  tag?: TextTag; // 使用的HTML标签
  weight?: TextWeight; // 字体粗细
}
export interface TextItemProps extends TextBaseProps {
  text?: string; // 文本内容
  href?: string; // 链接地址（当标签为a时生效）
  target?: '_self' | '_blank' | '_parent' | '_top'; // 链接打开方式
}
```
