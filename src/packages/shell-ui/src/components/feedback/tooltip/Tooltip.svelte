<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { TooltipVariantConfig } from '../../../theme/config';

  const tooltipVariantConfig = TooltipVariantConfig;

  // 定义工具提示颜色类型（从配置中提取）
  export type TooltipColor = keyof (typeof tooltipVariantConfig)['variants']['color'];
  // 定义工具提示位置类型（从配置中提取）
  export type TooltipPlacement = keyof (typeof tooltipVariantConfig)['variants']['placement'];

  // 组件属性接口（继承div元素属性）
  export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    color?: TooltipColor; // 颜色主题
    placement?: TooltipPlacement; // 显示位置
    open?: boolean; // 是否显示
    dataTip?: string; // 提示文本
    tooltipRender?: () => ReturnType<Snippet<[]>>; // 自定义提示内容渲染函数
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';

  const {
    color, // 颜色主题
    placement = 'top', // 显示位置
    open, // 是否显示
    dataTip, // 提示文本
    class: className = '', // 自定义类名
    tooltipRender, // 自定义提示内容渲染函数
    children, // 子内容（触发元素）
    ...otherProps // 其他原生属性
  }: TooltipProps = $props();

  // 创建工具提示样式变体生成器
  const tooltipVariants = tv(tooltipVariantConfig, {});
</script>

<div class={[tuc(tooltipVariants({ color, placement, open })), className]} data-tip={dataTip ?? ''} {...otherProps}>
  {#if tooltipRender}
    <!-- 自定义提示内容 -->
    <div class={[tuc('tooltip-content')]}>
      {@render tooltipRender()}
    </div>
  {/if}

  <!-- 渲染子元素 -->
  {@render children?.()}
</div>

<style></style>
