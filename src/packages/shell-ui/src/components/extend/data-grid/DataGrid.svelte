<!--
@component
数据网格组件，用于组合展示统计指标、可视化图表、数据项。支持以下功能：
- 配置统计指标列表
- 支持图表项及其它数据项展示
- 自动布局管理
- 响应式数据更新

用法示例:
```html
<ShDataGrid
  stats={[
    { title: '总用户', value: '1,234' },
    { title: '活跃率', value: '89%' }
  ]}
  items={[
    { type: 'line', data: [...] }
  ]}
/>

<ShDataGrid>
  <ShStat title="自定义统计项" value="567" />
  <ShChart type="bar" data={[...]} />
</ShDataGrid>
```
-->

<script lang="ts" module>
  import type { StatItemProps } from '../../index';
  import type { SvelteComponent } from 'svelte';

  export interface DataGridItem {
    component: typeof SvelteComponent;
    [key: string]: any;
  }
  // 组件属性接口
  export interface DataGridProps {
    stats?: StatItemProps[]; // 统计指标配置列表
    items?: DataGridItem[]; // 数据项区域项列表
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { ShStat } from '../../index';

  const {
    stats = [], // 统计指标列表，默认为空数组
    items = [], // 数据项区域项列表，默认为空数组
  }: DataGridProps = $props();
</script>

<!-- 数据网格容器 -->
<div class={tuc('gird-data')}>
  <!-- 统计指标区域 -->
  <div class={tuc('gird-stats')}>
    <ShStat class={tuc('align-top')} center list={stats} />
  </div>

  <!-- 数据项区域 -->
  <div class={tuc('gird-items gap-2 pt-2 pb-2')}>
    {#each items as item}
      {@const { component, ...itemProps } = item}
      {#if component}
        <svelte:component this={component} {...itemProps} />
      {/if}
    {/each}
  </div>
</div>

<style>
  @layer components {
    /* 基础容器样式 */
    :global(.gird-data) {
      @apply w-full;
    }

    /* 统计区域样式 */
    :global(.gird-stats) {
      @apply w-full flex justify-center;
    }

    /* 数据项区域响应式网格布局 */
    :global(.gird-items) {
      @apply grid grid-rows-[repeat(auto-fit,minmax(350px,1fr))] grid-cols-[repeat(auto-fit,minmax(350px,1fr))];
    }
  }
</style>
