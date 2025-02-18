<!--
@component
空状态展示组件，用于显示无数据或空内容的状态。支持以下功能：
- 自定义图标和文本
- 支持完全自定义内容
- 样式可定制

用法示例:
```html
<ShEmpty />

<ShEmpty text="暂无搜索结果" />

<ShEmpty name="no-data" />

<ShEmpty>
  <div class="flex flex-col items-center">
    <img src="/empty.png" alt="empty" />
    <p>自定义空状态内容</p>
  </div>
</ShEmpty>
```
-->

<script lang="ts" module>
  import { type HTMLAttributes } from 'svelte/elements';

  // 定义空状态图标类型
  export type EmptyName = 'empty' | 'info';

  // 组件属性接口（继承div元素属性）
  export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
    name?: EmptyName; // 图标名称，默认为'empty'
    text?: string; // 显示文本，默认为'暂无数据'
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { ShText, ShIcon } from '../../index';

  const {
    name = 'empty', // 默认图标名称
    text = '暂无数据', // 默认显示文本
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: EmptyProps = $props();
</script>

<div class={[tuc('empty gap-2 p-20'), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 默认空状态展示 -->
    <ShIcon size={48} name={name === 'info' ? 'question' : name} />
    <ShText size="sm" texts={[{ text }]} />
  {/if}
</div>

<style>
  .empty {
    @apply flex flex-col items-center justify-center;
  }
</style>
