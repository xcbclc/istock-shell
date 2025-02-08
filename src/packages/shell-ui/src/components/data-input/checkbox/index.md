---
title: Checkbox
description: 收集用户的多项选择。
editLink: false
outline: [ 2, 3 ]
---

## Checkbox 复选框

**复选框用于选择或取消选择值。**

## 用法演示
<IStockShellUiExample src="./example/CheckboxDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckBoxFieldset.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxSize.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxDisabled.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxIndeterminate.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxCustomColor.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxLabel.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/CheckboxChange.svelte"></IStockShellUiExample>

## API
### 属性说明
| 属性名           | 说明          | 类型                                                                                               | 默认值 |
|---------------|-------------|--------------------------------------------------------------------------------------------------|----|
| color         | 复选框的颜色      | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` |    |
| size          | 复选框的大小      | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                             |    |
| options       | 复选框选项数组     | [TCheckboxItemOption](#tcheckboxitemoption)[]                                                    | [] |
| label         | 复选框的标签      | [TCheckboxLabel](#tcheckboxlabel)                                                                |    |
| onChangeValue | 当选项值变化时的回调函数 | (value: T[], option?: [TCheckboxItemOption](#tcheckboxitemoption)\<T\>) => void                        |    |

#### TCheckboxItemOption

```typescript
export type TCheckboxItemOption<T = any> = {
  label?: string | number | boolean;
  value: T;
  disabled?: boolean;
};
```

#### TCheckboxLabel

```typescript
export type TCheckboxLabel = {
  type?: TCheckboxLabelType;
  position?: 'before' | 'after';
  class?: string;
};
```