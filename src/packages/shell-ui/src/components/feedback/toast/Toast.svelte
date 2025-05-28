<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { AlertProps } from '../../index';

  import { ToastVariantConfig } from '../../../theme/config';

  const toastVariantConfig = ToastVariantConfig;

  // 定义水平位置类型（从配置中提取）
  export type ToastHorizontal = keyof (typeof toastVariantConfig)['variants']['horizontal'];
  // 定义垂直位置类型（从配置中提取）
  export type ToastVertical = keyof (typeof toastVariantConfig)['variants']['vertical'];

  // 定义Toast提示项类型（继承Alert属性）
  export interface ToastAlertItem extends AlertProps {
    message: string; // 提示消息
  }
  // 组件属性接口（继承div元素属性）
  export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    horizontal?: ToastHorizontal; // 水平位置
    vertical?: ToastVertical; // 垂直位置
    alerts?: ToastAlertItem[]; // 提示项列表
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShAlert } from '../../index';

  const {
    horizontal, // 水平位置
    vertical, // 垂直位置
    alerts = [], // 提示项列表
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: ToastProps = $props();

  // 创建Toast样式变体生成器
  const toastVariants = tv(toastVariantConfig, {});
</script>

<!-- Toast容器 -->
<div
  class={[
    tuc(
      toastVariants({
        horizontal,
        vertical,
      })
    ),
    className,
  ]}
  {...otherProps}
  transition:fade={{ duration: 500 }}
>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children?.()}
  {:else}
    <!-- 渲染提示项列表 -->
    {#each alerts as item}
      <ShAlert {...item}>
        <!-- 使用Alert组件展示提示 -->
        <span>{item.message}</span>
        <!-- 显示提示消息 -->
      </ShAlert>
    {/each}
  {/if}
</div>

<style></style>
