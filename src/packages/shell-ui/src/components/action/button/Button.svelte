<!--
@component
ShButton 按钮组件

一个功能丰富的按钮组件，支持多种样式变体、状态和交互效果。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种颜色主题（primary, secondary, success, warning, error 等）
- 提供多种尺寸规格（xs, sm, md, lg, xl）
- 支持多种样式变体（outline, soft, ghost, link, dash）
- 内置加载状态和禁用状态
- 支持自定义 HTML 标签（button, a, input, div）
- 支持图标和文本组合
- 完整的响应式设计支持
- TypeScript 类型安全

示例用法：
```svelte
<p>基础按钮</p>
<ShButton>点击我</ShButton>

<p>主要按钮</p>
<ShButton color="primary" size="lg">
  主要按钮
</ShButton>

<p>轮廓次要按钮</p>
<ShButton
  variant="outline"
  color="secondary"
  disabled={isLoading}
  onclick={handleClick}
>
  次要按钮
</ShButton>

<p>链接形式的按钮</p>
<ShButton tag="a" href="/home">
  链接按钮
</ShButton>
```
-->
<script lang="ts" module>
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { ButtonVariantConfig } from '../../../theme/config';

  const buttonVariantConfig = ButtonVariantConfig;

  /**
   * 按钮支持的HTML标签类型
   * @typedef {'a' | 'button' | 'input' | 'div'} ButtonTag
   */
  export type ButtonTag = 'a' | 'button' | 'input' | 'div';

  /**
   * 按钮颜色类型（从主题配置中动态提取）
   * @typedef {keyof ButtonVariantConfig['variants']['color']} ButtonColor
   */
  export type ButtonColor = keyof (typeof buttonVariantConfig)['variants']['color'];

  /**
   * 按钮尺寸类型（从主题配置中动态提取）
   * @typedef {keyof ButtonVariantConfig['variants']['size']} ButtonSize
   */
  export type ButtonSize = keyof (typeof buttonVariantConfig)['variants']['size'];

  /**
   * 按钮组件属性类型定义
   * 继承指定HTML标签的所有原生属性，并扩展按钮特有的样式和行为属性
   *
   * @template Tag - HTML标签类型，限制为ButtonTag中的值
   * @typedef {SvelteHTMLElements[Tag] & ButtonPropsExtension} ButtonProps
   */
  export type ButtonProps<Tag extends ButtonTag> = SvelteHTMLElements[Tag] & {
    /** 按钮颜色主题，支持多种预设颜色 */
    color?: ButtonColor;
    /** 按钮尺寸规格，从 xs 到 xl */
    size?: ButtonSize;
    /** 柔和视觉效果，降低背景饱和度 @default false */
    soft?: boolean;
    /** 轮廓样式，仅显示边框和文字 @default false */
    outline?: boolean;
    /** 虚线边框样式 @default false */
    dash?: boolean;
    /** 激活状态，用于表示当前选中或活跃状态 @default false */
    active?: boolean;
    /** 幽灵按钮样式，透明背景 @default false */
    ghost?: boolean;
    /** 链接样式，去除背景和边框 @default false */
    link?: boolean;
    /** 加宽按钮，增加水平内边距 @default false */
    wide?: boolean;
    /** 使用的HTML标签类型 @default 'button' */
    tag?: Tag;
    /** 禁用状态，阻止交互并显示禁用样式 @default false */
    disabled?: boolean;
    /** 按钮形状，支持方形和圆形 */
    shape?: 'square' | 'circle';
    /** 块级显示，占满父容器宽度 @default false */
    block?: boolean;
    /** 加载状态，显示加载指示器 @default false */
    loading?: boolean;
    /** 按钮文本内容，当没有子内容时显示 */
    text?: string;
  };
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShLoading } from '../../index';

  const {
    color, // 按钮颜色主题
    size, // 按钮尺寸
    soft = false, // 柔和效果
    outline = false, // 轮廓样式
    dash = false, // 虚线边框
    active = false, // 激活状态
    ghost = false, // 幽灵样式
    link = false, // 链接样式
    wide = false, // 加宽样式
    tag = 'button', // HTML标签类型
    disabled = false, // 禁用状态
    shape, // 按钮形状
    block = false, // 块级显示
    loading = false, // 加载状态
    text, // 按钮文本
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他HTML属性
  }: ButtonProps<ButtonTag> = $props();

  /**
   * 创建按钮的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const buttonVariants = tv(buttonVariantConfig, {});
</script>

<svelte:element
  this={tag}
  {disabled}
  class={[
    tuc(
      buttonVariants({
        color,
        size,
        soft,
        outline,
        dash,
        active,
        ghost,
        link,
        wide,
        disabled,
        shape,
        block,
      })
    ),
    className,
  ]}
  {...otherProps}
>
  {#if loading}
    <!--
      加载状态渲染
      当 loading 为 true 时显示加载指示器
      传递颜色和尺寸属性保持视觉一致性
    -->
    <ShLoading {color} {size} />
  {/if}

  {#if children}
    <!--
      子内容插槽渲染
      优先渲染通过插槽传入的子内容
      支持图标、文本或其他复杂内容的组合
    -->
    {@render children()}
  {:else}
    <!--
      文本内容渲染
      当没有子内容时，显示 text 属性的值
      适用于简单的纯文本按钮
    -->
    {text}
  {/if}
</svelte:element>

<style></style>
