<script lang="ts" module>
  export interface CmdSearchMainProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { ShInput, ShEmpty } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  let { windowId }: CmdSearchMainProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { search } = cmdWindow.store;

  // 处理键盘事件
  const onHandleKeydown = (event: KeyboardEvent) => {
    search.onKeydownHandle(event);
  };

  onMount(() => {
    // 确保组件加载后焦点在搜索框上，但键盘事件应该在整个组件上监听
    document.addEventListener('keydown', onHandleKeydown);
    return () => {
      document.removeEventListener('keydown', onHandleKeydown);
    };
  });
</script>

<div class="fixed inset-0 bg-base-300/50 backdrop-blur-sm z-40" onclick={() => (search.show = false)}></div>
<div class="fixed top-10 left-1/2 -translate-x-1/2 min-w-md max-w-2lg z-50">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-4 gap-2">
      <ShInput type="text" bind:value={search.searchValue} placeholder="搜索..." autofocus class="w-full">
        {#snippet suffixRender()}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        {/snippet}
      </ShInput>

      <!-- Search results -->
      <div class="overflow-y-auto max-h-96">
        {#if !search.searchList?.length}
          <ShEmpty />
        {:else}
          <div class="divide-y divide-base-300">
            {#each search.searchList as categoryItem, categoryIndex}
              <div class="py-2">
                <h3 class="font-bold text-sm text-base-content/70 mb-1">{categoryItem.title}</h3>
                {#if categoryItem?.list?.length}
                  <ul>
                    {#each categoryItem.list as item, itemIndex}
                      <li
                        onclick={() => search.selectItemByIndex(categoryIndex, itemIndex)}
                        class={`flex flex-col items-start gap-1 px-2 py-1 cursor-pointer rounded-sm transition-colors duration-150 ${
                          search.checkItemSelected(categoryIndex, itemIndex) ? 'bg-primary/10' : 'hover:bg-base-200'
                        }`}
                      >
                        <span class="text-primary font-medium">{item.title}</span>
                        {#if item.description}
                          <span class="text-xs text-base-content/60">{item.description}</span>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Hint -->
      <div class="flex justify-between text-xs text-base-content/50 mt-2">
        <span>按ESC关闭</span>
        <span>按↑或↓选中</span>
        <span>按Enter确认</span>
      </div>
    </div>
  </div>
</div>
