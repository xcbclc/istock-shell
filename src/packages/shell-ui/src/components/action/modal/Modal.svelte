<!--
@component
ShModal 模态框组件

一个功能丰富的模态框组件，支持多种尺寸、自定义内容和操作按钮。
基于原生 HTML dialog 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种尺寸规格（从主题配置中动态提取）
- 支持标题、内容文本和自定义内容渲染
- 可配置关闭按钮和遮罩点击关闭
- 支持自定义操作按钮配置
- 内置淡入淡出动画效果
- 支持双向绑定显示状态
- 完整的事件回调支持
- TypeScript 类型安全

示例用法：
```svelte
<p>基础模态框</p>
<ShModal bind:show={isVisible} title="提示" content="这是一个基础模态框" />

<p>带操作按钮的模态框</
<ShModal
  bind:show={showConfirm}
  title="确认操作"
  content="您确定要执行此操作吗？"
  actions={[
    { text: '取消', color: 'secondary' },
    { text: '确认', color: 'primary' }
  ]}
  onClose={onCloseHandler}
/>

<p>大尺寸带关闭按钮的模态框</p
<ShModal
  bind:show={showLarge}
  size="lg"
  title="详细信息"
  closeButton
  maskClosable
>
  <div class="custom-content">
    <p>这里是自定义内容</p>
  </div>
</ShModal>

<p>完全自定义内容的模态框</p>
<ShModal bind:show={showCustom}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">自定义模态框</h3>
    <p class="py-4">完全自定义的模态框内容</p>
    <div class="modal-action">
      <button class="btn" onclick={() => showCustom = false}>关闭</button>
    </div>
  </div>
</ShModal>
```
-->
<script lang="ts" module>
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import type { ButtonProps } from '@istock-shell/ui';
  import type { Snippet } from 'svelte';
  import { ModalBoxVariantConfig } from '../../../theme/config';

  const modalBoxVariantConfig = ModalBoxVariantConfig;

  /**
   * 模态框尺寸类型（从主题配置中动态提取）
   * 支持多种预设尺寸规格
   * @typedef {keyof ModalBoxVariantConfig['variants']['size']} ModalBoxSize
   */
  export type ModalBoxSize = keyof (typeof modalBoxVariantConfig)['variants']['size'];

  /**
   * 模态框组件属性接口
   * 继承原生 dialog 元素的所有属性，并扩展模态框特有的功能和配置
   */
  export interface ModalProps extends HTMLDialogAttributes {
    /** 模态框标题文本 */
    title?: string;
    /** 模态框内容文本 */
    content?: string;
    /** 自定义内容渲染函数，提供完全自定义的内容区域 */
    contentRender?: () => ReturnType<Snippet<[]>>;
    /** 模态框尺寸规格 */
    size?: ModalBoxSize;
    /** 是否显示右上角关闭按钮 @default false */
    closeButton?: boolean;
    /** 模态框显示状态，支持双向绑定 @default false */
    show?: boolean;
    /** 点击遮罩是否可关闭模态框 @default false */
    maskClosable?: boolean;
    /** 操作按钮配置数组，每个按钮继承 Button 组件的所有属性 */
    actions?: Array<ButtonProps<'button'>>;
    /** 模态框关闭时的回调函数 */
    onClose?: () => void;
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';
  import { ShButton } from '../../index';

  let {
    show = $bindable(false), // 显示状态（支持双向绑定）
    title, // 模态框标题
    content, // 模态框内容文本
    contentRender, // 自定义内容渲染函数
    size, // 模态框尺寸
    closeButton, // 是否显示右上角关闭按钮
    maskClosable, // 点击遮罩是否可关闭
    actions = [], // 操作按钮配置数组
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    onClose, // 关闭回调函数
    ...otherProps // 其他原生 dialog 元素属性
  }: ModalProps = $props();

  // 模态框 dialog 元素的引用
  let dialog: HTMLDialogElement;

  /**
   * 创建模态框的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const modalBoxVariants = tv(modalBoxVariantConfig);

  /**
   * 处理模态框关闭事件
   * 更新显示状态并触发关闭回调
   */
  const onCloseHandler = () => {
    show = false;
    onClose?.();
  };

  /**
   * 监听显示状态变化
   * 使用 $effect 响应式地控制模态框的显示和隐藏
   */
  $effect(() => {
    if (show && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  });

  /**
   * 组件挂载时添加关闭事件监听器
   * 确保原生 dialog 关闭事件能正确触发组件状态更新
   */
  onMount(() => {
    dialog.addEventListener('close', onCloseHandler);
  });

  /**
   * 组件销毁时移除事件监听器
   * 防止内存泄漏
   */
  onDestroy(() => {
    dialog?.removeEventListener('close', onCloseHandler);
  });
</script>

<!--
  模态框容器
  使用原生 HTML dialog 元素作为模态框基础
  支持淡入淡出过渡动画和完整的样式定制
-->
<dialog
  bind:this={dialog}
  class={[tuc('modal'), className]}
  {...otherProps}
  transition:fade={{ duration: 500 }}
>
  {#if children}
    <!--
      自定义内容渲染
      当提供子内容时，完全由用户控制模态框的结构和样式
      适用于需要复杂布局或特殊交互的场景
    -->
    {@render children?.()}
  {:else}
    <!-- 默认模态框结构 -->
    <div class={tuc(modalBoxVariants({ size }))}>
      {#if closeButton}
        <!--
          右上角关闭按钮
          使用 form[method="dialog"] 实现原生关闭功能
          按钮样式为小尺寸圆形幽灵按钮
        -->
        <form method="dialog">
          <ShButton size="sm" shape="circle" class={tuc('absolute right-2 top-2')} ghost>✕</ShButton
          >
        </form>
      {/if}
      {#if title}
        <!-- 标题 -->
        <h3 class="text-lg font-bold">{title}</h3>
      {/if}
      {#if content}
        <!-- 内容 -->
        <p class="py-4">{content}</p>
      {/if}
      {#if contentRender}
        <!--自定义内容渲染区域-->
        <div class="pt-6">{@render contentRender()}</div>
      {/if}

      {#if actions?.length}
        <!--
          操作按钮区域
          渲染用户配置的操作按钮列表
          每个按钮继承 Button 组件的完整属性配置
        -->
        <div class={tuc('modal-action')}>
          {#each actions as action}
            <ShButton {...action} />
          {/each}
        </div>
      {/if}
    </div>
    {#if maskClosable}
      <!-- 可点击遮罩关闭 -->
      <form method="dialog" class={tuc('modal-backdrop')}>
        <button>关闭</button>
      </form>
    {/if}
  {/if}
</dialog>

<style></style>
