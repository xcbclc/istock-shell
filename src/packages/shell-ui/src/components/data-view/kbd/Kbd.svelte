<!--
@component
键盘样式组件，用于显示键盘按键样式，支持以下功能：
- 支持不同尺寸的键盘样式
- 可配置显示文本
- 支持自定义子内容
- 响应式尺寸适配

用法示例:
```html
<ShKbd text="⌘" />
<ShKbd size="md" text="Enter" />
<ShKbd>
  <span class="text-xs">Shift</span>
</ShKbd>
<ShKbd bind:text={keyText} size={isMobile ? 'sm' : 'md'} />
<ShKbd text="Esc" on:click={handleEscClick} />
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { KbdVariantConfig } from '../../../theme/config';

  const kbdVariantConfig = KbdVariantConfig;
  export type KbdSize = keyof (typeof kbdVariantConfig)['variants']['size'];

  // 键盘组件属性接口
  export interface KbdProps extends HTMLAttributes<HTMLElement> {
    size?: KbdSize; // 键盘尺寸
    text?: string; // 显示文本
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    size, // 尺寸配置
    text, // 显示文本
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: KbdProps = $props();

  // 创建键盘样式变体生成器
  const kbdVariant = tv(kbdVariantConfig, {});
</script>

<!-- 键盘元素容器 -->
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
    <!-- 优先渲染子内容 -->
    {@render children()}
  {:else}
    <!-- 显示文本内容 -->
    {text ?? ''}
  {/if}
</kbd>

<style></style>
