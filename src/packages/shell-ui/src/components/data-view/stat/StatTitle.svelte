<!--
@component
统计项标题组件，用于展示统计项的标题。支持以下功能：
- 配置文本样式
- 响应式尺寸适配
- 支持自定义内容

用法示例:
```html
<ShStatTitle text="总用户" color="primary" size="lg" />

<ShStatTitle>
  <span class="custom-title">自定义标题</span>
</ShStatTitle>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatTitleVariantConfig } from '../../../theme/config';

  const statTitleVariantConfig = StatTitleVariantConfig;

  export interface StatTitleProps extends HTMLAttributes<HTMLDivElement> {
    text?: string; // 标题文本
    color?: TextBaseProps['color']; // 文本颜色
    size?: TextBaseProps['size']; // 文本尺寸
    align?: TextBaseProps['align']; // 对齐方式
    weight?: TextBaseProps['weight']; // 字体粗细
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';

  // 解构props
  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatTitleProps = $props();

  const statTitleVariant = tv(statTitleVariantConfig, {});
</script>

<div class={[tuc(statTitleVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    {text ?? ''} <!-- 显示文本内容 -->
  {/if}
</div>

<style></style>
