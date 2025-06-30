<!--
@component
ShCheckbox 复选框组件

一个功能丰富的复选框组件，支持多选、标签配置和自定义样式。
基于 Tailwind CSS和DaisyUi 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种颜色主题和尺寸规格
- 支持选项列表批量渲染
- 可配置标签位置（前置/后置）和样式
- 支持双向数据绑定
- 支持单个或批量禁用状态
- 内置值变更回调机制
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<p>基础复选框组</p>
<ShCheckbox
  options={[
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' }
  ]}
  bind:value={selectedValues}
/>

<p>带颜色和尺寸的复选框</p>
<ShCheckbox
  color="primary"
  size="lg"
  options={colorOptions}
  bind:value={colorValues}
  onChangeValue={(values, options) => console.log('选中:', values)}
/>

<p>前置标签的复选框</p>
<ShCheckbox
  options={labelOptions}
  label={{ placement: 'before', type: 'primary' }}
  bind:value={labelValues}
/>

<p>自定义样式的复选框</p>
<ShCheckbox
  options={customOptions}
  wrapClass="grid grid-cols-2 gap-4"
  label={{ class: 'font-bold text-blue-600' }}
  bind:value={customValues}
/>
```
-->
<script lang="ts" module>
  import { CheckboxVariantConfig } from '../../../theme/config';
  import type {
    CheckboxItemProps,
    CheckboxItemOption,
    CheckboxItemColor,
    CheckboxItemSize,
  } from './CheckboxItem.svelte';
  import ShCheckboxItem from './CheckboxItem.svelte';

  // 获取Checkbox组件的主题配置
  const checkboxLabelVariantConfig = CheckboxVariantConfig;

  /**
   * 复选框标签类型（从主题配置中动态提取）
   * 支持多种预设标签样式
   * @typedef {keyof CheckboxVariantConfig['variants']['type']} CheckboxLabelType
   */
  export type CheckboxLabelType = keyof (typeof checkboxLabelVariantConfig)['variants']['type'];

  /**
   * 复选框标签配置接口
   * 用于控制标签的样式、位置和自定义类名
   */
  export type CheckboxLabel = {
    /** 标签样式类型 */
    type?: CheckboxLabelType;
    /** 标签相对于复选框的位置 @default 'after' */
    placement?: 'before' | 'after';
    /** 自定义CSS类名，用于进一步定制标签样式 */
    class?: string;
  };

  /**
   * 复选框组件属性接口
   * 继承 CheckboxItem 组件的属性，并扩展复选框组特有的功能
   * 排除了单个复选框项的 option 和 groupValue 属性
   */
  export interface CheckboxProps extends Omit<CheckboxItemProps, 'option' | 'groupValue'> {
    /** 复选框颜色主题，支持多种预设颜色 */
    color?: CheckboxItemColor;
    /** 复选框尺寸规格，从小到大多种选择 */
    size?: CheckboxItemSize;
    /** 选项数据源数组，用于批量渲染复选框项 @default [] */
    options?: CheckboxItemOption[];
    /** 标签配置对象，控制标签的显示和样式 */
    label?: CheckboxLabel;
    /** 值变更回调函数，当选中状态改变时触发 */
    onChangeValue?: <T>(value: T[], option?: Array<CheckboxItemOption<T>>) => void;
    /** 当前选中值数组，支持双向绑定 @default [] */
    value?: any[];
    /** 外层容器的自定义CSS类名 */
    wrapClass?: string;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock-shell/util';

  let {
    /** 双向绑定的选中值数组，存储当前选中项的值 */
    value = $bindable([]),
    /** 选项列表，定义可选择的复选框项 */
    options = [],
    /** 标签配置对象，控制标签样式和位置 */
    label,
    /** 全局禁用状态，影响所有复选框项 */
    disabled = false,
    /** 外层容器的自定义CSS类名 */
    wrapClass,
    /** 值变更回调函数，选中状态改变时触发 */
    onChangeValue,
    children,
    /** 其他透传给子组件的属性 */
    ...otherProps
  }: CheckboxProps = $props();

  /**
   * 响应式计算选中状态数组
   * 根据当前选中值数组生成每个选项的选中状态
   * 使用 $derived.by 确保在 value 或 options 变化时重新计算
   */
  const checkedList = $derived.by(() => {
    return options.map((opt) => {
      return (value ?? []).includes(opt.value);
    });
  });

  /**
   * 创建标签的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const checkboxLabelVariants = tv(checkboxLabelVariantConfig);

  /**
   * 监听值变化的副作用
   * 当选中值数组发生变化时，触发 onChangeValue 回调
   * 同时传递选中的值数组和对应的选项对象数组
   */
  $effect(() => {
    onChangeValue?.(
      value,
      (value ?? []).map((v) => findByKeyForValue(options, v, 'value')).filter((v) => !!v)
    );
  });

  /**
   * 获取当前选中值数组
   * 用于双向绑定，返回当前的选中状态
   * @returns {any[]} 当前选中的值数组
   */
  const getGroupValue = () => value;

  /**
   * 更新选中值数组
   * 根据指定索引的复选框状态变化，更新整体的选中值数组
   * @param {any[]} newValue - 新的组值（通常是单个值的数组）
   * @param {number} index - 发生变化的复选框项索引
   */
  const setGroupValue = (newValue: any[], index: number) => {
    const checkedTempList = [...checkedList];
    checkedTempList[index] = !!newValue.length;
    value = options
      .filter((_opt, index) => {
        return checkedTempList[index];
      })
      .map((opt) => opt.value);
  };
</script>

<!-- 外层容器 -->
<!-- eslint-disable no-sequences -->
<div class={[tuc(['inline-flex flex-wrap', 'gap-2']), wrapClass ?? '']}>
  {#if children}
    {@render children()}
  {:else}
    {#each options as opt, index}
      {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
      <!-- 计算禁用状态 -->

      {#if opt.label}
        <!-- 带标签的复选框项 -->
        <label
          class={tuc(
            checkboxLabelVariants({
              type: label?.type,
              size: otherProps.size,
              color: otherProps.color,
            }),
            label?.class ?? ''
          )}
        >
          {#if label?.placement === 'before'}
            <!-- 前置标签 -->
            <span class={tuc(checkboxLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
          {/if}

          <!-- 复选框组件 -->
          <ShCheckboxItem
            bind:groupValue={
              getGroupValue,
              (newValue) => {
                setGroupValue(newValue, index);
              }
            }
            value={opt.value}
            disabled={itemDisabled}
            {...otherProps}
          />

          {#if !label?.placement || label?.placement === 'after'}
            <!-- 后置标签 -->
            <span class={tuc(checkboxLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
          {/if}
        </label>
      {:else}
        <!-- 无标签的复选框项 -->
        <ShCheckboxItem
          bind:groupValue={
            getGroupValue,
            (newValue) => {
              setGroupValue(newValue, index);
            }
          }
          value={opt.value}
          disabled={itemDisabled}
          {...otherProps}
        />
      {/if}
    {/each}
  {/if}
</div>
