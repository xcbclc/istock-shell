<!--
  @component ShStatValue 统计项数值组件

  一个专门用于统计项数值展示的组件，基于 Tailwind CSS 构建。
  提供统计场景下的默认样式配置和完整的文本功能，支持多种样式变体和自定义内容。

  功能特性：
  - 支持字符串和数字类型的数值展示
  - 提供多种文本样式配置（颜色、尺寸、对齐、粗细）
  - 默认使用大号字体突出数值重要性
  - 支持完全自定义的数值内容渲染
  - 支持响应式设计和主题配置
  - 继承所有原生 div 元素属性
  - 完整的 TypeScript 类型安全
  - 无障碍访问支持

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShStatValue } from '@istock-shell/ui';
  </script>

  <p>基础数值</p>
  <ShStatValue 
    text="1,234" 
    color="primary" 
    size="3xl"
  />

  <p>带样式的数值</p>
  <ShStatValue 
    text="¥128,000" 
    color="success"
    weight="bold"
    align="center"
  />

  <p>自定义数值内容</p>
  <ShStatValue>
    <div class="flex items-baseline gap-1">
      <span class="text-4xl font-bold text-primary">95</span>
      <span class="text-lg text-gray-500">%</span>
    </div>
  </ShStatValue>

  <p>带单位的数值</p>
  <ShStatValue 
    text="42.5%" 
    color="warning"
    size="2xl"
  />
  ```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatValueVariantConfig } from '../../../theme/config';

  /**
   * 统计项数值组件属性接口
   * 继承原生 div 元素的所有属性，并扩展数值展示相关的配置选项
   */
  export interface StatValueProps extends HTMLAttributes<HTMLDivElement> {
    /** 数值内容，支持字符串或数字类型 */
    text?: string | number;
    /** 文本颜色主题，基于设计系统的颜色规范 */
    color?: TextBaseProps['color'];
    /** 文本尺寸，支持响应式尺寸配置 */
    size?: TextBaseProps['size'];
    /** 文本对齐方式 */
    align?: TextBaseProps['align'];
    /** 文本粗细程度 */
    weight?: TextBaseProps['weight'];
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  let {
    /** 数值文本内容，支持字符串或数字类型 */
    text,
    /** 文本颜色主题，基于设计系统的颜色规范 */
    color,
    /** 文本尺寸，支持响应式尺寸配置 */
    size,
    /** 文本对齐方式 */
    align,
    /** 文本粗细程度 */
    weight,
    /** 自定义 CSS 类名 */
    class: className = '',
    /** 子内容插槽，用于完全自定义数值内容 */
    children,
    /** 其他透传给 div 元素的属性 */
    ...otherProps
  }: StatValueProps = $props();

  /**
   * 创建统计数值的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const statValueVariant = tv(StatValueVariantConfig, {});
</script>

<!--
  统计数值容器
  使用 div 元素作为数值展示的根容器
  - class: 合并样式变体生成的类名和自定义类名
  - {...otherProps}: 透传所有其他原生 div 属性
-->
<div class={[tuc(statValueVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!--
      自定义数值内容渲染
      当提供子内容时，完全由用户控制数值的展示形式
      适用于需要复杂数值格式或特殊样式的场景
    -->
    {@render children()}
  {:else}
    <!--
      默认数值文本渲染
      直接显示 text 属性的内容，支持字符串和数字类型
      当 text 为空时显示空字符串
    -->
    {text ?? ''}
  {/if}
</div>

<style></style>
