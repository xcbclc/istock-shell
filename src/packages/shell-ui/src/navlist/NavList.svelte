<script lang="ts">
  import Text from '../text/Text.svelte';
  export let list: Array<{ title: string; children: Array<{ title: string; link: string; target?: string }> }> = [];
</script>

{#if list?.length}
  {#each list as item, index}
    <dl class="viewlist">
      <dt class="viewlist-item">{item.title}</dt>
      {#each item.children as child, cIndex}
        <dd class="viewlist-item">
          <a href={child.link} target={child.target ?? '_blank'}>
            {child.title}
          </a>
        </dd>
      {/each}
    </dl>
  {/each}
{:else}
  <Text texts={[{ type: 'warning', text: '暂无数据' }]} />
{/if}

<style lang="scss">
  :root {
    --ui-nav-list-title-size: var(--font-size-xl);
    --ui-nav-list-link-color: var(--color-text-default);
    --ui-nav-list-link-hover-color: var(--color-primary);
    --ui-nav-list-item-gap: var(--gap-default);
  }
  .viewlist {
    margin: 0;
    padding: 0;
  }
  dt.viewlist-item {
    font-size: var(--ui-nav-list-title-size);
    font-weight: var(--font-weight);
  }
  dd.viewlist-item {
    margin: var(--ui-nav-list-item-gap);
    display: inline-block;
    a {
      color: var(--ui-nav-list-link-color);
      &:hover {
        color: var(--ui-nav-list-link-hover-color);
      }
    }
  }
</style>
