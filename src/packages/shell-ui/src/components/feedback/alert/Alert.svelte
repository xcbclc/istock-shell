<!--
@component
ShAlert 警告框组件

一个功能丰富的警告框组件，用于向用户显示重要信息、警告、错误或成功消息。
基于原生 HTML div 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种警告类型（info, success, warning, error 等）
- 提供多种样式变体（柔和、轮廓、虚线边框）
- 支持自定义标题和描述内容
- 内置图标显示，根据类型自动匹配
- 支持自定义内容渲染
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持
- 符合无障碍访问标准（ARIA role="alert"）

示例用法：
```svelte
<script lang="ts">
  import { ShAlert } from '@istock-shell/ui';

  function handleAlertClick() {
    console.log('警告框被点击');
  }
</script>

<p>基础信息警告框</p>
<ShAlert type="info" title="提示" description="这是一条信息提示" />

<p>成功消息警告框</p>
<ShAlert type="success" title="操作成功" description="您的操作已成功完成" />

<p>警告消息警告框</p>
<ShAlert type="warning" title="注意" description="请注意相关风险" />

<p>错误消息警告框</p>
<ShAlert type="error" title="错误" description="操作失败，请重试" />

<p>自定义内容警告框</p>
<ShAlert type="success" onclick={handleAlertClick}>
  <div class="flex items-center gap-2">
    <span>自定义内容区域</span>
    <button class="btn btn-sm">操作按钮</button>
  </div>
</ShAlert>

```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { AlertVariantConfig } from '../../../theme/config';

  // 警告框样式配置
  const alertVariantConfig = AlertVariantConfig;

  /**
   * 警告框颜色类型定义
   * 从主题配置中动态提取可用的颜色变体，确保类型安全
   * @typedef {keyof AlertVariantConfig['variants']['color']} AlertColor
   */
  export type AlertColor = keyof (typeof alertVariantConfig)['variants']['color'];

  /**
   * 警告框类型别名
   * 与 AlertColor 保持一致，提供更语义化的类型名称
   * @typedef {AlertColor} AlertType
   */
  export type AlertType = AlertColor;

  /**
   * 警告框组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展警告框特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & AlertPropsExtension} AlertProps
   */
  export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    /** 柔和样式模式，使用较浅的背景色和柔和的视觉效果 @default false */
    soft?: boolean;
    /** 轮廓样式模式，仅显示边框和文字，背景透明 @default false */
    outline?: boolean;
    /** 虚线边框样式，使用虚线边框替代实线边框 @default false */
    dash?: boolean;
    /** 警告框类型，决定颜色主题和默认图标 @default 'info' */
    type?: AlertType;
    /** 警告框标题文本，显示在内容区域的顶部 */
    title?: string;
    /** 警告框描述文本，显示在标题下方的详细信息 */
    description?: string;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShIcon } from '@istock-shell/ui';

  const {
    soft = false, // 柔和样式模式
    outline = false, // 轮廓样式模式
    dash = false, // 虚线边框样式
    type, // 警告框类型
    title, // 标题文本
    description, // 描述文本
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生div元素属性
  }: AlertProps = $props();

  /**
   * 创建警告框的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名，支持不同类型和样式变体
   */
  const alertVariants = tv(alertVariantConfig, {});
</script>

<!-- 警告框根容器：使用div元素，设置ARIA role="alert"提供无障碍访问支持 -->
<div
  role="alert"
  class={[
    tuc(
      alertVariants({
        color: type,
        soft,
        outline,
        dash,
      })
    ),
    className,
  ]}
  {...otherProps}
>
  <!-- 条件渲染：根据是否有自定义子内容决定渲染方式 -->
  {#if children}
    <!-- 自定义内容渲染：使用children插槽渲染用户自定义的警告框内容 -->
    {@render children?.()}
  {:else}
    <!-- 默认内容渲染：显示标准的警告框布局，包含图标、标题和描述 -->
    <!-- 警告框图标：根据类型自动选择图标，未指定类型时默认使用info图标 -->
    <ShIcon size="xl" name={type ?? 'info'} class={tuc([type ? '' : 'text-info'])} />
    <!-- 文本内容容器：包含标题和描述信息 -->
    <div>
      <!-- 警告框标题：当配置了title属性时显示，使用粗体样式突出显示 -->
      {#if title}
        <h3 class={tuc('font-bold')}>{title}</h3>
      {/if}
      <!-- 警告框描述：当配置了description属性时显示详细描述信息 -->
      {#if description}
        <div>{description}</div>
      {/if}
    </div>
  {/if}
</div>

<style></style>
