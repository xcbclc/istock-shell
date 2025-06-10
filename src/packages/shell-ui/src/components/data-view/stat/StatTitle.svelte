<!--
  @component ShStatTitle 统计项标题组件

  一个专门用于统计项标题展示的组件，基于文本组件构建。
  提供统计场景下的默认样式配置和完整的文本功能，支持多种样式变体和自定义内容。

  功能特性：
  - 支持文本属性配置（颜色、尺寸、对齐、粗细）
  - 默认使用适中的字体尺寸和颜色
  - 支持完全自定义的标题内容渲染
  - 支持响应式设计和主题配置
  - 继承所有原生 div 元素属性
  - 完整的 TypeScript 类型安全
  - 无障碍访问支持

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShStatTitle } from '@istock-shell/ui';
  </script>

  <p>基础标题</p>
  <ShStatTitle text="总销售额" />

  <p>带样式的标题</p>
  <ShStatTitle 
    text="用户增长" 
    color="primary"
    size="lg"
    weight="semibold"
  />

  <p>自定义标题内容</p>
  <ShStatTitle>
    <div class="flex items-center gap-2">
      <Icon name="chart-line" />
      <span>数据趋势</span>
    </div>
  </ShStatTitle>

  <p>居中对齐的标题</p>
  <ShStatTitle 
    text="完成率" 
    align="center"
    color="success"
  />
  ```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatTitleVariantConfig } from '../../../theme/config';

  const statTitleVariantConfig = StatTitleVariantConfig;

  /**
   * 统计项标题组件属性接口
   * 继承原生 div 元素的所有属性，并扩展标题展示相关的配置选项
   */
  export interface StatTitleProps extends HTMLAttributes<HTMLDivElement> {
    /** 标题文本内容 */
    text?: string;
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

  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatTitleProps = $props();

  const statTitleVariant = tv(statTitleVariantConfig, {});
</script>

<div class={[tuc(statTitleVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    {text ?? ''} <!-- 显示文本内容 -->
  {/if}
</div>

<style></style>
