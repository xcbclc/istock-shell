<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { LoadingVariantConfig, LoadingTextVariantConfig } from '../../../theme/config';

  const loadingVariantConfig = LoadingVariantConfig;
  const loadingTextVariantConfig = LoadingTextVariantConfig;

  // 定义加载器形状类型（从配置中提取）
  export type LoadingShape = keyof (typeof loadingVariantConfig)['variants']['shape'];
  // 定义加载器尺寸类型（从配置中提取）
  export type LoadingSize = keyof (typeof loadingVariantConfig)['variants']['size'];
  // 定义加载器颜色主题类型（从配置中提取）
  export type LoadingColor = keyof (typeof loadingVariantConfig)['variants']['color'];

  // 组件属性接口（继承span元素属性）
  export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
    shape?: LoadingShape; // 加载器形状
    size?: LoadingSize; // 尺寸配置
    color?: LoadingColor; // 颜色主题
    text?: string; // 加载文本
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    shape, // 加载器形状
    size, // 尺寸配置
    color, // 颜色主题
    text, // 加载文本
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: LoadingProps = $props();

  // 创建加载器样式变体生成器
  const loadingVariants = tv(loadingVariantConfig, {});

  // 创建加载文本样式变体生成器
  const loadingTextVariants = tv(loadingTextVariantConfig, {});
</script>

{#snippet loading(extraClassName: string)}
  <!-- 加载器容器 -->
  <span class={[tuc(loadingVariants({ shape, size, color })), className, extraClassName]} {...otherProps}></span>
{/snippet}

{#if text ?? children}
  <!-- 带文本的加载器布局 -->
  <div class="inline-flex items-center justify-center">
    <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
    {@render loading('mr-2')}
    <!-- 渲染加载器（右边距） -->
    <span class={tuc(loadingTextVariants({ size, color }))}>
      {#if text}
        {text} <!-- 显示文本 -->
      {/if}
      {#if children}
        {@render children()} <!-- 渲染子内容 -->
      {/if}
    </span>
  </div>
{:else}
  <!-- 基础加载器 -->
  <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
  {@render loading('')}
{/if}

<style></style>
