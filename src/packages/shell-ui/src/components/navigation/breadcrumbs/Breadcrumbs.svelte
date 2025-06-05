<!--
@component
面包屑导航组件 - 帮助用户了解当前页面在网站层次结构中的位置
支持图标、链接、自定义分隔符、最大宽度限制等功能

@example
基础用法：
```svelte
<script>
  import { ShBreadcrumbs } from '@istock-shell/shell-ui';

  const breadcrumbItems = [
    { text: '首页', href: '/' },
    { text: '文档', href: '/docs' },
    { text: '添加文档' }
  ];
</script>

<ShBreadcrumbs items={breadcrumbItems} />
```

带图标的面包屑：
```svelte
<ShBreadcrumbs>
  <ShBreadcrumbItem href="/" iconName="home">首页</ShBreadcrumbItem>
  <ShBreadcrumbItem href="/docs" iconName="folder">文档</ShBreadcrumbItem>
  <ShBreadcrumbItem iconName="plus">添加文档</ShBreadcrumbItem>
</ShBreadcrumbs>
```

限制最大宽度：
```svelte
<ShBreadcrumbs items={breadcrumbItems} maxWidth="xs" />
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { BreadcrumbsVariantConfig } from '../../../theme/config';
  import ShBreadcrumbItem, { type BreadcrumbItemProps } from './BreadcrumbItem.svelte';

  const breadcrumbsVariantConfig = BreadcrumbsVariantConfig;
  // 面包屑尺寸类型定义
  export type BreadcrumbsSize = keyof (typeof breadcrumbsVariantConfig)['variants']['size'];
  // 面包屑最大宽度类型定义
  export type BreadcrumbsMaxWidth = keyof (typeof breadcrumbsVariantConfig)['variants']['maxWidth'];

  // 面包屑组件属性接口
  export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
    items?: BreadcrumbItemProps[]; // 面包屑项列表
    size?: BreadcrumbsSize; // 面包屑尺寸（sm/md/lg等）
    maxWidth?: BreadcrumbsMaxWidth; // 最大宽度限制
    onItemClick?: (item: BreadcrumbItemProps, index: number) => void; // 面包屑项点击回调函数
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    items = [], // 面包屑项列表，默认为空数组
    size = 'md', // 面包屑尺寸，默认中尺寸
    maxWidth, // 最大宽度限制
    onItemClick, // 面包屑项点击回调函数
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他HTML原生属性
  }: BreadcrumbsProps = $props();

  const breadcrumbsVariants = tv(breadcrumbsVariantConfig, {});

  /**
   * 处理面包屑项点击事件
   * @param item 被点击的面包屑项
   * @param index 面包屑项索引
   */
  function handleItemClick(item: BreadcrumbItemProps, index: number) {
    onItemClick?.(item, index);
  }
</script>

<!-- 面包屑容器 -->
<div class={[tuc(breadcrumbsVariants({ size, maxWidth })), className]} {...otherProps}>
  {#if children}
    <ul>
      <!-- 渲染通过插槽传入的自定义内容 -->
      {@render children()}
    </ul>
  {:else if items.length > 0}
    <ul>
      <!-- 渲染通过items属性传入的面包屑项 -->
      {#each items as item, index}
        <ShBreadcrumbItem {size} {...item} onItemClick={(clickedItem) => handleItemClick(clickedItem, index)} />
      {/each}
    </ul>
  {/if}
</div>

<style></style>
