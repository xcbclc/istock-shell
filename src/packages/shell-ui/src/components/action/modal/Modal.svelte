<script lang="ts" module>
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import type { ButtonProps } from '@istock-shell/ui';
  import type { Snippet } from 'svelte';
  import { ModalBoxVariantConfig } from '../../../theme/config';

  const modalBoxVariantConfig = ModalBoxVariantConfig;
  export type ModalBoxSize = keyof (typeof modalBoxVariantConfig)['variants']['size'];

  // 模态框属性接口（继承dialog元素属性）
  export interface ModalProps extends HTMLDialogAttributes {
    title?: string; // 标题
    content?: string; // 内容
    contentRender?: () => ReturnType<Snippet<[]>>; // 自定义内容元素渲染
    size?: ModalBoxSize;
    closeButton?: boolean; // 是否显示关闭按钮
    show?: boolean; // 是否显示
    maskClosable?: boolean; // 点击遮罩是否可关闭
    actions?: Array<ButtonProps<'button'>>; // 操作按钮配置
    onClose?: () => void; // 关闭回调
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
    title, // 标题
    content, // 内容
    contentRender,
    size,
    closeButton, // 右上角关闭按钮
    maskClosable, // 遮罩可关闭
    actions = [], // 操作按钮
    children, // 子内容
    class: className = '', // 自定义类名
    onClose, // 关闭回调
    ...otherProps // 其他原生属性
  }: ModalProps = $props();

  let dialog: HTMLDialogElement;

  const modalBoxVariants = tv(modalBoxVariantConfig);

  // 处理关闭事件
  const handleClose = () => {
    show = false;
    onClose?.();
  };

  // 监听显示状态变化
  $effect(() => {
    if (show && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  });

  onMount(() => {
    dialog.addEventListener('close', handleClose);
  });
  onDestroy(() => {
    dialog?.removeEventListener('close', handleClose);
  });
</script>

<!-- 模态框容器 -->
<dialog bind:this={dialog} class={[tuc('modal'), className]} {...otherProps} transition:fade={{ duration: 500 }}>
  {#if children}
    <!-- 渲染自定义内容 -->
    {@render children?.()}
  {:else}
    <!-- 默认模态框结构 -->
    <div class={tuc(modalBoxVariants({ size }))}>
      {#if closeButton}
        <!-- 关闭按钮 -->
        <form method="dialog">
          <ShButton size="sm" shape="circle" class={tuc('absolute right-2 top-2')} ghost>✕</ShButton>
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
        <div class="pt-6">{@render contentRender()}</div>
      {/if}

      {#if actions?.length}
        <!-- 操作按钮区域 -->
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
