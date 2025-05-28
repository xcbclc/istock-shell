<!--
@component
统计项组件，用于组织统计信息的展示。支持以下功能：
- 配置标题、数值、描述
- 支持图标和操作按钮
- 自动处理内容布局

用法示例:
```html
<ShStatItem
  title="总用户"
  value="1,234"
  desc="较上月增长12%"
  figure={{ icon: { name: 'user' }}
  actions={[{ text: '管理' }]}
/>

<ShStatItem>
  <ShStatFigure icon={{ name: 'chart' }} />
  <ShStatTitle text="自定义统计项" />
</ShStatItem>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { StatActionProps, StatDescProps, StatFigureProps, StatTitleProps, StatValueProps } from './index';

  // 组件属性接口
  export interface StatItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: string | StatTitleProps; // 标题配置
    value?: string | StatValueProps; // 数值配置
    desc?: string | StatDescProps | StatDescProps[]; // 描述配置
    figure?: StatFigureProps; // 图标配置
    center?: boolean; // 是否居中
    actions?: StatActionProps[]; // 操作按钮列表
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
