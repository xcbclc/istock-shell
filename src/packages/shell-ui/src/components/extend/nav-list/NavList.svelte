<!--
@component
导航列表组件，用于创建结构化导航菜单。支持以下功能：
- 配置导航项列表
- 支持完全自定义内容
- 自动渲染子项

用法示例:
```html

<ShNavList
  list={[
    { title: '产品', items: [{ text: '功能' }, { text: '定价' }] },
    { title: '支持', items: [{ text: '文档' }, { text: '联系我们' }] }
  ]}
/>

<ShNavList>
  <ShNavListItem title="自定义">
    <ShNavListItemDetail text="自定义项" />
  </ShNavListItem>
</ShNavList>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import ShNavListItem, { type NavListItemProps } from './NavListItem.svelte';

  // 导航列表属性接口
  export interface NavListProps extends HTMLAttributes<HTMLDivElement> {
    list?: NavListItemProps[]; // 导航项列表配置
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  // 解构props并设置默认值
  const {
    list = [], // 导航项列表
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: NavListProps = $props();
</script>

<!-- 导航列表容器 -->
<div class={[tuc('nav-list'), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染导航项列表 -->
    {#each list as item}
      <ShNavListItem {...item} />
    {/each}
  {/if}
</div>

<style></style>
