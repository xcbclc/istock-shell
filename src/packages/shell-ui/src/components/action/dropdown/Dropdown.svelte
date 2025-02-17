<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { DropdownVariantConfig } from '../../../theme/config';
  import type { ButtonProps } from '../../index';
  import type { DropdownMenuItemProps } from './DropdownMenuItem.svelte';
  import type { DropdownMenuProps } from './DropdownMenu.svelte';

  const dropdownVariantConfig = DropdownVariantConfig;
  // 定义下拉菜单位置类型
  export type DropdownPlacement = keyof (typeof dropdownVariantConfig)['variants']['placement'];
  // 定义触发方式类型
  export type DropdownTrigger = keyof (typeof dropdownVariantConfig)['variants']['trigger'];

  // 触发元素属性接口
  export interface DropdownTriggerElement extends ButtonProps<'a'> {
    text?: string; // 触发器文本
  }

  // 组件属性接口
  export interface DropdownProps extends HTMLAttributes<HTMLDivElement | HTMLDetailsElement> {
    placement?: DropdownPlacement; // 菜单位置
    items?: DropdownMenuItemProps[]; // 菜单项列表
    menu?: DropdownMenuProps; // 菜单配置
    open?: boolean; // 是否展开
    trigger?: DropdownTrigger; // 触发方式
    triggerElement?: DropdownTriggerElement; // 触发元素配置
    triggerElementRender?: () => ReturnType<Snippet<[]>>; // 自定义触发元素渲染
    tag?: 'div' | 'details'; // 容器标签类型
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  import { ShButton } from '../../index';
  import ShDropdownMenu from './DropdownMenu.svelte';

  const {
    tag = 'div', // 默认使用div标签
    placement, // 菜单位置
    items = [], // 菜单项列表
    menu = {}, // 菜单配置
    open = false, // 展开状态
    trigger = 'click', // 触发方式
    triggerElement, // 触发元素配置
    triggerElementRender, // 自定义触发元素渲染函数
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: DropdownProps = $props();

  // 创建下拉菜单样式变体生成器
  const dropdownVariants = tv(dropdownVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

<!--
@component
下拉菜单组件，支持以下功能：
- 自定义触发方式（点击/悬停）
- 可配置菜单位置
- 支持自定义触发元素
- 支持完全自定义内容

用法示例:
```html
<ShDropdown items={[{ text: '选项1' }, { text: '选项2' }]} triggerElement={{ text: '点击打开' }} />
``` -->

<svelte:element
  this={tag}
  class={[
    tuc(
      dropdownVariants({
        placement,
        open,
        trigger,
      })
    ),
    className,
  ]}
  {...otherProps}
>
  {#if children}
    <!-- 渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染触发元素 -->
    {#if triggerElementRender}
      {@render triggerElementRender()}
    {:else if triggerElement}
      {@const { text = '', class: className = '', ...otherButtonProps } = triggerElement}
      <ShButton class={[tuc('m-1'), className]} {...otherButtonProps} tabindex={0}>{text}</ShButton>
    {/if}
    <!-- 渲染下拉菜单 -->
    <ShDropdownMenu {...menu} {items} tabindex={0} />
  {/if}
</svelte:element>

<style>
</style>
