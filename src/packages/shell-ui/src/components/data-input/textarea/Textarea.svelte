<script lang="ts" module>
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { TextareaVariantConfig } from '../../../theme/config';

  const textareaVariantConfig = TextareaVariantConfig;

  // 定义颜色主题类型（从配置中提取）
  export type TextareaColor = keyof (typeof textareaVariantConfig)['variants']['color'];
  // 定义尺寸类型（从配置中提取）
  export type TextareaSize = keyof (typeof textareaVariantConfig)['variants']['size'];
  // 定义变体类型（从配置中提取）
  export type TextareaVariant = keyof (typeof textareaVariantConfig)['variants']['variant'];

  // 组件属性接口（继承并调整文本域属性）
  export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'size'> {
    color?: TextareaColor; // 颜色主题
    size?: TextareaSize; // 尺寸配置
    variant?: TextareaVariant; // 样式变体
    value?: string; // 文本值
    onChangeValue?: (value?: string) => void; // 值变更回调
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(), // 双向绑定的文本值
    color, // 颜色主题
    size, // 尺寸配置
    variant, // 样式变体
    class: className = '', // 自定义类名
    onChangeValue, // 变更回调
    ...otherProps // 其他原生属性
  }: TextareaProps = $props();

  // 创建文本域样式变体生成器
  const textareaVariants = tv(textareaVariantConfig, {});

  // 值变化时触发onChangeValue回调
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

<!-- 文本域元素 -->
<textarea bind:value class={[tuc(textareaVariants({ color, size, variant })), className]} {...otherProps}></textarea>

<style></style>
