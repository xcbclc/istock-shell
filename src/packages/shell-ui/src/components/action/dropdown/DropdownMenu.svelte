<!--
@component
下拉菜单内容组件，用于渲染菜单列表。

用法示例:
```html
<ShDropdownMenu
  items={[
    { text: "菜单项1" },
    { text: "菜单项2" }
  ]}
/>
```
--->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import ShDropdownMenuItem, { type DropdownMenuItemProps } from './DropdownMenuItem.svelte';

  // 菜单属性接口
  export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
    items?: DropdownMenuItemProps[]; // 菜单项列表
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const { items = [], class: className = '', children, ...otherProps }: DropdownMenuProps = $props();
</script>

<ul class={[tuc('dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'), className]} {...otherProps}>
  {#if children}
    <!-- 渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染菜单项列表 -->
    {#each items as item}
      <ShDropdownMenuItem {...item} />
    {/each}
  {/if}
</ul>

<style></style>
