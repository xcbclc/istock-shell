---
title: Radio
description: 在一组备选项中进行单选。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Radio 单选框

**使用单选框，用户可以从多个选项中选择一个选项。**

## 用法演示
<IStockShellUiExample src="./example/RadioDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioCustomColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioLabel.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/RadioChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明           | 类型                                                                                               | 默认值 |
|---------------|--------------|--------------------------------------------------------------------------------------------------|----|
| color         | 单选框的颜色       | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size          | 单选框的大小       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |    |
| options       | 单选框选项数组      | [TRadioItemOption](#tradioitemoption)[]                                                          | [] |
| label         | 单选框的标签       | [TRadioLabel](#tradiolabel)                                                                      |    |
| onChangeValue | 当选项值变化时的回调函数 | (value: T, option?: [TRadioItemOption](#tradioitemoption)\<T\>) => void                          |    |

#### TRadioItemOption

```typescript
export type TRadioItemOption<T = any> = {
    label?: string | number | boolean;
    value: T;
    disabled?: boolean;
};
```

#### TRadioLabel

```typescript
export type TRadioLabel = {
  type?: TRadioLabelType;
  position?: 'before' | 'after';
  class?: string;
};
```