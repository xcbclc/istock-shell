<!--
@component
导航项详情组件，用于渲染单个导航项。支持以下功能：
- 配置链接属性
- 支持自定义文本内容
- 继承原生链接属性

用法示例:
```html
<ShNavListItemDetail
  text="文档"
  href="/docs"
  target="_blank"
/>

<ShNavListItemDetail>
  <a href="/custom">自定义项</a>
</ShNavListItemDetail>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextProps, TextTarget } from '../../index';

  export type NavListItemDetailLink = Omit<TextProps, 'tag'>;
  // 导航项详情属性接口
  export interface NavListItemDetailProps extends HTMLAttributes<HTMLElement> {
    link?: NavListItemDetailLink; // 链接配置
    text?: string; // 显示文本
    target?: TextTarget; // 链接打开方式
    href?: string; // 链接地址
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { ShText } from '../../index';

  const {
    link = {}, // 链接配置
    text, // 显示文本
    target = '_blank', // 默认新窗口打开
    href, // 链接地址
    children, // 子内容
    ...otherProps // 其他原生属性
  }: NavListItemDetailProps = $props();
</script>

<!-- 导航项详情容器 -->
<dd {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 解构链接样式配置 -->
    {@const { class: className = '', ...otherLink } = link}
    <!-- 渲染文本链接 -->
    <ShText
      size="sm"
      color="secondary"
      texts={[{ text, target, href }]}
      {...otherLink}
      class={['hover:' + tuc('text-primary'), className]}
      tag="a"
    />
  {/if}
</dd>

<style></style>
