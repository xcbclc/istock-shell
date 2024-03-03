<script lang="ts">
  import Text from '../text/Text.svelte';
  export let list: Array<{ title: string }> = [];
  export let display: string = 'block';
  export let tag: string = 'ul';
  export let listStyle: string = 'none';
  export let styles: string[] = [];

  const getViewListOtherClass = () => {
    return `is-${display.indexOf('inline') === 0 ? 'inline' : 'block'}`;
  };

  const getViewListItemStyle = () => {
    const otherStyles = [];
    otherStyles.push(`display: ${display}`);
    otherStyles.push(`list-style: ${listStyle}`);
    return `${[...otherStyles, ...styles].join(';')}`;
  };
</script>

{#if list?.length}
  {#if tag === 'ul'}
    <ul class="viewlist {getViewListOtherClass()}">
      {#each list as item, index (index)}
        <li class="viewlist-item" style={getViewListItemStyle()}>{item.title}</li>
      {/each}
    </ul>
  {:else if tag === 'ol'}
    <ol class="viewlist {getViewListOtherClass()}">
      {#each list as item, index (index)}
        <li class="viewlist-item" style={getViewListItemStyle()}>{item.title}</li>
      {/each}
    </ol>
  {:else if tag === 'dl'}
    <dl class="viewlist {getViewListOtherClass()}">
      {#each list as item, index}
        {#if index === 0}
          <dt class="viewlist-item" style={getViewListItemStyle()}>{item.title}</dt>
        {:else}
          <dd class="viewlist-item" style={getViewListItemStyle()}>{item.title}</dd>
        {/if}
      {/each}
    </dl>
  {/if}
{:else}
  <Text texts={[{ type: 'warning', text: '暂无数据' }]} />
{/if}

<style lang="scss">
  .viewlist {
    margin: 0;
    padding: 0;
    &.is-inline {
      .viewlist-item {
        margin: 0 0.5em;
      }
    }
    &.is-block {
      .viewlist-item {
        //
      }
    }
  }
  .viewlist-item {
    &.dt {
      font-weight: var(--font-weight);
    }
  }
</style>
