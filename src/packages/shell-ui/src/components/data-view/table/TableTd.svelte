<!--
@component
表格数据单元格组件：
- 自动绑定数据键值
- 支持单位显示
- 允许自定义内容
-->
<script lang="ts" module>
  import type { HTMLTdAttributes } from 'svelte/elements';

  // 单元格属性接口
  export interface TableTdProps extends HTMLTdAttributes {
    value?: unknown; // 显示值（自动绑定数据）
    dataKey?: string; // 数据对象键名（用于自动取值）
    unit?: {
      // 单位配置对象
      text?: string; // 单位文本内容
      show?: boolean; // 是否显示单位
    };
  }
</script>

<script lang="ts">
  const { value, unit, children, ...otherProps }: TableTdProps = $props();
</script>

<td {...otherProps}>
  {#if children}
    {@render children()} <!-- 优先渲染自定义内容 -->
  {:else}
    {value}{unit?.show && unit?.text ? `（${unit.text}）` : ''} <!-- 自动拼接单位 -->
  {/if}
</td>
