<!--
  ShToggle 开关组件

  一个功能丰富的开关切换组件，支持多种样式变体和标签配置。
  基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持多种颜色主题（从主题配置中动态提取）
  - 提供多种尺寸规格（从主题配置中动态提取）
  - 支持标签文本的前置或后置显示
  - 内置状态变更回调机制
  - 支持双向数据绑定
  - 继承所有原生 input[type="checkbox"] 属性
  - 完整的响应式设计支持
  - TypeScript 类型安全
  
  示例用法：
  ```svelte
  <p>基础开关</p>
  <ShToggle bind:value={isEnabled} />
  
  <p>带颜色主题的开关</p>
  <ShToggle 
    color="primary" 
    size="lg"
    bind:value={isPrimary}
    onChangeValue={handleChange}
  />
  
  <p>带前置标签的开关</p>
  <ShToggle 
    bind:value={isActive}
    label={{ placement: 'before', class: 'text-sm' }}
  >
    启用功能
  </ShToggle>
  
  <p>带后置标签的开关</p>
  <ShToggle 
    bind:value={isVisible}
    label={{ placement: 'after' }}
  >
    显示内容
  </ShToggle>
  ```
-->
<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { ToggleVariantConfig } from '../../../theme/config';

  const toggleVariantConfig = ToggleVariantConfig;

  /**
   * 开关颜色主题类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof ToggleVariantConfig['variants']['color']} ToggleColor
   */
  export type ToggleColor = keyof (typeof toggleVariantConfig)['variants']['color'];

  /**
   * 开关尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格
   * @typedef {keyof ToggleVariantConfig['variants']['size']} ToggleSize
   */
  export type ToggleSize = keyof (typeof toggleVariantConfig)['variants']['size'];

  /**
   * 标签配置接口
   * 用于配置开关标签的显示位置和样式
   */
  export type ToggleLabel = {
    /** 标签显示位置，支持前置或后置 @default 'after' */
    placement?: 'before' | 'after';
    /** 标签容器的自定义CSS类名 */
    class?: string;
  };

  /**
   * 开关组件属性接口
   * 继承原生 input[type="checkbox"] 元素的所有属性，并扩展开关特有的功能和配置
   * 排除原生 size 属性以避免与组件 size 属性冲突
   */
  export interface ToggleProps extends Omit<HTMLInputAttributes, 'size'> {
    /** 开关颜色主题，支持多种预设颜色 */
    color?: ToggleColor;
    /** 开关尺寸规格 */
    size?: ToggleSize;
    /** 标签配置，用于显示开关说明文本 */
    label?: ToggleLabel;
    /** 开关状态值，支持双向绑定 @default false */
    value?: boolean;
    /** 状态变更时的回调函数，接收新的状态值 */
    onChangeValue?: (value: boolean) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(false), // 双向绑定的开关状态（默认false）
    color, // 颜色主题
    size, // 尺寸配置
    label, // 标签配置
    class: className = '', // 自定义类名
    onChangeValue, // 变更回调
    children, // 子内容（用于标签）
    type, // 原生 input type 属性（被忽略，强制为 checkbox）
    ...otherProps // 其他原生属性
  }: ToggleProps = $props();

  /**
   * 创建开关的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const toggleVariants = tv(toggleVariantConfig, {});

  /**
   * 监听开关状态变化
   * 当状态发生变化时，触发 onChangeValue 回调函数
   */
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

{#if label ?? children}
  <!--
    带标签的开关布局
    使用 label 元素包装开关和标签文本，提供更好的可访问性
    支持标签前置或后置显示，默认为后置
  -->
  <label class={tuc(toggleVariants({ color, size }), label?.class ?? '')}>
    {#if label?.placement === 'before'}
      <!--
        前置标签内容
        当 placement 设置为 'before' 时，标签文本显示在开关前面
      -->
      {@render children?.()}
    {/if}
    <!--
      开关输入元素
      使用原生 checkbox 输入元素，通过 bind:checked 实现双向绑定
      应用自定义样式类名和其他原生属性
    -->
    <input bind:checked={value} type="checkbox" class={[className]} {...otherProps} />
    {#if !label?.placement || label?.placement === 'after'}
      <!--
        后置标签内容
        默认情况下或当 placement 设置为 'after' 时，标签文本显示在开关后面
      -->
      {@render children?.()}
    {/if}
  </label>
{:else}
  <!--
    无标签基础开关
    当没有提供标签配置或子内容时，渲染纯开关元素
    直接应用样式变体和自定义类名
  -->
  <input
    bind:checked={value}
    type="checkbox"
    class={[tuc(toggleVariants({ color, size })), className]}
    {...otherProps}
  />
{/if}

<style></style>
