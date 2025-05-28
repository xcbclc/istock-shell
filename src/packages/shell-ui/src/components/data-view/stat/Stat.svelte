<!--
@component
统计卡片组件，用于展示数据统计信息。支持以下功能：
- 配置统计项列表
- 支持垂直/水平布局
- 自动管理子项布局
- 支持阴影效果

用法示例:
```html
<ShStat
  list={[
    { title: '总用户', value: '1,234' },
    { title: '活跃用户', value: '567' }
  ]}
/>

<ShStat vertical shadow={false}>
  <ShStatItem title="收入" value="¥12,345" />
  <ShStatItem title="支出" value="¥8,901" />
</ShStat>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { StatVariantConfig } from '../../../theme/config';
  import type { StatItemProps } from './StatItem.svelte';

  const statVariantConfig = StatVariantConfig;

  export type StatItemAlign = keyof (typeof statVariantConfig)['variants']['align'];

  // 组件属性接口
  export interface StatProps extends HTMLAttributes<HTMLDivElement> {
    list?: StatItemProps[]; // 统计项列表
    center?: boolean; // 是否居中显示
    shadow?: boolean; // 是否显示阴影
    vertical?: boolean; // 是否垂直布局
    align?: StatItemAlign; // 对齐方式
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import ShStatItem from './StatItem.svelte';

  const {
    list = [], // 统计项列表
    center = false, // 默认不居中
    shadow = true, // 默认显示阴影
    vertical = false, // 默认水平布局
    align,
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: StatProps = $props();

  const statVariant = tv(statVariantConfig, {});
</script>

<div
  class={[
    tuc(
      statVariant({
        shadow,
        vertical,
        align,
      })
    ),
    className,
  ]}
  {...otherProps}
>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染统计项列表 -->
    {#each list as item}
      <ShStatItem {center} {...item} />
    {/each}
  {/if}
</div>

<style></style>
