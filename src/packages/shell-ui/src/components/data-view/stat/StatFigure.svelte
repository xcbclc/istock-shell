<!--
@component
统计项图标组件，用于展示统计项的图标或图片。支持以下功能：
- 配置图标属性
- 支持自定义图标内容
- 默认图标尺寸

用法示例:
```html
<ShStatFigure icon={{ name: 'user' }} />

<ShStatFigure>
  <img src="/chart.png" alt="图表" />
</ShStatFigure>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { IconProps } from '../../index';

  // 组件属性接口
  export interface StatFigureProps extends HTMLAttributes<HTMLDivElement> {
    icon?: IconProps; // 图标配置
  }
</script>

<script lang="ts">
  // 导入组件和工具
  import { tuc } from '@istock/util';
  import { ShIcon } from '../../index';

  // 解构props并设置默认值
  const {
    icon, // 图标配置
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: StatFigureProps = $props();
</script>

<div class={[tuc('stat-figure'), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染图标组件 -->
    {@const { class: iconClass = tuc('h-8 w-8'), ...otherIcon } = icon ?? {}}
    <ShIcon class={iconClass} {...otherIcon} />
  {/if}
</div>

<style></style>
