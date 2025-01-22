---
title: Button
description: 按钮用于开始一个即时操作。
editLink: false
outline: [2, 3]
footer: false
---

按钮可以让用户执行命令或者作出选择。

## 用法演示
<!-- prettier-ignore -->
<IStockShellUiExample src="./example/ButtonDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonSoft.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonOutline.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDash.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonActive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTextAndLink.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonWide.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonTag.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonBlock.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLoading.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ButtonLogins.svelte"></IStockShellUiExample>

## API
### 属性说明
| 参数      | 说明        | 类型                                                                                             | 默认值 |
| --------- |-----------|------------------------------------------------------------------------------------------------|---|
| variant   | 按钮的变体     | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size      | 按钮的大小     | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                           | md |
| soft      | 是否为柔和按钮   | boolean                                                                                        | false |
| outline   | 是否为边框按钮   | boolean                                                                                        | false |
| dash      | 是否为虚线按钮   | boolean                                                                                        | false |
| active    | 是否为激活状态按钮 | boolean                                                                                        | false |
| ghost     | 是否为幽灵按钮   | boolean                                                                                        | false |
| link      | 是否为链接按钮   | boolean                                                                                        | false |
| wide      | 是否为宽按钮    | boolean                                                                                        | false |
| tag       | 按钮的标签类型   | `a` \| `button` \| `input` \| `div` \| `button`                                                | button |
| disabled  | 是否禁用按钮    | boolean                                                                                        | false |
| shape     | 按钮的形状     | `square` \| `circle`                                                                           |   |
| block     | 是否为块级按钮   | boolean                                                                                        | false |
| loading   | 是否显示加载状态  | boolean                                                                                        | false |