<!--
@component
ShToast 消息提示组件

一个功能丰富的消息提示组件，支持多种位置定位和自动消失效果。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种水平位置（left, center, right）
- 支持多种垂直位置（top, center, bottom）
- 支持多个提示项同时显示
- 内置淡入淡出过渡动画效果
- 支持自定义内容和Alert组件集成
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShToast } from '@istock-shell/ui';

  const alerts = [
    { message: '操作成功！', color: 'success', type: 'filled' },
    { message: '请注意检查输入', color: 'warning', type: 'outlined' },
    { message: '发生错误，请重试', color: 'error', type: 'filled' }
  ];
</script>

<p>基础消息提示</p>
<ShToast alerts={alerts} />

<p>右上角位置提示</p>
<ShToast
  horizontal="right"
  vertical="top"
  alerts={alerts}
/>

<p>居中显示提示</p>
<ShToast
  horizontal="center"
  vertical="center"
  alerts={[{ message: '重要通知', color: 'primary', type: 'filled' }]}
/>

<p>自定义内容提示</p>
<ShToast horizontal="left" vertical="bottom">
  <div class="bg-blue-500 text-white p-4 rounded">
    自定义提示内容
  </div>
</ShToast>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { AlertProps } from '../../index';

  import { ToastVariantConfig } from '../../../theme/config';

  const toastVariantConfig = ToastVariantConfig;

  /**
   * Toast水平位置类型（从主题配置中动态提取）
   * 支持的位置包括：left（左侧）、center（居中）、right（右侧）
   * @typedef {keyof ToastVariantConfig['variants']['horizontal']} ToastHorizontal
   */
  export type ToastHorizontal = keyof (typeof toastVariantConfig)['variants']['horizontal'];

  /**
   * Toast垂直位置类型（从主题配置中动态提取）
   * 支持的位置包括：top（顶部）、center（居中）、bottom（底部）
   * @typedef {keyof ToastVariantConfig['variants']['vertical']} ToastVertical
   */
  export type ToastVertical = keyof (typeof toastVariantConfig)['variants']['vertical'];

  /**
   * Toast提示项接口
   * 继承Alert组件的所有属性，并扩展消息提示特有的属性
   * @typedef {AlertProps & ToastAlertItemExtension} ToastAlertItem
   */
  export interface ToastAlertItem extends AlertProps {
    /** 提示消息内容，显示给用户的文本信息 */
    message: string;
  }

  /**
   * Toast组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展Toast特有的位置和内容属性
   * @typedef {HTMLAttributes<HTMLDivElement> & ToastPropsExtension} ToastProps
   */
  export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    /** 水平位置配置，控制Toast在屏幕水平方向的显示位置 */
    horizontal?: ToastHorizontal;
    /** 垂直位置配置，控制Toast在屏幕垂直方向的显示位置 */
    vertical?: ToastVertical;
    /** 提示项列表，包含多个需要显示的消息提示 */
    alerts?: ToastAlertItem[];
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShAlert } from '../../index';

  const {
    horizontal = 'end', // 水平位置
    vertical = 'bottom', // 垂直位置
    alerts = [], // 提示项列表
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: ToastProps = $props();

  // 创建Toast样式变体生成器
  const toastVariants = tv(toastVariantConfig, {});
</script>

<!-- Toast消息提示容器：固定定位的消息提示区域 -->
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
