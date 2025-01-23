---
title: Text
description: 用于页面文本展示。
editLink: false
outline: [2, 3]
footer: false
---

## Text<Badge type="tip">shell</Badge>

**Text主要用于页面上文本的展示**

## 用法演示
<!-- prettier-ignore -->
<IStockShellUiExample src="./example/TextSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextTag.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextAlign.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/TextSelf.svelte"></IStockShellUiExample>

## API
### 属性说明
| 参数       | 说明        | 类型                                                                                               | 默认值 |
|----------|-----------|--------------------------------------------------------------------------------------------------|---|
| color    | 文本的颜色     | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size     | 文本的大小     | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             | md |
| align    | 文本的对齐方式   | `left` \| `center` \| `right`                                                                    | left |
| tag      | 文本的标签类型   | `p` \| `span` \| `a` \| `i` \| `em` \| `strong`                                                  | p |
| texts    | 文本数组，支持多个文本项 | [`ITextItemProps[]`](#itextitemprops)                                                                          | [] |

#### ITextItemProps
```typescript
export interface ITextBaseProps {
  color?: TTextColor;
  size?: TTextSize;
  align?: TTextAlign;
  tag?: TTextTag;
}
export interface ITextItemProps extends ITextBaseProps {
  text?: string;
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}
```
