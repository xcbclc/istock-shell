<!--
@component
ShKbd 键盘按键组件

一个用于显示键盘按键样式的组件，模拟真实键盘按键的视觉效果。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种尺寸规格（从主题配置中动态提取）
- 支持自定义按键文本内容
- 支持子内容插槽，可渲染复杂的按键内容
- 继承所有原生 HTML 元素的属性和事件
- 完整的响应式设计支持
- TypeScript 类型安全
- 模拟真实键盘按键的视觉效果

示例用法：
```svelte
<p>基础按键</p>
<ShKbd text="Enter" />

<p>功能键组合</p>
<ShKbd text="⌘" size="sm" />
<ShKbd text="Shift" size="md" />
<ShKbd text="Ctrl" size="lg" />

<p>自定义内容的按键</p>
<ShKbd size="md">
  <span class="text-xs font-bold">Space</span>
</ShKbd>

<p>可交互的按键</p>
<ShKbd
  text="Esc"
  onclick={handleEscapeKey}
  class="cursor-pointer hover:bg-gray-100"
/>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { KbdVariantConfig } from '../../../theme/config';

  const kbdVariantConfig = KbdVariantConfig;

  /**
   * 键盘按键尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格
   * @typedef {keyof KbdVariantConfig['variants']['size']} KbdSize
   */
  export type KbdSize = keyof (typeof kbdVariantConfig)['variants']['size'];

  /**
   * 键盘按键组件属性接口
   * 继承所有原生 HTML 元素的属性，并扩展键盘按键特有的功能和配置
   */
  export interface KbdProps extends HTMLAttributes<HTMLElement> {
    /** 键盘按键尺寸规格 */
    size?: KbdSize;
    /** 按键显示文本内容 */
    text?: string;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  let {
    size, // 键盘按键尺寸配置
    text, // 按键显示文本内容
    class: className = '', // 自定义CSS类名
    children, // 子内容插槽
    ...otherProps // 其他原生 HTML 元素属性
  }: KbdProps = $props();

  /**
   * 创建键盘按键的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const kbdVariant = tv(kbdVariantConfig, {});
</script>

<!--
  键盘按键元素容器
  使用原生 kbd 元素作为基础，模拟真实键盘按键的视觉效果
  - class: 合并样式变体生成的类名和自定义类名
  - {...otherProps}: 透传所有其他原生 HTML 属性（如 onclick, onkeydown 等）
-->
<kbd
  class={[
    tuc(
      kbdVariant({
        size,
      })
    ),
    className,
  ]}
  {...otherProps}
>
  {#if children}
    <!--
      优先渲染子内容插槽
      当提供子内容时，可以渲染复杂的按键内容（如图标、多行文本等）
    -->
    {@render children()}
  {:else}
    <!--
      显示文本内容
      当没有子内容时，显示 text 属性的值
      使用空字符串作为默认值，避免显示 undefined
    -->
    {text ?? ''}
  {/if}
</kbd>

<style></style>
