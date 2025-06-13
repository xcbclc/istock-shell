<!--
@component
ShLoading 加载指示器组件

一个功能丰富的加载指示器组件，支持多种形状、尺寸和颜色主题。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种形状样式（spinner, dots, ring, pulse 等）
- 提供多种尺寸规格（xs, sm, md, lg, xl）
- 支持多种颜色主题（primary, secondary, success, warning, error 等）
- 支持纯加载器和带文本的加载器两种模式
- 支持自定义文本内容和子内容插槽
- 继承所有原生 span 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShLoading } from '@istock-shell/ui';
</script>

<p>基础加载器</p>
<ShLoading />

<p>带颜色和尺寸的加载器</p>
<ShLoading color="primary" size="lg" shape="spinner" />

<p>带文本的加载器</p>
<ShLoading text="加载中..." color="secondary" />
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { LoadingVariantConfig, LoadingTextVariantConfig } from '../../../theme/config';

  const loadingVariantConfig = LoadingVariantConfig;
  const loadingTextVariantConfig = LoadingTextVariantConfig;

  /**
   * 加载器形状类型（从主题配置中动态提取）
   * 支持的形状包括：spinner（旋转器）、dots（点状）、ring（环形）、pulse（脉冲）等
   * @typedef {keyof LoadingVariantConfig['variants']['shape']} LoadingShape
   */
  export type LoadingShape = keyof (typeof loadingVariantConfig)['variants']['shape'];

  /**
   * 加载器尺寸类型（从主题配置中动态提取）
   * 支持的尺寸包括：xs（超小）、sm（小）、md（中等）、lg（大）、xl（超大）等
   * @typedef {keyof LoadingVariantConfig['variants']['size']} LoadingSize
   */
  export type LoadingSize = keyof (typeof loadingVariantConfig)['variants']['size'];

  /**
   * 加载器颜色主题类型（从主题配置中动态提取）
   * 支持的颜色包括：primary（主要）、secondary（次要）、success（成功）、warning（警告）、error（错误）等
   * @typedef {keyof LoadingVariantConfig['variants']['color']} LoadingColor
   */
  export type LoadingColor = keyof (typeof loadingVariantConfig)['variants']['color'];

  /**
   * 加载指示器组件属性接口
   * 继承所有原生 span 元素的 HTML 属性，并扩展加载器特有的样式和行为属性
   * @typedef {HTMLAttributes<HTMLSpanElement> & LoadingPropsExtension} LoadingProps
   */
  export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
    /** 加载器形状样式，控制加载动画的视觉表现形式 */
    shape?: LoadingShape;
    /** 加载器尺寸规格，控制加载器的大小 */
    size?: LoadingSize;
    /** 加载器颜色主题，控制加载器的颜色样式 */
    color?: LoadingColor;
    /** 加载文本内容，显示在加载器旁边的提示文字 */
    text?: string;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    shape, // 加载器形状样式（spinner、dots、ring、pulse等）
    size, // 加载器尺寸规格（xs、sm、md、lg、xl等）
    color, // 加载器颜色主题（primary、secondary、success等）
    text, // 加载提示文本内容
    children, // 子内容插槽，用于自定义加载文本
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生span元素属性
  }: LoadingProps = $props();

  /**
   * 创建加载器样式变体生成器
   * 基于配置生成响应式的加载器样式类名
   */
  const loadingVariants = tv(loadingVariantConfig, {});

  /**
   * 创建加载文本样式变体生成器
   * 基于配置生成与加载器匹配的文本样式类名
   */
  const loadingTextVariants = tv(loadingTextVariantConfig, {});
</script>

{#if text ?? children}
  <!--
    带文本的加载器布局模式
    当存在文本内容或子内容时，使用水平布局显示加载器和文本
    采用inline-flex布局，垂直居中对齐
  -->
  <div class={tuc('inline-flex items-center justify-center')}>
    {#if children}
      {@render children()}
    {:else}
      <!-- 渲染加载器组件，添加右边距以与文本保持间距 -->
      <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
      {@render loadingRender('mr-2')}
      <!-- 文本内容容器：应用与加载器匹配的文本样式 -->
      <span class={tuc(loadingTextVariants({ size, color }))}>
        {#if text}
          <!-- 显示文本属性内容 -->
          {text}
        {/if}
      </span>
    {/if}
  </div>
{:else}
  <!--
    纯加载器模式
    当没有文本内容时，仅显示加载器本身
    适用于简单的加载状态指示
  -->
  <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
  {@render loadingRender('')}
{/if}

{#snippet loadingRender(extraClassName: string)}
  <!--
    加载器核心组件片段
    接收额外的CSS类名参数，用于在不同布局模式下应用特定样式
    生成基础的加载器span元素，应用样式变体和自定义类名
  -->
  <span class={[tuc(loadingVariants({ shape, size, color })), className, extraClassName]} {...otherProps}></span>
{/snippet}

<style></style>
