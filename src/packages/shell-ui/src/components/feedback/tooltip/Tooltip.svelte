<!--
@component
ShTooltip 工具提示组件

一个功能丰富的工具提示组件，支持多种颜色主题、位置配置和自定义内容渲染。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种颜色主题（primary, secondary, success, warning, error 等）
- 提供多种位置配置（top, bottom, left, right 等）
- 支持显示状态控制和自动触发
- 支持自定义提示内容渲染函数
- 内置文本提示和复杂内容展示
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShTooltip } from '@istock-shell/ui';

  let showTooltip = false;

  function customTooltipRender() {
    return `<div class="p-2">
      <h4>自定义提示</h4>
      <p>这是自定义的提示内容</p>
    </div>`;
  }
</script>

<p>基础文本提示</p>
<ShTooltip dataTip="这是一个提示信息">
  <button>悬停查看提示</button>
</ShTooltip>

<p>带颜色和位置的提示</p>
<ShTooltip
  color="primary"
  placement="bottom"
  dataTip="底部显示的主要提示"
>
  <span>底部提示</span>
</ShTooltip>

<p>控制显示状态的提示</p>
<ShTooltip
  color="warning"
  placement="right"
  open={showTooltip}
  dataTip="手动控制显示的提示"
>
  <button onclick={() => showTooltip = !showTooltip}>
    点击切换提示
  </button>
</ShTooltip>

<p>自定义内容提示</p>
<ShTooltip
  color="success"
  placement="left"
  tooltipRender={customTooltipRender}
>
  <div class="p-2 border rounded">
    自定义提示内容
  </div>
</ShTooltip>
```
-->
<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { TooltipVariantConfig } from '../../../theme/config';

  const tooltipVariantConfig = TooltipVariantConfig;

  /**
   * Tooltip颜色主题类型（从主题配置中动态提取）
   * 支持的颜色包括：primary（主要）、secondary（次要）、success（成功）、warning（警告）、error（错误）等
   * @typedef {keyof TooltipVariantConfig['variants']['color']} TooltipColor
   */
  export type TooltipColor = keyof (typeof tooltipVariantConfig)['variants']['color'];

  /**
   * Tooltip位置配置类型（从主题配置中动态提取）
   * 支持的位置包括：top（顶部）、bottom（底部）、left（左侧）、right（右侧）等
   * @typedef {keyof TooltipVariantConfig['variants']['placement']} TooltipPlacement
   */
  export type TooltipPlacement = keyof (typeof tooltipVariantConfig)['variants']['placement'];

  /**
   * Tooltip组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展Tooltip特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & TooltipPropsExtension} TooltipProps
   */
  export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    /** 颜色主题配置，控制提示框的颜色样式 */
    color?: TooltipColor;
    /** 显示位置配置，控制提示框相对于触发元素的位置 */
    placement?: TooltipPlacement;
    /** 显示状态控制，手动控制提示框的显示和隐藏 */
    open?: boolean;
    /** 提示文本内容，简单的文本提示信息 */
    dataTip?: string;
    /** 自定义提示内容渲染函数，用于渲染复杂的提示内容 */
    tooltipRender?: () => ReturnType<Snippet<[]>>;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    color, // 颜色主题配置（可选）
    placement = 'top', // 显示位置，默认为顶部显示
    open, // 显示状态控制（可选）
    dataTip, // 简单文本提示内容（可选）
    class: className = '', // 自定义CSS类名（默认空字符串）
    tooltipRender, // 自定义提示内容渲染函数（可选）
    children, // 子内容插槽（触发元素）
    ...otherProps // 其他原生div元素属性
  }: TooltipProps = $props();

  // 创建工具提示样式变体生成器
  const tooltipVariants = tv(tooltipVariantConfig, {});
</script>

<!-- Tooltip容器：工具提示的根容器元素，包含触发元素和提示内容 -->
<div class={[tuc(tooltipVariants({ color, placement, open })), className]} data-tip={dataTip ?? ''} {...otherProps}>
  <!-- 条件渲染：自定义提示内容区域 -->
  {#if tooltipRender}
    <!-- 自定义提示内容容器：当提供了tooltipRender函数时，渲染复杂的自定义提示内容 -->
    <div class={[tuc('tooltip-content')]}>
      {@render tooltipRender()}
    </div>
  {/if}

  <!-- 触发元素渲染区域：显示触发工具提示的子元素内容 -->
  {@render children?.()}
</div>

<style></style>
