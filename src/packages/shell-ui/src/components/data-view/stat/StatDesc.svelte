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
    text?: string | Array<{ title: string; value: string | number; tooltip?: string }>; // 描述文本
    color?: TextBaseProps['color']; // 文本颜色
    size?: TextBaseProps['size']; // 文本尺寸
    align?: TextBaseProps['align']; // 对齐方式
    weight?: TextBaseProps['weight']; // 字体粗细
  }
</script>

<script lang="ts">
  import { tuc, isArray } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';
  import { ShTooltip, ShIcon } from '../../index';

  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatDescProps = $props();

  const statDescVariant = tv(statDescVariantConfig, {});
</script>

<div class={[tuc(statDescVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else if isArray(text)}
    {#each text as textItemProp}
      {@const { title, value, tooltip } = textItemProp}
      <div class={tuc('flex items-center justify-between gap-2')}>
        <h4 class={tuc('group')}>
          <span class={tuc('align-middle')}>{title}</span>
          <!-- 显示描述内容 -->
          {#if tooltip}
            <ShTooltip
              dataTip={tooltip}
              class={tuc('align-middle leading-1 invisible group-hover:visible cursor-pointer')}
            >
              <ShIcon name="info" />
            </ShTooltip>
          {/if}
        </h4>
        <span>{value}</span>
      </div>
    {/each}
  {:else}
    {text ?? ''}
  {/if}
</div>

<style></style>
