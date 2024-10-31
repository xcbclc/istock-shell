<script lang="ts">
  export let texts: Array<{ type: string; text: string; tag?: 'span' | 'p' | 'a'; link?: string }> = [];
  export let textAlign: string = 'left';

  const getClassName = (type: string) => {
    return [`is-${type}`, `is-${textAlign}`].join(' ');
  };
</script>

{#each texts as item, index (index)}
  {#if item.tag === 'p'}
    <p class={getClassName(item.type)}>{item.text}</p>
  {:else if item.tag === 'span'}
    <span class={getClassName(item.type)}>{item.text}</span>
  {:else if item.tag === 'a'}
    <a href={item.link ?? '#'} target="_blank" class={getClassName(item.type)}>{item.text}</a>
  {:else}
    <p class={getClassName(item.type)}>{item.text}</p>
  {/if}
{/each}

<style lang="scss">
  .is-left {
    text-align: left;
  }
  .is-center {
    text-align: center;
  }
  .is-right {
    text-align: right;
  }
  .is-success {
    color: var(--color-text-success);
  }
  .is-info {
    color: var(--color-text-default);
  }
  .is-warning {
    color: var(--color-text-warning);
  }
  .is-danger {
    color: var(--color-text-danger);
  }
  p,
  span,
  a {
    margin: var(--gap-zero4x) 0;
  }
  span,
  a {
    display: inline-block;
  }
</style>
