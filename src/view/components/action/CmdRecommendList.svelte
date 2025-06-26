<script lang="ts" module>
  import type { RecommendStoreList, RecommendStoreModel } from '@/store';
  export interface RecommendListProps {
    style: string;
    list: RecommendStoreList;
    onRecommendClose?: () => void;
    onRecommendSelected?: (inputRecommendItem?: RecommendStoreModel) => void;
  }
</script>

<script lang="ts">
  const { style = '', list = [], onRecommendClose, onRecommendSelected }: RecommendListProps = $props();

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
  {style}
  bind:this={recommendWrapView}
  onkeydown={onKeydown}
  onblur={() => onRecommendClose?.()}
  tabindex="-1"
  role="menu"
>
  <ul
    class="absolute left-0 bottom-[2em] z-10 overflow-auto border border-base-300/80 bg-base-200 shadow-md rounded-md max-w-md max-h-[10em]"
  >
    {#each list as item, index}
      <li
        role="menuitem"
        class="flex flex-nowrap items-center gap-2 px-2 py-1 cursor-pointer hover:bg-base-300 active:bg-base-300 transition-colors {activeIndex ===
        index
          ? 'bg-base-300/80'
          : ''}"
        onclick={() => onRecommendSelected?.(item)}
      >
        <span class="text-primary whitespace-nowrap">{item.label ?? item.value}</span>
        {#if item.description}
          <span class="text-xs opacity-70">{item.description}</span>
        {/if}
      </li>
    {/each}
  </ul>
</div>
