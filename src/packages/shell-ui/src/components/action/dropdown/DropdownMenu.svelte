<!--
@component
ShDropdownMenu 下拉菜单内容组件

用于渲染下拉菜单的内容区域，支持菜单项列表和自定义内容。
基于无序列表（ul）元素构建，提供标准的菜单样式和交互。

 功能特性：
- 渲染菜单项列表，支持文本和链接属性
- 支持完全自定义菜单内容
- 内置标准菜单样式（背景、圆角、阴影等）
- 支持所有原生 ul 元素的属性和事件
- 自动处理菜单项的渲染和布局

示例用法：
```svelte
<p>基础菜单项列表</p>
<ShDropdownMenu
  items={[
    { text: "菜单项1" },
    { text: "菜单项2", linkAttrs: { href: "/page2" } }
  ]}
/>

<p>带自定义样式的菜单</p>
<ShDropdownMenu
  class="w-64 bg-white"
  items={menuItems}
/>

<p>完全自定义内容的菜单</p>
<ShDropdownMenu>
  <li><a href="/profile">个人资料</a></li>
  <li><a href="/settings">设置</a></li>
  <li class="divider"></li>
  <li><a href="/logout">退出登录</a></li>
</ShDropdownMenu>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { DropdownMenuItemProps } from './DropdownMenuItem.svelte';

  /**
   * 下拉菜单内容组件的属性接口
   * 继承所有原生 ul 元素的 HTML 属性
   */
  export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
    /**
     * 菜单项列表
     * 每个菜单项包含文本、链接属性等配置
     * @default []
     */
    items?: DropdownMenuItemProps[];
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  // 导入菜单项组件
  import ShDropdownMenuItem from './DropdownMenuItem.svelte';

  const {
    items = [], // 菜单项列表
    children, // 自定义子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他HTML属性
  }: DropdownMenuProps = $props();
</script>

<!--
  下拉菜单容器
  使用 ul 元素作为菜单容器，提供标准的菜单样式
  包含背景色、圆角、阴影和固定宽度等默认样式
-->
<ul
  class={[tuc('dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'), className]}
  {...otherProps}
>
  {#if children}
    <!--
      自定义菜单内容渲染
      当提供子内容时，完全由用户控制菜单的结构
      适用于需要复杂菜单布局或特殊交互的场景
    -->
    {@render children()}
  {:else}
    <!-- 渲染菜单项列表 -->
    {#each items as item}
      <ShDropdownMenuItem {...item} />
    {/each}
  {/if}
</ul>

<style></style>
