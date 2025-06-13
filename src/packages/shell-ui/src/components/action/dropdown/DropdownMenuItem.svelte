<!--
@component
ShDropdownMenuItem 下拉菜单项组件

用于渲染下拉菜单中的单个菜单项，支持文本显示和链接跳转。
基于列表项（li）元素构建，内部可包含链接（a）或纯文本。

功能特性：
- 渲染菜单项文本内容
- 支持链接跳转功能（通过 linkAttrs 配置）
- 自动处理链接和纯文本的渲染逻辑
- 内置标准菜单项样式和交互效果
- 支持所有原生 li 和 a 元素的属性和事件

示例用法：
```svelte
<p>纯文本菜单项</p>
<ShDropdownMenuItem text="菜单项" />

<p>链接菜单项</p>
<ShDropdownMenuItem
  text="个人资料"
  linkAttrs={{ href: "/profile" }}
/>

<p>带自定义样式的菜单项</p>
<ShDropdownMenuItem
  text="设置"
  class="text-blue-600"
  linkAttrs={{
    href: "/settings",
    class: "hover:bg-blue-50"
  }}
/>

<p>外部链接菜单项</p>
<ShDropdownMenuItem
  text="帮助文档"
  linkAttrs={{
    href: "https://docs.example.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }}
/>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

  /**
   * 下拉菜单项组件的属性接口
   * 继承所有原生 li 元素的 HTML 属性
   */
  export interface DropdownMenuItemProps extends HTMLAttributes<HTMLLIElement> {
    /**
     * 菜单项显示的文本内容
     * 支持纯文本，不支持 HTML 标签
     * @default ''
     */
    text?: string;

    /**
     * 链接属性配置
     * 当提供时，菜单项将渲染为可点击的链接
     * 支持所有原生 a 元素的属性（href, target, rel 等）
     * 未提供时，菜单项将渲染为纯文本
     */
    linkAttrs?: HTMLAnchorAttributes;
  }
</script>

<script lang="ts">
  const {
    text = '', // 菜单项显示文本
    linkAttrs, // 链接属性配置
    children, // 自定义子内容插槽
    ...otherProps // 其他HTML属性
  }: DropdownMenuItemProps = $props();
</script>

<!--
  菜单项容器
  使用 li 元素作为菜单项容器，支持所有原生 li 属性
-->
<li {...otherProps}>
  {#if children}
    <!-- 自定义子内容插槽 -->
    {@render children()}
  {:else if linkAttrs}
    <!-- 链接菜单项 -->
    <a {...linkAttrs}>{text}</a>
  {:else}
    <span>{text}</span>
  {/if}
</li>

<style></style>
