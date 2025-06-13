<!--
@component
ShBreadcrumbItem 面包屑项组件

一个功能丰富的面包屑项组件，支持图标展示、链接跳转、状态控制等功能。
基于原生 HTML li 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持图标和文本组合显示
- 提供链接跳转功能，支持内部和外部链接
- 支持禁用状态和当前页面状态
- 支持自定义图标渲染函数
- 内置点击事件处理和回调机制
- 支持自定义链接属性配置
- 继承所有原生 li 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShBreadcrumbItem } from '@istock-shell/shell-ui';

  function handleClick(item) {
    console.log('面包屑项点击:', item.text);
  }
</script>

<p>基础面包屑项</p>
<ShBreadcrumbItem
  text="首页"
  href="/"
  iconName="home"
  onItemClick={handleClick}
/>

<p>带图标的面包屑项</p>
<ShBreadcrumbItem
  text="文档"
  href="/docs"
  iconName="folder"
  size="lg"
/>

<p>自定义图标渲染</p>
<ShBreadcrumbItem
  text="自定义图标"
  iconRender={() => {
    return `<svg>...</svg>`;
  }}
/>

<p>当前页面项（无链接）</p>
<ShBreadcrumbItem
  text="当前页面"
  current={true}
/>

<p>禁用状态的面包屑项</p>
<ShBreadcrumbItem
  text="禁用项"
  href="/disabled"
  disabled={true}
/>
```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  import { ShIcon } from '../../index';
  import type { BreadcrumbsSize } from './Breadcrumbs.svelte';
  import { BreadcrumbItemVariantConfig } from '../../../theme/config';

  const breadcrumbItemVariantConfig = BreadcrumbItemVariantConfig;

  /**
   * 面包屑项组件属性接口
   * 继承所有原生 li 元素的 HTML 属性，并扩展面包屑项特有的功能属性
   * @typedef {HTMLAttributes<HTMLLIElement> & BreadcrumbItemPropsExtension} BreadcrumbItemProps
   */
  export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    /** 面包屑项显示文本内容 */
    text?: string;
    /** 链接地址，用于页面跳转 */
    href?: string;
    /** 面包屑项尺寸规格，继承自父组件 */
    size?: BreadcrumbsSize;
    /** 禁用状态，阻止交互并显示禁用样式 */
    disabled?: boolean;
    /** 当前页面状态，用于标识当前所在页面 */
    current?: boolean;
    /** 内部链接元素的HTML属性配置，用于自定义链接行为 */
    linkAttr?: HTMLAnchorAttributes;
    /** 图标名称，使用ShIcon组件渲染标准图标 */
    iconName?: string;
    /** 点击事件回调函数，传递当前面包屑项数据 */
    onItemClick?: (item: BreadcrumbItemProps) => void;
    /** 自定义图标渲染函数，用于渲染复杂的自定义图标 */
    iconRender?: () => ReturnType<Snippet<[]>>;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const breadcrumbItemProps: BreadcrumbItemProps = $props();
  const {
    text, // 面包屑项显示文本
    href, // 链接地址
    size = 'md', // 面包屑项尺寸规格（默认中尺寸）
    disabled = false, // 禁用状态（默认false）
    current = false, // 当前页面状态（默认false）
    iconName, // 图标名称
    onItemClick, // 点击事件回调函数
    iconRender, // 自定义图标渲染函数
    linkAttr, // 内部链接元素属性配置
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生li元素属性
  } = $derived(breadcrumbItemProps);

  /**
   * 创建面包屑项的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const breadcrumbItemVariants = tv(breadcrumbItemVariantConfig, {});

  /**
   * 处理面包屑项点击事件
   * 检查禁用状态，阻止禁用项的点击行为，并触发回调函数
   * @param e 鼠标点击事件对象
   */
  function onBreadcrumbItemClickHandler(e: MouseEvent) {
    if (disabled) {
      e.preventDefault(); // 阻止默认行为
      return;
    }
    onItemClick?.(breadcrumbItemProps); // 触发点击回调，传递当前项数据
  }

  /**
   * 计算是否应该渲染为链接
   * 只有在有href、非禁用、非当前页面时才渲染为链接
   */
  const hasLink = $derived(Boolean(href) && !disabled && !current);
</script>

<!-- 面包屑项容器：基于原生li元素，应用样式变体，合并默认样式类和自定义类名，透传所有原生属性 -->
<li class={[tuc(breadcrumbItemVariants({ disabled, current })), className]} {...otherProps}>
  {#if children}
    <!-- 自定义内容渲染：当提供了子内容插槽时，渲染自定义内容 -->
    {@render children()}
  {:else if hasLink}
    <!-- 链接面包屑项：当有有效链接时，渲染为可点击的链接元素 -->
    {@const { onclick, class: linkClassName = '', ...otherLink } = linkAttr ?? {}}
    <a
      {href}
      onclick={(e) => {
        onclick?.(e);
        onBreadcrumbItemClickHandler(e);
      }}
      {...otherLink}
      class={[tuc('inline-flex items-center gap-2'), linkClassName]}
    >
      <!-- 渲染面包屑项内容：图标和文本 -->
      {@render renderContent()}
    </a>
  {:else if iconRender || iconName}
    <!-- 带图标的非链接面包屑项：使用span包装，保持布局一致性 -->
    <span class={tuc('inline-flex items-center gap-2')}>
      {@render renderContent()}
    </span>
  {:else}
    <!-- 纯文本面包屑项：直接渲染内容，无额外包装 -->
    {@render renderContent()}
  {/if}
</li>

<!-- 面包屑项内容渲染片段：统一处理图标和文本的渲染逻辑 -->
{#snippet renderContent()}
  {#if iconRender}
    <!-- 自定义图标渲染：使用iconRender函数渲染复杂的自定义图标 -->
    {@render iconRender()}
  {/if}
  {#if iconName}
    <!-- 标准图标渲染：使用ShIcon组件渲染预定义的命名图标 -->
    <ShIcon name={iconName} {size} />
  {/if}
  <!-- 文本内容：显示面包屑项的文本，如果没有则显示空字符串 -->
  {text ?? ''}
{/snippet}

<style></style>
