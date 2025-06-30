<!--
@component
ShStatItem 统计项组件

一个功能完整的统计数据项组件，支持快速配置和完全自定义两种使用模式。
基于 div 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持快速配置模式（通过直接属性配置）
- 支持完全自定义模式（通过子组件组合）
- 集成多种统计子组件（图标、标题、数值、描述、操作）
- 支持不同的对齐方式配置
- 支持响应式布局和主题
- 继承所有原生 div 元素属性
- 完整的 TypeScript 类型安全
- 无障碍访问支持

示例用法：
```svelte
<script lang="ts">
  import { ShStatItem } from '@istock-shell/ui';
</script>

<p>快速配置模式</p>
<ShStatItem
  title="总用户数"
  value="1,234"
  desc="较上月增长12%"
  figure={{ icon: { name: 'user' } }}
  actions={[{ text: '管理用户' }]}
/>

<p>居中对齐的统计项</p>
<ShStatItem
  title="销售额"
  value="¥89,400"
  desc="本月目标完成率 89%"
  center
  figure={{ icon: { name: 'chart-bar' } }}
/>

<p>完全自定义模式</p>
<ShStatItem>
  <ShStatFigure icon={{ name: 'chart' }} />
  <ShStatTitle text="自定义统计项" color="primary" />
  <ShStatValue text="2,468" size="lg" />
  <ShStatDesc text="详细描述信息" />
</ShStatItem>

<p>多个描述的统计项</p>
<ShStatItem
  title="订单统计"
  value="156"
  desc={[
    { text: '今日新增: 23', color: 'success' },
    { text: '待处理: 8', color: 'warning' }
  ]}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type {
    StatActionProps,
    StatDescProps,
    StatFigureProps,
    StatTitleProps,
    StatValueProps,
  } from './index';

  /**
   * 统计项组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展统计项特有的配置
   * 排除原生 title 属性以避免与组件 title 属性冲突
   */
  export interface StatItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 标题配置
     * 支持字符串（简写形式）或完整的标题属性对象
     * 字符串形式等同于 { text: string }
     */
    title?: string | StatTitleProps;

    /**
     * 数值配置
     * 支持字符串（简写形式）或完整的数值属性对象
     * 字符串形式等同于 { text: string }
     */
    value?: string | StatValueProps;

    /**
     * 描述配置
     * 支持字符串、单个描述对象或描述对象数组
     * 字符串形式等同于 { text: string }
     * 数组形式可显示多个描述项
     */
    desc?: string | StatDescProps | StatDescProps[];

    /**
     * 图标配置
     * 配置统计项的图标显示，支持图标、图片和自定义内容
     */
    figure?: StatFigureProps;

    /**
     * 是否居中对齐
     * 控制统计项内容的对齐方式
     * @default false
     */
    center?: boolean;

    /**
     * 操作按钮列表
     * 配置统计项的操作按钮，支持多个按钮
     * @default []
     */
    actions?: StatActionProps[];
  }
</script>

<script lang="ts">
  import { tuc, isString, isArray } from '@istock-shell/util';
  import { ShStatAction, ShStatDesc, ShStatFigure, ShStatTitle, ShStatValue } from './index';

  const {
    title, // 标题配置
    value, // 数值配置
    desc, // 描述配置
    figure, // 图标配置
    center = false, // 默认不居中
    actions = [], // 操作按钮列表
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: StatItemProps = $props();
</script>

<div class={[tuc(['stat', center ? 'place-items-center' : '']), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染图标 -->
    {#if figure}
      <ShStatFigure {...figure} />
    {/if}

    <!-- 渲染标题 -->
    {#if title}
      {@const titleProp = isString(title) ? { text: title } : title}
      <ShStatTitle {...titleProp} />
    {/if}

    <!-- 渲染数值 -->
    {#if value}
      {@const valueProp = isString(value) ? { text: value } : value}
      <ShStatValue {...valueProp} />
    {/if}

    <!-- 渲染描述 -->
    {#if desc}
      {@const descProp = isString(desc) ? { text: desc } : desc}
      {#if isArray(descProp)}
        {#each descProp as descItemProp}
          <ShStatDesc {...descItemProp} />
        {/each}
      {:else}
        <ShStatDesc {...descProp} />
      {/if}
    {/if}

    <!-- 渲染操作按钮 -->
    {#if actions.length}
      <div class={tuc('stat-actions flex gap-2')}>
        {#each actions as action}
          <ShStatAction {...action} />
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style></style>
