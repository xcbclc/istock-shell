<!--
@component
统计项描述组件，用于展示统计项的辅助说明。支持以下功能：
- 配置描述样式
- 响应式尺寸适配
- 支持自定义内容

用法示例:
```html
<ShStatDesc text="较上月增长12%" color="secondary" />

<ShStatDesc>
  <span class="trend">↑ 5% 环比增长</span>
</ShStatDesc>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatDescVariantConfig } from '../../../theme/config';

  const statDescVariantConfig = StatDescVariantConfig;

  // 组件属性接口
  export interface StatDescProps extends HTMLAttributes<HTMLDivElement> {
    text?: string; // 描述文本
    color?: TextBaseProps['color']; // 文本颜色
    size?: TextBaseProps['size']; // 文本尺寸
    align?: TextBaseProps['align']; // 对齐方式
    weight?: TextBaseProps['weight']; // 字体粗细
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  // 解构props
  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatDescProps = $props();

  const statDescVariant = tv(statDescVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

<div class={[tuc(statDescVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    {text ?? ''} <!-- 显示描述内容 -->
  {/if}
</div>

<style></style>
