<!--
@component
下拉菜单项组件，用于渲染单个菜单项。

用法示例:
```html
<ShDropdownMenuItem
text="菜单项"
linkProps={{ href: "#", onclick: handleClick }}
/>
```
--->
<script lang="ts" module>
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

  // 菜单项属性接口
  export interface DropdownMenuItemProps extends HTMLAttributes<HTMLLIElement> {
    text?: string; // 菜单项文本
    linkProps?: HTMLAnchorAttributes; // 链接属性配置
  }
</script>

<script lang="ts">
  const { text, linkProps, ...otherProps }: DropdownMenuItemProps = $props();
</script>

<!-- 菜单项容器 -->
<li {...otherProps}>
  <!-- 菜单项链接 -->
  <a {...linkProps}>{text ?? ''}</a>
</li>

<style></style>
