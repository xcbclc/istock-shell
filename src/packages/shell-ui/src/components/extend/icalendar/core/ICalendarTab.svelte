<!--
@component
日历标签页切换组件，用于实现日、周、月视图的切换功能。

特点：
- 支持自定义标签页按钮样式和事件
- 使用join样式实现按钮组效果
- 响应式布局和交互

用法示例:
```html
<ShICalendarTab
  tabs={[
    { text: '天', color: 'primary', onclick: () => {} },
    { text: '周', onclick: () => {} },
    { text: '月', onclick: () => {} }
  ]}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { ShButton, type ButtonProps } from '../../../index';

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
