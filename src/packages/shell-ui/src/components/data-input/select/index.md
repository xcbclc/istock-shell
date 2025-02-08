---
title: Select
description: 下拉选择器。
editLink: false
outline: [ 2, 3 ]
footer: false
---

## Select 选择器

**选择器用于从选项列表中选择值。**

## 用法演示
<IStockShellUiExample src="./example/SelectDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectGhost.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/SelectChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明           | 类型                                                                                               | 默认值 |
|---------------|--------------|--------------------------------------------------------------------------------------------------|----|
| color         | 选择器的颜色       | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size          | 选择器的大小       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |    |
| options       | 选择器选项数组      | [TSelectItemOption](#tselectitemoption)[]                                                        | [] |
| variant       | 选择器的变种       | `ghot`                                                                                           |    |
| onChangeValue | 当选项值变化时的回调函数 | (value: T[], option?: [TSelectItemOption](#tselectitemoption)\<T\>) => void                  |    |

#### TSelectItemOption

```typescript
export type TSelectItemOption<T = any> = {
  label?: string | number | boolean;
  value: T;
  disabled?: boolean;
  children?: Array<TSelectItemOption<T>>;
};
```