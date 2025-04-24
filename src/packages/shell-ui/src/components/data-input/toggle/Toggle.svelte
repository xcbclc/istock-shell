<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { ToggleVariantConfig } from '../../../theme/config';

  const toggleVariantConfig = ToggleVariantConfig;

  // 定义开关颜色主题类型（从配置中提取）
  export type ToggleColor = keyof (typeof toggleVariantConfig)['variants']['color'];
  // 定义开关尺寸类型（从配置中提取）
  export type ToggleSize = keyof (typeof toggleVariantConfig)['variants']['size'];

  // 标签配置接口
  export type ToggleLabel = {
    placement?: 'before' | 'after'; // 标签位置
    class?: string; // 自定义类名
  };

  // 组件属性接口（继承并扩展HTML输入属性）
  export interface ToggleProps extends Omit<HTMLInputAttributes, 'size'> {
    color?: ToggleColor; // 颜色主题
    size?: ToggleSize; // 尺寸配置
    label?: ToggleLabel; // 标签配置
    value?: boolean; // 开关状态
    onChangeValue?: (value: boolean) => void; // 状态变更回调
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(false), // 双向绑定的开关状态（默认false）
    color, // 颜色主题
    size, // 尺寸配置
    label, // 标签配置
    class: className = '', // 自定义类名
    onChangeValue, // 变更回调
    children, // 子内容（用于标签）
    ...otherProps // 其他原生属性
  }: ToggleProps = $props();

  // 创建开关样式变体生成器
  const toggleVariants = tv(toggleVariantConfig, {
    responsiveVariants: ['size'], // 响应式尺寸配置
  });

  // 状态变化时触发onChangeValue回调
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

{#if label ?? children}
  <!-- 带标签的开关布局 -->
  <label class={tuc(toggleVariants({ color, size }), label?.class ?? '')}>
    {#if label?.placement === 'before'}
      <!-- 前置标签内容 -->
      {@render children?.()}
    {/if}
    <!-- 开关输入元素 -->
    <input bind:checked={value} type="checkbox" class={[className]} {...otherProps} />
    {#if !label?.placement || label?.placement === 'after'}
      <!-- 后置标签内容 -->
      {@render children?.()}
    {/if}
  </label>
{:else}
  <!-- 无标签基础开关 -->
  <input
    bind:checked={value}
    type="checkbox"
    class={[tuc(toggleVariants({ color, size })), className]}
    {...otherProps}
  />
{/if}

<style></style>
