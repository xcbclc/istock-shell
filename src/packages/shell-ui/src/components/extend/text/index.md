---
title: Text 文本组件
description: 文本组件用于页面内容展示，支持多尺寸、颜色主题、排版对齐等样式配置，提供语义化标签支持。
keywords: [文本组件,Svelte文本,文字排版,文本样式,Text API]
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
<IStockShellUiExample src="./example/TextSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextColor.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextWeight.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextTag.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextAlign.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextSelf.svelte" layout="column"></IStockShellUiExample>

## API 参考
### 属性说明
| 参数       | 说明           | 类型                                                                                               | 默认值  |
|----------|--------------|--------------------------------------------------------------------------------------------------|------|
| color    | 文本的颜色        | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |      |
| size     | 文本的大小        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |    |
| align    | 文本的对齐方式      | `left` \| `center` \| `right`                                                                    |  |
| tag      | 文本的标签类型      | `p` \| `span` \| `a` \| `i` \| `em` \| `strong`                                                  | p    |
| texts    | 文本数组，支持多个文本项 | [`TextItemProps[]`](#textitemprops)                                                              | []   |
| weight   | 文本的粗细        | `light` \| `medium` \| `semibold` \| `bold`                                                      |      |
| href     | 链接地址（当tag=a时有效） | string                                                                                           |      |

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
