<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { AlertVariantConfig } from '../../../theme/config';

  // 警告框样式配置
  const alertVariantConfig = AlertVariantConfig;

  // 定义警告框颜色类型，从配置文件中获取可用的颜色变体
  export type AlertColor = keyof (typeof alertVariantConfig)['variants']['color'];

  // AlertType 类型别名，与 AlertColor 保持一致
  export type AlertType = AlertColor;

  // 定义 Alert 组件的属性接口，继承 HTML div 元素的所有属性
  export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    soft?: boolean; // 是否使用柔和样式
    outline?: boolean; // 是否使用轮廓样式
    dash?: boolean; // 是否使用虚线边框
    type?: AlertType; // 警告框类型
    title?: string; // 标题文本
    description?: string; // 描述文本
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShIcon } from '@istock-shell/ui';

  const {
    soft,
    outline,
    dash,
    type,
    title,
    description,
    children,
    class: className = '',
    ...otherProps
  }: AlertProps = $props();

  const alertVariants = tv(alertVariantConfig, {});
</script>

<!-- Alert 组件模板 -->
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
  <!-- 如果有子组件，渲染子组件内容 -->
  {#if children}
    {@render children?.()}
    <!-- 否则渲染默认的警告框内容 -->
  {:else}
    <!-- 渲染图标，如果未指定类型则默认使用 info 图标 -->
    <ShIcon size="xl" name={type ?? 'info'} class={tuc([type ? '' : 'text-info'])} />
    <div>
      <!-- 如果有标题则渲染标题 -->
      {#if title}
        <h3 class={tuc('font-bold')}>{title}</h3>
      {/if}
      <!-- 如果有描述则渲染描述 -->
      {#if description}
        <div>{description}</div>
      {/if}
    </div>
  {/if}
</div>

<style></style>
