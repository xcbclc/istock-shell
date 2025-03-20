<!--
@component
表头单元格组件
-->
<script lang="ts" module>
  import type { HTMLThAttributes } from 'svelte/elements';

  // 表头属性接口
  export interface TableThProps extends HTMLThAttributes {
    value?: unknown; // 表头显示值
    dataKey?: string; // 关联数据字段键名
    unit?: {
      // 单位配置（继承自单元格）
      text: string;
      show: boolean;
    };
  }
</script>

<script lang="ts">
  const { value = '', children, ...otherProps }: TableThProps = $props();
</script>

<th {...otherProps}>
  {#if children}
    {@render children()} <!-- 自定义表头内容 -->
  {:else}
    {value ?? ''} <!-- 显示配置值或空 -->
  {/if}
</th>
