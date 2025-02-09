<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { RadioVariantConfig } from '../../../theme/config';
  import type { RadioItemOption, RadioItemColor, RadioItemSize } from './RadioItem.svelte';
  import ShRadioItem from './RadioItem.svelte';

  const radioLabelVariantConfig = RadioVariantConfig;
  export type RadioLabelType = keyof (typeof radioLabelVariantConfig)['variants']['type'];

  // 标签配置接口
  export type RadioLabel = {
    type?: RadioLabelType; // 标签样式类型
    position?: 'before' | 'after'; // 标签位置
    class?: string; // 自定义类名
  };

  // 组件属性接口（继承并扩展HTML输入属性）
  export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
    color?: RadioItemColor; // 颜色主题
    size?: RadioItemSize; // 尺寸配置
    options?: RadioItemOption[]; // 选项数据源
    label?: RadioLabel; // 标签配置
    wrapClass?: string; // 外层容器类名
    onChangeValue?: <T>(value: T, option?: RadioItemOption<T>) => void; // 值变更回调
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';

  let {
    value = $bindable(), // 双向绑定的当前值
    options = [], // 选项列表
    label, // 标签配置
    disabled, // 禁用状态
    wrapClass, // 容器类名
    onChangeValue, // 变更回调
    ...otherProps // 其他透传属性
  }: RadioProps = $props();

  // 创建标签样式生成器
  const radioLabelVariants = tv(radioLabelVariantConfig);

  // 值变化时触发onChangeValue回调
  $effect(() => {
    onChangeValue?.(value, findByKeyForValue(options, value, 'value'));
  });
</script>

<!-- 外层容器 -->
<div class={[tuc(['inline-flex', 'gap-2']), wrapClass ?? '']}>
  {#each options as opt}
    {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
    {#if opt.label}
      <!-- 带标签的单选项 -->
      <label class={tuc(radioLabelVariants({ type: label?.type, color: otherProps.color }), label?.class ?? '')}>
        {#if label?.position === 'before'}
          <!-- 前置标签 -->
          <span class={tuc(radioLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
        {/if}

        <!-- 单选按钮组件 -->
        <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {...otherProps} />

        {#if !label?.position || label?.position === 'after'}
          <!-- 后置标签 -->
          <span class={tuc(radioLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
        {/if}
      </label>
    {:else}
      <!-- 无标签单选按钮 -->
      <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {...otherProps} />
    {/if}
  {/each}
</div>
