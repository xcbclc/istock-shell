<!--
@component
ShDataListOption 数据列表选项组件

一个灵活的数据列表选项组件，用于在 DataList 中渲染单个选项。
基于原生 HTML option 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持选项标签和值的配置
- 提供自定义选项内容插槽
- 继承所有原生 option 元素的属性和事件
- 支持泛型值类型，提供类型安全
- 智能内容回退机制（label -> value -> 空字符串）
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShDataListOption } from '@istock-shell/ui';
</script>

<p>基础选项</p>
<ShDataListOption label="选项1" value="value1" />

<p>仅值选项</p>
<ShDataListOption value="simple-value" />

<p>自定义内容选项</p>
<ShDataListOption value="custom">
  <span class="font-bold">自定义选项内容</span>
  <small class="text-gray-500">附加描述信息</small>
</ShDataListOption>

<p>带属性的选项</p>
<ShDataListOption
  label="禁用选项"
  value="disabled-option"
  disabled
/>
```
-->

<script lang="ts" module>
  // 导入HTML元素属性类型
  import type { HTMLAttributes } from 'svelte/elements';

  /**
   * 数据列表选项组件属性接口
   * 继承所有原生 option 元素的 HTML 属性，并扩展选项特有的功能属性
   * 支持泛型值类型，提供更好的类型安全性
   *
   * @template V - 选项值的类型，默认为 any
   * @typedef {HTMLAttributes<HTMLOptionElement> & DataListOptionPropsExtension} DataListOptionProps
   */
  export interface DataListOptionProps<V = any> extends HTMLAttributes<HTMLOptionElement> {
    /** 选项标签文本，用于显示给用户的可读文本 */
    label?: string;
    /** 选项值，表单提交时的实际值，支持泛型类型 */
    value?: V;
  }
</script>

<script lang="ts">
  // 解构props并设置默认值
  const {
    label = '', // 选项标签文本，默认为空字符串
    value, // 选项值，支持任意类型
    children, // 子内容插槽，用于自定义选项内容
    ...otherProps // 其他原生option元素属性
  }: DataListOptionProps = $props();
</script>

<!-- 选项元素：基于原生option元素，透传值属性和其他原生属性 -->
<option {value} {...otherProps}>
  {#if children}
    <!-- 自定义内容渲染：优先渲染通过插槽传入的自定义内容 -->
    {@render children()}
  {:else}
    <!-- 显示标签文本，如果没有则显示值，都没有则显示空字符串 -->
    {label ?? value ?? ''}
  {/if}
</option>
