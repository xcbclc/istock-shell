<!--
@component
ShDropdown 下拉菜单组件

一个功能丰富的下拉菜单组件，支持多种触发方式和自定义配置。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持点击和悬停两种触发方式
- 可配置菜单显示位置（上下左右等多个方向）
- 支持自定义触发元素或使用默认按钮
- 支持完全自定义内容渲染
- 可使用 div 或 details 标签作为容器
- 内置菜单项列表渲染

示例用法：
```svelte
<p>基础下拉菜单</p>
<ShDropdown
  items={[{ text: '选项1' }, { text: '选项2' }]}
  triggerElement={{ text: '点击打开' }}
/>

<p>悬停触发的下拉菜单</p>
<ShDropdown
  trigger="hover"
  placement="bottom-end"
  items={menuItems}
  triggerElement={{ text: '悬停显示', color: 'primary' }}
/>

<p>使用 details 标签的下拉菜单</p>
<ShDropdown
  tag="details"
  open={isOpen}
  items={menuItems}
/>

<p>完全自定义内容的下拉菜单</p>
<ShDropdown>
  {#snippet triggerElementRender()}
    <button class="custom-trigger">自定义触发器</button>
  {/snippet}
  <div class="custom-menu">自定义菜单内容</div>
</ShDropdown>
```
-->
<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { DropdownVariantConfig } from '../../../theme/config';
  import type { ButtonProps } from '../../index';
  import type { DropdownMenuItemProps } from './DropdownMenuItem.svelte';
  import type { DropdownMenuProps } from './DropdownMenu.svelte';

  const dropdownVariantConfig = DropdownVariantConfig;

  /**
   * 下拉菜单位置类型（从主题配置中动态提取）
   * 支持多个方向的菜单定位
   * @typedef {keyof DropdownVariantConfig['variants']['placement']} DropdownPlacement
   */
  export type DropdownPlacement = keyof (typeof dropdownVariantConfig)['variants']['placement'];

  /**
   * 触发方式类型（从主题配置中动态提取）
   * 支持点击和悬停两种触发模式
   * @typedef {keyof DropdownVariantConfig['variants']['trigger']} DropdownTrigger
   */
  export type DropdownTrigger = keyof (typeof dropdownVariantConfig)['variants']['trigger'];

  /**
   * 触发元素属性接口
   * 继承按钮组件的所有属性，用于配置触发器样式和行为
   */
  export interface DropdownTriggerElement extends ButtonProps<'a'> {
    /** 触发器显示文本 */
    text?: string;
  }

  /**
   * 下拉菜单组件属性接口
   * 继承 div 或 details 标签的所有原生属性，并扩展下拉菜单特有功能
   */
  export interface DropdownProps extends HTMLAttributes<HTMLDivElement | HTMLDetailsElement> {
    /** 菜单显示位置，支持多个方向定位 */
    placement?: DropdownPlacement;
    /** 菜单项列表，用于快速创建标准菜单 */
    items?: DropdownMenuItemProps[];
    /** 菜单容器的额外配置属性 */
    menu?: DropdownMenuProps;
    /** 菜单展开状态，用于控制显示/隐藏 @default false */
    open?: boolean;
    /** 触发方式，支持点击或悬停 @default 'click' */
    trigger?: DropdownTrigger;
    /** 触发元素配置，用于自定义触发器样式 */
    triggerElement?: DropdownTriggerElement;
    /** 自定义触发元素渲染函数，提供完全自定义的触发器 */
    triggerElementRender?: () => ReturnType<Snippet<[]>>;
    /** 容器标签类型，支持 div 和 details @default 'div' */
    tag?: 'div' | 'details';
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShButton } from '../../index';
  import ShDropdownMenu from './DropdownMenu.svelte';

  const {
    tag = 'div', // 容器标签类型
    placement, // 菜单显示位置
    items = [], // 菜单项列表
    menu, // 菜单配置
    open = false, // 展开状态
    trigger = 'click', // 触发方式
    triggerElement, // 触发元素配置
    triggerElementRender, // 自定义触发元素渲染函数
    class: className = '', // 自定义CSS类名
    children, // 子内容插槽
    ...otherProps // 其他HTML属性
  }: DropdownProps = $props();

  /**
   * 创建下拉菜单的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const dropdownVariants = tv(dropdownVariantConfig, {});
</script>

<!--
  动态容器元素
  使用 svelte:element 根据 tag 属性动态渲染 div 或 details 标签
  支持完整的样式变体和响应式布局
-->
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
    <!--
      自定义内容渲染
      当提供子内容时，完全由用户控制下拉菜单的结构和样式
      适用于需要复杂布局或特殊交互的场景
    -->
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
