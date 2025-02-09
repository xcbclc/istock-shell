<script lang="ts" module>
  // 导入Svelte的fieldset元素属性类型
  import type { HTMLFieldsetAttributes } from 'svelte/elements';

  // 定义FieldSet组件属性接口（继承fieldset原生属性）
  export interface FieldSetProps extends HTMLFieldsetAttributes {
    title?: string; // 字段集合标题
  }
</script>

<script lang="ts">
  // 导入样式处理工具
  import { tuc } from '@istock/util';

  // 解构props并设置默认值
  const {
    title = '', // 标题（默认为空）
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: FieldSetProps = $props();
</script>

<!-- 字段集合容器 -->
<fieldset
  class={[
    tuc('fieldset'), // 基础样式类
    className, // 自定义样式类
  ]}
  {...otherProps}
>
  {#if title}
    <!-- 标题区域 -->
    <legend class={tuc('fieldset-legend')}>
      {title}
    </legend>
  {/if}

  <!-- 渲染子内容（支持函数式children） -->
  {@render children?.()}
</fieldset>

<style></style>
