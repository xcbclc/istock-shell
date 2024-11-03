<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ShText } from '@istock/shell-ui';
  // import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import { type TSearchList, type TSearchListItem } from '@/store/domains/global/search';
  export let windowId: number;

  export let searchValue: string = '';
  export let searchList: TSearchList = [
    {
      title: '设置',
      category: 'setting',
      list: [{ title: 'cookie管理', action: 'setting.cookie', description: '管理第三方站点的cookie' }],
    },
  ];
  const dispatch = createEventDispatcher();
  const onInput = () => {
    dispatch('input', searchValue);
    dispatch('change', searchValue);
  };
  const onChange = () => {
    dispatch('change', searchValue);
  };
  const getCurrentSearchList = () => {
    const searchText = searchValue?.trim() || '';
    return searchList.filter((item: TSearchListItem) => {
      if (item.title.includes(searchText)) return true;
      return item.list.some(
        (v: TSearchListItem) => v.title.includes(searchValue) || (v.description && v.description.includes(searchValue))
      );
    });
  };
  const onSelectedSearchResult = (searchResult: TSearchListItem) => {
    dispatch('selectedSearchResult', searchResult);
  };
  const onClickMask = () => {
    dispatch('close');
  };
  $: currentSearchList = searchValue ? getCurrentSearchList() : searchList;
  // const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
</script>

<div class="search-main-mask" on:click={onClickMask}></div>
<div class="search-main">
  <div class="search-input">
    <input type="text" bind:value={searchValue} on:input={onInput} on:change={onChange} />
  </div>
  <div class="search-result">
    {#if !currentSearchList?.length}
      <ShText texts={[{ type: 'warning', text: '没有搜索到结果' }]} />
    {:else}
      <div class="search-result-list">
        {#each currentSearchList as categoryItem}
          <dl class="search-result-dl">
            <dt class="search-result-category">{categoryItem.title}</dt>
            {#if categoryItem?.list?.length}
              {#each categoryItem.list as item}
                <div
                  on:click={() => {
                    onSelectedSearchResult(item);
                  }}
                  class="search-result-item"
                >
                  <div class="search-result-header">
                    <h4 class="search-result-header-title">{item.title}</h4>
                    <div class="search-result-header-right"></div>
                  </div>
                  {#if item.description}
                    <div class="search-result-content">{item.description}</div>
                  {/if}
                </div>
              {/each}
            {/if}
          </dl>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .search-main-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .search-main {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: var(--gap-default);
    left: 50%;
    transform: translate(-50%, 0);
    width: 30em;
    max-height: 30em;
    padding: var(--gap-default);
    border-radius: var(--border-radius);
    background-color: var(--color-sub-background);
    box-shadow: 0 3px 8px var(--color-background);
    transition: height ease-in var(--transition-duration);
    z-index: 101;
  }
  .search-input {
    margin-bottom: var(--gap-default);
    & > input {
      width: 100%;
      padding: var(--gap-default);
      box-sizing: border-box;
      background-color: unset;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      color: var(--color-text-default);
      &:focus {
        outline: unset;
      }
    }
  }
  .search-result {
    flex: auto;
    overflow-y: auto;
  }
  .search-result-dl {
    margin: 0 0 var(--gap-default) 0;
  }
  .search-result-item {
    margin: 0 0 var(--gap-zero2x) 0;
    display: flex;
    padding: var(--gap-zero2x) var(--gap-default);
    border-radius: var(--gap-zero2x);
    flex-direction: column;
    overflow-y: auto;
    cursor: pointer;
    transition: background-color ease-in var(--transition-duration);
    box-sizing: border-box;
    &:hover {
      background-color: var(--color-background-lighter);
    }
    &.is-active {
      background-color: var(--color-background);
      color: var(--color-primary);
    }
  }
  .search-result-category {
    margin: var(--gap-zero2x) 0;
    font-weight: bold;
  }
  .search-result-header {
    display: flex;
  }
  .search-result-header-title {
    margin: 0;
    flex: auto;
    font-weight: normal;
  }
  .search-result-content {
    font-size: var(--font-size-sm);
  }
</style>
