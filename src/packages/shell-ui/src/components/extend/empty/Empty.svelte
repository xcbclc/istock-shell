<!--
@component
ShEmpty 空状态展示组件

一个功能丰富的空状态展示组件，用于显示无数据或空内容的状态。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种预设图标类型（empty, info）
- 提供自定义文本内容显示
- 支持完全自定义内容渲染
- 内置居中布局和间距设计
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShEmpty } from '@istock-shell/ui';
</script>

<p>基础空状态</p>
<ShEmpty />

<p>自定义文本的空状态</p>
<ShEmpty text="暂无搜索结果" />

<p>信息类型的空状态</p>
<ShEmpty name="info" text="暂无相关信息" />

<p>完全自定义内容的空状态</p>
<ShEmpty>
  <div class="flex flex-col items-center">
    <img src="/empty.png" alt="empty" />
    <p>自定义空状态内容</p>
  </div>
</ShEmpty>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';

  /**
   * 空状态图标类型定义
   * 支持的图标类型包括：empty（空状态）、info（信息提示）
   * @typedef {'empty' | 'info'} EmptyName
   */
  export type EmptyName = 'empty' | 'info';

  /**
   * 空状态组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展空状态组件特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & EmptyPropsExtension} EmptyProps
   */
  export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
    /** 图标名称，控制显示的图标类型，默认为 'empty' */
    name?: EmptyName;
    /** 显示文本内容，空状态的提示文字，默认为 '暂无数据' */
    text?: string;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { ShText, ShIcon } from '../../index';

  const {
    name = 'empty', // 图标名称，控制显示的图标类型（默认为'empty'）
    text = '暂无数据', // 显示文本内容，空状态的提示文字（默认为'暂无数据'）
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽，用于自定义空状态内容
    ...otherProps // 其他原生div元素属性
  }: EmptyProps = $props();
</script>

<!--
  空状态容器：基于原生div元素，应用默认样式类和自定义类名，透传所有原生属性
  默认样式包括：垂直居中布局、间距设置、内边距配置
-->
<div class={[tuc('empty gap-2 p-10'), className]} {...otherProps}>
  {#if children}
    <!--
      自定义内容渲染模式
      当存在子内容插槽时，优先渲染自定义内容
      适用于需要完全自定义空状态展示的场景
    -->
    {@render children()}
  {:else}
    <!-- 空状态图标：根据name属性选择对应图标，info类型显示问号图标，其他显示对应名称图标 -->
    <ShIcon size={48} name={name === 'info' ? 'question' : name} />
    <!-- 空状态文本：使用小号字体显示提示文字 -->
    <ShText size="sm" texts={[{ text }]} />
  {/if}
</div>

<style>
  @reference "../../../style/daisyui.css";
  .empty {
    @apply flex flex-col items-center justify-center;
  }
</style>
