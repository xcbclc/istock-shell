<script lang="ts" module>
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { ButtonVariantConfig } from '../../../theme/config';

  // 从主题配置中获取按钮组件的基础配置
  const buttonVariantConfig = ButtonVariantConfig;

  // 定义按钮支持的HTML标签类型
  export type ButtonTag = 'a' | 'button' | 'input' | 'div';

  // 定义按钮颜色类型（从配置中提取可用颜色）
  export type ButtonColor = keyof (typeof buttonVariantConfig)['variants']['color'];

  // 定义按钮尺寸类型（从配置中提取可用尺寸）
  export type ButtonSize = keyof (typeof buttonVariantConfig)['variants']['size'];

  // 按钮组件属性类型定义
  export type ButtonProps<Tag extends ButtonTag> = SvelteHTMLElements[Tag] & {
    color?: ButtonColor; // 按钮颜色
    size?: ButtonSize; // 按钮尺寸
    soft?: boolean; // 柔和视觉效果
    outline?: boolean; // 轮廓样式
    dash?: boolean; // 虚线边框
    active?: boolean; // 激活状态
    ghost?: boolean; // 幽灵按钮样式
    link?: boolean; // 链接样式
    wide?: boolean; // 加宽按钮
    tag?: Tag; // 使用的HTML标签
    disabled?: boolean; // 禁用状态
    shape?: 'square' | 'circle'; // 按钮形状
    block?: boolean; // 块级显示
    loading?: boolean; // 加载状态
  };
</script>

<script lang="ts">
  // 导入样式处理工具
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  import { ShLoading } from '../../index';

  // 解构组件属性并设置默认值
  const {
    color, // 按钮颜色
    size, // 按钮尺寸
    soft, // 柔和样式开关
    outline, // 轮廓样式开关
    dash, // 虚线边框开关
    active, // 激活状态开关
    ghost, // 幽灵样式开关
    link, // 链接样式开关
    wide, // 加宽开关
    tag = 'button', // 默认使用button标签
    disabled, // 禁用状态
    shape, // 按钮形状
    block, // 块级显示开关
    loading, // 加载状态开关
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: ButtonProps<ButtonTag> = $props();

  // 创建按钮的Tailwind变体样式生成器（支持响应式尺寸）
  const buttonVariants = tv(buttonVariantConfig, {
    responsiveVariants: ['size'], // 响应式尺寸变体
  });
</script>

<!-- 动态元素组件 -->
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
    <!-- 加载状态显示加载指示器 -->
    <ShLoading {color} {size} />
  {/if}

  <!-- 渲染子内容 -->
  {@render children?.()}
</svelte:element>

<style></style>
