<!--
@component
ShNavListItemDetail 导航项详情组件

一个功能丰富的导航项详情组件，用于渲染单个导航项。
基于原生 HTML dd 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持配置链接属性和样式
- 支持自定义文本内容和链接行为
- 提供灵活的链接配置选项
- 继承所有原生 dd 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShNavListItemDetail } from '@istock-shell/ui';

  const linkConfig = {
    class: 'custom-link-style',
    color: 'primary'
  };
</script>

<p>基础导航项</p>
<ShNavListItemDetail
  text="文档"
  href="/docs"
  target="_blank"
/>

<p>带自定义链接配置的导航项</p>
<ShNavListItemDetail
  text="API 参考"
  href="/api"
  link={linkConfig}
/>

<p>自定义内容导航项</p>
<ShNavListItemDetail>
  <a href="/custom" class="custom-style">自定义链接</a>
</ShNavListItemDetail>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextProps, TextTarget } from '../../index';

  /**
   * 导航项详情链接配置类型
   * 继承 Text 组件的属性，但排除 tag 属性（因为固定为 a 标签）
   * @typedef {Omit<TextProps, 'tag'>} NavListItemDetailLink
   */
  export type NavListItemDetailLink = Omit<TextProps, 'tag'>;

  /**
   * 导航项详情组件属性接口
   * 继承所有原生 dd 元素的 HTML 属性，并扩展导航项详情特有的功能属性
   * @typedef {HTMLAttributes<HTMLElement> & NavListItemDetailPropsExtension} NavListItemDetailProps
   */
  export interface NavListItemDetailProps extends HTMLAttributes<HTMLElement> {
    /** 链接配置对象，用于自定义链接的样式和行为 */
    link?: NavListItemDetailLink;
    /** 显示文本内容 */
    text?: string;
    /** 链接打开方式，如 _blank、_self 等 */
    target?: TextTarget;
    /** 链接地址 URL */
    href?: string;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { ShText } from '../../index';

  const {
    link = {}, // 链接配置对象（默认空对象）
    text, // 显示文本内容
    target = '_blank', // 链接打开方式（默认新窗口打开）
    href, // 链接地址URL
    children, // 子内容插槽
    ...otherProps // 其他原生dd元素属性
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
