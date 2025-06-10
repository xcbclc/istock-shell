<!--
  @component ShStatFigure 统计项图形组件

  一个专门用于统计项图形展示的组件，支持图标、图片和自定义内容。
  基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持图标和自定义内容两种展示模式
  - 通过 icon 属性配置图标的名称、颜色等属性
  - 内置响应式设计支持
  - 支持无障碍访问特性
  - 继承所有原生 div 元素属性
  - 完整的 TypeScript 类型安全
  - 优先级渲染：自定义内容 > 图标

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShStatFigure } from '@istock-shell/ui';
  </script>

  <p>图标模式</p>
  <ShStatFigure
    icon={{ name: 'chart-line', color: 'primary' }}
  />

  <p>自定义内容</p>
  <ShStatFigure>
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
      <Icon name="trending-up" class="text-white" />
    </div>
  </ShStatFigure>

  <p>带样式的图标</p>
  <ShStatFigure
    icon={{ name: 'users', color: 'success' }}
    class="bg-success/10 rounded-lg p-2"
  />
  ```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { IconProps } from '../../index';

  /**
   * 统计项图形组件属性接口
   * 继承原生 div 元素的所有属性，并扩展图形展示相关的配置选项
   */
  export interface StatFigureProps extends HTMLAttributes<HTMLDivElement> {
    icon?: IconProps; // 图标配置
  }
</script>

<script lang="ts">
  // 导入组件和工具
  import { tuc } from '@istock-shell/util';
  // 导入图标组件
  import { ShIcon } from '../../index';

  const { icon, class: className = '', children, ...otherProps }: StatFigureProps = $props();
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
