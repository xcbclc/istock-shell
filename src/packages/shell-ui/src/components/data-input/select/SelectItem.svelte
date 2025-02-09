<script lang="ts" module>
  import type { HTMLOptionAttributes } from 'svelte/elements';

  // 定义选择项选项类型（泛型支持）
  export type SelectItemOption<T = any> = {
    label?: string; // 显示文本
    value: T; // 实际值
    disabled?: boolean; // 禁用状态
    children?: Array<SelectItemOption<T>>; // 子选项（支持分组）
  };

  // 组件属性接口（继承option元素属性）
  export interface SelectItemProps<T = any> extends HTMLOptionAttributes {
    option?: SelectItemOption<T>; // 关联选项数据
    selected?: boolean; // 选中状态
  }
</script>

<script lang="ts">
  const { option, ...otherProps }: SelectItemProps = $props();
</script>

<!-- 原生option元素 -->
<option {...otherProps} disabled={option?.disabled} value={option?.value}>{option?.label ?? option?.value}</option>

<style></style>
