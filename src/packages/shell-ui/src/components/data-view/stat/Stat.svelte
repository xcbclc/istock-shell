<!--
@component
ShStat 统计卡片组件

一个功能丰富的统计数据展示组件，支持多种布局模式和样式配置。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持统计项列表的批量渲染
- 提供垂直和水平两种布局模式
- 内置阴影效果和对齐方式配置
- 支持完全自定义的子内容渲染
- 自动管理统计项的布局和样式
- 继承所有原生 div 元素属性
- 完整的响应式设计支持
- TypeScript 类型安全

示例用法：
```svelte
<script lang="ts">
  import { ShStat } from '@istock-shell/ui';
</script>

<p>基础统计卡片</p>
<ShStat
  list={[
    { title: '总用户', value: '1,234', desc: '较上月增长12%' },
    { title: '活跃用户', value: '567', desc: '在线用户' }
  ]}
/>

<p>垂直布局无阴影</p>
<ShStat
  vertical
  shadow={false}
  align="start"
>
  <ShStatItem title="收入" value="¥12,345" />
  <ShStatItem title="支出" value="¥8,901" />
</ShStat>

<p>居中对齐的统计卡片</p>
<ShStat
  center
  list={statisticsData}
  class="bg-base-200 rounded-lg"
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { StatVariantConfig } from '../../../theme/config';
  import type { StatItemProps } from './StatItem.svelte';

  /**
   * 获取统计卡片组件主题配置
   * 从主题系统中导入统计卡片的样式配置
   */
  const statVariantConfig = StatVariantConfig;

  /**
   * 统计项对齐方式类型（从主题配置中动态提取）
   * 支持多种对齐方式配置
   * @typedef {keyof StatVariantConfig['variants']['align']} StatItemAlign
   */
  export type StatItemAlign = keyof (typeof statVariantConfig)['variants']['align'];

  /**
   * 统计卡片组件属性接口
   * 继承原生 div 元素的所有属性，并扩展统计卡片特有的功能和配置
   */
  export interface StatProps extends HTMLAttributes<HTMLDivElement> {
    /** 统计项列表，用于批量渲染统计项 @default [] */
    list?: StatItemProps[];
    /** 是否居中显示统计项内容 @default false */
    center?: boolean;
    /** 是否显示卡片阴影效果 @default true */
    shadow?: boolean;
    /** 是否使用垂直布局模式 @default false */
    vertical?: boolean;
    /** 统计项的对齐方式，支持多种预设对齐模式 */
    align?: StatItemAlign;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import ShStatItem from './StatItem.svelte';

  let {
    /** 统计项列表，用于批量渲染统计项 */
    list = [],
    /** 是否居中显示统计项内容 */
    center = false,
    /** 是否显示卡片阴影效果 */
    shadow = true,
    /** 是否使用垂直布局模式 */
    vertical = false,
    /** 统计项的对齐方式 */
    align,
    /** 自定义CSS类名，用于进一步定制样式 */
    class: className = '',
    /** 子内容插槽，用于完全自定义统计卡片内容 */
    children,
    /** 其他透传给原生div元素的属性 */
    ...otherProps
  }: StatProps = $props();

  /**
   * 创建统计卡片的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const statVariant = tv(statVariantConfig, {});
</script>

<!--
  统计卡片容器
  使用 div 元素作为统计卡片的根容器
  - class: 合并样式变体生成的类名和自定义类名
  - {...otherProps}: 透传所有其他原生 div 属性
-->
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
    <!--
      自定义内容渲染
      当提供子内容时，完全由用户控制统计卡片的结构和布局
      适用于需要复杂统计展示或特殊交互的场景
    -->
    {@render children()}
  {:else}
    <!--
      统计项列表渲染
      根据 list 属性批量渲染统计项组件
      每个统计项会继承 center 属性并展开其他配置
    -->
    {#each list as item}
      <ShStatItem {center} {...item} />
    {/each}
  {/if}
</div>

<style></style>
