<!--
@component
数据列表选项组件，用于在DataList中渲染单个选项。支持以下功能：
- 配置选项标签和值
- 支持自定义选项内容
- 继承原生option属性

用法示例:
```html
<ShDataListOption label="选项1" value="value1" />

<ShDataListOption value="custom">
  <span>自定义选项内容</span>
</ShDataListOption>
```
-->

<script lang="ts" module>
  // 导入HTML元素属性类型
  import type { HTMLAttributes } from 'svelte/elements';

  // 选项属性接口（继承option元素属性）
  export interface DataListOptionProps<V = any> extends HTMLAttributes<HTMLOptionElement> {
    label?: string; // 选项标签文本
    value?: V;
  }
</script>

<script lang="ts">
  // 解构props并设置默认值
  const {
    label = '', // 选项标签
    value, // 选项值
    children, // 子内容
    ...otherProps // 其他原生属性
  }: DataListOptionProps = $props();
</script>

<option {value} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 显示标签文本，如果没有则显示值，都没有则显示空字符串 -->
    {label ?? value ?? ''}
  {/if}
</option>
