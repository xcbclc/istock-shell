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
  import type { SvelteComponent, Component } from 'svelte';

  export type DataGridItemComponentName = 'ShChart';

  export interface DataGridItem {
    component: typeof SvelteComponent | DataGridItemComponentName;
    [key: string]: any;
  }
  // 组件属性接口
  export interface DataGridProps {
    stats?: StatItemProps[]; // 统计指标配置列表
    items?: DataGridItem[]; // 数据项区域项列表
    itemColWidth?: number | string; // 列宽
  }
</script>

<script lang="ts">
  import { tuc, isString, isNumber } from '@istock-shell/util';
  import { ShStat, ShErrorInfo } from '../../index';

  const {
    stats = [], // 统计指标列表，默认为空数组
    items = [], // 数据项区域项列表，默认为空数组
    itemColWidth = 480,
  }: DataGridProps = $props();

  // 组件缓存，用于异步加载组件
  const componentRecord: Record<string, Component<Record<string, any>>> = {};

  const getAsyncComponent = async (name: DataGridItemComponentName): Promise<Component<any>> => {
    let component: Component<any>;
    if (componentRecord[name]) return componentRecord[name];
    switch (name) {
      case 'ShChart':
        component = (await import(`../../extend/chart/index`)).default;
        break;
    }
    if (!component) throw new Error(`未找到${name}对应的组件`);
    componentRecord[name] = component;
    return component;
  };
</script>

<!-- 数据网格容器 -->
<div class={tuc('gird-data')}>
  <!-- 统计指标区域 -->
  <div class={tuc('gird-stats')}>
    <ShStat class={tuc('w-full text-primary')} center align="start" list={stats} />
  </div>

  <!-- 数据项区域 -->
  <div
    class={tuc(
      `gird-items grid-cols-[repeat(auto-fit,minmax(${isNumber(itemColWidth) ? itemColWidth + 'px' : itemColWidth},1fr))]`
    )}
  >
    {#each items as item}
      {@const { component, ...itemProps } = item}
      {#if isString(component)}
        {#await getAsyncComponent(component)}
          <div class={tuc('skeleton h-4 w-full')}></div>
        {:then Component}
          <Component {...itemProps} />
        {:catch error}
          <ShErrorInfo description={error.message} />
        {/await}
      {:else}
        <svelte:component this={component} {...itemProps} />
      {/if}
    {/each}
  </div>
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    /* 基础容器样式 */
    :global(.gird-data) {
      @apply w-full overflow-hidden;
    }

    /* 统计区域样式 */
    :global(.gird-stats) {
      @apply w-full flex justify-center;
    }

    /* 数据项区域响应式网格布局 */
    :global(.gird-items) {
      @apply grid gap-2 py-2;
    }
  }
</style>
