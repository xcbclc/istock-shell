<!--
@component
ShTextarea 文本域组件

一个功能丰富的多行文本输入组件，支持多种样式变体、尺寸和颜色主题。
基于原生 HTML textarea 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种颜色主题（从主题配置中动态提取）
- 提供多种尺寸规格（从主题配置中动态提取）
- 支持多种样式变体（从主题配置中动态提取）
- 支持双向数据绑定
- 内置值变化监听和回调
- 完整的原生 textarea 属性支持
- TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<p>基础文本域</p>
<ShTextarea placeholder="请输入内容" />

<p>带颜色主题的文本域</p>
<ShTextarea
  color="primary"
  size="lg"
  placeholder="主要样式文本域"
/>

<p>双向绑定的文本域</p>
<ShTextarea
  bind:value={content}
  variant="bordered"
  onChangeValue={handleChange}
  placeholder="输入您的评论"
/>

<p>自定义样式的文本域</p>
<ShTextarea
  class="min-h-32 resize-none"
  color="secondary"
  size="sm"
  rows={5}
  placeholder="固定高度文本域"
/>
```
-->
<script lang="ts" module>
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { TextareaVariantConfig } from '../../../theme/config';

  const textareaVariantConfig = TextareaVariantConfig;

  /**
   * 文本域颜色类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof TextareaVariantConfig['variants']['color']} TextareaColor
   */
  export type TextareaColor = keyof (typeof textareaVariantConfig)['variants']['color'];

  /**
   * 文本域尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格
   * @typedef {keyof TextareaVariantConfig['variants']['size']} TextareaSize
   */
  export type TextareaSize = keyof (typeof textareaVariantConfig)['variants']['size'];

  /**
   * 文本域样式变体类型（从主题配置中动态提取）
   * 支持多种视觉样式变体
   * @typedef {keyof TextareaVariantConfig['variants']['variant']} TextareaVariant
   */
  export type TextareaVariant = keyof (typeof textareaVariantConfig)['variants']['variant'];

  /**
   * 文本域组件属性接口
   * 继承原生 textarea 元素的所有属性，并扩展文本域特有的样式和行为属性
   * 排除原生 size 属性以避免与组件 size 属性冲突
   */
  export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'size'> {
    /** 文本域颜色主题，支持多种预设颜色 */
    color?: TextareaColor;
    /** 文本域尺寸规格，从小到大多种选择 */
    size?: TextareaSize;
    /** 文本域样式变体，支持不同的视觉风格 */
    variant?: TextareaVariant;
    /** 文本域的值，支持双向绑定 */
    value?: string;
    /** 值变化时的回调函数，接收新的文本值作为参数 */
    onChangeValue?: (value?: string) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(), // 双向绑定的文本值，支持父组件读写
    color, // 文本域颜色主题
    size, // 文本域尺寸规格
    variant, // 文本域样式变体
    class: className = '', // 自定义CSS类名
    onChangeValue, // 值变化时的回调函数
    ...otherProps // 其他原生 textarea 元素属性
  }: TextareaProps = $props();

  /**
   * 创建文本域的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const textareaVariants = tv(textareaVariantConfig, {});

  /**
   * 监听值变化并触发回调
   * 使用 $effect 响应式地监听 value 变化，并调用 onChangeValue 回调
   */
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

<!--
  文本域输入元素
  使用原生 textarea 元素作为基础，支持完整的样式定制和属性配置
  - bind:value: 双向绑定文本值，支持父组件读写
  - class: 合并样式变体生成的类名和自定义类名
  - {...otherProps}: 透传所有其他原生 textarea 属性（如 placeholder, rows, cols 等）
-->
<textarea bind:value class={[tuc(textareaVariants({ color, size, variant })), className]} {...otherProps}></textarea>

<style></style>
