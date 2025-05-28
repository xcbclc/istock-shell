<!--
@component
统计项数值组件，用于展示统计数值。支持以下功能：
- 配置数值样式
- 响应式尺寸适配
- 支持数字格式化
- 支持自定义内容

用法示例:
```html
<ShStatValue text="1,234" color="success" size="xl" />

<ShStatValue>
  <span class="currency">¥12,345</span>
</ShStatValue>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatValueVariantConfig } from '../../../theme/config';

  export interface StatValueProps extends HTMLAttributes<HTMLDivElement> {
    text?: string | number; // 数值内容
    color?: TextBaseProps['color']; // 文本颜色
    size?: TextBaseProps['size']; // 文本尺寸
    align?: TextBaseProps['align']; // 对齐方式
    weight?: TextBaseProps['weight']; // 字体粗细
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  // 解构props
  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatValueProps = $props();

  // 创建样式变体生成器
  const statValueVariant = tv(StatValueVariantConfig, {});
</script>

<div class={[tuc(statValueVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    {text ?? ''} <!-- 显示数值内容 -->
  {/if}
</div>

<style></style>
