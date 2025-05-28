<!--
@component
日历日期选择组件，用于显示当前日期并提供日期切换功能。

特点：
- 支持「今日」快捷按钮
- 提供上一个/下一个日期切换按钮
- 包含日期输入框，支持直接选择日期
- 响应式布局和交互

用法示例:
```html
<ShICalendarDate
  currentDate="2024-01-01"
  button={{ text: '今日', onclick: () => {} }}
  prevButton={{ onclick: () => {} }}
  nextButton={{ onclick: () => {} }}
  inputDate={{ onChangeValue: (value) => {} }}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { ShButton, ShInput, type ButtonProps, type InputProps } from '../../../index';

  /**
   * 日历日期组件属性接口
   * @extends HTMLAttributes<HTMLDivElement> - 继承HTML div元素的所有原生属性
   */
  export interface ICalendarDateProps extends HTMLAttributes<HTMLDivElement> {
    /** 今日按钮配置，可选 */
    button?: ButtonProps<'button'>;
    /** 上一个日期按钮配置，可选 */
    prevButton?: ButtonProps<'button'>;
    /** 下一个日期按钮配置，可选 */
    nextButton?: ButtonProps<'button'>;
    /** 日期输入框配置，不包含value和type属性（这些由组件内部控制），可选 */
    inputDate?: Omit<InputProps, 'value' | 'type'>;
    /** 当前选中的日期值，格式：YYYY-MM-DD */
    currentDate?: string;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  let {
    button,
    prevButton,
    nextButton,
    inputDate,
    currentDate = $bindable(''), // 当前日期，默认为空字符串
    class: className = '', // 自定义类名
    children,
    ...otherProps // 其他原生属性
  }: ICalendarDateProps = $props();
</script>

<!-- 日期选择器容器 -->
<div class={[tuc('icalendar-date'), className]} {...otherProps}>
  <!-- 今日按钮，仅在提供button配置时显示 -->
  {#if button}
    <ShButton size="xs" outline {...button} />
  {/if}
  <!-- 日期切换区域，使用join样式实现按钮组效果 -->
  <div class={[tuc('join')]}>
    <!-- 上一个日期按钮 -->
    {#if prevButton}
      <ShButton class={tuc('join-item')} size="xs" outline {...prevButton}>&lt;</ShButton>
    {/if}
    <ShInput class={tuc('join-item')} size="xs" {...inputDate} value={currentDate} type="date" />
    <!-- 下一个日期按钮 -->
    {#if nextButton}
      <ShButton class={tuc('join-item')} size="xs" outline {...nextButton}>&gt;</ShButton>
    {/if}
  </div>
</div>

<style>
  @reference "../../../../style/daisyui.css";
  @layer components {
    /* 日期选择器容器样式 */
    :global(.icalendar-date) {
      @apply flex items-center gap-2;
    }
  }
</style>
