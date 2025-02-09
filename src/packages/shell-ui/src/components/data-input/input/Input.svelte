<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { getComponentConfig } from '../../../theme/config';

  // 获取输入框组件主题配置
  const inputVariantConfig = getComponentConfig('Input');

  // 定义输入框颜色主题类型（从配置中提取）
  export type InputColor = keyof (typeof inputVariantConfig)['variants']['color'];
  // 定义输入框尺寸类型（从配置中提取）
  export type InputSize = keyof (typeof inputVariantConfig)['variants']['size'];
  // 定义输入框变体类型（从配置中提取）
  export type InputVariant = keyof (typeof inputVariantConfig)['variants']['variant'];

  // 支持的输入类型集合
  export type InputType =
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'month'
    | 'tel'
    | 'url'
    | 'search'
    | 'time';

  interface InputBaseProps {
    color?: InputColor; // 颜色主题
    size?: InputSize; // 尺寸配置
    variant?: InputVariant; // 样式变体
    validator?: boolean; // 验证状态指示
    prefixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>; // 前缀渲染函数
    suffixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>; // 后缀渲染函数
  }

  // 处理不同输入类型的属性差异
  type InputPropsUnion =
    | (Omit<HTMLInputAttributes, 'size' | 'type' | 'value'> &
        InputBaseProps & {
          type: 'number';
          value?: number;
          onChangeValue?: (value?: number) => void; // 数字类型变更回调
        })
    | (Omit<HTMLInputAttributes, 'size' | 'type' | 'value'> &
        InputBaseProps & {
          type?: Exclude<InputType, 'number'>;
          value?: string;
          onChangeValue?: (value?: string) => void; // 文本类型变更回调
        });

  export type InputProps = InputPropsUnion;

  // 输入框渲染选项接口（用于前后缀渲染）
  export interface InputRenderOption {
    color?: InputColor; // 颜色主题
    size?: InputSize; // 尺寸配置
    variant?: InputVariant; // 样式变体
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(), // 双向绑定的值
    type = 'text', // 默认文本类型
    color, // 颜色主题
    size, // 尺寸配置
    variant, // 样式变体
    validator = true, // 默认开启验证
    class: className = '', // 自定义类名
    prefixRender, // 前缀渲染函数
    suffixRender, // 后缀渲染函数
    onChangeValue, // 值变更回调
    ...otherProps // 其他原生属性
  }: InputProps = $props();

  // 创建输入框样式变体生成器
  const inputVariants = tv(inputVariantConfig, {
    responsiveVariants: ['size'], // 响应式尺寸配置
  });

  // 值变化时触发onChangeValue回调
  $effect(() => {
    if (type === 'number') {
      onChangeValue?.(value === undefined ? undefined : Number(value));
    } else {
      onChangeValue?.(value);
    }
  });
</script>

{#if prefixRender ?? suffixRender}
  <!-- 带前后缀的输入框布局 -->
  <label class={[tuc(inputVariants({ color, size, variant, validator })), className]}>
    {@render prefixRender?.({ color, size, variant })}
    <input bind:value {type} {...otherProps} />
    {@render suffixRender?.({ color, size, variant })}
  </label>
{:else}
  <!-- 基础输入框 -->
  <input
    bind:value
    class={[tuc(inputVariants({ color, size, variant, validator })), className]}
    {type}
    {...otherProps}
  />
{/if}

<style></style>
