<!--
@component
ShNavListItem 导航列表项组件

一个功能丰富的导航列表项组件，用于组织导航项分组。
基于原生 HTML dl 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持配置分组标题
- 管理导航项详情列表
- 支持自定义布局和内容
- 继承所有原生 dl 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShNavListItem } from '@istock-shell/ui';

  const productItems = [
    { text: '功能', href: '/features' },
    { text: '定价', href: '/pricing' },
    { text: '演示', href: '/demo' }
  ];
</script>

<p>基础导航分组</p>
<ShNavListItem
  title="产品"
  items={productItems}
/>

<p>自定义内容导航分组</p>
<ShNavListItem>
  <dt>自定义标题</dt>
  <dd>自定义内容项</dd>
  <dd>另一个自定义项</dd>
</ShNavListItem>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import ShNavListItemDetail, { type NavListItemDetailProps } from './NavListItemDetail.svelte';

  /**
   * 导航列表项组件属性接口
   * 继承所有原生 dl 元素的 HTML 属性，并扩展导航项特有的功能属性
   * @typedef {HTMLAttributes<HTMLDListElement> & NavListItemPropsExtension} NavListItemProps
   */
  export interface NavListItemProps extends HTMLAttributes<HTMLDListElement> {
    /** 分组标题，显示在导航项详情列表上方 */
    title?: string;
    /** 导航项详情列表，用于渲染该分组下的具体导航项 */
    items?: NavListItemDetailProps[];
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const {
    title, // 分组标题文本
    items = [], // 导航项详情列表（默认空数组）
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽
    ...otherProps // 其他原生dl元素属性
  }: NavListItemProps = $props();
</script>

<!-- 导航项容器 -->
<dl class={[tuc('flex flex-col gap-2 pt-2 pb-2'), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染分组标题 -->
    {#if title}
      <dt class={tuc('text-secondary font-semibold')}>
        <h3>{title}</h3>
      </dt>
    {/if}
    <!-- 渲染导航项详情 -->
    <div class={tuc('flex flex-wrap gap-x-4')}>
      {#each items as item}
        <ShNavListItemDetail {...item} />
      {/each}
    </div>
  {/if}
</dl>

<style></style>
