<!--
@component
ShICalendarTab 日历标签页切换组件

一个专门用于实现日历视图切换的标签页组件，支持日、周、月等多种视图模式的切换。
基于 ShButton 组件构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持自定义标签页按钮样式和事件处理
- 使用 join 样式实现无缝按钮组效果
- 支持任意数量的标签页配置
- 每个标签页都支持完整的 ButtonProps 配置
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式布局和交互

示例用法：
```svelte
<script lang="ts">
  import { ShICalendarTab } from '@istock-shell/ui';

  let currentView = 'week';

  const tabs = [
    {
      text: '天',
      color: currentView === 'day' ? 'primary' : undefined,
      onclick: () => { currentView = 'day'; }
    },
    {
      text: '周',
      color: currentView === 'week' ? 'primary' : undefined,
      onclick: () => { currentView = 'week'; }
    },
    {
      text: '月',
      color: currentView === 'month' ? 'primary' : undefined,
      onclick: () => { currentView = 'month'; }
    }
  ];
</script>

<p>基础标签页</p>
<ShICalendarTab tabs={tabs} />

<p>自定义样式的标签页</p>
<ShICalendarTab
  tabs={[
    { text: '日视图', size: 'sm', variant: 'outline' },
    { text: '周视图', size: 'sm', variant: 'outline' },
    { text: '月视图', size: 'sm', variant: 'outline' }
  ]}
  class="custom-tab-group"
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { ShButton, type ButtonProps } from '../../../action/button/index';

  /**
   * 日历标签页组件属性接口
   * @extends HTMLAttributes<HTMLDivElement> - 继承HTML div元素的所有原生属性
   */
  export interface ICalendarTabProps extends HTMLAttributes<HTMLDivElement> {
    /** 标签页按钮配置数组，每个按钮都是一个ButtonProps类型的对象 */
    tabs: Array<ButtonProps<'button'>>;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const {
    tabs = [],
    class: className = '', // 自定义类名
    children,
    ...otherProps // 其他原生属性
  }: ICalendarTabProps = $props();
</script>

<!-- 标签页容器，使用join样式实现按钮组效果 -->
<div class={[tuc('join'), className]} {...otherProps}>
  {#each tabs as tab}
    <ShButton size="xs" {...tab} />
  {/each}
</div>

<style></style>
