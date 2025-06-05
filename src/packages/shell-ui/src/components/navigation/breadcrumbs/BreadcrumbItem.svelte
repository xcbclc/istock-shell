<!--
@component
面包屑项组件 - 单个面包屑项的完整实现
支持图标、文本、链接、自定义渲染等功能

@example
基础面包屑项：
```svelte
<script>
  import { ShBreadcrumbItem } from '@istock-shell/shell-ui';

  function handleClick(item) {
    console.log('面包屑项点击:', item);
  }
</script>

<ShBreadcrumbItem
  text="首页"
  href="/"
  iconName="home"
  onItemClick={handleClick}
/>
```

带图标的面包屑项：
```svelte
<ShBreadcrumbItem
  text="文档"
  href="/docs"
  iconName="folder"
/>
```

自定义图标渲染：
```svelte
<ShBreadcrumbItem
  text="自定义图标"
  iconRender={() => {
    return `<svg>...</svg>`;
  }}
/>
```

当前页面项（无链接）：
```svelte
<ShBreadcrumbItem text="当前页面" />
```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  import { ShIcon } from '../../index';
  import type { BreadcrumbsSize } from './Breadcrumbs.svelte';
  import { BreadcrumbItemVariantConfig } from '../../../theme/config';

  const breadcrumbItemVariantConfig = BreadcrumbItemVariantConfig;

  // 面包屑项属性接口
  export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    text?: string; // 面包屑项显示文本
    href?: string; // 链接地址
    size?: BreadcrumbsSize;
    disabled?: boolean; // 是否禁用状态
    current?: boolean; // 是否为当前页面
    linkAttr?: HTMLAnchorAttributes; // 内部链接元素的HTML属性配置
    iconName?: string; // 图标名称（使用ShIcon组件）
    onItemClick?: (item: BreadcrumbItemProps) => void; // 点击事件回调
    iconRender?: () => ReturnType<Snippet<[]>>; // 自定义图标渲染函数
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const breadcrumbItemProps: BreadcrumbItemProps = $props();
  const {
    text, // 面包屑项显示文本
    href, // 链接地址
    size = 'md',
    disabled = false, // 是否禁用，默认false
    current = false, // 是否为当前页面，默认false
    iconName, // 图标名称
    onItemClick, // 点击事件回调
    iconRender, // 自定义图标渲染函数
    linkAttr, // 内部链接元素属性配置
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他HTML原生属性
  } = $derived(breadcrumbItemProps);

  const breadcrumbItemVariants = tv(breadcrumbItemVariantConfig, {});

  /**
   * 处理面包屑项点击事件
   * @param e 点击事件对象
   */
  function onBreadcrumbItemClickHandler(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onItemClick?.(breadcrumbItemProps);
  }

  // 判断是否有链接
  const hasLink = $derived(Boolean(href) && !disabled && !current);
</script>

<!-- 面包屑项容器 -->
<li class={[tuc(breadcrumbItemVariants({ disabled, current })), className]} {...otherProps}>
  {#if children}
    <!-- 渲染子内容插槽 -->
    {@render children()}
  {:else if hasLink}
    <!-- 有链接的面包屑项 -->
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
      {@render renderContent()}
    </a>
  {:else if iconRender || iconName}
    <span class={tuc('inline-flex items-center gap-2')}>
      {@render renderContent()}
    </span>
  {:else}
    {@render renderContent()}
  {/if}
</li>

<!-- 面包屑项内容渲染片段 -->
{#snippet renderContent()}
  {#if iconRender}
    <!-- 渲染自定义图标 -->
    {@render iconRender()}
  {/if}
  {#if iconName}
    <!-- 渲染标准图标组件 -->
    <ShIcon name={iconName} {size} />
  {/if}
  {text ?? ''}
{/snippet}

<style></style>
