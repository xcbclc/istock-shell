<script lang="ts" module>
  import type { ContextmenuStoreList, ContextmenuStoreModel, ContextmenuStorePosition } from '@/store';

  interface CmdContextmenuProps {
    list: ContextmenuStoreList;
    position: ContextmenuStorePosition;
    onMouseStatus?: (status: boolean) => void;
    onMenuClick?: (menu: ContextmenuStoreModel) => void;
  }
</script>

<script lang="ts">
  import { ShKbd } from '@istock-shell/ui';
  const { list = [], position, onMouseStatus, onMenuClick }: CmdContextmenuProps = $props();

  let style: string = $state('');

  $effect(() => {
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
  });
</script>

<div
  class="absolute top-0 left-0 z-50"
  {style}
  onmouseenter={() => onMouseStatus?.(true)}
  onmouseleave={() => onMouseStatus?.(false)}
  role="menu"
>
  {#if list}
    <ul class="py-2 border border-base-300/80 bg-base-200 shadow-md rounded-md max-w-md overflow-hidden">
      {#each list as item, index}
        {#each item.menus as menu}
          <li
            onclick={() => onMenuClick?.(menu)}
            class="flex flex-nowrap items-center content-center gap-2 px-2 py-1 cursor-pointer hover:bg-base-300 active:bg-base-300 transition-colors"
            role="menuitem"
          >
            <span class="flex-1 text-sm">{menu.text}</span>
            {#if menu.shortcutKey}
              <ShKbd size="sm">
                {menu.shortcutKey}
              </ShKbd>
            {/if}
          </li>
        {/each}
        {#if index < list.length - 1 && item.menus.length}
          <li class="border-top border-base-300"></li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>
