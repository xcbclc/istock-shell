<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let list: Array<{ value: string; description: string }> | null = [];

  let activeIndex: number = 0;
  let recommendWrapView: HTMLElement;

  const dispatch = createEventDispatcher();

  $: if (list && recommendWrapView) {
    recommendWrapView.focus();
  }
  $: if (!list) {
    activeIndex = 0;
  }

  const onKeydown = (ev: KeyboardEvent) => {
    const { key } = ev;
    const shortcutKeys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown'];
    if (shortcutKeys.includes(key)) {
      if (key !== 'Tab') ev.preventDefault();
      const lastIndex = list ? list.length - 1 : 0;
      if (key === 'Enter') {
        dispatch('select', list ? list[activeIndex] : null);
      }
      if (key === 'Tab') {
        dispatch('close');
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
  class="recommend-wrap"
  bind:this={recommendWrapView}
  on:keydown={onKeydown}
  on:blur={() => dispatch('close')}
  tabindex="-1"
  role="menu"
>
  {#if list}
    <ul class="recommends">
      {#if list.length}
        {#each list as item, index}
          <li class="recommend-item {activeIndex === index ? 'is-active' : ''}" role="menuitem">
            <span>{item.value}</span>
            <span>{item.description}</span>
          </li>
        {/each}
      {:else}
        <li class="recommend-nodata">没有数据</li>
      {/if}
    </ul>
  {/if}
</div>

<style lang="scss">
  :root {
    --recommend-font-size: var(--font-size-sm);
    --recommend-gap: var(--gap-default);
    --recommend-radius: var(--gap-default);
    --recommend-background-color: var(--color-sub-background);
    --recommend-box-shadow: var(--color-background);
    --recommend-border-color: var(--color-sub-background);
    --recommend-text-hover-color: var(--color-text-hover);
    --recommend-active-color: var(--color-primary);
    --recommend-active-background-color: var(--color-background);
    --recommend-nodata-color: var(--color-text-warning);
  }
  .recommend-wrap {
    height: 0;
    position: relative;
  }
  .recommends {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    padding: var(--recommend-gap) 0;
    border-radius: var(--recommend-radius);
    background-color: var(--recommend-background-color);
    box-shadow: 0 0 0.35em var(--recommend-box-shadow);
    list-style: none;
    border: 1px solid var(--recommend-border-color);
    min-width: 8.5em;
    max-width: 18em;
    max-height: 25em;
    line-height: 1;
    overflow-y: auto;
    transition: all var(--transition-duration);
  }
  .recommend-item,
  .recommend-nodata {
    padding: var(--recommend-gap);
    font-size: var(--recommend-font-size);
  }
  .recommend-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    display: flex;
    gap: 0 var(--gap-2x);
    &:hover {
      color: var(--recommend-text-hover-color);
    }
    &.is-active {
      color: var(--recommend-active-color);
      background-color: var(--recommend-active-background-color);
    }
  }
  .recommend-nodata {
    color: var(--recommend-nodata-color);
  }
</style>
