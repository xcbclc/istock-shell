<script lang="ts">
  export let texts: string[] = [];
</script>

{#each texts as error}
  <p class="error">
    {#each error as t}{#if t === ' '}&nbsp;{:else}{t}{/if}{/each}
  </p>
{/each}

<style lang="scss">
  .error {
    color: var(--color-text-danger);
    margin: 0;
    word-wrap: break-word;
    &:first-child {
      font-weight: var(--font-weight);
    }
  }
</style>
