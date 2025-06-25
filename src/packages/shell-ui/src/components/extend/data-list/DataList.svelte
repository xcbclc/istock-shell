<!--
@component
ShDataList 数据列表组件

一个功能丰富的数据列表组件，用于为 input 元素提供预设选项列表。
基于原生 HTML datalist 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持预设选项列表的配置和展示
- 提供自定义选项内容插槽
- 与 input 元素无缝配合使用
- 支持动态选项数据绑定
- 继承所有原生 datalist 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShDataList, ShDataListOption } from '@istock-shell/ui';

  const browserOptions = [
    { label: 'Google Chrome', value: 'chrome' },
    { label: 'Mozilla Firefox', value: 'firefox' },
    { label: 'Microsoft Edge', value: 'edge' },
    { label: 'Safari', value: 'safari' }
  ];

  let selectedBrowser = '';
</script>

<p>基础数据列表</p>
<input list="browsers" bind:value={selectedBrowser} placeholder="选择浏览器" />
<ShDataList id="browsers" options={browserOptions} />

<p>自定义选项内容的数据列表</p>
<input list="custom-list" placeholder="选择自定义选项" />
<ShDataList id="custom-list">
  <ShDataListOption value="option1">选项1 - 自定义内容</ShDataListOption>
  <ShDataListOption value="option2">选项2 - 自定义内容</ShDataListOption>
  <ShDataListOption value="option3">选项3 - 自定义内容</ShDataListOption>
</ShDataList>

<p>混合使用预设和自定义选项</p>
<input list="mixed-list" placeholder="选择混合选项" />
<ShDataList id="mixed-list" options={browserOptions}>
  <ShDataListOption value="other">其他浏览器</ShDataListOption>
</ShDataList>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DataListOptionProps } from './DataListOption.svelte';

  /**
   * 数据列表组件属性接口
   * 继承所有原生 datalist 元素的 HTML 属性，并扩展数据列表特有的功能属性
   * @typedef {HTMLAttributes<HTMLDataListElement> & DataListPropsExtension} DataListProps
   */
  export interface DataListProps extends HTMLAttributes<HTMLDataListElement> {
    /** 预设选项配置列表，用于快速生成标准选项 */
    options?: DataListOptionProps[];
  }
</script>

<script lang="ts">
  import ShDataListOption from './DataListOption.svelte';

  const {
    options = [], // 预设选项配置列表，默认为空数组
    children, // 子内容插槽，用于自定义选项内容
    ...otherProps // 其他原生datalist元素属性
  }: DataListProps = $props();
</script>

<!-- 数据列表主容器：基于原生datalist元素，透传所有原生属性 -->
<datalist {...otherProps}>
  {#if children}
    <!-- 自定义内容渲染：优先渲染通过插槽传入的自定义选项内容 -->
    {@render children()}
  {:else}
    <!-- 预设选项渲染：遍历options数组，为每个选项配置创建选项组件 -->
    {#each options as option}
      <ShDataListOption {...option} />
    {/each}
  {/if}
</datalist>
