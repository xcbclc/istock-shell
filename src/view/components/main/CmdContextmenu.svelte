<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TContextmenu, TContextmenuItem, TContextmenuPosition } from '@/store/cmd/cmd-contextmenu';

  export let contextmenu: TContextmenu;
  export let position: TContextmenuPosition;

  let contextmenuEl: HTMLElement;

  let style: string = '';
  const dispatch = createEventDispatcher();

  $: {
    const styles: string[] = [];
    // 计算后面需要考虑多窗口
    if (position.offset.x < 0 || position.offset.y < 0) {
      styles.push('display: none');
    } else {
      const { window, offset } = position;
      if (offset.x < window.width / 2) {
        styles.push(`left: ${offset.x}px`);
      } else {
        styles.push(`right: ${window.width - offset.x}px`);
        styles.push('left: auto');
      }
      if (offset.y < window.height / 2) {
        styles.push(`top: ${offset.y}px`);
      } else {
        styles.push(`bottom: ${window.height - offset.y}px`);
        styles.push('top: auto');
      }
    }
    style = styles.join(';');
  }
  const handleMouseenter = () => {
    dispatch('mouseStatus', true);
  };
  const handleMouseleave = () => {
    dispatch('mouseStatus', false);
  };
  const handleClick = (_ev: MouseEvent, menu: TContextmenuItem) => {
    dispatch('menuClick', menu);
  };
</script>

<div
  class="contextmenu-wrap"
  bind:this={contextmenuEl}
  {style}
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave}
  role="menu"
>
  {#if contextmenu}
    <ul class="contextmenu">
      {#each contextmenu as item, index}
        {#each item.menus as menu}
          <li
            class="contextmenu-item"
            on:click={(ev) => {
              handleClick(ev, menu);
            }}
            role="menuitem"
          >
            <span>{menu.text}</span>
            <span>{menu.shortcutKey}</span>
          </li>
        {/each}
        {#if index < contextmenu.length - 1 && item.menus.length}
          <li class="contextmenu-split"></li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  :root {
    --contextmenu-gap: var(--gap-default);
    --contextmenu-radius: var(--gap-default);
    --contextmenu-background-color: var(--color-sub-background);
    --contextmenu-box-shadow-color: var(--color-background);
    --contextmenu-border-color: var(--color-background);
    --contextmenu-font-size: var(--font-size-sm);
    --contextmenu-item-hover-color: var(--color-text-hover);
    --contextmenu-split-color: var(--color-background);
  }
  .contextmenu-wrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .contextmenu {
    margin: 0;
    padding: var(--contextmenu-gap) 2px;
    border-radius: var(--contextmenu-radius);
    background-color: var(--contextmenu-background-color);
    box-shadow: 0 0 0.35em var(--contextmenu-box-shadow-color);
    border: 1px solid var(--contextmenu-border-color);
    line-height: 1;
    transition: all var(--transition-duration);
    overflow-y: auto;
  }
  .contextmenu-item,
  .contextmenu-split {
    font-size: var(--contextmenu-font-size);
  }
  .contextmenu-item {
    padding: var(--contextmenu-gap);
    cursor: pointer;
    display: flex;
    gap: 0 var(--gap-2x);
    &:hover {
      color: var(--contextmenu-item-hover-color);
    }
  }
  .contextmenu-split {
    height: 1px;
    background-color: var(--contextmenu-split-color);
  }
</style>
