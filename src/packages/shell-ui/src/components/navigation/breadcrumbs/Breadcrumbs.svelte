<!--
@component
ShBreadcrumbs 面包屑导航组件

一个功能完整的面包屑导航组件，帮助用户了解当前页面在网站层次结构中的位置。
基于原生 HTML div 和 ul 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持数据驱动的面包屑项渲染
- 提供多种尺寸规格（sm, md, lg 等）
- 支持最大宽度限制，适应不同布局需求
- 支持图标和文本组合显示
- 支持自定义面包屑项内容插槽
- 内置点击事件处理和回调机制
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShBreadcrumbs } from '@istock-shell/shell-ui';

  const breadcrumbItems = [
    { text: '首页', href: '/' },
    { text: '文档', href: '/docs' },
    { text: '添加文档' }
  ];

  function handleItemClick(item, index) {
    console.log('点击了面包屑项:', item.text, '索引:', index);
  }
</script>

<p>基础面包屑导航</p>
<ShBreadcrumbs items={breadcrumbItems} />

<p>带点击事件的面包屑</p>
<ShBreadcrumbs
  items={breadcrumbItems}
  onItemClick={handleItemClick}
/>

<p>带图标的面包屑</p>
<ShBreadcrumbs>
  <ShBreadcrumbItem href="/" iconName="home">首页</ShBreadcrumbItem>
  <ShBreadcrumbItem href="/docs" iconName="folder">文档</ShBreadcrumbItem>
  <ShBreadcrumbItem iconName="plus">添加文档</ShBreadcrumbItem>
</ShBreadcrumbs>

<p>限制最大宽度的面包屑</p>
<ShBreadcrumbs
  items={breadcrumbItems}
  size="lg"
  maxWidth="xs"
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { BreadcrumbsVariantConfig } from '../../../theme/config';
  import ShBreadcrumbItem, { type BreadcrumbItemProps } from './BreadcrumbItem.svelte';

  const breadcrumbsVariantConfig = BreadcrumbsVariantConfig;

  /**
   * 面包屑尺寸类型（从主题配置中动态提取）
   * @typedef {keyof BreadcrumbsVariantConfig['variants']['size']} BreadcrumbsSize
   */
  export type BreadcrumbsSize = keyof (typeof breadcrumbsVariantConfig)['variants']['size'];

  /**
   * 面包屑最大宽度类型（从主题配置中动态提取）
   * @typedef {keyof BreadcrumbsVariantConfig['variants']['maxWidth']} BreadcrumbsMaxWidth
   */
  export type BreadcrumbsMaxWidth = keyof (typeof breadcrumbsVariantConfig)['variants']['maxWidth'];

  /**
   * 面包屑组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展面包屑特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & BreadcrumbsPropsExtension} BreadcrumbsProps
   */
  export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
    /** 面包屑项列表，用于数据驱动渲染面包屑导航 */
    items?: BreadcrumbItemProps[];
    /** 面包屑尺寸规格，支持多种预设尺寸 */
    size?: BreadcrumbsSize;
    /** 最大宽度限制，用于响应式布局控制 */
    maxWidth?: BreadcrumbsMaxWidth;
    /** 面包屑项点击回调函数，传递被点击的项和索引 */
    onItemClick?: (item: BreadcrumbItemProps, index: number) => void;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    items = [], // 面包屑项列表数组（默认空数组）
    size = 'md', // 面包屑尺寸规格（默认中尺寸）
    maxWidth, // 最大宽度限制（可选）
    onItemClick, // 面包屑项点击回调函数
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生div元素属性
  }: BreadcrumbsProps = $props();

  /**
   * 创建面包屑的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const breadcrumbsVariants = tv(breadcrumbsVariantConfig, {});

  /**
   * 处理面包屑项点击事件
   * 将点击事件传递给外部回调函数，提供项数据和索引信息
   * @param item 被点击的面包屑项数据
   * @param index 面包屑项在列表中的索引位置
   */
  function handleItemClick(item: BreadcrumbItemProps, index: number) {
    onItemClick?.(item, index);
  }
</script>

<!-- 面包屑导航容器：基于原生div元素，合并默认样式类和自定义类名，透传所有原生属性 -->
<div class={[tuc(breadcrumbsVariants({ size, maxWidth })), className]} {...otherProps}>
  {#if children}
    <!-- 自定义内容渲染：当提供了子内容插槽时，渲染自定义面包屑项 -->
    <ul>
      <!-- 渲染通过插槽传入的自定义内容 -->
      {@render children()}
    </ul>
  {:else if items.length > 0}
    <!-- 数据驱动渲染：遍历面包屑项数组，为每个项创建面包屑项组件 -->
    <ul>
      <!-- 渲染通过items属性传入的面包屑项 -->
      {#each items as item, index}
        <!-- 面包屑项组件：传递尺寸、项数据和点击事件处理函数 -->
        <ShBreadcrumbItem {size} {...item} onItemClick={(clickedItem) => handleItemClick(clickedItem, index)} />
      {/each}
    </ul>
  {/if}
</div>

<style></style>
