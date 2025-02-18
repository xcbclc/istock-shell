<!--
@component
数据列表组件，用于为input元素提供预设选项列表。支持以下功能：
- 配置预设选项列表
- 支持自定义选项内容
- 与input元素配合使用

用法示例:
```html
<input list="browsers" />
<ShDataList
  id="browsers"
  options={[
    { label: "Chrome", value: "chrome" },
    { label: "Firefox", value: "firefox" }
  ]}
/>

<ShDataList id="custom-list">
  <ShDataListOption value="option1">选项1</ShDataListOption>
  <ShDataListOption value="option2">选项2</ShDataListOption>
</ShDataList>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DataListOptionProps } from './DataListOption.svelte';

  // 组件属性接口（继承datalist元素属性）
  export interface DataListProps extends HTMLAttributes<HTMLDataListElement> {
    options?: DataListOptionProps[]; // 预设选项列表
  }
</script>

<script lang="ts">
  import ShDataListOption from './DataListOption.svelte';
  const { options = [], children, ...otherProps }: DataListProps = $props();
</script>

<!-- 数据列表容器 -->
<datalist {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染预设选项列表 -->
    {#each options as option}
      <ShDataListOption {...option} />
    {/each}
  {/if}
</datalist>
