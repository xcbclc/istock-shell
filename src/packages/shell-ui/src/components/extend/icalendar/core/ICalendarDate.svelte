<!--
@component
ShICalendarDate 日历日期选择组件

一个功能完整的日历日期选择组件，提供直观的日期导航和选择功能。
基于 ShButton 和 ShInput 组件构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持「今日」快捷按钮，一键回到当前日期
- 提供上一个/下一个日期切换按钮，便于日期导航
- 包含日期输入框，支持直接选择日期
- 使用 join 样式实现按钮组效果
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式布局和交互

示例用法：
```svelte
<script lang="ts">
  import { ShICalendarDate } from '@istock-shell/ui';

  let currentDate = '2024-01-01';

  function handleTodayClick() {
    currentDate = new Date().toISOString().split('T')[0];
  }

  function handlePrevClick() {
    // 切换到前一天的逻辑
  }

  function handleNextClick() {
    // 切换到后一天的逻辑
  }

  function handleDateChange(value) {
    currentDate = value;
  }
</script>

<p>基础日期选择器</p>
<ShICalendarDate bind:currentDate />

<p>带今日按钮的日期选择器</p>
<ShICalendarDate
  bind:currentDate
  button={{ text: '今日', onclick: handleTodayClick }}
/>

<p>完整功能的日期选择器</p>
<ShICalendarDate
  bind:currentDate
  button={{ text: '今日', onclick: handleTodayClick }}
  prevButton={{ onclick: handlePrevClick }}
  nextButton={{ onclick: handleNextClick }}
  inputDate={{ onChangeValue: handleDateChange }}
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
    /** 今日按钮配置，可选 */
    button,
    /** 上一个日期按钮配置，可选 */
    prevButton,
    /** 下一个日期按钮配置，可选 */
    nextButton,
    /** 日期输入框配置，可选 */
    inputDate,
    /** 当前选中的日期值，格式：YYYY-MM-DD（默认空字符串） */
    currentDate = $bindable(''),
    /** 自定义CSS类名（默认空字符串） */
    class: className = '',
    /** 子内容插槽 */
    children,
    /** 其他原生div元素属性 */
    ...otherProps
  }: ICalendarDateProps = $props();
</script>

<!-- 日期选择器容器：基于原生div元素，合并默认样式类和自定义类名，透传所有原生属性 -->
<div class={[tuc('icalendar-date'), className]} {...otherProps}>
  <!-- 今日按钮：仅在提供button配置时显示，使用小尺寸轮廓样式 -->
  {#if button}
    <ShButton size="xs" outline {...button} />
  {/if}

  <!-- 日期切换区域：使用join样式实现按钮组效果，包含前后导航按钮和日期输入框 -->
  <div class={[tuc('join')]}>
    <!-- 上一个日期按钮：仅在提供prevButton配置时显示 -->
    {#if prevButton}
      <ShButton class={tuc('join-item')} size="xs" outline {...prevButton}>&lt;</ShButton>
    {/if}

    <!-- 日期输入框：使用原生date类型，支持日期选择器 -->
    <ShInput class={tuc('join-item')} size="xs" {...inputDate} value={currentDate} type="date" />

    <!-- 下一个日期按钮：仅在提供nextButton配置时显示 -->
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
