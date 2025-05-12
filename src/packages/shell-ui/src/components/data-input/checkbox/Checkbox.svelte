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

  // 定义标签类型（从主题配置中提取可用类型）
  export type CheckboxLabelType = keyof (typeof checkboxLabelVariantConfig)['variants']['type'];

  // 标签配置接口
  export type CheckboxLabel = {
    type?: CheckboxLabelType; // 标签样式类型
    placement?: 'before' | 'after'; // 标签位置（选项前/后）
    class?: string; // 自定义类名
  };

  // Checkbox组件属性接口
  export interface CheckboxProps extends Omit<CheckboxItemProps, 'option' | 'groupValue'> {
    color?: CheckboxItemColor; // 颜色主题
    size?: CheckboxItemSize; // 尺寸配置
    options?: CheckboxItemOption[]; // 选项数据源
    label?: CheckboxLabel; // 标签配置
    onChangeValue?: <T>(value: T[], option?: Array<CheckboxItemOption<T>>) => void; // 值变更回调
    value?: any[]; // 当前选中值数组
    wrapClass?: string; // 外层容器类名
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';

  let {
    value = $bindable([]), // 双向绑定的选中值数组
    options = [], // 选项列表
    label, // 标签配置
    disabled, // 禁用状态
    wrapClass, // 容器类名
    onChangeValue, // 值变更回调
    ...otherProps // 其他透传属性
  }: CheckboxProps = $props();

  // 根据当前value生成选中状态数组
  const checkedList = $derived.by(() => {
    return options.map((opt) => {
      return (value ?? []).includes(opt.value);
    });
  });

  // 创建标签样式生成器
  const checkboxLabelVariants = tv(checkboxLabelVariantConfig);

  // 当value变化时触发onChangeValue回调
  $effect(() => {
    onChangeValue?.(
      value,
      (value ?? []).map((v) => findByKeyForValue(options, v, 'value')).filter((v) => !!v)
    );
  });

  // 获取当前选中值数组
  const getGroupValue = () => value;

  // 更新选中值数组（根据index更新对应选项状态）
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
  {#each options as opt, index}
    {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
    <!-- 计算禁用状态 -->

    {#if opt.label}
      <!-- 带标签的复选框项 -->
      <label
        class={tuc(
          checkboxLabelVariants({ type: label?.type, size: otherProps.size, color: otherProps.color }),
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
</div>
