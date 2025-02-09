<script lang="ts" module>
  // 导入HTML元素属性和类型校验工具
  import type { HTMLAttributes } from 'svelte/elements';
  import { isString } from '@istock/util';

  // 定义标签配置类型
  export type FieldLabel = {
    title?: string; // 标签文本内容
    position?: 'before' | 'after'; // 标签位置（内容前/后）
  };

  // 字段组件属性接口（继承div元素属性）
  export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    label?: string | FieldLabel; // 标签配置（支持简写字符串或完整对象）
  }
</script>

<script lang="ts">
  // 导入样式工具函数
  import { tuc } from '@istock/util';

  const {
    label, // 标签配置
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: FieldProps = $props();
</script>

<!-- 字段容器 -->
<div class={[tuc('field'), className]} {...otherProps}>
  {#if label && (isString(label) || label.position === 'before')}
    <!-- 前置标签：当label为字符串或明确指定position为before时 -->
    <label class={tuc('fieldset-label')}>
      {isString(label) ? label : label.title}
    </label>
  {/if}

  <!-- 渲染子内容（支持函数式children） -->
  {@render children?.()}

  {#if label && !isString(label) && label.position === 'after'}
    <!-- 后置标签：当label为对象且指定position为after时 -->
    <label class={tuc('fieldset-label')}>
      {label.title}
    </label>
  {/if}
</div>

<style></style>
