<script lang="ts" module>
  import { type TSearchList, type TSearchListItem } from '@/store/domains/global/search';
  export interface CmdSearchMainProps {
    windowId: number;
    searchValue?: string;
    searchList?: TSearchList;
    onChangeValue?: (searchValue: string) => void;
    onSelectedSearchResult?: (searchResult: TSearchListItem) => void;
    onClose?: () => void;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { ShInput, ShEmpty } from '@istock-shell/ui';

  let {
    windowId,
    searchValue = $bindable(''),
    searchList = [
      {
        title: '设置',
        category: 'setting',
        list: [{ title: 'cookie管理', action: 'setting.cookie', description: '管理第三方站点的cookie' }],
      },
    ],
    onChangeValue,
    onSelectedSearchResult,
    onClose,
  }: CmdSearchMainProps = $props();

  // 添加选中项相关状态
  let selectedCategoryIndex = $state(-1);
  let selectedItemIndex = $state(-1);
  let flattenedItems = $state<Array<{ item: TSearchListItem; categoryIndex: number; itemIndex: number }>>([]);

  const getCurrentSearchList = () => {
    const searchText = searchValue?.trim() || '';
    if (!searchText) return searchList;

    return searchList
      .filter((category) => {
        if (category.title.includes(searchText)) return true;

        const filteredItems = category.list.filter(
          (item) => item.title.includes(searchText) || (item.description && item.description.includes(searchText))
        );

        return filteredItems.length > 0;
      })
      .map((category) => {
        // Clone to avoid modifying the original
        return {
          ...category,
          list: category.list.filter(
            (item) => item.title.includes(searchText) || (item.description && item.description.includes(searchText))
          ),
        };
      });
  };

  const currentSearchList = $derived(getCurrentSearchList());

  // 生成扁平化的项目列表，便于导航
  $effect(() => {
    const list = [];
    currentSearchList.forEach((category, categoryIndex) => {
      if (category.list && category.list.length > 0) {
        category.list.forEach((item, itemIndex) => {
          list.push({
            item,
            categoryIndex,
            itemIndex,
          });
        });
      }
    });

    // 重置选中状态
    selectedCategoryIndex = -1;
    selectedItemIndex = -1;
    flattenedItems = list;
  });

  // 处理键盘事件
  const onHandleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // ESC键关闭
      if (onClose) onClose();
    } else if (event.key === 'ArrowDown') {
      // 向下选择
      event.preventDefault();
      if (flattenedItems.length > 0) {
        const currentIndex = flattenedItems.findIndex(
          (item) => item.categoryIndex === selectedCategoryIndex && item.itemIndex === selectedItemIndex
        );
        const nextIndex = (currentIndex + 1) % flattenedItems.length;
        selectedCategoryIndex = flattenedItems[nextIndex].categoryIndex;
        selectedItemIndex = flattenedItems[nextIndex].itemIndex;
      }
    } else if (event.key === 'ArrowUp') {
      // 向上选择
      event.preventDefault();
      if (flattenedItems.length > 0) {
        const currentIndex = flattenedItems.findIndex(
          (item) => item.categoryIndex === selectedCategoryIndex && item.itemIndex === selectedItemIndex
        );
        const nextIndex = (currentIndex - 1 + flattenedItems.length) % flattenedItems.length;
        selectedCategoryIndex = flattenedItems[nextIndex].categoryIndex;
        selectedItemIndex = flattenedItems[nextIndex].itemIndex;
      }
    } else if (event.key === 'Enter') {
      // 回车键选择当前项
      if (
        selectedCategoryIndex >= 0 &&
        selectedItemIndex >= 0 &&
        currentSearchList[selectedCategoryIndex]?.list?.[selectedItemIndex]
      ) {
        const selectedItem = currentSearchList[selectedCategoryIndex].list[selectedItemIndex];
        if (onSelectedSearchResult && selectedItem) {
          setTimeout(() => {
            onSelectedSearchResult(selectedItem);
          }, 0);
        }
      }
    }
  };

  // 检查项目是否被选中
  const isItemSelected = (categoryIndex: number, itemIndex: number) => {
    return selectedCategoryIndex === categoryIndex && selectedItemIndex === itemIndex;
  };

  onMount(() => {
    // 确保组件加载后焦点在搜索框上，但键盘事件应该在整个组件上监听
    document.addEventListener('keydown', onHandleKeydown);
    return () => {
      document.removeEventListener('keydown', onHandleKeydown);
    };
  });
</script>

<div class="fixed inset-0 bg-base-300/50 backdrop-blur-sm z-40" onclick={onClose}></div>
<div class="fixed top-10 left-1/2 -translate-x-1/2 min-w-md max-w-2lg z-50">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-4 gap-2">
      <ShInput type="text" bind:value={searchValue} {onChangeValue} placeholder="搜索..." autofocus class="w-full">
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
        {#if !currentSearchList?.length}
          <ShEmpty />
        {:else}
          <div class="divide-y divide-base-300">
            {#each currentSearchList as categoryItem, categoryIndex}
              <div class="py-2">
                <h3 class="font-bold text-sm text-base-content/70 mb-1">{categoryItem.title}</h3>
                {#if categoryItem?.list?.length}
                  <ul>
                    {#each categoryItem.list as item, itemIndex}
                      <li
                        onclick={() => onSelectedSearchResult?.(item)}
                        class={`flex flex-col items-start gap-1 px-2 py-1 cursor-pointer rounded-sm transition-colors duration-150 ${
                          isItemSelected(categoryIndex, itemIndex) ? 'bg-primary/10' : 'hover:bg-base-200'
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
