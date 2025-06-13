<!--
@component
ShField 字段组件

一个灵活的字段容器组件，支持可配置的标签位置和样式。
基于 div 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持字符串或对象形式的标签配置
- 可配置标签位置（内容前/后）
- 支持自定义内容渲染
- 继承所有原生 div 元素属性
- 完整的 TypeScript 类型安全

示例用法：
```svelte
<p>基础字段（字符串标签）</p>
<ShField label="用户名">
  <input type="text" placeholder="请输入用户名" />
</ShField>

<p>前置标签字段</p>
<ShField label={{ title: "邮箱地址", placement: "before" }}>
  <input type="email" placeholder="请输入邮箱" />
</ShField>

<p>后置标签字段</p>
<ShField label={{ title: "同意条款", placement: "after" }}>
  <input type="checkbox" />
</ShField>

<p>无标签字段</p>
<ShField class="custom-field">
  <textarea placeholder="请输入备注"></textarea>
</ShField>
```
-->
<script lang="ts" module>
  // 导入HTML元素属性和类型校验工具
  import type { HTMLAttributes } from 'svelte/elements';
  import { isString } from '@istock-shell/util';

  /**
   * 字段标签配置类型
   * 定义标签的显示文本和位置
   */
  export type FieldLabel = {
    /** 标签显示文本 */
    title?: string;
    /** 标签位置，相对于字段内容的位置 @default 'before' */
    placement?: 'before' | 'after';
  };

  /**
   * 字段组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展字段特有的配置
   */
  export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * 标签配置
     * 支持字符串（简写形式，默认前置）或对象（完整配置）
     * 字符串形式等同于 { title: string, placement: 'before' }
     */
    label?: string | FieldLabel;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const {
    label, // 标签配置（字符串或对象形式）
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他原生 div 元素属性
  }: FieldProps = $props();
</script>

<!-- 字段容器 -->
<div class={[tuc('field'), className]} {...otherProps}>
  {#if label && (isString(label) || label.placement === 'before')}
    <!-- 前置标签：当label为字符串或明确指定placement为before时 -->
    <label class={tuc('fieldset-label')}>
      {isString(label) ? label : label.title}
    </label>
  {/if}

  <!-- 渲染子内容（支持函数式children） -->
  {@render children?.()}

  {#if label && !isString(label) && label.placement === 'after'}
    <!-- 后置标签：当label为对象且指定placement为after时 -->
    <label class={tuc('fieldset-label')}>
      {label.title}
    </label>
  {/if}
</div>

<style></style>
