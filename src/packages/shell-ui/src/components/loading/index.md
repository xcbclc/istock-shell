---
title: Loading
description: 用于页面或内容的加载中状态。
editLink: false
outline: [2, 3]
footer: false
---

**Loading会显示动画以指示正在加载某些内容。**

## 用法演示
<!-- prettier-ignore -->
<IStockShellUiExample src="./example/LoadingStyle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/LoadingText.svelte"></IStockShellUiExample>

## API
### 属性说明
| 参数      | 说明      | 类型                                                                                            | 默认值 |
| --------- |---------|-----------------------------------------------------------------------------------------------|---|
| shape     | 加载动画的形状 | `spinner` \| `dots` \| `ring` \| `ball` \| `bars` \| `infinity`                              | spinner |
| size      | 加载动画的大小 | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                           | md |
| color     | 加载动画的颜色 | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |  |
| text      | 加载动画的文字 | `string`                                                                                         |    |