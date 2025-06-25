<!--
@component
ShNavList 导航列表组件

一个功能丰富的导航列表组件，用于创建结构化导航菜单。
基于原生 HTML div 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持数据驱动的导航项列表渲染
- 提供完全自定义内容插槽
- 自动渲染导航项分组和详情
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShNavList } from '@istock-shell/ui';

  const navData = [
    { 
      title: '产品', 
      items: [
        { text: '功能', href: '/features' },
        { text: '定价', href: '/pricing' }
      ]
    },
    { 
      title: '支持', 
      items: [
        { text: '文档', href: '/docs' },
        { text: '联系我们', href: '/contact' }
      ]
    }
  ];
</script>

<p>基础导航列表</p>
<ShNavList list={navData} />

<p>自定义内容导航列表</p>
<ShNavList>
  <ShNavListItem title="自定义分组">
    <ShNavListItemDetail text="自定义项" href="/custom" />
  </ShNavListItem>
</ShNavList>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import ShNavListItem, { type NavListItemProps } from './NavListItem.svelte';

  /**
   * 导航列表组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展导航列表特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & NavListPropsExtension} NavListProps
   */
  export interface NavListProps extends HTMLAttributes<HTMLDivElement> {
    /** 导航项列表配置，用于数据驱动渲染导航分组 */
    list?: NavListItemProps[];
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const {
    list = [], // 导航项列表数据（默认空数组）
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽
    ...otherProps // 其他原生div元素属性
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
