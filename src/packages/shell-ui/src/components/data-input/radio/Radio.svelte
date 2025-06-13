<!--
@component
ShRadio 单选按钮组组件

一个功能丰富的单选按钮组组件，支持多种样式配置和灵活的标签布局。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种颜色主题和尺寸规格
- 灵活的标签配置（前置/后置位置，自定义样式）
- 支持选项级别的禁用状态控制
- 双向数据绑定，支持响应式值变更
- 完整的 TypeScript 类型安全
- 基于选项数据源的动态渲染
- 支持值变更回调函数
- 响应式设计支持

示例用法：
```svelte
<p>基础单选按钮组</p>
<ShRadio
  bind:value={selectedValue}
  options={[
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' }
  ]}
/>

<p>带颜色和尺寸的单选按钮组</p>
<ShRadio
  bind:value={selectedValue}
  color="primary"
  size="lg"
  options={radioOptions}
  label={{ type: 'bordered', placement: 'after' }}
/>

<p>自定义样式的单选按钮组</p>
<ShRadio
  bind:value={selectedValue}
  options={radioOptions}
  label={{ type: 'soft', placement: 'before', class: 'custom-label' }}
  wrapClass="custom-wrapper"
  onChangeValue={(value, option) => console.log('选中:', value, option)}
/>

<p>部分禁用的单选按钮组</p>
<ShRadio
  bind:value={selectedValue}
  options={[
    { value: 'option1', label: '可选项1' },
    { value: 'option2', label: '禁用项', disabled: true },
    { value: 'option3', label: '可选项3' }
  ]}
/>
```
-->
<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { RadioVariantConfig } from '../../../theme/config';
  import type { RadioItemOption, RadioItemColor, RadioItemSize } from './RadioItem.svelte';
  import ShRadioItem from './RadioItem.svelte';

  const radioLabelVariantConfig = RadioVariantConfig;

  /**
   * 单选按钮标签样式类型（从主题配置中动态提取）
   * 支持多种预设的标签样式变体
   * @typedef {keyof RadioVariantConfig['variants']['type']} RadioLabelType
   */
  export type RadioLabelType = keyof (typeof radioLabelVariantConfig)['variants']['type'];

  /**
   * 标签配置接口
   * 用于定义单选按钮组的标签显示样式和位置
   */
  export type RadioLabel = {
    /** 标签样式类型，支持多种预设样式 */
    type?: RadioLabelType;
    /** 标签相对于单选按钮的位置 @default 'after' */
    placement?: 'before' | 'after';
    /** 自定义CSS类名，用于进一步定制标签样式 */
    class?: string;
  };

  /**
   * 单选按钮组组件属性接口
   * 继承原生 HTML input 元素的所有属性（除了 size），并扩展单选按钮组特有功能
   */
  export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
    /** 颜色主题，影响单选按钮的视觉样式 */
    color?: RadioItemColor;
    /** 尺寸规格，控制单选按钮和标签的大小 */
    size?: RadioItemSize;
    /** 选项数据源，定义所有可选的单选按钮项 @default [] */
    options?: RadioItemOption[];
    /** 标签配置，控制标签的样式和位置 */
    label?: RadioLabel;
    /** 外层容器的自定义CSS类名 */
    wrapClass?: string;
    /** 值变更回调函数，当选中值改变时触发 */
    onChangeValue?: <T>(value: T, option?: RadioItemOption<T>) => void;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock-shell/util';

  let {
    value = $bindable(), // 双向绑定的当前值
    options = [], // 选项列表
    label, // 标签配置
    size,
    disabled = false, // 禁用状态
    wrapClass, // 容器类名
    onChangeValue, // 变更回调
    children,
    ...otherProps // 其他透传属性
  }: RadioProps = $props();

  /**
   * 创建标签的Tailwind变体样式生成器
   * 基于配置生成响应式标签样式类名
   */
  const radioLabelVariants = tv(radioLabelVariantConfig);

  /**
   * 响应式效果：监听值变化并触发回调
   * 当选中值改变时，自动查找对应的选项对象并触发回调函数
   */
  $effect(() => {
    onChangeValue?.(value, findByKeyForValue(options, value, 'value'));
  });
</script>

<!--
  单选按钮组容器
  使用 flexbox 布局，支持自动换行和间距控制
  提供响应式的单选按钮组渲染，支持标签和无标签两种模式
-->
<div class={[tuc(['inline-flex flex-wrap', 'gap-2']), wrapClass ?? '']}>
  {#if children}
    {@render children()}
  {:else}
    {#each options as opt}
      {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
      {#if opt.label}
        <!-- 带标签的单选项 -->
        <label class={tuc(radioLabelVariants({ type: label?.type, color: otherProps.color }), label?.class ?? '')}>
          {#if label?.placement === 'before'}
            <!-- 前置标签：显示在单选按钮之前 -->
            <span class={tuc(radioLabelVariants({ size, disabled: itemDisabled }))}>{opt.label}</span>
          {/if}

          <!--
            单选按钮核心组件
            支持双向数据绑定和完整的状态管理
            继承所有父级配置和透传属性
          -->
          <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {size} {...otherProps} />

          {#if !label?.placement || label?.placement === 'after'}
            <!-- 后置标签：显示在单选按钮之后（默认位置） -->
            <span class={tuc(radioLabelVariants({ size, disabled: itemDisabled }))}>{opt.label}</span>
          {/if}
        </label>
      {:else}
        <!--
          无标签单选按钮项
          直接渲染单选按钮组件，适用于纯图标或自定义内容场景
        -->
        <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {size} {...otherProps} />
      {/if}
    {/each}
  {/if}
</div>
