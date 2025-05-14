<script lang="ts" module>
  import type { TInputRecommendItem } from '@/store/domains/global/input-recommend';
  export interface RecommendListProps {
    list: TInputRecommendItem[];
    onRecommendClose?: () => void;
    onRecommendSelected?: (inputRecommendItem?: TInputRecommendItem) => void;
  }
</script>

<script lang="ts">
  const { list = [], onRecommendClose, onRecommendSelected }: RecommendListProps = $props();

  let activeIndex: number = $state(0);
  let recommendWrapView: HTMLElement | undefined = $state();

  $effect(() => {
    if (list && recommendWrapView) {
      recommendWrapView.focus();
    }
  });
  $effect(() => {
    if (!list) {
      activeIndex = 0;
    }
  });

  const onKeydown = (ev: KeyboardEvent) => {
    const { key } = ev;
    const shortcutKeys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown'];
    if (shortcutKeys.includes(key)) {
      if (key !== 'Tab') ev.preventDefault();
      const lastIndex = list ? list.length - 1 : 0;
      if (key === 'Enter') {
        onRecommendSelected?.(list[activeIndex]);
      }
      if (key === 'Tab') {
        onRecommendClose?.();
      }
      if (key === 'ArrowDown') {
        const newActiveIndex = activeIndex + 1;
        activeIndex = newActiveIndex > lastIndex ? 0 : newActiveIndex;
      }
      if (key === 'ArrowUp') {
        const newActiveIndex = activeIndex - 1;
        activeIndex = newActiveIndex < 0 ? lastIndex : newActiveIndex;
      }
    }
  };
</script>

<div
  class="relative h-0 outline-none"
  bind:this={recommendWrapView}
  onkeydown={onKeydown}
  onblur={() => onRecommendClose?.()}
  tabindex="-1"
  role="menu"
>
  {#if list}
    <ul class="absolute left-0 bottom-[2em] z-10 overflow-hidden bg-base-200 shadow-md rounded-md max-w-md">
      {#if list.length}
        {#each list as item, index}
          <li
            role="menuitem"
            class="flex flex-nowrap items-center gap-2 px-2 py-1 cursor-pointer hover:bg-base-300 active:bg-base-300 transition-colors {activeIndex ===
            index
              ? 'bg-base-300/80'
              : ''}"
            onclick={() => onRecommendSelected?.(item)}
          >
            <span class="text-primary">{item.label ?? item.value}</span>
            {#if item.description}
              <span class="text-xs opacity-70">{item.description}</span>
            {/if}
          </li>
        {/each}
      {:else}
        <li class="px-2 py-1">
          <span>暂无数据</span>
        </li>
      {/if}
    </ul>
  {/if}
</div>
