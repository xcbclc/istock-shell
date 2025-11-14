<script lang="ts" module>
  import type { OutputStoreComponentInfo } from '@/store';

  export interface CmdMainComponentProps {
    windowId: number;
    outputId: string;
    componentInfo: OutputStoreComponentInfo;
    initShow?: boolean;
    source?: string;
    onContentLoaded?: () => void;
  }
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { CmdWindowsManager } from '@/window';

  const { windowId, componentInfo, initShow = false, source, onContentLoaded }: CmdMainComponentProps = $props();
  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const { outputComponent } = ctx.cmdWindow.store;
  let outputComponentElement: HTMLElement | undefined;
  let observer: IntersectionObserver | undefined;
  let isInViewport: boolean = $state(initShow);
  let isInitComponent: boolean = $state(initShow);

  const canSupportLoaded = () => {
    return ['ShMarkdown', 'ShChart', 'ShDataGrid'].includes(componentInfo.component);
  };
  const onSubmit = (messageId: string, payload: any) => {
    ctx.message.sendMessageToChannel(messageId, payload);
  };

  onMount(() => {
    const canSupport = canSupportLoaded();
    if ((canSupport && !initShow) || !canSupport) {
      tick().then(() => {
        onContentLoaded?.();
      });
    }
    // 创建交叉观察器实例，用于监听容器元素的视口可见性
    observer = new IntersectionObserver(
      (entries) => {
        // 更新容器元素是否在视口内的状态
        isInViewport = entries[0].isIntersecting;
        if (isInViewport && !isInitComponent) {
          isInitComponent = true;
        }
      },
      {
        rootMargin: '3000px',
        threshold: 0.0,
      }
    );

    // 开始观察容器元素的视口可见性变化
    if (outputComponentElement) {
      observer.observe(outputComponentElement);
    }
  });
</script>

<div bind:this={outputComponentElement} class="overflow-x-auto">
  {#if isInViewport || isInitComponent}
    {@const SvelteComponent =
      outputComponent.getComponentByName(componentInfo.component) || outputComponent.getComponentByName('ShEmpty')}
    <SvelteComponent
      {...componentInfo.props}
      {source}
      {windowId}
      class={isInViewport || initShow ? 'opacity-100 transition-opacity' : `opacity-0 invisible`}
      onSubmit={(detail) => {
        onSubmit(componentInfo.messageId, detail);
      }}
      {onContentLoaded}
    />
  {:else}
    <div class="flex flex-col gap-4 animate-fade-in-opacity">
      <div class="skeleton h-4 w-[60%]"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
  {/if}
</div>

<style>
  .animate-fade-in-opacity {
    animation: fade-in-opacity 1s ease-in-out;
  }

  @keyframes fade-in-opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
