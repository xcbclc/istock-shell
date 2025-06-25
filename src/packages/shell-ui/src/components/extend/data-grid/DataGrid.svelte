<!--
@component
ShDataGrid 数据网格组件

一个功能丰富的数据网格组件，用于组合展示统计指标、可视化图表和数据项。
提供灵活的布局管理和响应式设计支持，适用于仪表板和数据展示场景。

功能特性：
- 支持统计指标列表的配置和展示
- 提供图表组件和其他数据项的动态加载
- 自动响应式网格布局管理
- 支持异步组件加载和错误处理
- 可配置的列宽和布局参数
- 支持自定义内容插槽
- 完整的 TypeScript 类型安全
- 基于 Tailwind CSS 的样式系统

示例用法：
```svelte
<script lang="ts">
  import { ShDataGrid } from '@istock-shell/ui';

  const statsData = [
    { title: '总用户数', value: '1,234', trend: 'up' },
    { title: '活跃率', value: '89%', trend: 'down' },
    { title: '转化率', value: '12.5%', trend: 'up' }
  ];

  const chartItems = [
    {
      component: 'ShChart',
      options: {
        type: 'line',
        data: [{ year: '2021', value: 3 }, { year: '2022', value: 4 }]
      }
    },
    {
      component: 'ShChart',
      options: {
        type: 'bar',
        data: [{ category: 'A', value: 10 }, { category: 'B', value: 20 }]
      }
    }
  ];
</script>

<p>基础数据网格</p>
<ShDataGrid stats={statsData} items={chartItems} />

<p>自定义列宽的数据网格</p>
<ShDataGrid
  stats={statsData}
  items={chartItems}
  itemColWidth="600px"
/>

<p>自定义内容的数据网格</p>
<ShDataGrid stats={statsData}>
  <div class="custom-chart">自定义图表内容</div>
  <div class="custom-data">自定义数据展示</div>
</ShDataGrid>
```
-->

<script lang="ts" module>
  import type { StatItemProps } from '../../index';
  import type { SvelteComponent, Component } from 'svelte';

  /**
   * 支持的数据网格项组件名称类型
   * 目前支持的组件：ShChart（图表组件）
   * @typedef {'ShChart'} DataGridItemComponentName
   */
  export type DataGridItemComponentName = 'ShChart';

  /**
   * 数据网格项配置接口
   * 用于定义网格中每个数据项的组件类型和属性
   * @typedef DataGridItem
   */
  export interface DataGridItem {
    /** 组件类型，可以是 Svelte 组件类或组件名称字符串 */
    component: typeof SvelteComponent | DataGridItemComponentName;
    /** 传递给组件的其他属性，支持任意键值对 */
    [key: string]: any;
  }

  /**
   * 数据网格组件属性接口
   * 定义数据网格组件的所有可配置属性
   * @typedef DataGridProps
   */
  export interface DataGridProps {
    /** 统计指标配置列表，用于展示关键数据指标 */
    stats?: StatItemProps[];
    /** 数据项列表，包含图表和其他可视化组件的配置 */
    items?: DataGridItem[];
    /** 数据项列的宽度，支持数字（像素）或字符串（CSS 单位） @default 480 */
    itemColWidth?: number | string;
  }
</script>

<script lang="ts">
  import { tuc, isString, isNumber } from '@istock-shell/util';
  import { ShStat, ShErrorInfo } from '../../index';

  const {
    stats = [], // 统计指标配置列表，默认为空数组
    items = [], // 数据项配置列表，默认为空数组
    itemColWidth = 480, // 数据项列宽，默认480像素
  }: DataGridProps = $props();

  // 组件缓存对象，用于存储已加载的异步组件，避免重复加载
  const componentRecord: Record<string, Component<Record<string, any>>> = {};

  /**
   * 异步加载组件函数
   * 根据组件名称动态导入对应的组件，并缓存以提高性能
   * @param name - 组件名称，必须是 DataGridItemComponentName 类型
   * @returns Promise<Component<any>> - 返回加载的组件
   * @throws Error - 当找不到对应组件时抛出错误
   */
  const getAsyncComponent = async (name: DataGridItemComponentName): Promise<Component<any>> => {
    let component: Component<any>;
    // 检查组件缓存，如果已存在则直接返回
    if (componentRecord[name]) return componentRecord[name];

    // 根据组件名称动态导入对应的组件模块
    switch (name) {
      case 'ShChart':
        component = (await import(`../../extend/chart/index`)).default;
        break;
    }

    // 验证组件是否成功加载
    if (!component) throw new Error(`未找到${name}对应的组件`);

    // 将加载的组件存入缓存
    componentRecord[name] = component;
    return component;
  };
</script>

<!-- 数据网格主容器：应用基础样式类，提供完整的网格布局结构 -->
<div class={tuc('gird-data')}>
  <!-- 统计指标展示区域：位于网格顶部，用于显示关键数据指标 -->
  <div class={tuc('gird-stats')}>
    <!-- 统计组件：居中显示，应用主色调，左对齐排列统计项 -->
    <ShStat class={tuc('w-full text-primary')} center align="start" list={stats} />
  </div>

  <!-- 数据项展示区域：使用响应式网格布局，根据配置的列宽自动调整列数 -->
  <div
    class={tuc(
      `gird-items grid-cols-[repeat(auto-fit,minmax(${isNumber(itemColWidth) ? itemColWidth + 'px' : itemColWidth},1fr))]`
    )}
  >
    {#each items as item}
      {@const { component, ...itemProps } = item}

      <!-- 判断组件类型：字符串类型需要异步加载，组件类型直接渲染 -->
      {#if isString(component)}
        <!-- 异步加载组件：显示加载状态、成功渲染或错误处理 -->
        {#await getAsyncComponent(component)}
          <div class={tuc('skeleton h-4 w-full')}></div>
        {:then Component}
          <!-- 加载成功：渲染组件并传递所有属性 -->
          <Component {...itemProps} />
        {:catch error}
          <!-- 加载失败：显示错误信息组件 -->
          <ShErrorInfo description={error.message} />
        {/await}
      {:else}
        <!-- 直接组件渲染：使用 svelte:component 动态渲染组件 -->
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
