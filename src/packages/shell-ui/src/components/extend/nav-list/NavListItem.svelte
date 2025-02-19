<!--
@component
导航列表项组件，用于组织导航项分组。支持以下功能：
- 配置分组标题
- 管理导航项详情
- 支持自定义布局

用法示例:
```html
<ShNavListItem
  title="产品"
  items={[
    { text: '功能' },
    { text: '定价' }
  ]}
/>

<ShNavListItem>
  <dt>自定义标题</dt>
  <dd>自定义内容</dd>
</ShNavListItem>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import ShNavListItemDetail, { type NavListItemDetailProps } from './NavListItemDetail.svelte';

  // 导航项属性接口
  export interface NavListItemProps extends HTMLAttributes<HTMLDListElement> {
    title?: string; // 分组标题
    items?: NavListItemDetailProps[]; // 导航项详情列表
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';

  const {
    title, // 分组标题
    items = [], // 导航项列表
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: NavListItemProps = $props();
</script>

<!-- 导航项容器 -->
<dl class={[tuc('flex flex-wrap gap-2 pt-1.5 pb-1.5'), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染分组标题 -->
    {#if title}
      <dt class={tuc('w-full text-secondary font-semibold')}>
        <h3>{title}</h3>
      </dt>
    {/if}
    <!-- 渲染导航项详情 -->
    {#each items as item}
      <ShNavListItemDetail {...item} />
    {/each}
  {/if}
</dl>

<style></style>
