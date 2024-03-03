<script lang="ts">
  export let texts: Array<{ type: string; text: string }> = [];
</script>

{#each texts as item, index (index)}
  <p class={item.type}>{item.text}</p>
{/each}

<style lang="scss">
  .success {
    color: var(--color-text-success);
  }
  .warning {
    color: var(--color-text-warning);
  }
  .danger {
    color: var(--color-text-danger);
  }
</style>
